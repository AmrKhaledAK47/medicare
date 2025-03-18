'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Chip } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';

interface Appointment {
    id: number;
    doctor: {
        name: string;
        specialty: string;
        avatar: string;
    };
    date: string;
    time: string;
    type: string;
}

const UpcomingAppointments: React.FC = () => {
    // Set default to false to show "no appointments" state
    const [hasAppointments, setHasAppointments] = useState(false);
    const { mode } = useThemeContext();

    // Sample appointment data
    const appointmentData: Appointment = {
        id: 1,
        doctor: {
            name: 'Dr. Leslie Alexander',
            specialty: 'General Practitioner',
            avatar: '/avatars/doctor.png',
        },
        date: 'Wed, 20 June 2024',
        time: '08:00 - 12:00',
        type: 'Consultation',
    };

    return (
        <Box
            sx={{
                mb: 4,
                borderRadius: '12px',
                backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2.5,
                    borderBottom: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 32,
                        height: 32,
                        mr: 2,
                        color: '#21647D',
                    }}
                >
                    <Image src="/icons/appointment.svg" alt="appointment" width={32} height={32} />
                </Box>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 500,
                        color: mode === 'light' ? '#000000' : '#B8C7CC',
                        fontFamily: 'poppins',
                        fontSize: '1.3rem',
                        mt: 0.2
                    }}
                >
                    Upcoming Appointment
                </Typography>
            </Box>

            {hasAppointments ? (
                <Box sx={{ p: 2.5 }}>
                    {/* Main appointment info - doctor and details in same row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                        {/* Doctor info - left side */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', mr: 3 }}>
                            <Avatar
                                src={appointmentData.doctor.avatar}
                                alt={appointmentData.doctor.name}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    border: '2px solid #f5f5f5',
                                }}
                            />

                            <Box sx={{ ml: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '1.1rem',
                                        fontFamily: 'poppins',
                                        color: mode === 'light' ? '#000000' : '#FFFFFF'
                                    }}
                                >
                                    {appointmentData.doctor.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: mode === 'light' ? '#9A9A9A' : '#B8C7CC',
                                        fontFamily: 'poppins',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {appointmentData.doctor.specialty}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Appointment details - right side */}
                        <Box
                            sx={{
                                flex: '1 1 auto',
                                maxWidth: '400px',
                                display: 'flex',
                                borderRadius: '10px',
                                backgroundColor: '#21647D',
                                color: 'white',
                                pt: 3.25,
                                pb: 1,
                                position: 'relative',
                                overflow: 'hidden',
                                ml: 'auto'
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
                                        Appointments Date
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 400, ml: 4, fontSize: '0.9rem' }}>
                                    {appointmentData.date}
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
                                        Appointments Time
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 400, ml: 4 }}>
                                    {appointmentData.time}
                                </Typography>
                            </Box>

                            <Chip
                                label={appointmentData.type}
                                sx={{
                                    position: 'absolute',
                                    left: '5%',
                                    bottom: 80,
                                    backgroundColor: 'white',
                                    color: '#21647D',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    height: 26,
                                    fontFamily: 'poppins',
                                }}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 5,
                    px: 2
                }}>
                    <Box sx={{ position: 'relative', width: 70, height: 70, mb: 2 }}>
                        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            <path d="M12 15L12 15.01" />
                            <path d="M8 15L8 15.01" />
                            <path d="M16 15L16 15.01" />
                        </svg>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#777777',
                            fontFamily: 'poppins',
                            fontWeight: 400,
                            fontSize: '1.1rem',
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        No upcoming appointments
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={
                            <Box component="span" sx={{ mr: 0.5, fontSize: '1.2rem', fontWeight: 'normal' }}>+</Box>
                        }
                        sx={{
                            color: '#21647D',
                            border: '1px solid #21647D',
                            borderRadius: '30px',
                            px: 4,
                            py: 0.8,
                            textTransform: 'none',
                            fontFamily: 'poppins',
                            fontWeight: 500,
                            fontSize: '1rem',
                            '&:hover': {
                                borderColor: '#21647D',
                                backgroundColor: 'rgba(33, 100, 125, 0.05)',
                            }
                        }}
                    >
                        New
                    </Button>
                </Box>
            )}

            {/* Add Appointment button - only show when there are no appointments */}
            {hasAppointments && (
                <Box
                    sx={{
                        p: 2.5,
                        pt: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                            backgroundColor: 'transparent',
                            px: 3,
                            py: 1,
                            mt: 2,
                            fontSize: '0.95rem',
                            fontFamily: 'poppins',
                            fontWeight: 500,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            },
                            '&:active': {
                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            },
                        }}
                    >
                        Add Appointment
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default UpcomingAppointments; 