import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Types based on API documentation
export interface UserProfileDto {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone?: string;
    profileImageUrl?: string;
    isEmailVerified: boolean;
    fhirDetails?: {
        resourceType: string;
        resourceId: string;
        details: {
            name?: string;
            gender?: string;
            birthDate?: string;
            address?: string;
            telecom?: {
                system: string;
                value: string;
                use?: string;
            }[];
        };
    };
    diseases?: {
        speech: string[];
        physical: string[];
    };
}

export interface BiomarkerDto {
    type: string;
    name: string;
    value: string;
    unit: string;
    referenceRange?: string;
    status: 'normal' | 'high' | 'low' | 'critical' | 'unknown';
    date: string;
    trend?: {
        direction: 'up' | 'down' | 'stable';
        percentage?: number;
    };
    performer?: string;
}

export interface AppointmentDto {
    id: string;
    start: string;
    end: string;
    description: string;
    status: string;
    practitioner: {
        id: string;
        name: string;
        speciality?: string;
        imageUrl?: string;
    };
    location?: {
        id: string;
        name: string;
        address?: string;
    };
    appointmentType: string;
}

export interface CalendarEventItemDto {
    id: string;
    title: string;
    time: string;
    type: string;
}

export interface CalendarEventDto {
    date: string;
    events: CalendarEventItemDto[];
}

export interface QuickActionDto {
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
    icon: string;
}

export interface DashboardDto {
    profile: UserProfileDto;
    biomarkers?: BiomarkerDto[];
    appointments?: AppointmentDto[];
    calendar?: CalendarEventDto[];
    quickActions?: QuickActionDto[];
    errors?: string[];
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}

class DashboardService {
    private api: AxiosInstance;
    private dashboardCache: {
        data: DashboardDto | null;
        timestamp: number;
        ttl: number;
    };

    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Initialize cache
        this.dashboardCache = {
            data: null,
            timestamp: 0,
            ttl: 60000, // 60 seconds TTL as per documentation
        };

        // Request interceptor to add auth token
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle authentication errors
                if (error.response && error.response.status === 401) {
                    // Clear auth data
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');

                    // Redirect to login page if not already there
                    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(this.handleApiError(error));
            }
        );
    }

    /**
     * Handle API errors and extract meaningful error messages
     */
    private handleApiError(error: any): Error {
        if (error.response) {
            // Check for FHIR OperationOutcome error format
            if (error.response.data?.resourceType === 'OperationOutcome' &&
                error.response.data.issue &&
                Array.isArray(error.response.data.issue)) {
                const issue = error.response.data.issue[0];
                return new Error(issue.diagnostics || 'An error occurred');
            }

            // Standard error response
            const errorMessage = error.response.data?.message || 'An error occurred';
            return new Error(errorMessage);
        }

        // Network errors
        if (error.request) {
            return new Error('Network error. Please check your connection and try again.');
        }

        // Other errors
        return error;
    }

    /**
     * Get dashboard data with caching
     */
    async getDashboard(forceRefresh = false): Promise<DashboardDto> {
        // Check cache validity
        const now = Date.now();
        const cacheValid = this.dashboardCache.data &&
            (now - this.dashboardCache.timestamp < this.dashboardCache.ttl);

        // Return cached data if valid and no force refresh
        if (cacheValid && !forceRefresh) {
            return this.dashboardCache.data;
        }

        try {
            const response = await this.api.get<ApiResponse<DashboardDto>>('/dashboard');

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch dashboard data');
            }

            // Update cache
            this.dashboardCache = {
                data: response.data.data!,
                timestamp: now,
                ttl: this.dashboardCache.ttl
            };

            return response.data.data!;
        } catch (error) {
            // Rethrow the error after handling
            throw error;
        }
    }

    /**
     * Get user profile data
     */
    async getUserProfile(): Promise<UserProfileDto> {
        try {
            const response = await this.api.get<ApiResponse<UserProfileDto>>('/auth/me');

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch user profile');
            }

            return response.data.data!;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Update user avatar
     */
    async updateAvatar(file: File): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = user.id;

            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await this.api.patch<ApiResponse<{ avatarUrl: string }>>(
                `/users/${userId}/avatar`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update avatar');
            }

            // Invalidate dashboard cache
            this.dashboardCache.data = null;

            return response.data.data!.avatarUrl;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Helper method to check if a user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken');
    }
}

// Export singleton instance
const dashboardService = new DashboardService();
export default dashboardService; 