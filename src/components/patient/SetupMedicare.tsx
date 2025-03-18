'use client';

import React from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';

// Custom connector for the stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#21647D',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#21647D',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

// Custom step icon
const CustomStepIcon = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
    ({ theme, ownerState }) => ({
        backgroundColor: ownerState.completed ? '#21647D' : ownerState.active ? '#21647D' : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 24,
        height: 24,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }),
);

const SetupMedicare: React.FC = () => {
    const { mode } = useThemeContext();
    const activeStep = 0; // Currently on the first step
    const steps = ['Set Up Medicare', 'Connect Devices & Apps', 'Setup Complete'];

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                background: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                border: mode === 'light' ? '2px solid #217C99' : '2px solid #21647D',
                borderRadius: '12px',
                p: { xs: 2, md: 3 },
                mb: 4,
                overflow: 'hidden',
            }}
        >
            {/* Medicare Setup Header */}
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    fontFamily: 'poppins',
                    color: mode === 'light' ? '#7F7F7F' : '#B8C7CC',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    mb: 2
                }}
            >
                Set Up Medicare
            </Typography>

            {/* Step Progress Indicators */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
                <Box
                    sx={{
                        height: '8px',
                        width: '120px',
                        backgroundColor: '#217C99',
                        borderRadius: '10px'
                    }}
                />
                <Box
                    sx={{
                        height: '8px',
                        width: '120px',
                        backgroundColor: '#E0E0E0',
                        borderRadius: '10px'
                    }}
                />
                <Box
                    sx={{
                        height: '8px',
                        width: '120px',
                        backgroundColor: '#E0E0E0',
                        borderRadius: '10px'
                    }}
                />
            </Box>

            {/* Current step content - Connect Devices & Apps */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 4,
                    mb: 5
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 38,
                        height: 38,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image src="/icons/device-gray.svg" alt="Medicare" width={33} height={33} style={{ filter: mode === 'dark' ? 'invert(0.8)' : 'none' }} />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 500,
                        fontSize: '1.7rem',
                        fontFamily: 'poppins',
                        color: mode === 'light' ? '#000000' : '#FFFFFF',
                    }}
                >
                    Connect Devices & Apps
                </Typography>
            </Box>

            {/* Buttons Container */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 5
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        fontSize: '1.25rem',
                        fontFamily: 'poppins',
                        fontWeight: 400,
                        px: 5,
                        py: 1.2,
                        border: '1px solid #DEDEDE',
                        textTransform: 'none',
                        borderRadius: '30px',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            opacity: 0.8,
                        },
                    }}
                >
                    Skip
                </Button>
                <Button
                    variant="contained"
                    endIcon={
                        <Typography component="span" sx={{ fontSize: '1.5rem', marginLeft: '-5px', fontWeight: 'light' }}>
                            ›
                        </Typography>
                    }
                    sx={{
                        backgroundColor: '#217C99',
                        borderRadius: '30px',
                        px: 5,
                        py: 1.2,
                        fontFamily: 'poppins',
                        fontSize: '1.25rem',
                        fontWeight: 200,
                        textTransform: 'none',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '90px',
                        '&:hover': {
                            color: '#217C99',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    Go
                </Button>
            </Box>
        </Box>
    );
};

export default SetupMedicare; 