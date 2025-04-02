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
                p: { xs: 1.5, sm: 2, md: 3 },
                mb: { xs: 3, md: 4 },
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
                    fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                    mb: { xs: 1.5, sm: 2 }
                }}
            >
                Set Up Medicare
            </Typography>

            {/* Step Progress Indicators */}
            <Box sx={{ mb: { xs: 2, sm: 3 }, display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
                <Box
                    sx={{
                        height: '8px',
                        width: { xs: '28%', sm: '120px' },
                        backgroundColor: '#217C99',
                        borderRadius: '10px'
                    }}
                />
                <Box
                    sx={{
                        height: '8px',
                        width: { xs: '28%', sm: '120px' },
                        backgroundColor: '#E0E0E0',
                        borderRadius: '10px'
                    }}
                />
                <Box
                    sx={{
                        height: '8px',
                        width: { xs: '28%', sm: '120px' },
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
                    mt: { xs: 3, md: 4 },
                    mb: { xs: 3, sm: 4, md: 5 }
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: 32, sm: 38 },
                        height: { xs: 32, sm: 38 },
                        mr: { xs: 1.5, sm: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image 
                        src="/icons/device-gray.svg" 
                        alt="Medicare" 
                        width={33} 
                        height={33} 
                        style={{ 
                            filter: mode === 'dark' ? 'invert(0.8)' : 'none',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }} 
                    />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 500,
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.7rem' },
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
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    mt: { xs: 3, sm: 4, md: 5 },
                    gap: { xs: 2, sm: 0 }
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        fontFamily: 'poppins',
                        fontWeight: 400,
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1, sm: 1.2 },
                        border: '1px solid #DEDEDE',
                        textTransform: 'none',
                        borderRadius: '30px',
                        width: { xs: '100%', sm: 'auto' },
                        order: { xs: 2, sm: 1 },
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
                        <Typography component="span" sx={{ 
                            fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' }, 
                            marginLeft: '-5px', 
                            fontWeight: 'light' 
                        }}>
                            ›
                        </Typography>
                    }
                    sx={{
                        backgroundColor: '#217C99',
                        borderRadius: '30px',
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1, sm: 1.2 },
                        fontFamily: 'poppins',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        fontWeight: 200,
                        textTransform: 'none',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: { xs: '100%', sm: '90px' },
                        order: { xs: 1, sm: 2 },
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