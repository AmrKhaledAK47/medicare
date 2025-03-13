'use client';

import React from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

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
    const activeStep = 0; // Currently on the first step
    const steps = ['Set Up Medicare', 'Connect Devices & Apps', 'Setup Complete'];

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '2px solid #217C99',
                borderRadius: '20px',
                p: { xs: 2, md: 3 },
                mb: 4,
            }}
        >
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500, display: 'none' }}>
                Set Up Medicare
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<CustomConnector />}
                    sx={{
                        width: '100%',
                        '.MuiStepLabel-label': {
                            typography: 'body2',
                            mt: 1,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        },
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconComponent={(props) => (
                                    <CustomStepIcon
                                        ownerState={{ active: props.active, completed: props.completed }}
                                    >
                                        {props.icon}
                                    </CustomStepIcon>
                                )}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Current step content */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: 28,
                            height: 28,
                            mr: 1.5,
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9C13.66 9 15 7.66 15 6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6C9 7.66 10.34 9 12 9ZM12 5C12.55 5 13 5.45 13 6C13 6.55 12.55 7 12 7C11.45 7 11 6.55 11 6C11 5.45 11.45 5 12 5Z" fill="#333" />
                            <path d="M12 11.01C8.49 11.01 2 12.86 2 17V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V17C22 12.86 15.51 11.01 12 11.01ZM20 19H4V17C4 14.79 9.47 13.01 12 13.01C14.53 13.01 20 14.79 20 17V19Z" fill="#333" />
                            <path d="M17.25 9.25C17.66 9.25 18 8.91 18 8.5C18 8.09 17.66 7.75 17.25 7.75C16.84 7.75 16.5 8.09 16.5 8.5C16.5 8.91 16.84 9.25 17.25 9.25Z" fill="#333" />
                            <path d="M17.25 12C16.84 12 16.5 12.34 16.5 12.75C16.5 13.16 16.84 13.5 17.25 13.5C17.66 13.5 18 13.16 18 12.75C18 12.34 17.66 12 17.25 12Z" fill="#333" />
                            <path d="M19.75 10.5C20.16 10.5 20.5 10.16 20.5 9.75C20.5 9.34 20.16 9 19.75 9C19.34 9 19 9.34 19 9.75C19 10.16 19.34 10.5 19.75 10.5Z" fill="#333" />
                            <path d="M14.75 10.5C15.16 10.5 15.5 10.16 15.5 9.75C15.5 9.34 15.16 9 14.75 9C14.34 9 14 9.34 14 9.75C14 10.16 14.34 10.5 14.75 10.5Z" fill="#333" />
                        </svg>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        Connect Devices & Apps
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="text"
                        sx={{
                            color: '#6C7A89',
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        Skip
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            borderRadius: '8px',
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.5, sm: 0.75 },
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            textTransform: 'none',
                            boxShadow: 'none',
                            minWidth: '60px',
                            '&:hover': {
                                backgroundColor: '#184C5F',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        Go
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SetupMedicare; 