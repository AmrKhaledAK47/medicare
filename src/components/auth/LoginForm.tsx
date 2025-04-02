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
       fontSize:'16px'
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

const initialValues: LoginFormValues = {
    email: '',
    password: '',
};

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { setDirection } = useAnimation();

    const handleSubmit = (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
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
                    <InputWrapper>
                        <Input
                            name="email"
                            label="Email Address"
                            fullWidth
                            autoComplete="new-password"
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
                            autoComplete="new-password"
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