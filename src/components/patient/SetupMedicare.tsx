'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import SetupMedicareModal from './SetupMedicareModal';

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideRight = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled components
const SetupContainer = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: theme.palette.mode === 'light' ? '2px solid #217C99' : '2px solid #21647D',
    borderRadius: '16px',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    '&:hover': {
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
    },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
}));

const ProgressBar = styled(LinearProgress)(({ theme, active }: { theme?: any, active: boolean }) => ({
    height: '8px',
    borderRadius: '10px',
    width: '120px',
    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#444',
    '& .MuiLinearProgress-bar': {
        backgroundColor: active ? '#217C99' : 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
        width: '28%',
    },
}));

const StepContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    animation: `${fadeIn} 0.5s ease-out`,
}));

const StepIcon = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#E7F6FC' : 'rgba(33, 124, 153, 0.2)',
    borderRadius: '50%',
    padding: theme.spacing(1),
    animation: `${pulse} 2s infinite ease-in-out`,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '1.7rem',
    fontFamily: 'poppins',
    color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
    animation: `${slideRight} 0.5s ease-out`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.25rem',
    },
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));

const SkipButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontSize: '1.1rem',
    fontFamily: 'poppins',
    fontWeight: 400,
    padding: '10px 32px',
    border: '1px solid #DEDEDE',
    textTransform: 'none',
    borderRadius: '30px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'transparent',
        opacity: 0.85,
        borderColor: theme.palette.mode === 'light' ? '#B8C7CC' : '#6C7A89',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        order: 2,
        fontSize: '1rem',
    },
}));

const GoButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#217C99',
    borderRadius: '30px',
    padding: '10px 32px',
    fontFamily: 'poppins',
    fontSize: '1.1rem',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: '0px 4px 10px rgba(33, 124, 153, 0.25)',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#1A5369',
        boxShadow: '0px 6px 15px rgba(33, 124, 153, 0.35)',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        order: 1,
        fontSize: '1rem',
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
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <SetupContainer onClick={handleOpenModal}>
                {/* Medicare Setup Header */}
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontFamily: 'poppins',
                        color: mode === 'light' ? '#7F7F7F' : '#B8C7CC',
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        mb: { xs: 2, sm: 2.5 }
                    }}
                >
                    Set Up Medicare
                </Typography>

                {/* Step Progress Indicators */}
                <ProgressBarContainer>
                    <ProgressBar variant="determinate" value={100} active={true} />
                    <ProgressBar variant="determinate" value={0} active={false} />
                    <ProgressBar variant="determinate" value={0} active={false} />
                </ProgressBarContainer>

                {/* Current step content - Connect Devices & Apps */}
                <StepContent>
                    <StepIcon>
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
                    </StepIcon>
                    <StepTitle>
                        Connect Devices & Apps
                    </StepTitle>
                </StepContent>

                {/* Buttons Container */}
                <ButtonsContainer>
                    <SkipButton
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent parent onClick from triggering
                            handleOpenModal();
                        }}
                    >
                        Skip
                    </SkipButton>
                    <GoButton
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent parent onClick from triggering
                            handleOpenModal();
                        }}
                        endIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    >
                        Get Started
                    </GoButton>
                </ButtonsContainer>
            </SetupContainer>

            {/* Medicare Setup Modal */}
            <SetupMedicareModal
                open={openModal}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default SetupMedicare; 