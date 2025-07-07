import { useState, useEffect, useCallback } from 'react';
import dashboardService, {
    DashboardDto,
    UserProfileDto,
    BiomarkerDto,
    AppointmentDto,
    CalendarEventDto,
    QuickActionDto
} from '../services/dashboard.service';

interface DashboardState {
    loading: boolean;
    error: string | null;
    profile: UserProfileDto | null;
    biomarkers: BiomarkerDto[];
    appointments: AppointmentDto[];
    calendar: CalendarEventDto[];
    quickActions: QuickActionDto[];
    componentErrors: {
        biomarkers?: string;
        appointments?: string;
        calendar?: string;
        quickActions?: string;
    };
}

const initialState: DashboardState = {
    loading: true,
    error: null,
    profile: null,
    biomarkers: [],
    appointments: [],
    calendar: [],
    quickActions: [],
    componentErrors: {}
};

export default function useDashboard() {
    const [state, setState] = useState<DashboardState>(initialState);

    const fetchDashboard = useCallback(async (forceRefresh = false) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const dashboardData = await dashboardService.getDashboard(forceRefresh);

            // Process component errors if any
            const componentErrors: DashboardState['componentErrors'] = {};
            if (dashboardData.errors && dashboardData.errors.length > 0) {
                dashboardData.errors.forEach(error => {
                    if (error.includes('biomarkers')) {
                        componentErrors.biomarkers = error;
                    } else if (error.includes('appointments')) {
                        componentErrors.appointments = error;
                    } else if (error.includes('calendar')) {
                        componentErrors.calendar = error;
                    } else if (error.includes('quickActions')) {
                        componentErrors.quickActions = error;
                    }
                });
            }

            setState({
                loading: false,
                error: null,
                profile: dashboardData.profile,
                biomarkers: dashboardData.biomarkers || [],
                appointments: dashboardData.appointments || [],
                calendar: dashboardData.calendar || [],
                quickActions: dashboardData.quickActions || [],
                componentErrors
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            }));
        }
    }, []);

    useEffect(() => {
        // Only fetch if authenticated
        if (dashboardService.isAuthenticated()) {
            fetchDashboard();
        }
    }, [fetchDashboard]);

    const refreshDashboard = useCallback(() => {
        return fetchDashboard(true);
    }, [fetchDashboard]);

    const updateAvatar = useCallback(async (file: File) => {
        try {
            const avatarUrl = await dashboardService.updateAvatar(file);

            // Update profile with new avatar URL
            setState(prev => ({
                ...prev,
                profile: prev.profile ? { ...prev.profile, profileImageUrl: avatarUrl } : null
            }));

            return avatarUrl;
        } catch (error) {
            throw error;
        }
    }, []);

    return {
        ...state,
        refreshDashboard,
        updateAvatar,
        isLoading: state.loading
    };
} 