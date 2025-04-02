'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import SignUpForm from '../../components/auth/SignUpForm';
import Logo from '../../components/common/Logo';
import { useAnimation } from '@/context/AnimationContext';
import PageTransition from '@/components/common/PageTransition';
import { motion } from 'framer-motion';

const PageContainer = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    background: '#2C809D',
});

const FormSection = styled('div')({
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1200px)': {
        width: '100%',
        justifyContent:'center'
    },
    '@media (max-width: 900px)': {
        width: '100%',
    },
});

const WelcomeSection = styled('div')({
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1200px)': {
        display:'none',
    },
    '@media (max-width: 900px)': {
        display: 'none',
    },
});

const WhiteCircle = styled(motion.div)({
    boxSizing: 'border-box',
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    right: '-225px',
    top: '-150px',
    background: '#FFFFFF',
    borderRadius: '50%',
    boxShadow: '0px 222px 89px rgba(0, 0, 0, 0.01), 0px 125px 75px rgba(0, 0, 0, 0.05), 0px 55px 55px rgba(0, 0, 0, 0.09), 0px 14px 30px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    '@media (max-width: 1200px)': {
        display: 'none',
    },
});

const LogoContainer = styled('div')({
    position: 'absolute',
    top: '31px',
    left: '56px',
    zIndex: 10,
    '@media (max-width: 1200px)': {
        marginTop:'-5px',
      marginLeft:'-35px'
          
      },
    '@media (max-width: 900px)': {
      marginTop:'-5px',
    marginLeft:'-35px'
        
    },
});


const FormContainer = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '480px',
    marginTop: '10px',
    '@media (max-width: 1400px)': {
        maxWidth: '450px',
    },
    '@media (max-width: 900px)': {
        maxWidth: '100%',
        padding: '0 20px',
    },
});

const SignUpTitle = styled(Typography)({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '54px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: '20px',
    marginTop: '90px',
    '@media (max-width: 1400px)': {
        fontSize: '32px',
        lineHeight: '48px',
        marginTop: '40px',
    },
    '@media (max-width: 900px)': {
        fontSize: '30px',
        lineHeight: '30px',
        marginTop: '70px',
    },
 
     
});

const SignUpSubtitle = styled(Typography)({
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#EFFAFC',
    '@media (max-width: 1400px)': {
        fontSize: '15px',
        lineHeight: '18px',
        marginBottom: '25px',
    },
    '@media (max-width: 900px)': {
        fontSize: '14px',
        lineHeight: '16px',
        marginBottom: '10px',
    },
});

const HeartIconContainer = styled(motion.div)({
    position: 'relative',
    width: '125px',
    height: '125px',
    marginBottom: '20px',
    zIndex: 2,
    '@media (max-width: 1400px)': {
        width: '150px',
        height: '150px',
    },
    '@media (max-width: 1200px)': {
        width: '130px',
        height: '130px',
        
    },
});

const WelcomeTitle = styled(motion(Typography))({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '39px',
    lineHeight: '60px',
    color: '#235467',
    marginBottom: '20px',
    textAlign: 'center',
    maxWidth: '507px',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1400px)': {
        fontSize: '38px',
        lineHeight: '55px',
    },
    '@media (max-width: 1200px)': {
        fontSize: '32px',
        lineHeight: '48px',
    },
});

const WelcomeText = styled(motion(Typography))({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '30px',
    color: '#235467',
    marginBottom: '40px',
    textAlign: 'center',
    maxWidth: '481px',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1400px)': {
        fontSize: '18px',
        lineHeight: '28px',
    },
    '@media (max-width: 1200px)': {
        fontSize: '16px',
        lineHeight: '24px',
        marginBottom: '30px',
    },
});

const LoginButton = styled(motion(Button))({
    width: '240px',
    height: '55px',
    background: 'linear-gradient(90deg, #3CB6E3 0%, #21647D 100%)',
    border: '1px solid #EFFAFC',
    borderRadius: '100px',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'none',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        background: 'linear-gradient(90deg, #35A3CC, #1A5369)',
    },
    '@media (max-width: 1400px)': {
        width: '280px',
        height: '65px',
        fontSize: '22px',
        lineHeight: '33px',
    },
    '@media (max-width: 1200px)': {
        width: '260px',
        height: '60px',
        fontSize: '20px',
        lineHeight: '30px',
    },
});

const SignUpPage = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const { setDirection } = useAnimation();

    const handleLoginClick = () => {
        setDirection('right'); // Set animation direction
        setTimeout(() => {
        router.push('/login');
        }, 100); // Small delay to ensure animation starts before navigation
    };

    // Animation variants for the white circle
    const circleVariants = {
        initial: {
            scale: 0.92,
            rotate: 3
        },
        animate: {
            scale: [0.92, 1.04, 0.92],
            rotate: [3, -2, 3],
            transition: {
                duration: 24,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse" as const
            }
        }
    };

    // Animation variants for the heart icon
    const heartVariants = {
        initial: {
            opacity: 0.9,
            y: 0
        },
        animate: {
            opacity: [0.9, 1, 0.9],
            y: [0, -10, 0],
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse" as const,
                delay: 0.5  // slight delay for a more interesting effect
            }
        }
    };

    // Animation for the welcome content
    const textVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: custom * 0.2 + 0.5
            }
        })
    };

    // Animation for the button with hover effect
    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 1.1
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: '0px 84px 34px rgba(0, 0, 0, 0.01), 0px 42px 28px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.09), 0px 8px 12px rgba(0, 0, 0, 0.1)',
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <PageTransition>
            <PageContainer>
                <LogoContainer>
                    <Logo color="white" position="relative" />
                </LogoContainer>

                <FormSection>
                    <FormContainer>
                        <SignUpTitle>Sign Up</SignUpTitle>
                        <SignUpSubtitle>-Or create account via email-</SignUpSubtitle>
                        <SignUpForm onLoginClick={handleLoginClick} />
                    </FormContainer>
                </FormSection>

                <WelcomeSection>
                    <WhiteCircle
                        initial="initial"
                        animate="animate"
                        variants={circleVariants}
                    />
                    <HeartIconContainer
                        initial="initial"
                        animate="animate"
                        variants={heartVariants}
                    >
                        <Image
                            src="/images/heart-icon.svg"
                            alt="Heart Icon"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </HeartIconContainer>
                    <WelcomeTitle
                        initial="initial"
                        animate="animate"
                        variants={textVariants}
                        custom={0}
                    >
                        Welcome Back!
                    </WelcomeTitle>
                    <WelcomeText
                        initial="initial"
                        animate="animate"
                        variants={textVariants}
                        custom={1}
                    >
                        To keep connected with us please <br /> login with your personal info
                    </WelcomeText>
                    <LoginButton
                        onClick={handleLoginClick}
                        disableRipple
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        variants={buttonVariants}
                    >
                        Log In
                    </LoginButton>
                </WelcomeSection>
            </PageContainer>
        </PageTransition>
    );
};

export default SignUpPage; 