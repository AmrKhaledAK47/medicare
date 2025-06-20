'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
        border: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
        overflow: 'hidden',
        animation: `${fadeIn} 0.3s ease-out`,
        maxWidth: '700px',
        width: '90%',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.8)' : 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(5px)',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: '24px',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.75rem',
    borderBottom: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.2)' : 'rgba(184, 199, 204, 0.2)',
        borderRadius: '4px',
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: '30px',
    fontFamily: 'poppins',
    fontSize: '1.1rem',
    textTransform: 'none',
    padding: '10px 32px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
}));

const StepBox = styled(Box)(({ theme }) => ({
    padding: '20px',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    marginBottom: '16px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
        transform: 'translateY(-2px)',
    },
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.15s',
    opacity: 0,
}));

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
        borderColor: theme.palette.mode === 'light' ? '#eaeaf0' : '#444',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

// Custom step icon
const CustomStepIcon = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
    ({ theme, ownerState }) => ({
        backgroundColor:
            ownerState.completed ? '#21647D' :
                ownerState.active ? '#21647D' :
                    theme.palette.mode === 'light' ? '#ccc' : '#444',
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

interface SetupMedicareModalProps {
    open: boolean;
    onClose: () => void;
    onSkip?: () => void;
}

const SetupMedicareModal: React.FC<SetupMedicareModalProps> = ({ open, onClose, onSkip }) => {
    const { mode } = useThemeContext();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Set Up Medicare', 'Connect Devices & Apps', 'Setup Complete'];

    const handleNext = () => {
        if (activeStep === 0) {
            router.push('/dashboard/patient/devices');
        } else if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            onClose();
        }
    };

    const handleSkip = () => {
        if (onSkip) onSkip();
        onClose();
    };

    const handleNavigateTo = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <StyledDialogTitle>
                Setup Medicare
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </IconButton>
            </StyledDialogTitle>

            <StyledDialogContent>
                {/* Stepper */}
                <Box sx={{ mb: 4, width: '100%', mt: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={(props) =>
                                    <CustomStepIcon ownerState={{
                                        active: props.active,
                                        completed: props.completed
                                    }}>
                                        {props.icon}
                                    </CustomStepIcon>
                                }>
                                    <Typography
                                        sx={{
                                            fontFamily: 'poppins',
                                            color: activeStep >= index
                                                ? '#21647D'
                                                : mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            fontWeight: activeStep === index ? 600 : 400,
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {activeStep === 0 && (
                    <>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                animation: `${slideUp} 0.4s ease-out forwards`,
                                animationDelay: '0.05s',
                                opacity: 0,
                            }}
                        >
                            Connect Your Health Devices & Apps
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                animation: `${slideUp} 0.4s ease-out forwards`,
                                animationDelay: '0.1s',
                                opacity: 0,
                            }}
                        >
                            Link your health devices and apps to Medicare to automatically sync your health data. This helps us provide you with personalized insights and allow your healthcare providers to get a complete picture of your health.
                        </Typography>

                        <List sx={{ mb: 4 }}>
                            <ListItem
                                sx={{
                                    pl: 0,
                                    animation: `${slideUp} 0.4s ease-out forwards`,
                                    animationDelay: '0.15s',
                                    opacity: 0,
                                }}
                            >
                                <ListItemIcon>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        backgroundColor: mode === 'light' ? '#E6F2F7' : '#1A3A4A',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Typography sx={{ fontWeight: 600, color: '#21647D' }}>1</Typography>
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF'
                                            }}
                                        >
                                            Connect Your Devices
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                mt: 0.5,
                                            }}
                                        >
                                            Link health apps like Apple Health, Fitbit, or other wearable devices
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    pl: 0,
                                    animation: `${slideUp} 0.4s ease-out forwards`,
                                    animationDelay: '0.2s',
                                    opacity: 0,
                                }}
                            >
                                <ListItemIcon>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        backgroundColor: mode === 'light' ? '#E6F2F7' : '#1A3A4A',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Typography sx={{ fontWeight: 600, color: '#21647D' }}>2</Typography>
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF'
                                            }}
                                        >
                                            Connect Healthcare Providers
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                mt: 0.5,
                                            }}
                                        >
                                            Import your medical records from your healthcare providers
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    pl: 0,
                                    animation: `${slideUp} 0.4s ease-out forwards`,
                                    animationDelay: '0.25s',
                                    opacity: 0,
                                }}
                            >
                                <ListItemIcon>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        backgroundColor: mode === 'light' ? '#E6F2F7' : '#1A3A4A',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Typography sx={{ fontWeight: 600, color: '#21647D' }}>3</Typography>
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF'
                                            }}
                                        >
                                            Complete Your Profile
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                mt: 0.5,
                                            }}
                                        >
                                            Add personal details to receive personalized health insights
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 4,
                                pt: 2,
                                borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                            }}
                        >
                            <ActionButton
                                variant="outlined"
                                onClick={handleSkip}
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    borderColor: mode === 'light' ? '#DEDEDE' : '#444',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        borderColor: mode === 'light' ? '#CCD6DD' : '#555',
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                Skip for now
                            </ActionButton>

                            <ActionButton
                                variant="contained"
                                onClick={handleNext}
                                endIcon={
                                    <Typography component="span" sx={{
                                        fontSize: '1.5rem',
                                        marginLeft: '-5px',
                                        fontWeight: 'light'
                                    }}>
                                        ›
                                    </Typography>
                                }
                                sx={{
                                    backgroundColor: '#217C99',
                                    '&:hover': {
                                        backgroundColor: '#186A84',
                                    },
                                }}
                            >
                                Get Started
                            </ActionButton>
                        </Box>
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                animation: `${slideUp} 0.4s ease-out forwards`,
                                animationDelay: '0.05s',
                                opacity: 0,
                            }}
                        >
                            Select where to go next
                        </Typography>

                        <StepBox onClick={() => handleNavigateTo('/dashboard/patient/devices')}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: 36,
                                    height: 36,
                                    mr: 2
                                }}>
                                    <Image
                                        src="/icons/device-gray.svg"
                                        alt="Devices"
                                        width={36}
                                        height={36}
                                        style={{
                                            filter: mode === 'dark' ? 'invert(0.8)' : 'none',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                                        }}
                                    >
                                        Devices & Apps
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        }}
                                    >
                                        Connect your health tracking devices and apps
                                    </Typography>
                                </Box>
                            </Box>
                        </StepBox>

                        <StepBox onClick={() => handleNavigateTo('/dashboard/patient/systems')}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: 36,
                                    height: 36,
                                    mr: 2
                                }}>
                                    <Image
                                        src="/icons/systems.svg"
                                        alt="Systems"
                                        width={36}
                                        height={36}
                                        style={{
                                            filter: mode === 'dark' ? 'invert(0.8)' : 'none',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                                        }}
                                    >
                                        Healthcare Providers
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        }}
                                    >
                                        Connect your healthcare providers to import medical records
                                    </Typography>
                                </Box>
                            </Box>
                        </StepBox>

                        <StepBox onClick={() => handleNavigateTo('/dashboard/patient/profile')}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: 36,
                                    height: 36,
                                    mr: 2
                                }}>
                                    <Image
                                        src="/icons/profile.svg"
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        style={{
                                            filter: mode === 'dark' ? 'invert(0.8)' : 'none',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                                        }}
                                    >
                                        Profile
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        }}
                                    >
                                        Complete your profile information
                                    </Typography>
                                </Box>
                            </Box>
                        </StepBox>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 4,
                                pt: 2,
                                borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                            }}
                        >
                            <ActionButton
                                variant="outlined"
                                onClick={handleSkip}
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    borderColor: mode === 'light' ? '#DEDEDE' : '#444',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        borderColor: mode === 'light' ? '#CCD6DD' : '#555',
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                Skip for now
                            </ActionButton>

                            <ActionButton
                                variant="contained"
                                onClick={() => handleNavigateTo('/dashboard/patient/devices')}
                                sx={{
                                    backgroundColor: '#217C99',
                                    '&:hover': {
                                        backgroundColor: '#186A84',
                                    },
                                }}
                            >
                                Connect Devices
                            </ActionButton>
                        </Box>
                    </>
                )}
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default SetupMedicareModal; 