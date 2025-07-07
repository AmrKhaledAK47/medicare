'use client';

import React from 'react';
import { Box, Typography, Paper, Avatar, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import { Appointment } from '@/hooks/usePractitionerDashboard';

interface AppointmentCardProps {
    appointment: Appointment;
    onViewDetails?: (appointment: Appointment) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ status, theme }) => {
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'booked':
                return { bg: '#E3F2FD', text: '#1976D2' };
            case 'confirmed':
                return { bg: '#E8F5E9', text: '#388E3C' };
            case 'cancelled':
                return { bg: '#FFEBEE', text: '#D32F2F' };
            case 'completed':
                return { bg: '#E0F2F1', text: '#00796B' };
            case 'no-show':
                return { bg: '#FFF3E0', text: '#E64A19' };
            default:
                return { bg: '#F5F5F5', text: '#757575' };
        }
    };

    const { bg, text } = getStatusColor();

    return {
        backgroundColor: bg,
        color: text,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
    };
});

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onViewDetails }) => {
    const { mode } = useThemeContext();

    // Format date and time for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (startString: string, endString?: string) => {
        const start = new Date(startString);
        const startTime = start.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        if (!endString) return startTime;

        const end = new Date(endString);
        const endTime = end.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return `${startTime} - ${endTime}`;
    };

    return (
        <StyledPaper
            elevation={0}
            sx={{
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src={appointment.patient.profileImageUrl || '/avatars/default-patient.png'}
                        alt={appointment.patient.name}
                        sx={{ width: 40, height: 40, mr: 1.5 }}
                    />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: mode === 'light' ? '#333' : '#FFF',
                                lineHeight: 1.2,
                            }}
                        >
                            {appointment.patient.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: mode === 'light' ? '#666' : '#CCC',
                                fontSize: '0.75rem',
                            }}
                        >
                            {appointment.appointmentType.charAt(0).toUpperCase() + appointment.appointmentType.slice(1)}
                        </Typography>
                    </Box>
                </Box>
                <StatusChip
                    label={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    size="small"
                    status={appointment.status}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{
                        position: 'relative',
                        width: 16,
                        height: 16,
                        mr: 1,
                        opacity: 0.7,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 6V12L16 14" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: mode === 'light' ? '#666' : '#CCC',
                            fontSize: '0.85rem',
                        }}
                    >
                        {formatTime(appointment.start, appointment.end)}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        position: 'relative',
                        width: 16,
                        height: 16,
                        mr: 1,
                        opacity: 0.7,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 2V6" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H21" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: mode === 'light' ? '#666' : '#CCC',
                            fontSize: '0.85rem',
                        }}
                    >
                        {formatDate(appointment.start)}
                    </Typography>
                </Box>
            </Box>

            {appointment.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{
                        position: 'relative',
                        width: 16,
                        height: 16,
                        mr: 1,
                        opacity: 0.7,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: mode === 'light' ? '#666' : '#CCC',
                            fontSize: '0.85rem',
                        }}
                    >
                        {appointment.location.name}
                    </Typography>
                </Box>
            )}

            {appointment.description && (
                <Typography
                    variant="body2"
                    sx={{
                        color: mode === 'light' ? '#555' : '#DDD',
                        fontSize: '0.85rem',
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {appointment.description}
                </Typography>
            )}

            <Box sx={{ mt: 'auto' }}>
                <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={() => onViewDetails && onViewDetails(appointment)}
                    sx={{
                        borderRadius: 8,
                        textTransform: 'none',
                        borderColor: '#21647D',
                        color: '#21647D',
                        '&:hover': {
                            borderColor: '#21647D',
                            backgroundColor: 'rgba(33, 100, 125, 0.08)',
                        },
                    }}
                >
                    View Details
                </Button>
            </Box>
        </StyledPaper>
    );
};

export default AppointmentCard; 