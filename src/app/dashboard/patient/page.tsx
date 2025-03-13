'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Grid, Card, Avatar, LinearProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import SetupMedicare from '../../../components/patient/SetupMedicare';
import Biomarkers from '../../../components/patient/Biomarkers';
import Calendar from '../../../components/patient/Calendar';
import QuickActions from '../../../components/patient/QuickActions';
import UpcomingAppointments from '../../../components/patient/UpcomingAppointments';

const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            {/* Left scrollable section */}
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    p: 3,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#21647D',
                        borderRadius: '4px',
                    },
                }}
            >
                <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
                    {/* Welcome header */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1, color: '#21647D' }}>
                            Welcome Noah !
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Send Doctors, schools and loved ones secure access to important records
                        </Typography>
                    </Box>

                    {/* Setup Medicare section */}
                    <SetupMedicare />

                    {/* Biomarkers section */}
                    <Biomarkers />

                    {/* Upcoming Appointments section */}
                    <UpcomingAppointments />
                </Box>
            </Box>

            {/* Right fixed section */}
            <Box
                sx={{
                    width: { xs: '300px', md: '380px' },
                    p: 3,
                    backgroundColor: '#ffffff',
                    borderLeft: '1px solid #EEF1F4',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'hidden',
                }}
            >
                {/* Calendar */}
                <Calendar />

                {/* Quick Actions */}
                <QuickActions />
            </Box>
        </Box>
    );
};

export default Dashboard; 