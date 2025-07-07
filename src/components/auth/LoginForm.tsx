'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, InputAdornment, IconButton, useTheme, useMediaQuery, Alert, Snackbar, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Input from '../common/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnimation } from '@/context/AnimationContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthError } from '@/services/api.service';

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
    padding: theme.spacing(2),
    '@media (max-width:1200px)': {
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',



    },
    '@media (max-width: 900px)': {
        padding: theme.spacing(1.5),
    },
    '@media (max-width: 600px)': {
        padding: theme.spacing(1),
    },
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
    '@media (max-width: 1200px)': {
        width: '230px',
        height: '52px',
        fontSize: '17px',
        lineHeight: '30px',
        marginTop: '18px',
        marginBottom: '18px',
    },
    '@media (max-width: 900px)': {
        width: '170px',
        height: '20px',
        fontSize: '14px',
        lineHeight: '26px',
        marginTop: '10px',

    },
    '@media (max-width: 600px)': {

        width: '170px',
        height: '20px',
        fontSize: '16px',
        lineHeight: '26px',
        marginTop: '10px',

    },
});

const ForgotPasswordLink = styled('a')(({ theme }) => ({
    marginTop: theme.spacing(-2.5),
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
    '@media (max-width: 1200px)': {
        fontSize: '15px',


    },
    '@media (max-width:600px)': {
        fontSize: '15px',


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

const SignUpLink = styled('span')({
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
    '@media (max-width: 600px)': {
        width: '16px',
        height: '16px',
    },
});

const InputWrapper = styled(Box)({
    width: '100%',
    marginBottom: '16px',
    '@media (max-width: 600px)': {
        marginBottom: '12px',
    },
});

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

// Enhanced error alert with animations
const ErrorAlert = styled(motion.div)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid #ff6b6b',
    color: '#ff6b6b',
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
}));

const ErrorIcon = styled(Box)({
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ErrorContent = styled(Box)({
    flex: 1,
});

const ErrorTitle = styled(Typography)({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '4px',
});

const ErrorMessage = styled(Typography)({
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '13px',
    lineHeight: '1.4',
});

const ErrorSuggestion = styled(motion.div)({
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    fontSize: '12px',
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '4px',
    color: '#ff6b6b',
});

const SuccessAlert = styled(Alert)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4caf50',
    border: '1px solid #4caf50',
    '& .MuiAlert-icon': {
        color: '#4caf50',
    },
    '& .MuiAlert-message': {
        fontFamily: '"Montserrat", sans-serif',
    }
}));

const LoadingOverlay = styled(motion.div)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 128, 157, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
});

const ShakeBox = styled(motion.div)({
    width: '100%',
});

// Error suggestion component with action button
const ErrorActionButton = styled(Button)({
    marginTop: '8px',
    fontSize: '12px',
    padding: '4px 12px',
    textTransform: 'none',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    color: '#ff6b6b',
    '&:hover': {
        backgroundColor: 'rgba(255, 107, 107, 0.3)',
    }
});

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [shake, setShake] = useState(false);
    const [errorType, setErrorType] = useState<'invalid' | 'not-found' | 'other' | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { setDirection } = useAnimation();
    const { login, error, isLoading, clearError } = useAuth();

    // Get return URL from query params if it exists
    const returnUrl = searchParams.get('returnUrl') || '';
    const registered = searchParams.get('registered') === 'true';

    useEffect(() => {
        clearError();

        // Show success message if redirected from registration
        if (registered) {
            setShowSuccessMessage(true);

            // Clear the registered parameter from URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);

            // Hide success message after 5 seconds
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [clearError, registered]);

    // Determine error type when error changes
    useEffect(() => {
        if (error) {
            if (error.includes('not found')) {
                setErrorType('not-found');
            } else if (error.includes('Invalid email or password')) {
                setErrorType('invalid');
                // Trigger shake animation
                setShake(true);
                setTimeout(() => setShake(false), 500);
            } else {
                setErrorType('other');
            }
        } else {
            setErrorType(null);
        }
    }, [error]);

    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        // Use a try-catch block to prevent unhandled promise rejections
        try {
            // Remove all console logs, even in development mode

            // Prevent errors from propagating to the console
            await login({
                email: values.email,
                password: values.password
            }).catch(err => {
                // Error is already handled by the AuthContext
                // This catch prevents the error from propagating to the console
                // Remove console logs here too
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPasswordClick = () => {
        setDirection('left');
        clearError();
        setTimeout(() => {
            router.push('/forgot-password');
        }, 100);
    };

    const handleSignUpRedirect = () => {
        setDirection('left');
        clearError();
        setTimeout(() => {
            onSignUpClick();
        }, 100);
    };

    // Direct form submission handler
    const handleDirectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Basic validation
        if (!email || !password) {
            return;
        }

        // Remove all console logs, even in development mode

        // Prevent errors from propagating to the console
        await login({ email, password }).catch(err => {
            // Error is already handled by the AuthContext
            // This catch prevents the error from propagating to the console
            // Remove console logs here too
        });
    };

    // Render error message based on type
    const renderErrorMessage = () => {
        if (!error) return null;

        const errorVariants = {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
        };

        const suggestionVariants = {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: 'auto', transition: { delay: 0.3, duration: 0.3 } },
        };

        return (
            <ErrorAlert
                initial="initial"
                animate="animate"
                exit="exit"
                variants={errorVariants}
                layout
            >
                <ErrorIcon>
                    <ErrorOutlineIcon color="error" />
                </ErrorIcon>
                <ErrorContent>
                    <ErrorTitle>
                        {errorType === 'not-found' ? 'Account Not Found' :
                            errorType === 'invalid' ? 'Invalid Credentials' :
                                'Login Error'}
                    </ErrorTitle>
                    <ErrorMessage>{error}</ErrorMessage>

                    <AnimatePresence>
                        {errorType === 'not-found' && (
                            <ErrorSuggestion
                                initial="initial"
                                animate="animate"
                                variants={suggestionVariants}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <InfoIcon fontSize="small" sx={{ mr: 1, fontSize: '16px' }} />
                                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                        It looks like you don't have an account yet.
                                    </Typography>
                                </Box>
                                <ErrorActionButton
                                    startIcon={<AccountCircleIcon />}
                                    onClick={handleSignUpRedirect}
                                    size="small"
                                    fullWidth
                                >
                                    Create an account
                                </ErrorActionButton>
                            </ErrorSuggestion>
                        )}

                        {errorType === 'invalid' && (
                            <ErrorSuggestion
                                initial="initial"
                                animate="animate"
                                variants={suggestionVariants}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <InfoIcon fontSize="small" sx={{ mr: 1, fontSize: '16px' }} />
                                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                        Forgot your password? You can reset it.
                                    </Typography>
                                </Box>
                                <ErrorActionButton
                                    startIcon={<LockIcon />}
                                    onClick={handleForgotPasswordClick}
                                    size="small"
                                    fullWidth
                                >
                                    Reset password
                                </ErrorActionButton>
                            </ErrorSuggestion>
                        )}
                    </AnimatePresence>
                </ErrorContent>
                <CloseButton onClick={clearError} size="small">
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                        ✕
                    </motion.div>
                </CloseButton>
            </ErrorAlert>
        );
    };

    return (
        <>
            {isLoading && (
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
                            Logging in...
                        </Typography>
                    </Box>
                </LoadingOverlay>
            )}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleSubmit: formikHandleSubmit }) => (
                    <StyledForm
                        autoComplete="off"
                        onSubmit={handleDirectSubmit}
                    >
                        {showSuccessMessage && (
                            <SuccessAlert
                                icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                                severity="success"
                                onClose={() => setShowSuccessMessage(false)}
                            >
                                Registration successful! You can now login with your new account.
                            </SuccessAlert>
                        )}

                        <AnimatePresence>
                            {error && renderErrorMessage()}
                        </AnimatePresence>

                        <ShakeBox
                            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <InputWrapper>
                                <Input
                                    name="email"
                                    label="Email Address"
                                    fullWidth
                                    autoComplete="off"
                                    data-form-type="other"
                                    endAdornment={
                                        <IconContainer>
                                            <EmailIcon sx={{
                                                color: '#FFFFFF',
                                                marginRight: '22px',
                                                fontSize: isMobile ? '18px' : '24px'
                                            }} />
                                        </IconContainer>
                                    }
                                />
                            </InputWrapper>

                            <InputWrapper>
                                <Input
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    autoComplete="off"
                                    data-form-type="other"
                                    endAdornment={
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{
                                                color: '#FFFFFF',
                                                padding: isMobile ? '4px' : '6px',
                                                marginRight: '3px'
                                            }}
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            {showPassword ?
                                                <VisibilityOffIcon fontSize={isMobile ? "small" : "medium"} /> :
                                                <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
                                            }
                                        </IconButton>
                                    }
                                />
                            </InputWrapper>
                        </ShakeBox>

                        <ForgotPasswordLink onClick={handleForgotPasswordClick}>
                            Forgot Password?
                        </ForgotPasswordLink>

                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            disableRipple
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </SubmitButton>

                        <SignUpPrompt>
                            Don't have an account?{' '}
                            <SignUpLink onClick={() => {
                                clearError();
                                onSignUpClick();
                            }}>Sign Up</SignUpLink>
                        </SignUpPrompt>

                    </StyledForm>
                )}
            </Formik>
        </>
    );
};

export default LoginForm; 