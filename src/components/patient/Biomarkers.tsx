'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import Link from 'next/link';

const biomarkerCategories = [
    {
        name: 'Heart',
        icon: '/icons/heart.svg',
        indicators: [1, 2, 3, 4, 5], // Indicators shown as dots
        color: '#FF5252',
    },
    {
        name: 'Kidney',
        icon: '/icons/kidney.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#FFA726',
    },
    {
        name: 'Liver',
        icon: '/icons/liver.svg',
        indicators: [1, 2, 3, 4],
        color: '#E91E63',
    },
    {
        name: 'Sugar',
        icon: '/icons/sugar.svg',
        indicators: [1, 2, 3],
        color: '#FF9800',
    },
    {
        name: 'Blood',
        icon: '/icons/blood.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#F44336',
    },
    {
        name: 'Thyroid',
        icon: '/icons/thyroid.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#9C27B0',
    },
    {
        name: 'Bone',
        icon: '/icons/bone.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#607D8B',
    },
];

const Biomarkers: React.FC = () => {
    const { mode } = useThemeContext();

    return (
        <Box
            sx={{
                mb: 4,
                overflow: 'hidden',
                borderRadius: '12px',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2.5,
                    backgroundColor: mode === 'light' ? '#E7F6FC' : 'rgba(33, 124, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 35,
                        height: 35,
                        mr: 2,
                    }}
                >
                    <Image
                        src="/icons/biomarker.svg"
                        alt="Biomarkers"
                        width={35}
                        height={35}
                        style={{ filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none' }}
                    />
                </Box>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 400,
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                        fontFamily: 'poppins',
                        fontSize: '1.5rem',
                    }}
                >
                    Biomarkers
                </Typography>
            </Box>

            {/* Biomarker Grid */}
            <Box
                sx={{
                    border: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                    borderTop: 'none',
                    backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                }}
            >
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {biomarkerCategories.map((category, index) => (
                        <Box
                            key={category.name}
                            sx={{
                                width: '25%',
                                borderRight: (index + 1) % 4 !== 0 ? mode === 'light' ? '1px solid #eaeaea' : '1px solid #333' : 'none',
                                borderBottom: index < 7 ? mode === 'light' ? '1px solid #eaeaea' : '1px solid #333' : 'none',
                                p: 2.5,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: 26,
                                        height: 26,
                                        mr: 2,
                                    }}
                                >
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        width={30}
                                        height={30}
                                        style={{
                                            objectFit: 'contain',
                                            filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none'
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '1.3rem',
                                        fontFamily: 'poppins',
                                        color: mode === 'light' ? '#000000' : '#FFFFFF'
                                    }}
                                >
                                    {category.name}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, mt: 2, pl: 0.5 }}>
                                {category.indicators.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 9,
                                            height: 9,
                                            borderRadius: '50%',
                                            backgroundColor: '#E0E0E0',
                                            opacity: 0.7
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}

                    {/* See All Link */}
                    <Box
                        sx={{
                            width: '25%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2.5,
                            borderBottom: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                        }}
                    >
                        <Link href="/dashboard/patient/biomarkers" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#21647D',
                                    '&:hover': {
                                        opacity: 0.8
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        fontFamily: 'poppins',
                                        mr: 1
                                    }}
                                >
                                    See All
                                </Typography>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 5L19 12L12 19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Box>
                        </Link>
                    </Box>
                </Box>

                {/* Add Result Button */}
                <Box sx={{ p: 2.5, display: 'flex' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '8px',
                            borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                            backgroundColor: 'transparent',
                            px: 3,
                            py: 1,
                            fontSize: '0.95rem',
                            fontFamily: 'poppins',
                            fontWeight: 500,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            },
                        }}
                    >
                        Add Result
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Biomarkers; 