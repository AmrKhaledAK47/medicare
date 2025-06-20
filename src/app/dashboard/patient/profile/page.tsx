'use client';

import React, { useRef, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Avatar,
    Switch,
    Divider,
    keyframes
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import Image from 'next/image';

// Define keyframes for spinning animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const ProfileContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: '1300px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5),
    },
}));

const ProfileSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: 'none',
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    padding: '6px 16px',
    textTransform: 'none',
    fontWeight: 500,
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    [theme.breakpoints.down('sm')]: {
        padding: '4px 12px',
        fontSize: '0.8rem',
    },
    '&.edit-button': {
        color: theme.palette.primary.main,
        fontSize: '16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
    },
    '&.change-button': {
        color: theme.palette.primary.main,
        background: 'transparent',
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
            background: 'rgba(33, 100, 125, 0.04)',
        }
    }
}));

const LabelText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#A3A0A0' : '#B8C7CC',
    fontSize: '14px',
    marginBottom: '4px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
    },
}));

const ValueText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#434966' : '#FFFFFF',
    fontSize: '16px',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
        marginBottom: theme.spacing(2),
    },
}));

// Create a styled component for the spinner
const Spinner = styled('svg')`
  animation: ${spin} 1.5s linear infinite;
`;

const ProfilePage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>('/avatars/patient.png');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Handle file select
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Reset error state
            setUploadError(null);

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('Image size should be less than 5MB');
                return;
            }

            // Set loading state
            setIsUploading(true);

            // Create a URL for the selected image
            const imageUrl = URL.createObjectURL(file);

            // Simulate upload delay (remove in production)
            setTimeout(() => {
                setAvatarSrc(imageUrl);
                setIsUploading(false);
                // In a real application, call uploadProfileImage(file) here
            }, 1000);
        }
    };

    // Trigger the file input click
    const handleEditAvatarClick = () => {
        fileInputRef.current?.click();
    };

    // Upload profile image function (to be implemented with your backend)
    const uploadProfileImage = (file: File) => {
        // Create a FormData object to send to your API
        const formData = new FormData();
        formData.append('profileImage', file);

        // Example API call (replace with your actual endpoint)
        // fetch('/api/upload-profile-image', {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     // Update the avatar with the URL from your server if needed
        //     // setAvatarSrc(data.imageUrl);
        // })
        // .catch(error => {
        //     console.error('Error uploading image:', error);
        // });

        console.log('Image would be uploaded here:', file.name);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'hidden',
                height: 'calc(100vh - 64px)',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1A1A1A'
            }}
        >
            {/* Main scrollable container */}
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    p: 3,
                    [theme.breakpoints.down('sm')]: {
                        p: 1.5,
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#A3A0A091' : '#333',
                        borderRadius: '4px',
                    },
                }}
            >
                <ProfileContainer>
                    {/* Page Title */}
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            color: mode === 'light' ? '#000000' : '#FFFFFF',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '1.25rem',
                                mb: 2,
                            },
                        }}
                    >
                        My Profile
                    </Typography>

                    {/* Profile Header Section */}
                    <ProfileSection>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'center', sm: 'center' }, 
                            mb: { xs: 2, sm: 2.5, md: 3 },
                            gap: { xs: 2, sm: 0 }
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                textAlign: { xs: 'center', sm: 'left' }
                            }}>
                                <Box sx={{ position: 'relative', mb: { xs: 1, sm: 0 } }}>
                                    <Avatar
                                        src={avatarSrc}
                                        alt="Noah Brown"
                                        sx={{
                                            width: { xs: 64, sm: 72 },
                                            height: { xs: 64, sm: 72 },
                                            border: `2px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            filter: isUploading ? 'brightness(0.8)' : 'none',
                                            '&:hover': {
                                                boxShadow: '0px 0px 0px 3px rgba(33, 100, 125, 0.3)'
                                            }
                                        }}
                                        onClick={handleEditAvatarClick}
                                    />

                                    {/* Loading indicator */}
                                    {isUploading && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <Spinner width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2V6" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 18V22" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                                <path d="M4.93 4.93L7.76 7.76" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.24 16.24L19.07 19.07" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                                <path d="M2 12H6" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18 12H22" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                                <path d="M4.93 19.07L7.76 16.24" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.24 7.76L19.07 4.93" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                            </Spinner>
                                        </Box>
                                    )}

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />

                                    {/* Edit avatar icon/button */}
                                    <Box
                                        component="button"
                                        sx={{
                                            position: 'absolute',
                                            bottom: -8,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: { xs: 24, sm: 28 },
                                            height: { xs: 24, sm: 28 },
                                            backgroundColor: '#267997',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                            opacity: isUploading ? 0.7 : 1,
                                            pointerEvents: isUploading ? 'none' : 'auto',
                                            zIndex: 10,
                                            '&:hover': {
                                                backgroundColor: '#21647D',
                                                transform: 'translateX(-50%) scale(1.1)'
                                            },
                                            '&:focus': {
                                                outline: 'none'
                                            }
                                        }}
                                        onClick={handleEditAvatarClick}
                                        disabled={isUploading}
                                        aria-label="Edit profile picture"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                </Box>
                                <Box sx={{ 
                                    ml: { xs: 0, sm: 2 },
                                    mt: { xs: 1, sm: 0 }
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '1.125rem', sm: '1.5rem' },
                                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                                        }}
                                    >
                                        Noah Brown
                                    </Typography>

                                    {/* Error message */}
                                    {uploadError && (
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                mt: 0.5
                                            }}
                                        >
                                            {uploadError}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                            <StyledButton className="edit-button" variant="text">
                                Edit
                                <Image 
                                    src="/icons/edit.svg" 
                                    alt="Edit" 
                                    width={16} 
                                    height={16} 
                                    style={{ marginLeft: '8px' }} 
                                />
                            </StyledButton>
                        </Box>
                    </ProfileSection>

                    {/* Personal Information Section */}
                    <ProfileSection>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mb: { xs: 2, sm: 2.5, md: 3 },
                            gap: { xs: 1, sm: 0 }
                        }}>
                            <SectionTitle>
                                Personal Information
                            </SectionTitle>
                            <StyledButton className="edit-button" variant="text">
                                Edit
                                <Image 
                                    src="/icons/edit.svg" 
                                    alt="Edit" 
                                    width={16} 
                                    height={16} 
                                    style={{ marginLeft: '8px' }} 
                                />
                            </StyledButton>
                        </Box>

                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            <Grid item xs={12} sm={4}>
                                <LabelText>Name</LabelText>
                                <ValueText>Noah Brown</ValueText>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LabelText>Date Of Birth</LabelText>
                                <ValueText>10/21/1990</ValueText>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LabelText>Age</LabelText>
                                <ValueText>26</ValueText>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LabelText>Phone Number</LabelText>
                                <ValueText>+ 1 2387428345</ValueText>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <LabelText>Email Address</LabelText>
                                <ValueText>Noah@gmail.com</ValueText>
                            </Grid>
                        </Grid>
                    </ProfileSection>

                    {/* Diseases Section */}
                    <ProfileSection>
                        <SectionTitle>
                            Diseases
                        </SectionTitle>

                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            <Grid item xs={12} sm={3}>
                                <LabelText>Speech</LabelText>
                                <ValueText>None</ValueText>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <LabelText>Physical</LabelText>
                                <ValueText>None</ValueText>
                            </Grid>
                        </Grid>
                    </ProfileSection>

                    {/* General Section */}
                    <ProfileSection>
                        <SectionTitle>
                            General
                        </SectionTitle>

                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mb: 3,
                            gap: { xs: 1, sm: 0 }
                        }}>
                            <Typography
                                sx={{
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    fontWeight: 500,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                            >
                                Change Password
                            </Typography>
                            <StyledButton className="change-button">
                                Change
                            </StyledButton>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mt: 3,
                            gap: { xs: 1, sm: 0 }
                        }}>
                            <Typography
                                sx={{
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    fontWeight: 500,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                            >
                                Notifications
                            </Typography>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1, sm: 0 }
                            }}>
                                <Typography
                                    sx={{
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        mr: { xs: 0, sm: 1 },
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    Enable Notifications
                                </Typography>
                                <Switch
                                    defaultChecked
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#267997',
                                            '&:hover': {
                                                backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                            },
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#267997',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </ProfileSection>
                </ProfileContainer>
            </Box>
        </Box>
    );
};

export default ProfilePage;
