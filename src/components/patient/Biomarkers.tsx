'use client';

import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import Image from 'next/image';

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
        indicators: [1, 2, 3, 4, 5, 6],
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
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, md: 3 },
                mb: 4,
                backgroundColor: 'rgba(33, 124, 153, 0.05)',
                borderRadius: '20px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: 30,
                        height: 30,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_705_5498)">
                            <path d="M33 8.25C36.3827 8.25 39.875 8.25 43.175 8.25C47.3825 8.25 50.5893 11.2613 52.0625 15.125C53.5358 18.9887 53.625 24.0625 53.625 30.25V38.5C53.625 44.6875 53.5358 49.7612 52.0625 53.625C50.5893 57.4887 47.3825 60.5 43.175 60.5C36.6875 60.5 29.3125 60.5 22.825 60.5C18.6175 60.5 15.4107 57.4887 13.9375 53.625C12.4642 49.7612 12.375 44.6875 12.375 38.5V30.25C12.375 24.0625 12.4642 18.9887 13.9375 15.125C15.4107 11.2613 18.6175 8.25 22.825 8.25C26.125 8.25 29.6172 8.25 33 8.25Z" fill="#EDF8FC" />
                            <path d="M28.875 46.0625C28.875 43.1875 30.1292 41.25 33 41.25C35.8708 41.25 37.125 43.1875 37.125 46.0625H33H28.875Z" fill="#DFF1F9" />
                            <path d="M18.5625 27.5C20.0903 27.5 21.3125 26.2779 21.3125 24.75C21.3125 23.2221 20.0903 22 18.5625 22C17.0347 22 15.8125 23.2221 15.8125 24.75C15.8125 26.2779 17.0347 27.5 18.5625 27.5Z" fill="#DFF1F9" />
                            <path d="M47.4375 27.5C48.9653 27.5 50.1875 26.2779 50.1875 24.75C50.1875 23.2221 48.9653 22 47.4375 22C45.9097 22 44.6875 23.2221 44.6875 24.75C44.6875 26.2779 45.9097 27.5 47.4375 27.5Z" fill="#DFF1F9" />
                            <path d="M23.1475 34.6513C25.5025 32.4538 26.9162 33.4175 29.7412 35.2538C32.5662 37.09 37.6023 34.5475 38.0412 30.4425C38.4802 26.3375 37.4162 20.2663 30.4425 22.33C27.3838 23.375 22.55 28.39 23.1475 34.6513Z" fill="#D0E6F0" />
                            <path d="M17.1875 33C21.5588 33 22 33 22 33C22 33 22 29.525 22 25.8438" stroke="#1A5369" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M48.8125 33C44.4412 33 44 33 44 33C44 33 44 29.525 44 25.8438" stroke="#1A5369" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M23.1475 34.6513C25.5025 32.4538 26.9162 33.4175 29.7412 35.2538C32.5662 37.09 37.6022 34.5475 38.0412 30.4425C38.4802 26.3375 37.4162 20.2663 30.4425 22.33C27.3838 23.375 22.55 28.39 23.1475 34.6513Z" stroke="#1A5369" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M37.125 46.0625H28.875" stroke="#1A5369" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M26.8125 13.0625H39.1875" stroke="#1A5369" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_705_5498">
                                <rect width="66" height="66" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#21647D' }}>
                    Biomarkers
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="text"
                    endIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    }
                    sx={{
                        color: '#21647D',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    See All
                </Button>
            </Box>

            <Grid container spacing={2}>
                {biomarkerCategories.map((category) => (
                    <Grid item xs={6} sm={6} md={4} key={category.name}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                mb: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: '1px solid #f0f0f0',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: 20,
                                        height: 20,
                                        mr: 1.5,
                                    }}
                                >
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                                    {category.name}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                                {category.indicators.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: index === 0 ? category.color : '#E0E0E0',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                        borderColor: '#21647D',
                        color: '#21647D',
                        backgroundColor: 'white',
                        px: 3,
                        py: 0.75,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'rgba(33, 100, 125, 0.08)',
                            borderColor: '#21647D',
                        },
                    }}
                >
                    Add Result
                </Button>
            </Box>
        </Paper>
    );
};

export default Biomarkers; 