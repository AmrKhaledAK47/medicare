'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Divider,
    Chip,
    Switch,
    FormControlLabel,
    Avatar,
    Tooltip,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import Image from 'next/image';

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
        maxWidth: '600px',
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

const ShareButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#267997',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '10px 20px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '15px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#21647D',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
}));

const ShareOptionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#262626',
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
    borderRadius: '10px',
    padding: '16px 24px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    borderColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
    border: '1px solid',
    marginBottom: '16px',
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#E6F2F7' : '#1A2327',
        borderColor: '#267997',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#262626',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light' ? '#CCD6DD' : '#444',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#267997',
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
}));

const ContactCard = styled(Box)(({ theme }) => ({
    padding: '16px',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#1A2327',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.15s',
    opacity: 0,
}));

const PermissionSection = styled(Box)(({ theme }) => ({
    marginTop: '24px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.2s',
    opacity: 0,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    marginBottom: '16px',
    fontFamily: '"Poppins", sans-serif',
}));

const PermissionItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid rgba(51, 51, 51, 0.7)',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#E6F2F7' : '#1A2327',
    color: '#267997',
    fontWeight: 500,
    borderRadius: '8px',
}));

const InfoText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginTop: '8px',
}));

const AccessLabel = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const ForText = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    marginBottom: '8px',
}));

interface ShareProfileModalProps {
    open: boolean;
    onClose: () => void;
}

const ShareProfileModal: React.FC<ShareProfileModalProps> = ({ open, onClose }) => {
    const { mode } = useThemeContext();
    const [activeStep, setActiveStep] = useState<'options' | 'provider' | 'email'>('options');
    const [email, setEmail] = useState('');
    const [managerAccess, setManagerAccess] = useState(false);
    const [showAddedContacts, setShowAddedContacts] = useState(false);

    const handleShareOptionClick = (option: 'provider' | 'email') => {
        setActiveStep(option);
    };

    const handleBack = () => {
        setActiveStep('options');
    };

    const handleSendInvite = () => {
        setShowAddedContacts(true);
        setEmail('');
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <StyledDialogTitle>
                Sharing Settings
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
                <ForText>for Noah Brown</ForText>

                {activeStep === 'options' && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <ShareOptionButton
                                onClick={() => handleShareOptionClick('provider')}
                                startIcon={
                                    <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20 8V14" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M23 11H17" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                }
                            >
                                Share with provider
                            </ShareOptionButton>

                            <ShareOptionButton
                                onClick={() => handleShareOptionClick('email')}
                                startIcon={
                                    <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 6L12 13L2 6" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                }
                            >
                                Share by email
                            </ShareOptionButton>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <SubTitle>Managers:</SubTitle>
                                <InfoText>Can fully edit and manage the entire profile</InfoText>
                            </Box>

                            <ContactCard>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: '#267997' }}>NB</Avatar>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: '16px', color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                            noahbrown@gmail.com
                                        </Typography>
                                        <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                            Noah Brown
                                        </Typography>
                                    </Box>
                                </Box>
                                <StyledChip label="Manager" size="small" />
                            </ContactCard>

                            {showAddedContacts && (
                                <ContactCard>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: '#6470E5' }}>SJ</Avatar>
                                        <Box>
                                            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                sarah.johnson@example.com
                                            </Typography>
                                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                                Sarah Johnson
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <StyledChip
                                            label={managerAccess ? "Manager" : "Viewer"}
                                            size="small"
                                            sx={{
                                                backgroundColor: managerAccess
                                                    ? (mode === 'light' ? '#E6F2F7' : '#1A2327')
                                                    : (mode === 'light' ? '#F0F0F0' : '#333'),
                                                color: managerAccess ? '#267997' : (mode === 'light' ? '#6C7A89' : '#B8C7CC')
                                            }}
                                        />
                                        <Tooltip title="Remove">
                                            <IconButton size="small" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </ContactCard>
                            )}

                            <Box sx={{ mt: 4, mb: 2 }}>
                                <SubTitle>Viewers:</SubTitle>
                                <InfoText>Can see the entire profile except some data types</InfoText>
                            </Box>

                            <Box sx={{
                                padding: 3,
                                borderRadius: '12px',
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#1A2327',
                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                textAlign: 'center',
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                animation: `${slideUp} 0.4s ease-out forwards`,
                                animationDelay: '0.2s',
                                opacity: 0,
                            }}>
                                <Typography sx={{ mb: 1 }}>No viewers added yet</Typography>
                                <Typography variant="body2">
                                    Share your profile with family members or caregivers to give them view-only access
                                </Typography>
                            </Box>
                        </Box>
                    </>
                )}

                {activeStep === 'email' && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton onClick={handleBack} sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mr: 1 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </IconButton>
                            <Typography sx={{ fontWeight: 600, fontSize: '18px', color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                Share by email
                            </Typography>
                        </Box>

                        <StyledTextField
                            label="Email address"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                        />

                        <PermissionSection>
                            <SubTitle>Permissions</SubTitle>
                            <Box sx={{
                                borderRadius: '12px',
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#1A2327',
                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                padding: 2,
                                mb: 3
                            }}>
                                <PermissionItem>
                                    <AccessLabel>Manager access</AccessLabel>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={managerAccess}
                                                onChange={(e) => setManagerAccess(e.target.checked)}
                                                color="primary"
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#267997',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#267997',
                                                    },
                                                }}
                                            />
                                        }
                                        label=""
                                    />
                                </PermissionItem>

                                <Box sx={{ p: 1.5 }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        fontStyle: 'italic'
                                    }}>
                                        {managerAccess
                                            ? "Can fully edit and manage the entire profile"
                                            : "Can see the entire profile except some data types"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ShareButton
                                    onClick={handleSendInvite}
                                    startIcon={
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                >
                                    Send Invite
                                </ShareButton>
                            </Box>
                        </PermissionSection>
                    </>
                )}

                {activeStep === 'provider' && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton onClick={handleBack} sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mr: 1 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </IconButton>
                            <Typography sx={{ fontWeight: 600, fontSize: '18px', color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                Share with provider
                            </Typography>
                        </Box>

                        <StyledTextField
                            label="Search for provider"
                            fullWidth
                            variant="outlined"
                            placeholder="Enter provider name"
                        />

                        <Box sx={{
                            padding: 3,
                            borderRadius: '12px',
                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#1A2327',
                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                            textAlign: 'center',
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            mt: 2,
                            mb: 3,
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.1s',
                            opacity: 0,
                        }}>
                            <Box sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                backgroundColor: mode === 'light' ? '#E6F2F7' : '#1A2327',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px auto'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Box>
                            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '16px' }}>No providers found</Typography>
                            <Typography variant="body2">
                                Search for your healthcare provider to share your profile
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography sx={{
                                fontSize: '15px',
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                textAlign: 'center'
                            }}>
                                Can't find your provider? You can also share your profile by email.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleShareOptionClick('email')}
                                    sx={{
                                        borderColor: '#267997',
                                        color: '#267997',
                                        borderRadius: '10px',
                                        padding: '8px 20px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            borderColor: '#21647D',
                                            backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                        }
                                    }}
                                >
                                    Share by email instead
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default ShareProfileModal; 