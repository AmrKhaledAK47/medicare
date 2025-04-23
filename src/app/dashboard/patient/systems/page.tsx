'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import DeviceStatusSidebar from '../../../../components/patient/DeviceStatusSidebar';
import { usePathname } from 'next/navigation';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    overflow: 'hidden',
    height: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
}));

const MainContent = styled(Box)(({ theme }) => ({
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: theme.spacing(3),
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#A3A0A035' : '#333',
        borderRadius: '4px',
    },
}));

const SystemsContainer = styled(Paper)(({ theme }) => ({
    maxWidth: '1300px',
    margin: '0 auto',
    padding: theme.spacing(3),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const PlaceholderText = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    textAlign: 'center',
}));

const SystemsPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const pathname = usePathname();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Effect to handle initial sidebar state
    useEffect(() => {
        // Initialize any state needed
    }, [pathname]);

    return (
        <PageContainer>
            <MainContent>
                <SystemsContainer>
                    <SectionTitle>Health Systems</SectionTitle>

                    <PlaceholderText>
                        Connect your healthcare providers and hospital systems to automatically sync your medical records.
                    </PlaceholderText>

                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{
                                p: 3,
                                textAlign: 'center',
                                border: `1px dashed ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                borderRadius: '12px',
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                            }}>
                                <Typography variant="h6" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    No Connected Health Systems
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    This section will allow you to connect to your hospital networks and other healthcare systems.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </SystemsContainer>
            </MainContent>

            {/* Status Sidebar - only visible on desktop/larger tablets */}
            {!isTablet && (
                <DeviceStatusSidebar
                    connectedDevices={0}
                    uploadedFiles={0}
                    connectedSystems={0}
                />
            )}
        </PageContainer>
    );
};

export default SystemsPage; 