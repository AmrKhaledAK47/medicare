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
import { useThemeContext } from '../../../components/patient/Sidebar';

const Dashboard = () => {
    const { mode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden', height: 'calc(100vh - 64px)', backgroundColor: mode === 'light' ? '#ffffff' : '#1A1A1A' }}>
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
                        background: mode === 'light' ? '#ffffff' : '#1A1A1A',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#ffffff' : '#1A1A1A',
                        borderRadius: '4px',
                    },
                }}
            >
                <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
                    {/* Welcome header */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Welcome Noah !
                        </Typography>
                        <Typography variant="body2" fontSize={16} sx={{ color: mode === 'light' ? '#A3A0A0' : '#B8C7CC', fontFamily: "poppins", marginTop: -1, fontWeight: 300 }} >
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
                    width: { xs: '300px', md: '460px' },
                    p: 3,
                    backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                    borderLeft: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'light' ? '#ffffff' : '#1A1A1A',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#A3A0A091' : '#1A1A1A',
                        borderRadius: '4px',
                    },
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