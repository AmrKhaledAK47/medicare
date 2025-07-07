'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Chip, Skeleton, Tooltip, Badge, Card, CardHeader, IconButton, Divider } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import Link from 'next/link';

export interface Appointment {
    id: string;
    doctor?: {
        name: string;
        specialty: string;
        avatar: string;
    };
    date?: string;
    time?: string;
    type?: string;
    // Fields from AppointmentDto
    start?: string;
    end?: string;
    description?: string;
    status?: string;
    practitioner?: {
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
    appointmentType?: string;
}

interface UpcomingAppointmentsProps {
    appointments?: Appointment[];
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments }) => {
    const [hasAppointments, setHasAppointments] = useState(false);
    const { mode } = useThemeContext();
    const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
    const [avatarError, setAvatarError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Sample appointment data as fallback
    const sampleAppointment: Appointment = {
        id: '1',
        doctor: {
            name: 'Dr. Leslie Alexander',
            specialty: 'General Practitioner',
            avatar: '/avatars/doctor.png',
        },
        date: 'Wed, 20 June 2024',
        time: '08:00 - 12:00',
        type: 'Consultation',
    };

    useEffect(() => {
        // Simulate loading
        setIsLoading(true);

        const timer = setTimeout(() => {
            if (appointments && appointments.length > 0) {
                setHasAppointments(true);
                // Use the first appointment as the current one
                setCurrentAppointment(appointments[0]);
            } else {
                setHasAppointments(false);
                setCurrentAppointment(null);
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [appointments]);

    const handleAvatarError = () => {
        setAvatarError(true);
    };

    // Generate initials for avatar fallback
    const getInitials = (name: string) => {
        if (!name) return 'DR';
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Enhanced avatar generation with better fallbacks
    const getAvatarColor = (name: string) => {
        if (!name) return '#21647D';

        // Create a consistent hash from the name
        const hash = name.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);

        // Generate colors based on practitioner specialty if available
        const specialtyColors: Record<string, string> = {
            'family medicine': '#2196F3',
            'internal medicine': '#4CAF50',
            'pediatrics': '#FF9800',
            'cardiology': '#F44336',
            'neurology': '#9C27B0',
            'orthopedics': '#795548',
            'dermatology': '#FF5722',
            'psychiatry': '#607D8B',
            'general practitioner': '#21647D',
        };

        // Try to match specialty with predefined colors
        const specialty = (currentAppointment?.doctor?.specialty ||
            currentAppointment?.practitioner?.speciality || '').toLowerCase();

        for (const [key, color] of Object.entries(specialtyColors)) {
            if (specialty.includes(key)) {
                return color;
            }
        }

        // If no specialty match, use hash-based color
        const hue = Math.abs(hash % 360);
        return `hsl(${hue}, 65%, 45%)`;
    };

    // Generate SVG avatar with initials
    const generateAvatarSvg = (name: string) => {
        const initials = getInitials(name);
        const color = getAvatarColor(name);
        const textColor = '#FFFFFF';

        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="50" fill="${color.replace('#', '%23')}" />
            <text x="50" y="50" dy="0.35em" fill="${textColor.replace('#', '%23')}" 
                font-family="Arial, sans-serif" font-size="40" font-weight="bold" 
                text-anchor="middle">${initials}</text>
        </svg>`;
    };

    // Enhanced status chip with better visual indicators
    const AppointmentStatusChip = ({ status }: { status?: string }) => {
        const { mode } = useThemeContext();

        const getStatusInfo = (status?: string) => {
            const defaultInfo = {
                color: '#4CAF50',
                label: 'Booked',
                icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            };

            if (!status) return defaultInfo;

            switch (status.toLowerCase()) {
                case 'booked':
                case 'confirmed':
                    return {
                        color: '#4CAF50',
                        label: 'Confirmed',
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    };
                case 'cancelled':
                    return {
                        color: '#F44336',
                        label: 'Cancelled',
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    };
                case 'pending':
                    return {
                        color: '#FFC107',
                        label: 'Pending',
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    };
                case 'arrived':
                    return {
                        color: '#2196F3',
                        label: 'Arrived',
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    };
                case 'completed':
                    return {
                        color: '#9E9E9E',
                        label: 'Completed',
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    };
                default:
                    return defaultInfo;
            }
        };

        const statusInfo = getStatusInfo(status);

        return (
            <Chip
                icon={
                    <Box sx={{
                        color: statusInfo.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 0.5
                    }}>
                        {statusInfo.icon}
                    </Box>
                }
                label={statusInfo.label}
                size="small"
                sx={{
                    backgroundColor: `${statusInfo.color}15`, // 15% opacity
                    color: statusInfo.color,
                    fontWeight: 500,
                    borderRadius: '16px',
                    border: `1px solid ${statusInfo.color}50`, // 50% opacity
                    height: '24px',
                    '& .MuiChip-label': {
                        px: 1,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiChip-icon': {
                        ml: 0.5,
                        mr: -0.5,
                    }
                }}
            />
        );
    };

    // Add AppointmentTypeIndicator component for better visual representation
    const AppointmentTypeIndicator = ({ type }: { type?: string }) => {
        const { mode } = useThemeContext();

        // Define appointment type information
        const getTypeInfo = (type?: string) => {
            const defaultInfo = {
                color: '#21647D',
                label: 'In-Person',
                icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            };

            if (!type) return defaultInfo;

            const lowerType = type.toLowerCase();

            if (lowerType.includes('video') || lowerType.includes('virtual') || lowerType.includes('tele')) {
                return {
                    color: '#9C27B0',
                    label: 'Video Call',
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            } else if (lowerType.includes('phone') || lowerType.includes('call')) {
                return {
                    color: '#2196F3',
                    label: 'Phone Call',
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            } else if (lowerType.includes('home') || lowerType.includes('visit')) {
                return {
                    color: '#FF9800',
                    label: 'Home Visit',
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            } else if (lowerType.includes('in-person') || lowerType.includes('office')) {
                return {
                    color: '#21647D',
                    label: 'In-Person',
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            } else if (lowerType.includes('consult') || lowerType.includes('consultation')) {
                return {
                    color: '#4CAF50',
                    label: 'Consultation',
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            }

            return defaultInfo;
        };

        const typeInfo = getTypeInfo(type);

        return (
            <Chip
                icon={
                    <Box sx={{
                        color: typeInfo.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 0.5
                    }}>
                        {typeInfo.icon}
                    </Box>
                }
                label={typeInfo.label}
                size="small"
                sx={{
                    backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                    color: typeInfo.color,
                    fontWeight: 500,
                    borderRadius: '16px',
                    border: `1px solid ${typeInfo.color}40`, // 40% opacity
                    height: '28px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    '& .MuiChip-label': {
                        px: 1,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiChip-icon': {
                        ml: 0.5,
                        mr: -0.5,
                    }
                }}
            />
        );
    };

    // Helper function to format appointment duration
    const formatDuration = (start?: string, end?: string): string => {
        if (!start || !end) return '30 min';

        try {
            const startDate = new Date(start);
            const endDate = new Date(end);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return '30 min';
            }

            const durationMs = endDate.getTime() - startDate.getTime();
            const durationMinutes = Math.round(durationMs / 60000);

            if (durationMinutes < 60) {
                return `${durationMinutes} min`;
            } else {
                const hours = Math.floor(durationMinutes / 60);
                const minutes = durationMinutes % 60;
                return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
            }
        } catch (error) {
            console.error('Error calculating appointment duration:', error);
            return '30 min';
        }
    };

    // Add loading skeleton component
    const AppointmentSkeleton = () => {
        const { mode } = useThemeContext();

    return (
            <Box sx={{ p: 2.5 }}>
                {/* Main appointment info skeleton */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: { xs: 2, md: 0 } }}>
                    {/* Doctor info skeleton - left side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', mr: 3, width: { xs: '100%', md: 'auto' } }}>
                        <Skeleton
                            variant="circular"
                            width={100}
                            height={100}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
                            }}
                        />
                        <Box sx={{ ml: 3 }}>
                            <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
                                }}
                            />
                            <Skeleton
                                variant="text"
                                width={120}
                                height={20}
                                sx={{
                                    mt: 0.5,
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.09)'
                                }}
                            />
                            <Skeleton
                                variant="rounded"
                                width={80}
                                height={20}
                                sx={{
                                    mt: 1,
                                    borderRadius: 5,
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.09)'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Appointment details skeleton - right side */}
        <Box
            sx={{
                            flex: '1 1 auto',
                            maxWidth: { xs: '100%', md: '400px' },
                            display: 'flex',
                            borderRadius: '10px',
                            backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(33, 100, 125, 0.15)',
                            pt: 3.25,
                            pb: 1,
                            position: 'relative',
                overflow: 'hidden',
                            ml: { xs: 0, md: 'auto' },
                            height: 100,
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton
                                variant="text"
                                width="60%"
                                height={24}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
                                }}
                            />
                            <Skeleton
                                variant="text"
                                width="40%"
                                height={20}
                                sx={{
                                    mt: 1,
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.09)'
                                }}
                            />
                        </Box>

            <Box
                sx={{
                                flex: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton
                                variant="text"
                                width="60%"
                                height={24}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
                                }}
                            />
                            <Skeleton
                                variant="text"
                                width="40%"
                                height={20}
                                sx={{
                                    mt: 1,
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.09)'
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Action buttons skeleton */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                    pt: 2,
                    borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    gap: 1
                }}>
                    <Skeleton
                        variant="rounded"
                        width={100}
                        height={36}
                        sx={{
                            borderRadius: 2,
                            bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
                        }}
                    />
                    <Skeleton
                        variant="rounded"
                        width={120}
                        height={36}
                        sx={{
                            borderRadius: 2,
                            bgcolor: mode === 'light' ? 'rgba(33, 100, 125, 0.2)' : 'rgba(33, 100, 125, 0.3)'
                        }}
                    />
                </Box>
            </Box>
        );
    };

    if (isLoading) {
        return (
            <Card
                elevation={0}
                sx={{
                    borderRadius: '10px',
                    backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
                    mb: 3,
                    overflow: 'visible',
                }}
            >
                <CardHeader
                    title={
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                fontFamily: 'poppins',
                                color: mode === 'light' ? '#000000' : '#FFFFFF',
                            }}
                        >
                            Upcoming Appointments
                        </Typography>
                    }
                    action={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                component={Link}
                                href="/dashboard/patient/appointments"
                                size="small"
                                endIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                    sx={{
                                    mr: 1,
                        color: '#21647D',
                                    textTransform: 'none',
                                    fontFamily: 'poppins',
                                    fontSize: '0.85rem',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                    }
                                }}
                            >
                                View All
                            </Button>
                            <IconButton>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </IconButton>
                </Box>
                    }
                />

                <Divider />

                <AppointmentSkeleton />
            </Card>
        );
    }

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: '10px',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
                mb: 3,
                overflow: 'visible',
            }}
        >
            <CardHeader
                title={
                <Typography
                    variant="h6"
                    sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                        fontFamily: 'poppins',
                            color: mode === 'light' ? '#000000' : '#FFFFFF',
                    }}
                >
                        Upcoming Appointments
                </Typography>
                }
                action={
                    <IconButton>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke={mode === 'light' ? '#000000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                }
            />

            <Divider />

            {hasAppointments && currentAppointment ? (
                <Box sx={{ p: 2.5 }}>
                    {/* Status chip at the top */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        {currentAppointment.status && (
                            <AppointmentStatusChip status={currentAppointment.status} />
                        )}
                    </Box>

                    {/* Main appointment info - doctor and details in same row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: { xs: 2, md: 0 } }}>
                        {/* Doctor info - left side */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', mr: 3, width: { xs: '100%', md: 'auto' } }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Tooltip title={currentAppointment.doctor?.specialty || currentAppointment.practitioner?.speciality || 'Healthcare Provider'}>
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#fff' : '#2B2B2B',
                                                border: `2px solid ${mode === 'light' ? '#fff' : '#2B2B2B'}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Box>
                                    </Tooltip>
                                }
                            >
                                {avatarError ? (
                                    <Avatar
                                        src={generateAvatarSvg(currentAppointment.doctor?.name || currentAppointment.practitioner?.name || 'Doctor')}
                                        alt={currentAppointment.doctor?.name || currentAppointment.practitioner?.name || "Doctor"}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            border: '2px solid #f5f5f5',
                                            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                                        }}
                                    />
                                ) : (
                            <Avatar
                                        src={currentAppointment.doctor?.avatar || currentAppointment.practitioner?.imageUrl}
                                        alt={currentAppointment.doctor?.name || currentAppointment.practitioner?.name || "Doctor"}
                                        onError={handleAvatarError}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    border: '2px solid #f5f5f5',
                                            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                                }}
                            />
                                )}
                            </Badge>

                            <Box sx={{ ml: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.1rem',
                                        fontFamily: 'poppins',
                                        color: mode === 'light' ? '#000000' : '#FFFFFF'
                                    }}
                                >
                                    {currentAppointment.doctor?.name || currentAppointment.practitioner?.name || 'Doctor'}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: mode === 'light' ? '#9A9A9A' : '#B8C7CC',
                                        fontFamily: 'poppins',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <Box component="span" sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#21647D',
                                        display: 'inline-block'
                                    }} />
                                    {currentAppointment.doctor?.specialty || currentAppointment.practitioner?.speciality || 'Healthcare Provider'}
                                </Typography>

                                {currentAppointment.location && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Box sx={{ mr: 0.5, color: mode === 'light' ? '#21647D' : '#B8C7CC' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Box>
                                        <Tooltip title={currentAppointment.location.address || ''}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: mode === 'light' ? '#9A9A9A' : '#B8C7CC',
                                                    fontFamily: 'poppins',
                                                    fontSize: '0.8rem',
                                                    cursor: currentAppointment.location.address ? 'pointer' : 'default',
                                                    '&:hover': {
                                                        textDecoration: currentAppointment.location.address ? 'underline' : 'none',
                                                    }
                                                }}
                                            >
                                                {currentAppointment.location.name}
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                )}

                                {/* Duration badge */}
                                {currentAppointment.start && currentAppointment.end && (
                                    <Chip
                                        size="small"
                                        label={formatDuration(currentAppointment.start, currentAppointment.end)}
                                        sx={{
                                            mt: 1,
                                            height: 20,
                                            backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.1)' : 'rgba(33, 100, 125, 0.3)',
                                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>

                        {/* Appointment details - right side */}
                        <Box
                            sx={{
                                flex: '1 1 auto',
                                maxWidth: { xs: '100%', md: '400px' },
                                display: 'flex',
                                borderRadius: '10px',
                                backgroundColor: '#21647D',
                                color: 'white',
                                pt: 3.25,
                                pb: 1,
                                position: 'relative',
                                overflow: 'hidden',
                                ml: { xs: 0, md: 'auto' },
                                boxShadow: '0 4px 15px rgba(33, 100, 125, 0.2)',
                                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <Box sx={{ mr: 1 }}>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.4166 3.6665H4.58329C3.66282 3.6665 2.91663 4.4127 2.91663 5.33317V17.3332C2.91663 18.2536 3.66282 18.9998 4.58329 18.9998H17.4166C18.3371 18.9998 19.0833 18.2536 19.0833 17.3332V5.33317C19.0833 4.4127 18.3371 3.6665 17.4166 3.6665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.91663 8.6665H19.0833" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.6666 1.99988V5.33321" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.33337 1.99988V5.33321" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                                        Appointment Date
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 500, ml: 4, fontSize: '0.95rem' }}>
                                    {currentAppointment.date || 'N/A'}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <Box sx={{ mr: 1 }}>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 18.9998C15.4183 18.9998 19 15.4181 19 10.9998C19 6.58155 15.4183 2.99988 11 2.99988C6.58172 2.99988 3 6.58155 3 10.9998C3 15.4181 6.58172 18.9998 11 18.9998Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 5.99988V10.9999L14 13.9999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                                        Appointment Time
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 500, ml: 4, fontSize: '0.95rem' }}>
                                    {currentAppointment.time || 'N/A'}
                                </Typography>
                            </Box>

                            <AppointmentTypeIndicator
                                type={currentAppointment.type || currentAppointment.appointmentType || 'Appointment'}
                            />
                        </Box>
                    </Box>

                    {/* Description if available */}
                    {currentAppointment.description && (
                        <Box sx={{ mt: 2, pl: 2 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    fontFamily: 'poppins',
                                    fontSize: '0.9rem',
                                    fontStyle: 'italic',
                                    position: 'relative',
                                    pl: 3,
                                    '&::before': {
                                        content: '"\\201C"', // Unicode for opening double quote
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        fontSize: '1.5rem',
                                        color: '#21647D',
                                        opacity: 0.5,
                                        fontFamily: 'serif'
                                    }
                                }}
                            >
                                {currentAppointment.description}
                            </Typography>
                        </Box>
                    )}

                    {/* Action buttons */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                        pt: 2,
                        borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                        gap: 1
                    }}>
                        <Button
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: '#21647D',
                                color: '#21647D',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontFamily: 'poppins',
                                fontSize: '0.85rem',
                                '&:hover': {
                                    borderColor: '#21647D',
                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                }
                            }}
                        >
                            Reschedule
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={
                                currentAppointment.type?.toLowerCase().includes('video') ||
                                    currentAppointment.appointmentType?.toLowerCase().includes('video') ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )
                            }
                            sx={{
                                backgroundColor: '#21647D',
                                color: 'white',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontFamily: 'poppins',
                                fontSize: '0.85rem',
                                '&:hover': {
                                    backgroundColor: '#185269',
                                },
                                '& .MuiButton-startIcon': {
                                    mr: 0.5,
                                }
                            }}
                        >
                            {currentAppointment.type?.toLowerCase().includes('video') ||
                                currentAppointment.appointmentType?.toLowerCase().includes('video')
                                ? 'Join Video'
                                : 'View Details'}
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(33, 100, 125, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                    }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 2V6" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H21" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14H8.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 14H12.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 14H16.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 18H8.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18H12.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 18H16.01" stroke={mode === 'light' ? '#21647D' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            fontFamily: 'poppins',
                            color: mode === 'light' ? '#000000' : '#FFFFFF',
                            mb: 1
                        }}
                    >
                        No Upcoming Appointments
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            fontFamily: 'poppins',
                            fontSize: '0.9rem',
                            maxWidth: '300px',
                            mb: 3
                        }}
                    >
                        You don't have any upcoming appointments scheduled at the moment.
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        component={Link}
                        href="/dashboard/patient/appointments/schedule"
                        sx={{
                            backgroundColor: '#21647D',
                            color: 'white',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontFamily: 'poppins',
                            fontSize: '0.9rem',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#185269',
                            },
                        }}
                    >
                        Schedule Appointment
                    </Button>
                </Box>
            )}
        </Card>
    );
};

export default UpcomingAppointments; 