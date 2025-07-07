import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiService, { User, LoginRequest, RegisterRequest, OperationOutcome, AuthError } from '../services/api.service';

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Create a global error handler to suppress specific errors
const setupErrorHandlers = () => {
    // Save original console methods
    const originalConsoleError = console.error;

    // Override console.error to prevent specific errors from showing
    console.error = (...args) => {
        const errorString = args.join(' ');

        // List of patterns to silence
        const silencePatterns = [
            'Hydration failed',
            'API Service:',
            'Warning:',
            'Invalid credentials',
            'Error: Invalid credentials',
            'AuthError:',
            'account not found',
            'Account not found',
            'Network error',
            'Server error',
            'Authentication token error',
            'Failed to fetch'
        ];

        // Check if the error message contains any of the patterns to silence
        const shouldSilence = silencePatterns.some(pattern =>
            errorString.toLowerCase().includes(pattern.toLowerCase())
        );

        // If it's a pattern we want to silence, don't log it
        if (shouldSilence) {
            return;
        }

        // Otherwise, pass through to the original console.error
        originalConsoleError(...args);
    };

    // Add a global unhandled rejection handler to catch promise errors
    if (typeof window !== 'undefined') {
        window.addEventListener('unhandledrejection', (event) => {
            // Check if it's an auth error and prevent it from being logged
            if (event.reason instanceof AuthError ||
                (event.reason && event.reason.message &&
                    (event.reason.message.includes('credentials') ||
                        event.reason.message.includes('auth') ||
                        event.reason.message.includes('login')))) {
                event.preventDefault();
                // Prevent the error from being logged to console
                event.stopPropagation();
            }
        });
    }
};

// Set up error handlers
setupErrorHandlers();

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<any>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (apiService.isAuthenticated()) {
                    const currentUser = apiService.getCurrentUser();
                    if (currentUser) {
                        // No logging in production
                        if (!isProduction) {
                            console.log("User already authenticated:", currentUser);
                        }
                        setUser(currentUser);
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                // No logging in production
                if (!isProduction) {
                    console.error('Authentication check failed:', err);
                }
                // If authentication check fails, clear any stale data
                try {
                    apiService.logout();
                } catch (logoutErr) {
                    // Silent error in production
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (data: LoginRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            // Remove all console logs, even in development mode
            const response = await apiService.login(data);

            // Make sure we have valid user data and token before proceeding
            if (response && response.user && response.accessToken) {
                // Set user data in state
                setUser(response.user);
                setIsAuthenticated(true);

                // Check if there's a returnUrl in the search params
                const returnUrl = searchParams.get('returnUrl');

                // Add a small delay to ensure state updates before redirect
                setTimeout(() => {
                    try {
                        // Remove all console logs, even in development mode
                        let redirectPath;

                        if (returnUrl && returnUrl.startsWith('/')) {
                            // Ensure returnUrl is internal and starts with /
                            redirectPath = returnUrl;
                            // Remove all console logs, even in development mode
                        } else {
                            // Redirect based on user role
                            switch (response.user.role) {
                                case 'admin':
                                    redirectPath = '/dashboard/admin';
                                    break;
                                case 'practitioner':
                                    redirectPath = '/dashboard/practitioner';
                                    break;
                                case 'patient':
                                    redirectPath = '/dashboard/patient';
                                    break;
                                default:
                                    redirectPath = '/dashboard';
                            }
                            // Remove all console logs, even in development mode
                        }

                        try {
                            // Force a hard navigation to ensure the page is fully reloaded
                            window.location.href = redirectPath;
                        } catch (navError) {
                            // Silent error in production
                            // Fallback to dashboard if navigation fails
                            window.location.href = '/dashboard';
                        }
                    } catch (redirectError) {
                        // Silent error in production
                        // Fallback to dashboard if anything fails
                        window.location.href = '/dashboard';
                    }
                }, 1500); // Increased delay to ensure state updates
            } else {
                // Remove all console logs, even in development mode
                throw new AuthError('Invalid user data or token received', 'other');
            }
        } catch (err: any) {
            // Silence errors in console - handled by our global error handler

            // Enhanced error handling with more specific messages
            try {
                if (!err) {
                    setError('An unknown error occurred. Please try again.');
                } else if (typeof err === 'string') {
                    setError(err);
                } else if (err instanceof AuthError) {
                    // Handle AuthError with specific error types
                    switch (err.errorType) {
                        case 'invalid_credentials':
                            setError('Invalid email or password. Please try again.');
                            break;
                        case 'account_not_found':
                            setError('Account not found. Please check your email or sign up for a new account.');
                            break;
                        case 'network':
                            setError('Network error. Please check your internet connection and try again.');
                            break;
                        case 'server':
                            setError('Server error. Our team has been notified. Please try again later.');
                            break;
                        default:
                            setError(err.message || 'Login failed. Please try again later.');
                    }
                } else if (err.message === 'Invalid credentials') {
                    setError('Invalid email or password. Please try again.');
                } else if (err.message?.includes('not found') || err.message?.includes('Account not found')) {
                    setError('Account not found. Please check your email or sign up for a new account.');
                } else if (err.message?.includes('inactive') || err.message?.includes('disabled')) {
                    setError('Your account is inactive. Please contact support for assistance.');
                } else if (err.message?.includes('locked')) {
                    setError('Your account has been locked due to multiple failed login attempts. Please reset your password or contact support.');
                } else if (err.message?.includes('token') || err.message?.includes('Token')) {
                    setError('Authentication token error. Please try logging in again.');
                } else if (err.message?.includes('network') || err.message?.includes('Network')) {
                    setError('Network error. Please check your internet connection and try again.');
                } else if (err.message?.includes('server') || err.message?.includes('Server')) {
                    setError('Server error. Our team has been notified. Please try again later.');
                } else {
                    setError(err.message || 'Login failed. Please try again later.');
                }
            } catch (errorHandlingError) {
                // Fallback error handling if something goes wrong with our error processing
                setError('An error occurred during login. Please try again.');
            }

            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            // No logging in production
            if (!isProduction) {
                console.log("Registration attempt with email:", data.email);
            }

            // First, verify the access code
            try {
                await apiService.verifyAccessCode(data.accessCode || '');
                // No logging in production
                if (!isProduction) {
                    console.log("Access code verified successfully");
                }
            } catch (codeError: any) {
                // No logging in production
                if (!isProduction) {
                    console.error("Access code verification failed:", codeError);
                }
                throw new Error(codeError.message || 'Invalid access code');
            }

            // If access code is valid, proceed with registration
            const response = await apiService.register(data);

            // No logging in production
            if (!isProduction) {
                console.log("Registration successful");
            }

            // Return the response data and let the component handle redirection
            return response;
        } catch (err: any) {
            // No logging in production
            if (!isProduction) {
                console.error('Registration error:', err);
            }

            try {
                if (err.message?.includes('Access code')) {
                    setError('Invalid access code. Please check and try again.');
                } else if (err.message?.includes('already exists')) {
                    setError('Email already registered. Please login or use a different email.');
                } else if (err.message?.includes('password') || err.message?.includes('Password')) {
                    setError(err.message || 'Password does not meet requirements.');
                } else if (err.message?.includes('expired')) {
                    setError('Access code has expired. Please contact your administrator for a new code.');
                } else {
                    setError(err.message || 'Registration failed. Please try again.');
                }
            } catch (errorHandlingError) {
                // Fallback error handling
                setError('Registration failed. Please try again.');
            }

            // Re-throw the error so the component can handle it
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        try {
            apiService.logout();
            setUser(null);
            setIsAuthenticated(false);
            // Force a hard navigation to ensure the page is fully reloaded
            window.location.href = '/login';
        } catch (err) {
            // No logging in production
            if (!isProduction) {
                console.error('Logout error:', err);
            }
            // Still redirect to login even if logout fails
            window.location.href = '/login';
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                isAuthenticated,
                login,
                register,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 