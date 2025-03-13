'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Avatar, Divider, Chip } from '@mui/material';
import Image from 'next/image';

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
    const [hasAppointments, setHasAppointments] = useState(true);

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
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 4,
                borderRadius: '20px',
                backgroundColor: 'white',
                border: '1px solid #EEF1F4',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: 32,
                        height: 32,
                        mr: 2,
                    }}
                >
                    <Image
                        src="/icons/schedule.svg"
                        alt="Calendar"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </Box>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#21647D' }}>
                    Upcoming Appointment
                </Typography>
            </Box>

            {hasAppointments ? (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: '15px',
                            border: '1px solid #EEF1F4',
                            mb: 3,
                        }}
                    >
                        <Avatar
                            src={appointmentData.doctor.avatar}
                            alt={appointmentData.doctor.name}
                            sx={{ width: 70, height: 70, mr: 3 }}
                        />

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.1rem' }}>
                                {appointmentData.doctor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {appointmentData.doctor.specialty}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            p: 2,
                            borderRadius: '15px',
                            border: '1px solid #3CB6E3',
                            backgroundColor: 'rgba(33, 124, 153, 0.05)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 0 40%' }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 24,
                                    height: 24,
                                    mr: 1,
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    Appointments Date
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {appointmentData.date}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 0 40%' }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 24,
                                    height: 24,
                                    mr: 1,
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    Appointments Time
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {appointmentData.time}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Chip
                                label={appointmentData.type}
                                sx={{
                                    backgroundColor: 'white',
                                    border: '1px solid #21647D',
                                    color: '#21647D',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                }}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        <Image
                            src="/icons/schedule.svg"
                            alt="Calendar"
                            fill
                            style={{ objectFit: 'contain', opacity: 0.5 }}
                        />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#6C7A89' }}>
                        No upcoming appointments
                    </Typography>
                    <Button
                        startIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        }
                        sx={{
                            color: '#21647D',
                            mt: 2,
                            borderRadius: '8px',
                            border: '1px solid #21647D',
                            px: 2,
                            textTransform: 'none',
                        }}
                        variant="outlined"
                    >
                        New
                    </Button>
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                        borderColor: '#21647D',
                        color: '#21647D',
                        backgroundColor: 'white',
                        px: 3,
                        py: 1,
                        fontSize: '0.875rem',
                        '&:hover': {
                            backgroundColor: 'rgba(33, 100, 125, 0.08)',
                            borderColor: '#21647D',
                        },
                    }}
                >
                    Add Appointment
                </Button>
            </Box>
        </Paper>
    );
};

export default UpcomingAppointments; 