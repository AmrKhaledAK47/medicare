import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

const WelcomeContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    textAlign: 'center',
}));

const LoginButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: '12px 40px',
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

interface WelcomeBackProps {
    onLoginClick?: () => void;
}

const WelcomeBack: React.FC<WelcomeBackProps> = ({ onLoginClick }) => {
    return (
        <WelcomeContainer>
            <Box mb={3}>
                <Image src="/images/heart-icon.svg" alt="Heart Icon" width={100} height={100} />
            </Box>
            <Typography variant="h3" component="h2" gutterBottom>
                Welcome Back!
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                To keep connected with us please login with your personal info
            </Typography>
            <LoginButton variant="contained" onClick={onLoginClick}>
                Log In
            </LoginButton>
        </WelcomeContainer>
    );
};

export default WelcomeBack; 