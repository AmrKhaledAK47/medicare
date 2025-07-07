'use client';

import React from 'react';
import { Box, Typography, Avatar, Paper, Divider, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from './Sidebar';

const ProfileContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: theme.palette.mode === 'light'
        ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
        : '0px 4px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    marginBottom: theme.spacing(3),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 80,
    height: 80,
    marginRight: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const ProfileName = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.5rem',
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
}));

const ProfileEmail = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '0.9rem',
    color: theme.palette.mode === 'light' ? '#97A4A9' : '#8A9DA3',
    marginTop: theme.spacing(0.5),
}));

const ProfileRole = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#E1F5FE' : '#1E3A45',
    color: theme.palette.mode === 'light' ? '#0288D1' : '#81D4FA',
    fontWeight: 500,
    marginTop: theme.spacing(1),
}));

const InfoSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const InfoTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    marginBottom: theme.spacing(1),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '0.95rem',
    color: theme.palette.mode === 'light' ? '#333333' : '#E0E0E0',
    marginBottom: theme.spacing(0.5),
}));

const ProfileInfo: React.FC = () => {
    const { user } = useAuth();
    const { mode } = useThemeContext();

    if (!user) {
        return null;
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileAvatar
                    alt={user.name || 'User'}
                    src="/avatars/patient.png"
                />
                <Box>
                    <ProfileName>{user.name || 'User'}</ProfileName>
                    <ProfileEmail>{user.email}</ProfileEmail>
                    <ProfileRole
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        size="small"
                    />
                </Box>
            </ProfileHeader>

            <Divider sx={{ my: 2 }} />

            <InfoSection>
                <InfoTitle>Account Information</InfoTitle>
                <InfoValue><strong>User ID:</strong> {user.id}</InfoValue>
                <InfoValue><strong>Role:</strong> {user.role}</InfoValue>
                <InfoValue><strong>Email:</strong> {user.email}</InfoValue>
            </InfoSection>

            {user.role === 'patient' && user.patientId && (
                <InfoSection>
                    <InfoTitle>Patient Information</InfoTitle>
                    <InfoValue><strong>Patient ID:</strong> {user.patientId}</InfoValue>
                </InfoSection>
            )}

            {user.role === 'practitioner' && user.practitionerId && (
                <InfoSection>
                    <InfoTitle>Practitioner Information</InfoTitle>
                    <InfoValue><strong>Practitioner ID:</strong> {user.practitionerId}</InfoValue>
                </InfoSection>
            )}
        </ProfileContainer>
    );
};

export default ProfileInfo; 