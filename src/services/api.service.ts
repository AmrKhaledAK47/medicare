import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Define API response interface
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any;
}

// Custom error class for authentication errors
export class AuthError extends Error {
    constructor(message: string, public errorType: 'invalid_credentials' | 'account_not_found' | 'network' | 'server' | 'other' = 'other') {
        super(message);
        this.name = 'AuthError';

        // This is needed to make instanceof work correctly in TypeScript
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

// Define FHIR Operation Outcome error response
export interface OperationOutcome {
    resourceType: string;
    issue: Array<{
        severity: string;
        code: string;
        diagnostics: string;
        details?: {
            text: string;
        }
    }>;
}

// Define user interface
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'patient' | 'practitioner';
    status: string;
    fhirResourceId?: string;
    phone?: string;
}

// Define auth response interface
export interface AuthResponse {
    accessToken: string;
    user: User;
}

// Define login request interface
export interface LoginRequest {
    email: string;
    password: string;
}

// Define register request interface
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    accessCode?: string;
}

// Define forgot password request interface
export interface ForgotPasswordRequest {
    email: string;
}

// Define reset password request interface
export interface ResetPasswordRequest {
    email: string;
    resetCode: string;
    newPassword: string;
}

// Define verify code request interface
export interface VerifyCodeRequest {
    email: string;
    code: string;
}

class ApiService {
    private api: AxiosInstance;
    private static instance: ApiService;

    private constructor() {
        // Create axios instance
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor for auth token
        this.api.interceptors.request.use(
            (config) => {
                try {
                    const token = localStorage.getItem('accessToken');
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                } catch (error) {
                    // Silent error in production
                }
                return config;
            },
            (error) => {
                // Silent error in production
                return Promise.reject(error);
            }
        );

        // Add response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                try {
                    // Handle token expiration
                    if (error.response?.status === 401) {
                        // Skip token clearing and redirect for login attempts
                        const isLoginRequest = error.config?.url?.includes('/auth/login');
                        if (!isLoginRequest) {
                            try {
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('user');
                            } catch (e) {
                                // Silent error in production
                            }

                            // Only redirect if not on login page
                            if (window.location.pathname !== '/login') {
                                window.location.href = '/login';
                            }
                        }
                    }
                } catch (e) {
                    // Silent error in production
                }

                return Promise.reject(error);
            }
        );
    }

    // Get singleton instance
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    // Helper to extract error message from FHIR OperationOutcome
    private getErrorMessageFromResponse(error: any): string {
        try {
            // Check if it's a FHIR OperationOutcome error
            if (error.response?.data?.resourceType === 'OperationOutcome' &&
                error.response.data.issue &&
                Array.isArray(error.response.data.issue) &&
                error.response.data.issue.length > 0) {

                const issue = error.response.data.issue[0];
                return issue.diagnostics || 'An error occurred';
            }

            // Empty response data with status code
            if (error.response && (!error.response.data || Object.keys(error.response.data).length === 0)) {
                if (error.response.status === 401) {
                    return 'Invalid credentials';
                } else if (error.response.status === 404) {
                    return 'Resource not found';
                } else if (error.response.status >= 500) {
                    return 'Server error. Please try again later.';
                } else {
                    return `Error: ${error.response.status}`;
                }
            }

            // Regular API error
            if (error.response?.data?.message) {
                return error.response.data.message;
            }

            // Network error
            if (error.message === 'Network Error') {
                return 'Network error. Please check your internet connection.';
            }

            // Fallback error message
            return error.message || 'An unknown error occurred';
        } catch (e) {
            // If error parsing fails, return a generic message
            return 'An unexpected error occurred';
        }
    }

    // Authentication methods
    public async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            // Wrap the API call in a try-catch to prevent network errors from being logged
            let response;
            try {
                response = await this.api.post<ApiResponse<AuthResponse>>('/auth/login', data);
            } catch (networkError: any) {
                // Determine error type
                let errorType: 'invalid_credentials' | 'account_not_found' | 'network' | 'server' | 'other' = 'other';
                let errorMessage = 'Login failed';

                if (!networkError.response) {
                    errorType = 'network';
                    errorMessage = 'Network error. Please check your internet connection.';
                } else if (networkError.response.status === 401) {
                    errorType = 'invalid_credentials';
                    errorMessage = 'Invalid credentials';
                } else if (networkError.response.status === 404) {
                    errorType = 'account_not_found';
                    errorMessage = 'Account not found';
                } else if (networkError.response.status >= 500) {
                    errorType = 'server';
                    errorMessage = 'Server error. Please try again later.';
                }

                throw new AuthError(errorMessage, errorType);
            }

            // Store token and user data in localStorage
            if (response.data.success && response.data.data) {
                try {
                    const { accessToken, user } = response.data.data;

                    if (!accessToken || !user) {
                        throw new AuthError('Invalid authentication data received', 'other');
                    }

                    // Clear any existing tokens first
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');

                    // Store new token and user data
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (e) {
                    throw new AuthError('Unable to store authentication data', 'other');
                }

                return response.data.data;
            }

            throw new AuthError(response.data.message || 'Login failed', 'other');
        } catch (error: any) {
            // If it's already an AuthError, just rethrow it
            if (error instanceof AuthError) {
                throw error;
            }

            // Handle specific error types
            if (!error.response) {
                throw new AuthError('Network error. Please check your internet connection.', 'network');
            }

            const errorMessage = this.getErrorMessageFromResponse(error);

            // Determine error type
            let errorType: 'invalid_credentials' | 'account_not_found' | 'network' | 'server' | 'other' = 'other';

            if (errorMessage.includes('Invalid credentials')) {
                errorType = 'invalid_credentials';
            } else if (errorMessage.includes('not found')) {
                errorType = 'account_not_found';
            } else if (error.response?.status >= 500) {
                errorType = 'server';
            }

            throw new AuthError(errorMessage, errorType);
        }
    }

    public async register(data: RegisterRequest): Promise<ApiResponse> {
        try {
            // Log registration attempt (only in development)
            if (process.env.NODE_ENV !== 'production') {
                console.log('Attempting registration with email:', data.email);
            }

            const response = await this.api.post<ApiResponse>('/auth/register', data);

            // Check if the response is valid
            if (!response.data.success) {
                throw new Error(response.data.message || 'Registration failed with an unknown error');
            }

            return response.data;
        } catch (error: any) {
            // Enhanced error handling with more specific error messages
            if (error.response) {
                // Check if it's a FHIR OperationOutcome error
                if (error.response.data?.resourceType === 'OperationOutcome' &&
                    error.response.data.issue &&
                    Array.isArray(error.response.data.issue) &&
                    error.response.data.issue.length > 0) {

                    const issue = error.response.data.issue[0];
                    throw new Error(issue.diagnostics || 'Registration failed');
                }

                // Handle specific status codes with detailed messages
                if (error.response.status === 409) {
                    throw new Error('Email already exists. Please use a different email address or login with your existing account.');
                } else if (error.response.status === 400) {
                    // Check for specific error messages in the response
                    const errorMessage = error.response.data?.message || '';
                    if (errorMessage.includes('password')) {
                        throw new Error('Password does not meet security requirements. Please use a stronger password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
                    } else if (errorMessage.includes('access code')) {
                        throw new Error('Invalid access code. Please check and try again or request a new access code.');
                    } else if (errorMessage.includes('email')) {
                        throw new Error('Invalid email format. Please provide a valid email address.');
                    } else {
                        throw new Error(errorMessage || 'Invalid registration data. Please check your information and try again.');
                    }
                } else if (error.response.status === 404) {
                    throw new Error('Access code not found or invalid. Please contact your administrator for a valid access code.');
                } else if (error.response.status === 403) {
                    throw new Error('Access code has already been used or is expired. Please request a new access code.');
                } else if (error.response.status === 500) {
                    throw new Error('Server error occurred during registration. Please try again later or contact support.');
                } else {
                    throw new Error(error.response.data.message || `Registration failed with status code ${error.response.status}`);
                }
            }

            // Network or other errors
            if (error.message) {
                throw new Error(`Registration failed: ${error.message}`);
            } else {
                throw new Error('Network error. Please check your connection and try again.');
            }
        }
    }

    public async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
        try {
            const response = await this.api.post<ApiResponse>('/auth/forgot-password', data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Failed to send reset code');
            }
            throw error;
        }
    }

    public async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
        try {
            const response = await this.api.post<ApiResponse>('/auth/reset-password', data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Password reset failed');
            }
            throw error;
        }
    }

    public async verifyCode(data: VerifyCodeRequest): Promise<ApiResponse> {
        try {
            const response = await this.api.post<ApiResponse>('/auth/verify-code', data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Code verification failed');
            }
            throw error;
        }
    }

    public async verifyAccessCode(code: string): Promise<ApiResponse> {
        try {
            if (!code || code.trim() === '') {
                throw new Error('Access code is required');
            }

            // Log verification attempt (only in development)
            if (process.env.NODE_ENV !== 'production') {
                console.log('Verifying access code:', code);
            }

            const response = await this.api.post<ApiResponse>('/access-codes/verify', { code });

            // Check if the response is valid
            if (!response.data.success) {
                throw new Error(response.data.message || 'Access code verification failed');
            }

            return response.data;
        } catch (error: any) {
            // Enhanced error handling with more specific error messages
            if (error.response) {
                if (error.response.status === 404) {
                    throw new Error('Access code not found or has expired. Please contact your administrator for a valid code.');
                } else if (error.response.status === 400) {
                    throw new Error('Invalid access code format. Please check and try again.');
                } else if (error.response.status === 403) {
                    throw new Error('This access code has already been used. Please request a new one from your administrator.');
                } else if (error.response.status === 401) {
                    throw new Error('Authentication required. Please log in and try again.');
                } else if (error.response.status >= 500) {
                    throw new Error('Server error while verifying access code. Please try again later.');
                } else {
                    const errorMessage = error.response.data?.message || 'Access code verification failed';
                    throw new Error(errorMessage);
                }
            }

            // If the error already has a message (like from our validation above), use it
            if (error.message) {
                throw new Error(error.message);
            }

            // Fallback error message
            throw new Error('Network error while verifying access code. Please check your connection and try again.');
        }
    }

    public async getUserProfile(): Promise<User> {
        try {
            const response = await this.api.get<ApiResponse<User>>('/auth/me');
            if (response.data.success && response.data.data) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to get user profile');
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Failed to get user profile');
            }
            throw error;
        }
    }

    // Logout method
    public logout(): void {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        } catch (e) {
            // Silent error in production
        }
    }

    // Check if user is authenticated
    public isAuthenticated(): boolean {
        try {
            const token = localStorage.getItem('accessToken');
            const user = localStorage.getItem('user');
            const isAuth = !!token && !!user;

            if (isAuth) {
                try {
                    // Basic token validation - check if it's a valid JWT format
                    const tokenParts = token!.split('.');
                    if (tokenParts.length !== 3) {
                        return false;
                    }

                    // Try to parse the user JSON
                    JSON.parse(user!);

                    return true;
                } catch (error) {
                    // Clear invalid data
                    this.logout();
                    return false;
                }
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    // Get current user
    public getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                try {
                    return JSON.parse(userStr) as User;
                } catch (e) {
                    // Clear invalid data
                    this.logout();
                    return null;
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    // Get user role
    public getUserRole(): string | null {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }
}

// Export singleton instance
export const apiService = ApiService.getInstance();
export default apiService; 
