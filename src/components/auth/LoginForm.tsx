'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, InputAdornment, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from '../common/Input';
import { useRouter } from 'next/navigation';
import { useAnimation } from '@/context/AnimationContext';

interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSignUpClick: () => void;
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
    marginTop: '15px',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
    borderRadius: '100px',
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    border: '1px solid #2C809D',
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
        width: '220px',
        height: '50px',
        fontSize: '16px',
        lineHeight: '26px',
        marginTop: '20px',
        marginBottom: '16px',
    },
});

const ForgotPasswordLink = styled('a')(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: '#EFFAFC',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const SignUpPrompt = styled(Typography)({
    fontFamily: '"Montserrat", sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#EFFAFC',
    marginBottom: '16px',
    '@media (max-width: 1400px)': {
        fontSize: '14px',
        lineHeight: '18px',
    },
    '@media (max-width: 900px)': {
        fontSize: '13px',
        lineHeight: '16px',
    },
});

const SignUpLink = styled('span')({
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#EFFAFC',
    '&:hover': {
        textDecoration: 'underline',
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
});

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

const initialValues: LoginFormValues = {
    email: '',
    password: '',
};

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { setDirection } = useAnimation();

    const handleSubmit = (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        // Handle form submission here
        console.log('Form values', values);
        setTimeout(() => {
            setSubmitting(false);
            router.push('/dashboard');
        }, 1000);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPasswordClick = () => {
        setDirection('left'); // Set animation direction
        setTimeout(() => {
            router.push('/forgot-password');
        }, 100);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <StyledForm autoComplete="off">
                    <Input
                        name="email"
                        label="Email Address"
                        fullWidth
                        autoComplete="new-password"
                        data-form-type="other"
                        endAdornment={
                            <IconContainer>
                                <EmailIcon sx={{ color: '#FFFFFF', marginRight: '22px' }} />
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
                                sx={{ color: '#FFFFFF', padding: '6px', marginRight: '3px' }}
                                size="small"
                            >
                                {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                        }
                    />

                    <ForgotPasswordLink onClick={handleForgotPasswordClick}>
                        Forgot Password?
                    </ForgotPasswordLink>

                    <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        disableRipple
                    >
                        Log In
                    </SubmitButton>

                    <SignUpPrompt>
                        Don't have an account?{' '}
                        <SignUpLink onClick={onSignUpClick}>Sign Up</SignUpLink>
                    </SignUpPrompt>
                </StyledForm>
            )}
        </Formik>
    );
};

export default LoginForm; 