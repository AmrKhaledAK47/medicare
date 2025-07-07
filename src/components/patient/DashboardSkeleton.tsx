'use client';

import React from 'react';
import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';

const DashboardSkeleton: React.FC = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            height: { xs: 'auto', md: 'calc(100vh - 64px)' },
            backgroundColor: mode === 'light' ? '#ffffff' : '#1A1A1A'
        }}>
            {/* Left scrollable section */}
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    p: { xs: 2, sm: 3 },
                    order: { xs: 2, md: 1 },
                }}
            >
                <Box sx={{ maxWidth: { xs: '100%', lg: '1000px' }, mx: 'auto' }}>
                    {/* Welcome header skeleton */}
                    <Box sx={{ mb: 3 }}>
                        <Skeleton
                            variant="text"
                            width="60%"
                            height={60}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 1
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width="80%"
                            height={30}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                borderRadius: 1
                            }}
                        />
                    </Box>

                    {/* Setup Medicare skeleton */}
                    <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={150}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 2
                            }}
                        />
                    </Box>

                    {/* Biomarkers skeleton */}
                    <Box sx={{ mb: 3 }}>
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={40}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 1,
                                mb: 2
                            }}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {[1, 2, 3, 4].map((item) => (
                                <Skeleton
                                    key={item}
                                    variant="rectangular"
                                    width={isTablet ? '100%' : '48%'}
                                    height={100}
                                    sx={{
                                        bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                        borderRadius: 2,
                                        flexGrow: isTablet ? 0 : 1
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Mobile Calendar & QuickActions skeleton */}
                    {isTablet && (
                        <Box sx={{ mb: 3 }}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={200}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                    borderRadius: 2,
                                    mb: 3
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={150}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                    borderRadius: 2
                                }}
                            />
                        </Box>
                    )}

                    {/* Appointments skeleton */}
                    <Box sx={{ mb: 3 }}>
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={40}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 1,
                                mb: 2
                            }}
                        />
                        {[1, 2].map((item) => (
                            <Skeleton
                                key={item}
                                variant="rectangular"
                                width="100%"
                                height={80}
                                sx={{
                                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                    borderRadius: 2,
                                    mb: 2
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Right fixed section - only visible on desktop/larger tablets */}
            {!isTablet && (
                <Box
                    sx={{
                        width: { md: '350px', lg: '460px' },
                        p: 3,
                        backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                        borderLeft: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                        display: 'flex',
                        flexDirection: 'column',
                        order: { xs: 1, md: 2 },
                        height: '100%',
                    }}
                >
                    {/* Calendar skeleton */}
                    <Box sx={{ mb: 3 }}>
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={40}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 1,
                                mb: 2
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={280}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                borderRadius: 2
                            }}
                        />
                    </Box>

                    {/* Quick Actions skeleton */}
                    <Box sx={{ mt: 3 }}>
                        <Skeleton
                            variant="text"
                            width="40%"
                            height={40}
                            sx={{
                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                                borderRadius: 1,
                                mb: 2
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {[1, 2, 3].map((item) => (
                                <Skeleton
                                    key={item}
                                    variant="rectangular"
                                    width="100%"
                                    height={60}
                                    sx={{
                                        bgcolor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                        borderRadius: 2
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DashboardSkeleton; 