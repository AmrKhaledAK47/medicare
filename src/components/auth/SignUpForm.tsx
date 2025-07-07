'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, InputAdornment, IconButton, useTheme, useMediaQuery, Alert, CircularProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff, CheckCircle, Error as ErrorIcon, Info as InfoIcon } from '@mui/icons-material';
import Image from 'next/image';
import Input from '../common/Input';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import QrCodeIcon from '@mui/icons-material/QrCode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '@/context/AuthContext';
import apiService from '@/services/api.service';
import { motion, AnimatePresence } from 'framer-motion';

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

const ErrorAlert = styled(Alert)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    '& .MuiAlert-message': {
        fontFamily: '"Montserrat", sans-serif',
    }
}));

const SuccessAlert = styled(Alert)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    '& .MuiAlert-message': {
        fontFamily: '"Montserrat", sans-serif',
    }
}));

const AccessCodeStatus = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '40px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
});

// Loading overlay similar to LoginForm
const LoadingOverlay = styled(motion.div)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 128, 157, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    isolation: 'isolate',
    backdropFilter: 'blur(3px)',
});

// Enhanced validation schema with stronger password requirements
const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Name is too short')
        .required('Full name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
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

// Access code verification component
const AccessCodeVerifier: React.FC = () => {
    const { values, setFieldValue, setFieldError } = useFormikContext<SignUpFormValues>();
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    // Verify access code when it changes and has at least 6 characters
    useEffect(() => {
        const accessCode = values.accessCode;

        if (accessCode && accessCode.length >= 6) {
            const verifyCode = async () => {
                setVerifying(true);
                setVerified(false);
                setVerificationError(null);

                try {
                    await apiService.verifyAccessCode(accessCode);
                    setVerified(true);
                } catch (error: any) {
                    setVerificationError(error.message);
                    setFieldError('accessCode', error.message);
                } finally {
                    setVerifying(false);
                }
            };

            // Debounce the verification to avoid too many API calls
            const timer = setTimeout(() => {
                verifyCode();
            }, 500);

            return () => clearTimeout(timer);
        } else {
            setVerified(false);
            setVerificationError(null);
        }
    }, [values.accessCode, setFieldError]);

    if (!values.accessCode) return null;

    return (
        <AccessCodeStatus>
            {verifying && <CircularProgress size={16} color="info" />}
            {!verifying && verified && (
                <Tooltip title="Access code verified">
                    <CheckCircle color="success" fontSize="small" />
                </Tooltip>
            )}
            {!verifying && verificationError && (
                <Tooltip title={verificationError}>
                    <ErrorIcon color="error" fontSize="small" />
                </Tooltip>
            )}
        </AccessCodeStatus>
    );
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onLoginClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accessCodeVerified, setAccessCodeVerified] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { register, error, isLoading, clearError } = useAuth();

    useEffect(() => {
        clearError();
    }, [clearError]);

    // Add effect to redirect after successful registration
    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                router.push('/login?registered=true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, router]);

    const handleSubmit = async (
        values: SignUpFormValues,
        { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
    ) => {
        try {
            setIsSubmitting(true);

            // First, verify the access code one more time
            try {
                await apiService.verifyAccessCode(values.accessCode);
            } catch (codeError: any) {
                setFieldError('accessCode', codeError.message || 'Invalid access code');
                setSubmitting(false);
                setIsSubmitting(false);
                return;
            }

            // Create a RegisterRequest object that matches the expected interface
            const registerData = {
                name: values.fullName,
                email: values.email,
                password: values.password,
                repeatPassword: values.confirmPassword,
                accessCode: values.accessCode
            };

            // Call register with the properly formatted data
            await register(registerData);

            // Show success message
            setShowSuccessMessage(true);
        } catch (error: any) {
            console.error('Registration error:', error);
            // If there's an error that wasn't caught by the AuthContext, display it
            if (!error) return;
        } finally {
            setSubmitting(false);
            setIsSubmitting(false);
        }
    };

    // Direct form submission handler for better control
    const handleDirectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.currentTarget);
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const accessCode = formData.get('accessCode') as string;

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword || !accessCode) {
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Verify access code
            await apiService.verifyAccessCode(accessCode);

            // Create registration data
            const registerData = {
                name: fullName,
                email,
                password,
                repeatPassword: confirmPassword,
                accessCode
            };

            // Register user
            await register(registerData);

            // Show success message
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            {/* Loading overlay */}
            {(isLoading || isSubmitting) && (
                <LoadingOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Box sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <Box sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(90deg, #3CB6E3 0%, #21647D 100%)',
                                    }} />
                                </Box>
                            </Box>
                        </motion.div>
                        <Typography variant="h6" sx={{ color: '#2C809D', fontFamily: '"Poppins", sans-serif' }}>
                            Creating your account...
                        </Typography>
                    </Box>
                </LoadingOverlay>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting: formikSubmitting, values, errors, touched }) => (
                    <StyledForm autoComplete="off" onSubmit={handleDirectSubmit}>
                        <AnimatePresence>
                            {showSuccessMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    style={{ width: '100%' }}
                                >
                                    <SuccessAlert severity="success" onClose={() => setShowSuccessMessage(false)}>
                                        Registration successful! Redirecting to login page...
                                    </SuccessAlert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    style={{ width: '100%' }}
                                >
                                    <ErrorAlert severity="error" onClose={clearError}>
                                        {error}
                                    </ErrorAlert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Input
                            name="fullName"
                            label="Full Name"
                            fullWidth
                            autoComplete="new-password"
                            data-form-type="other"
                            disabled={isLoading || isSubmitting || showSuccessMessage}
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
                            disabled={isLoading || isSubmitting || showSuccessMessage}
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
                            disabled={isLoading || isSubmitting || showSuccessMessage}
                            endAdornment={
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{ color: '#FFFFFF', padding: '6px', marginRight: '5px' }}
                                    size="small"
                                    disabled={isLoading || isSubmitting || showSuccessMessage}
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
                            disabled={isLoading || isSubmitting || showSuccessMessage}
                            endAdornment={
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                    sx={{ color: '#FFFFFF', padding: '6px', marginRight: '5px' }}
                                    size="small"
                                    disabled={isLoading || isSubmitting || showSuccessMessage}
                                >
                                    {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                </IconButton>
                            }
                        />
                        <Box position="relative" width="100%">
                            <Input
                                name="accessCode"
                                label="Access Code"
                                fullWidth
                                autoComplete="new-password"
                                data-form-type="other"
                                disabled={isLoading || isSubmitting || showSuccessMessage}
                                endAdornment={
                                    <IconContainer>
                                        <QrCodeIcon sx={{ color: '#FFFFFF', marginRight: '7px' }} />
                                    </IconContainer>
                                }
                            />
                            <AccessCodeVerifier />
                        </Box>

                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting || isLoading || showSuccessMessage}
                            disableRipple
                        >
                            {isLoading || isSubmitting ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                    Signing Up...
                                </Box>
                            ) : (
                                'Sign Up'
                            )}
                        </SubmitButton>

                        <LoginPrompt>
                            Already have an account?{' '}
                            <LoginLink onClick={() => {
                                clearError();
                                onLoginClick();
                            }}>Log In</LoginLink>
                        </LoginPrompt>

                    </StyledForm>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;