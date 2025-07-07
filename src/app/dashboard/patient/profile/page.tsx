'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProfileInfo from '@/components/patient/ProfileInfo';
import { useThemeContext } from '@/components/patient/Sidebar';

const PageTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.75rem',
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    marginBottom: theme.spacing(3),
}));

const PageDescription = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '1rem',
    color: theme.palette.mode === 'light' ? '#97A4A9' : '#8A9DA3',
    marginBottom: theme.spacing(4),
}));

export default function ProfilePage() {
    const { mode } = useThemeContext();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PageTitle>My Profile</PageTitle>
            <PageDescription>
                View and manage your account information
            </PageDescription>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <ProfileInfo />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                            boxShadow: mode === 'light'
                                ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
                                : '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: 600,
                                color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                mb: 2
                            }}
                        >
                            Account Security
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Montserrat", sans-serif',
                                color: mode === 'light' ? '#333333' : '#E0E0E0',
                                mb: 1
                            }}
                        >
                            Your account is protected with secure authentication.
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Montserrat", sans-serif',
                                color: mode === 'light' ? '#333333' : '#E0E0E0',
                            }}
                        >
                            For security reasons, you cannot change your email address directly.
                            Please contact support if you need to update your email.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
