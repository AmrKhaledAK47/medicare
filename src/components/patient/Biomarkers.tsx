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
        icon: '/images/sugar-icon.png',
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
                mb: { xs: 3, sm: 3.5, md: 4 },
                overflow: 'hidden',
                borderRadius: '12px',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: { xs: 1.75, sm: 2, md: 2.5 },
                    backgroundColor: mode === 'light' ? '#E7F6FC' : 'rgba(33, 124, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: 28, sm: 32, md: 35 },
                        height: { xs: 28, sm: 32, md: 35 },
                        mr: { xs: 1.5, sm: 2 },
                    }}
                >
                    <Image
                        src="/icons/biomarker.svg"
                        alt="Biomarkers"
                        fill
                        style={{ 
                            filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 400,
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                        fontFamily: 'poppins',
                        fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
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
                                width: { xs: '50%', sm: '33.33%', md: '25%' },
                                borderRight: {
                                    xs: (index % 2 === 0) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                    sm: (index % 3 !== 2) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                    md: (index % 4 !== 3) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                },
                                borderBottom: index < biomarkerCategories.length ? mode === 'light' ? '1px solid #eaeaea' : '1px solid #333' : 'none',
                                p: { xs: 1.75, sm: 2, md: 2.5 },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: { xs: 22, sm: 24, md: 26 },
                                        height: { xs: 22, sm: 24, md: 26 },
                                        mr: { xs: 1, sm: 1.5, md: 2 },
                                    }}
                                >
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        fill
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
                                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
                                        fontFamily: 'poppins',
                                        color: mode === 'light' ? '#000000' : '#FFFFFF'
                                    }}
                                >
                                    {category.name}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: { xs: 0.75, sm: 1 }, mt: { xs: 1.5, sm: 2 }, pl: 0.5 }}>
                                {category.indicators.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: { xs: 7, sm: 8, md: 9 },
                                            height: { xs: 7, sm: 8, md: 9 },
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
                            width: { xs: '50%', sm: '33.33%', md: '25%' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: { xs: 1.75, sm: 2, md: 2.5 },
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
                                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
                                        fontWeight: 600,
                                        fontFamily: 'poppins',
                                        mr: 1
                                    }}
                                >
                                    See All
                                </Typography>
                                <Box sx={{ width: { xs: 18, sm: 20, md: 22 }, height: { xs: 18, sm: 20, md: 22 } }}>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                </Box>

                {/* Add Result Button */}
                <Box sx={{ p: { xs: 1.75, sm: 2, md: 2.5 }, display: 'flex' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '8px',
                            borderColor: mode === 'light' ? '#21647D' : '#B8C7CC',
                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                            backgroundColor: 'transparent',
                            px: { xs: 2, sm: 2.5, md: 3 },
                            py: { xs: 0.75, sm: 0.85, md: 1 },
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
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