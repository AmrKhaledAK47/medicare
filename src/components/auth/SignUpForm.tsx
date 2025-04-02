'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, InputAdornment, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import Input from '../common/Input';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import QrCodeIcon from '@mui/icons-material/QrCode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accessCode: string;
}

interface SignUpFormProps {
    onLoginClick: () => void;
}

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '480px',
    margin: '0 auto',
    padding: theme.spacing(2),
}));

const SubmitButton = styled(Button)({
    width: '240px',
    height: '55px',
    marginTop: '25px',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
    borderRadius: '100px',
    border: '1px solid #2C809D',
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
        background: 'linear-gradient(90deg, #35A3CC 0%, #1A5369 100%)',
    },
    '@media (max-width: 1400px)': {
        width: '240px',
        height: '55px',
        fontSize: '18px',
        lineHeight: '32px',
    },
    '@media (max-width: 900px)': {
        width: '160px',
        height: '20px',
        fontSize: '14px',
        lineHeight: '26px',
        marginTop: '10px',
    },
});

const LoginPrompt = styled(Typography)({
    fontFamily: '"Montserrat", sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#EFFAFC',
    marginBottom: '16px',
    textAlign: 'center',
    width: '100%',
    '@media (max-width: 2000px)': {
        fontSize: '16px',
        lineHeight: '18px',
    },
    '@media (max-width: 1400px)': {
        fontSize: '16px',
        lineHeight: '18px',
    },
    '@media (max-width: 1200px)': {
        fontSize: '16px',
        lineHeight: '17px',
        marginBottom: '14px',
    },
    '@media (max-width: 900px)': {
        fontSize: '16px',
        lineHeight: '16px',
        marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
        fontSize: '14px',
        lineHeight: '15px',
        marginBottom: '10px',
    },
});

const LoginLink = styled('span')({
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#EFFAFC',
    '&:hover': {
        textDecoration: 'underline',
    },
    '@media (max-width: 600px)': {
        fontSize: '16px'
    },
});

const IconContainer = styled(Box)({
    width: '20px',
    height: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 1400px)': {
        width: '18px',
        height: '18px',
    },
    marginRight: '10px',
});

const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Name is too short')
        .required('Full name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    accessCode: Yup.string()
        .required('Access code is required'),
});

const initialValues: SignUpFormValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accessCode: '',
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onLoginClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleSubmit = (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
        // Handle form submission here
        console.log('Form values', values);
        setTimeout(() => {
            setSubmitting(false);
            router.push('/patient/dashboard');
        }, 1000);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <StyledForm autoComplete="off">
                    <Input
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconContainer>
                                <PersonIcon sx={{ color: '#FFFFFF' }} />
                            </IconContainer>
                        }
                    />
                    <Input
                        name="email"
                        label="Email Address"
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconContainer>
                                <EmailIcon sx={{ color: '#FFFFFF' }} />
                            </IconContainer>
                        }
                    />
                    <Input
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                sx={{ color: '#FFFFFF', padding: '6px', marginRight: '5px' }}
                                size="small"
                            >
                                {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                        }
                    />
                    <Input
                        name="confirmPassword"
                        label="Repeat Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconButton
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                                sx={{ color: '#FFFFFF', padding: '6px', marginRight: '5px' }}
                                size="small"
                            >
                                {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                        }
                    />
                    <Input
                        name="accessCode"
                        label="Access Code"
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconContainer>
                                <QrCodeIcon sx={{ color: '#FFFFFF', marginRight: '7px' }} />
                            </IconContainer>
                        }
                    />

                    <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        disableRipple
                    >
                        Sign Up
                    </SubmitButton>

                    <LoginPrompt>
                        Already have an account?{' '}
                        <LoginLink onClick={onLoginClick}>Log In</LoginLink>
                    </LoginPrompt>

                </StyledForm>
            )}
        </Formik>
    );
};

export default SignUpForm;