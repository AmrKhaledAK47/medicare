'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Grid, Paper, Chip, Avatar, Divider, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import Image from 'next/image';
import Calendar from '../../../../components/common/Calendar';
import ScheduleVisitModal from '../../../../components/patient/ScheduleVisitModal';
import AppointmentFilters from '../../../../components/patient/AppointmentFilters';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Define the days of the week
const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNSDAY', 'THURSDAY', 'FRIDAY', 'SATRDAY', 'SUNDAY'];

// Inline Icon components
const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ListIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AddIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Styled components
const ScheduleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#267997',
    color: '#ffffff',
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#21647D',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    [theme.breakpoints.down('sm')]: {
        padding: '4px 8px',
        fontSize: '0.65rem',
        gap: '4px',
        borderRadius: '4px',
    },
}));

const ViewToggleButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? '#F0F8FB' : 'transparent',
    color: active ? '#267997' : theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '4px',
    textTransform: 'none',
    minWidth: 'auto',
    '&:hover': {
        backgroundColor: active ? '#F0F8FB' : theme.palette.mode === 'light' ? 'rgba(240, 248, 251, 0.5)' : 'rgba(33, 100, 125, 0.1)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '2px 6px',
        fontSize: '0.65rem',
        minWidth: 'auto',
    },
}));

// Simple AppointmentCard component
const AppointmentCard = ({ appointment }: { appointment: any }) => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            elevation={0}
            sx={{
                p: isMobile ? 0.8 : 2,
                borderRadius: '6px',
                backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: isMobile ? 1 : 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                    <Avatar
                        src={appointment.avatar}
                        alt={appointment.doctorName}
                        sx={{ 
                            width: isMobile ? 28 : 48, 
                            height: isMobile ? 28 : 48,
                            border: '1px solid #EEF1F4'
                        }}
                    />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontSize: isMobile ? '0.7rem' : '0.95rem',
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            {appointment.doctorName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                fontSize: isMobile ? '0.6rem' : '0.8rem',
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            {appointment.doctorSpecialty}
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    sx={{
                        backgroundColor: appointment.status === 'upcoming'
                            ? 'rgba(33, 100, 125, 0.1)'
                            : appointment.status === 'completed'
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(244, 67, 54, 0.1)',
                        color: appointment.status === 'upcoming'
                            ? '#267997'
                            : appointment.status === 'completed'
                                ? '#4CAF50'
                                : '#F44336',
                        fontSize: isMobile ? '0.6rem' : '0.75rem',
                        height: isMobile ? '18px' : '24px',
                        '& .MuiChip-label': {
                            padding: isMobile ? '0 4px' : '0 8px',
                        },
                    }}
                    size="small"
                />
            </Box>

            <Box sx={{ mb: isMobile ? 0.5 : 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        mb: isMobile ? 0.2 : 0.5,
                        fontSize: isMobile ? '0.6rem' : '0.75rem',
                        fontFamily: '"Poppins", sans-serif',
                    }}
                >
                    Date & Time
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 500,
                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                        fontSize: isMobile ? '0.65rem' : '0.85rem',
                        fontFamily: '"Poppins", sans-serif',
                    }}
                >
                    {appointment.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        fontSize: isMobile ? '0.6rem' : '0.75rem',
                        fontFamily: '"Poppins", sans-serif',
                    }}
                >
                    {appointment.time}
                </Typography>
            </Box>
        </Paper>
    );
};

// Add new interfaces for enhanced appointment data
interface AppointmentDetails {
    id: string;
    date: Date;
    time: string;
    doctorName: string;
    doctorSpecialty: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    avatar: string;
    reason: string;
    notes?: string;
    type: 'appointment' | 'visit' | 'checkup';
    duration: number; // in minutes
    location?: string;
    priority: 'low' | 'medium' | 'high';
}

// Define doctors data
interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

const DOCTORS: Doctor[] = [
    { id: 1, name: 'Dr. Michael Williams', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Linda Carter', specialty: 'Neurologist' },
    { id: 3, name: 'Dr. John Smith', specialty: 'General Physician' },
    { id: 4, name: 'Dr. Sarah Reynolds', specialty: 'Dermatologist' },
    { id: 5, name: 'Dr. James Wilson', specialty: 'Orthopedic' },
];

// Enhanced sample appointments with more details
const SAMPLE_APPOINTMENTS: AppointmentDetails[] = [
    {
        id: '1',
        date: new Date(2023, 5, 20),
        time: '09:30 AM',
        doctorName: 'Dr. Michael Williams',
        doctorSpecialty: 'Cardiologist',
        status: 'upcoming',
        avatar: '/avatars/doctor1.png',
        reason: 'Regular checkup',
        notes: 'Please bring previous test results',
        type: 'appointment',
        duration: 30,
        location: 'Cardiology Department, Room 101',
        priority: 'medium'
    },
    {
        id: '2',
        date: new Date(2023, 5, 22),
        time: '11:00 AM',
        doctorName: 'Dr. Linda Carter',
        doctorSpecialty: 'Neurologist',
        status: 'upcoming',
        avatar: '/avatars/doctor2.png',
        reason: 'Follow-up consultation',
        notes: 'Discuss MRI results',
        type: 'visit',
        duration: 45,
        location: 'Neurology Department, Room 205',
        priority: 'high'
    },
    {
        id: '3',
        date: new Date(2023, 5, 18),
        time: '02:15 PM',
        doctorName: 'Dr. John Smith',
        doctorSpecialty: 'General Physician',
        status: 'completed',
        avatar: '/avatars/doctor3.png',
        reason: 'Annual physical examination',
        notes: 'All tests completed successfully',
        type: 'checkup',
        duration: 60,
        location: 'General Medicine, Room 303',
        priority: 'low'
    },
    {
        id: '4',
        date: new Date(2023, 5, 15),
        time: '10:45 AM',
        doctorName: 'Dr. Sarah Reynolds',
        doctorSpecialty: 'Dermatologist',
        status: 'cancelled',
        avatar: '/avatars/doctor4.png',
        reason: 'Skin condition evaluation',
        notes: 'Rescheduled due to emergency',
        type: 'visit',
        duration: 30,
        location: 'Dermatology Department, Room 404',
        priority: 'medium'
    },
    {
        id: '5',
        date: new Date(2023, 6, 3),
        time: '03:30 PM',
        doctorName: 'Dr. James Wilson',
        doctorSpecialty: 'Orthopedic',
        status: 'upcoming',
        avatar: '/avatars/doctor5.png',
        reason: 'Knee pain consultation',
        notes: 'Bring X-ray results',
        type: 'appointment',
        duration: 45,
        location: 'Orthopedics Department, Room 505',
        priority: 'high'
    },
];

// Status chip styled component
const StatusChip = styled(Chip)<{ status: 'upcoming' | 'completed' | 'cancelled' }>(({ theme, status }) => {
    let color = '#267997'; // Default blue for upcoming
    let backgroundColor = 'rgba(33, 100, 125, 0.1)';

    if (status === 'completed') {
        color = '#4CAF50'; // Green
        backgroundColor = 'rgba(76, 175, 80, 0.1)';
    } else if (status === 'cancelled') {
        color = '#F44336'; // Red
        backgroundColor = 'rgba(244, 67, 54, 0.1)';
    }

    return {
        backgroundColor,
        color,
        borderRadius: '16px',
        fontSize: '0.75rem',
        height: '24px',
        fontWeight: 500,
        '& .MuiChip-label': {
            padding: '0 8px',
        },
    };
});

// Add new styled components for enhanced visualization
const AppointmentIndicator = styled(Box)<{ status: string; priority: string }>(
    ({ status, priority }) => ({
        position: 'absolute',
        bottom: '2px',
        display: 'flex',
        gap: '3px',
        justifyContent: 'center',
        '& .dot': {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: status === 'upcoming'
                ? priority === 'high' ? '#E16A8A' : priority === 'medium' ? '#267997' : '#4CAF50'
                : status === 'completed' ? '#4CAF50' : '#F44336',
        }
    })
);

const AppointmentTooltip = styled(Box)(({ theme }) => ({
    position: 'absolute',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '200px',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
}));

const SchedulePage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [appointments, setAppointments] = useState<AppointmentDetails[]>(SAMPLE_APPOINTMENTS);
    const [filters, setFilters] = useState({
        status: '',
        doctor: '',
        dateRange: '',
        search: '',
    });
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Filter appointments based on current filters
    const filteredAppointments = appointments.filter(appointment => {
        const matchesStatus = !filters.status || appointment.status === filters.status;
        const matchesDoctor = !filters.doctor || appointment.doctorName.includes(filters.doctor);
        const matchesSearch = !filters.search ||
            appointment.doctorName.toLowerCase().includes(filters.search.toLowerCase()) ||
            appointment.doctorSpecialty.toLowerCase().includes(filters.search.toLowerCase()) ||
            appointment.reason.toLowerCase().includes(filters.search.toLowerCase());

        // Date range filtering
        let matchesDateRange = true;
        if (filters.dateRange) {
            const today = new Date();
            const appointmentDate = new Date(appointment.date);
            const diffTime = Math.abs(appointmentDate.getTime() - today.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            switch (filters.dateRange) {
                case 'today':
                    matchesDateRange = diffDays === 0;
                    break;
                case 'week':
                    matchesDateRange = diffDays <= 7;
                    break;
                case 'month':
                    matchesDateRange = diffDays <= 30;
                    break;
                case 'year':
                    matchesDateRange = diffDays <= 365;
                    break;
            }
        }

        return matchesStatus && matchesDoctor && matchesSearch && matchesDateRange;
    });

    // Sort appointments by date
    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        const today = new Date();

        // If both appointments have the same status, sort them
        if (a.status === b.status) {
            if (a.status === 'upcoming') {
                // For upcoming, sort by closest to today (ascending)
                const diffA = Math.abs(a.date.getTime() - today.getTime());
                const diffB = Math.abs(b.date.getTime() - today.getTime());
                return diffA - diffB;
            } else {
                // For completed and cancelled, sort by most recent (descending)
                return b.date.getTime() - a.date.getTime();
            }
        }

        // If different status, maintain default ordering (upcoming first, then completed, then cancelled)
        const statusOrder = { 'upcoming': 0, 'completed': 1, 'cancelled': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
    });

    // Get upcoming appointments for sidebar - no need to filter by status again since we're already sorting
    const upcomingAppointments = sortedAppointments
        .filter(appointment => appointment.status === 'upcoming')
        .slice(0, 3);

    const handleScheduleVisit = (appointmentData: any) => {
        const newAppointment: AppointmentDetails = {
            id: String(appointments.length + 1),
            date: appointmentData.date,
            time: appointmentData.time,
            doctorName: DOCTORS.find((d: Doctor) => d.id === appointmentData.doctor)?.name || '',
            doctorSpecialty: DOCTORS.find((d: Doctor) => d.id === appointmentData.doctor)?.specialty || '',
            status: 'upcoming',
            avatar: `/avatars/doctor${appointmentData.doctor}.png`,
            reason: appointmentData.reason,
            notes: appointmentData.notes,
            type: appointmentData.type,
            duration: appointmentData.duration,
            location: appointmentData.location,
            priority: appointmentData.priority,
        };

        setAppointments(prev => [...prev, newAppointment]);
        setSnackbar({
            open: true,
            message: 'Appointment scheduled successfully!',
            severity: 'success',
        });
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    const formatStatus = (status: string): string => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // Add function to get appointments for a specific date
    const getAppointmentsForDate = (date: Date): AppointmentDetails[] => {
        return appointments.filter(apt =>
            apt.date.getDate() === date.getDate() &&
            apt.date.getMonth() === date.getMonth() &&
            apt.date.getFullYear() === date.getFullYear()
        );
    };

    // Add function to handle mouse enter on calendar day
    const handleDayMouseEnter = (date: Date | null, event: React.MouseEvent) => {
        if (date) {
            setHoveredDate(date);
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY + 5
            });
        }
    };

    // Add function to handle mouse leave
    const handleDayMouseLeave = () => {
        setHoveredDate(null);
    };

    return (
        <Box sx={{
            display: 'flex',
            overflow: 'hidden',
            height: 'calc(100vh - 64px)',
            backgroundColor: mode === 'light' ? '#F5F9FA' : '#1A1A1A'
        }}>
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    p: isMobile ? 0.3 : 3,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#A3A0A091' : '#333',
                        borderRadius: '4px',
                    },
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        maxWidth: '1300px',
                        mx: 'auto',
                        p: isMobile ? 0.5 : 3,
                        mb: isMobile ? 0.5 : 3,
                        borderRadius: '6px',
                        backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                        border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        mb: isMobile ? 0.5 : 3,
                        gap: isMobile ? 0.5 : 0
                    }}>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontFamily: '"Poppins", sans-serif',
                                fontSize: isMobile ? '0.8rem' : '1.5rem',
                            }}
                        >
                            Schedule
                        </Typography>

                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: isMobile ? 0.3 : 2,
                            width: isMobile ? '100%' : 'auto',
                            justifyContent: isMobile ? 'space-between' : 'flex-end',
                            mt: isMobile ? 0.5 : 0
                        }}>
                            <Box sx={{
                                display: 'flex',
                                backgroundColor: mode === 'light' ? '#F5F5F5' : '#333',
                                borderRadius: '4px',
                                padding: '1px',
                            }}>
                                <ViewToggleButton
                                    onClick={() => setViewMode('grid')}
                                    active={viewMode === 'grid'}
                                >
                                    <GridIcon />
                                </ViewToggleButton>
                                <ViewToggleButton
                                    onClick={() => setViewMode('list')}
                                    active={viewMode === 'list'}
                                >
                                    <ListIcon />
                                </ViewToggleButton>
                            </Box>

                            <ScheduleButton 
                                onClick={() => setIsScheduleModalOpen(true)}
                            >
                                <span>Schedule a Visit</span>
                                <AddIcon />
                            </ScheduleButton>
                        </Box>
                    </Box>

                    {/* Filters */}
                    <AppointmentFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

                    {viewMode === 'grid' ? (
                        <Grid container spacing={isMobile ? 1 : 3}>
                            {/* Calendar View */}
                            <Grid item xs={12} md={8}>
                                <Calendar
                                    currentDate={currentDate}
                                    selectedDate={selectedDate}
                                    onDateSelect={setSelectedDate}
                                    appointments={appointments.map(apt => ({
                                        date: apt.date,
                                        status: apt.status,
                                    }))}
                                    mobileView={isMobile ? true : undefined}
                                />
                            </Grid>

                            {/* Upcoming Appointments Sidebar */}
                            <Grid item xs={12} md={4}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: isMobile ? 0.8 : 2,
                                        borderRadius: '6px',
                                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                                        border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #444',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: isMobile ? 0.8 : 2,
                                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                                            fontFamily: '"Poppins", sans-serif',
                                            fontSize: isMobile ? '0.75rem' : '1.25rem',
                                        }}
                                    >
                                        Upcoming Appointments
                                    </Typography>

                                    {upcomingAppointments.length > 0 ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.8 : 2 }}>
                                            {upcomingAppointments.map(appointment => (
                                                <AppointmentCard key={appointment.id} appointment={appointment} />
                                            ))}
                                        </Box>
                                    ) : (
                                        <Typography
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                textAlign: 'center',
                                                py: isMobile ? 1.5 : 4,
                                                fontSize: isMobile ? '0.65rem' : '1rem',
                                                fontFamily: '"Poppins", sans-serif',
                                            }}
                                        >
                                            No upcoming appointments
                                        </Typography>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : (
                        /* List View */
                        <Box sx={{ mt: isMobile ? 1 : 3 }}>
                            {sortedAppointments.length > 0 ? (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                                    p: isMobile ? 1 : 2
                                }}>
                                    {sortedAppointments.map((appointment, index) => (
                                        <React.Fragment key={appointment.id}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: isMobile ? 'column' : 'row',
                                                justifyContent: 'space-between',
                                                alignItems: isMobile ? 'flex-start' : 'center',
                                                p: isMobile ? 1 : 2,
                                                borderRadius: '6px',
                                                backgroundColor: mode === 'light' ? 'rgba(245, 249, 250, 0.5)' : 'rgba(26, 26, 26, 0.3)',
                                                border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #444',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: mode === 'light'
                                                        ? '0 4px 8px rgba(0, 0, 0, 0.05)'
                                                        : '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                }
                                            }}>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: 1,
                                                    width: isMobile ? '100%' : 'auto',
                                                    mb: isMobile ? 0.5 : 0
                                                }}>
                                                    <Avatar
                                                        src={appointment.avatar}
                                                        alt={appointment.doctorName}
                                                        sx={{
                                                            width: isMobile ? 32 : 50,
                                                            height: isMobile ? 32 : 50,
                                                            border: '2px solid #EEF1F4'
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize: isMobile ? '0.75rem' : '0.95rem',
                                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                                fontFamily: '"Poppins", sans-serif',
                                                            }}
                                                        >
                                                            {appointment.doctorName}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: isMobile ? '0.65rem' : '0.8rem',
                                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                                fontFamily: '"Poppins", sans-serif',
                                                            }}
                                                        >
                                                            {appointment.doctorSpecialty}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    flexDirection: isMobile ? 'row' : 'column',
                                                    alignItems: isMobile ? 'center' : 'flex-end',
                                                    gap: isMobile ? 0.5 : 1,
                                                    width: isMobile ? '100%' : 'auto',
                                                    justifyContent: isMobile ? 'space-between' : 'flex-end'
                                                }}>
                                                    <StatusChip
                                                        label={formatStatus(appointment.status)}
                                                        status={appointment.status}
                                                        size="small"
                                                        sx={{
                                                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                                                            height: isMobile ? '18px' : '24px'
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                            fontSize: isMobile ? '0.65rem' : '0.8rem',
                                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                            fontFamily: '"Poppins", sans-serif',
                                                        }}
                                                    >
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        {appointment.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} | {appointment.time}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            {index < sortedAppointments.length - 1 && (
                                                <Box sx={{ px: isMobile ? 1 : 2 }}>
                                                    <Divider />
                                                </Box>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{
                                    textAlign: 'center',
                                    py: isMobile ? 2 : 6,
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                                }}>
                                    <Typography
                                        sx={{
                                            fontSize: isMobile ? '0.75rem' : '1rem',
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            fontFamily: '"Poppins", sans-serif',
                                        }}
                                    >
                                        No appointments found matching your filters
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => setIsScheduleModalOpen(true)}
                                        sx={{
                                            mt: 1,
                                            backgroundColor: '#267997',
                                            color: '#ffffff',
                                            fontFamily: '"Poppins", sans-serif',
                                            textTransform: 'none',
                                            fontSize: isMobile ? '0.75rem' : '1rem',
                                            padding: isMobile ? '4px 12px' : '8px 22px',
                                            '&:hover': {
                                                backgroundColor: '#21647D',
                                            },
                                        }}
                                    >
                                        Schedule an Appointment
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    )}
                </Paper>
            </Box>

            {/* Schedule Visit Modal */}
            <ScheduleVisitModal
                open={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                selectedDate={selectedDate || undefined}
                onSchedule={handleScheduleVisit}
            />

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{
                        width: '100%',
                        fontFamily: '"Poppins", sans-serif',
                        '& .MuiAlert-icon': {
                            color: snackbar.severity === 'success' ? '#4CAF50' : '#F44336',
                        },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SchedulePage; 