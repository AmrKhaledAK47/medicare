'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '../../components/auth/LoginForm';
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
  '@media (max-width: 600px)': {
    height: 'auto',
    minHeight: '100vh',
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
    display: 'none',
    },
  '@media (max-width: 900px)': {
    display: 'none',
  },
});

const FormSection = styled('div')({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 2,
  '@media (max-width: 1400px)': {
  
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 1200px)': {
    width: '100%',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 900px)': {
    width: '100%',
    padding: '30px 20px',
  },
  '@media (max-width: 600px)': {
  marginTop:'120px'
  },

});

const WhiteCircle = styled(motion.div)({
  boxSizing: 'border-box',
  position: 'absolute',
  width: '1000px',
  height: '1000px',
  left: '-225px',
  top: '-150px',
  background: '#FFFFFF',
  borderRadius: '50%',
  boxShadow: '0px 222px 89px rgba(0, 0, 0, 0.01), 0px 125px 75px rgba(0, 0, 0, 0.05), 0px 55px 55px rgba(0, 0, 0, 0.09), 0px 14px 30px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  '@media (max-width: 1400px)': {
   marginLeft:'-50px'
  },
  '@media (max-width: 1200px)': {
    display: 'none',
  }
});

const LogoContainer = styled('div')({
  position: 'absolute',
  top: '31px',
  left: '56px',
  zIndex: 10,
  '@media (max-width: 1200px)': {
    display: 'none'
  }
});

const MobileLogoContainer = styled('div')({
  display: 'none',
  position: 'relative',
  zIndex: 10,
  '@media (max-width: 1200px)': {
    display: 'flex',
    position: 'absolute',
    top: '31px',
    left: '56px',
    marginTop: '-5px',
    marginLeft: '-35px'
  },
  '@media (max-width: 900px)': {
    marginTop: '-5px',
    marginLeft: '-35px'
  },
  '@media (max-width: 600px)': {
    marginTop:'-115px'
    },
});

const FormContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '480px',
  marginTop: '10px',
  zIndex: 3,
  '@media (max-width: 1400px)': {
    maxWidth: '450px',
  },
  '@media (max-width: 1200px)': {
    maxWidth: '500px',
    marginTop: '0',
    margin: '0 auto',
  },
  '@media (max-width: 900px)': {
    maxWidth: '500px',
    padding: '0',
    marginTop: '0',
  },
  '@media (max-width: 600px)': {
    maxWidth: '450px',
    padding: '0',
    marginTop: '0',
  },
});

const LoginTitle = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '28px',
  lineHeight: '54px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  color: '#FFFFFF',
  marginBottom: '20px',
  marginTop: '0',
  '@media (max-width: 1400px)': {
    fontSize: '32px',
    lineHeight: '48px',
  },
  '@media (max-width: 1200px)': {
    fontSize: '30px',
    lineHeight: '45px',
  },
  '@media (max-width: 900px)': {
    fontSize: '30px',
    lineHeight: '42px',
  },
  '@media (max-width: 600px)': {
    fontSize: '30px',
  },
 
});

const LoginSubtitle = styled(Typography)({
  fontFamily: "'Montserrat', sans-serif",
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center',
  width: '100%',
  color: '#EFFAFC',
  marginBottom: '30px',
  '@media (max-width: 1400px)': {
    fontSize: '15px',
    lineHeight: '18px',
    marginBottom: '25px',
  },
  '@media (max-width: 1200px)': {
    fontSize: '16px',
    lineHeight: '17px',
    marginBottom: '22px',
  },
  '@media (max-width: 900px)': {
    fontSize: '16px',
    lineHeight: '16px',
    marginBottom: '20px',
  },
  '@media (max-width: 600px)': {
    fontSize: '16px',
    lineHeight: '16px',
    marginBottom: '15px',
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
    display: 'none',
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
    display: 'none',
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
    display: 'none',
  },
});

const SignUpButton = styled(motion(Button))({
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
    display: 'none',
  },
  '@media (max-width: 600px)': {
    width: '220px',
    height: '50px',
    fontSize: '18px',
    lineHeight: '28px',
  },
});

// New component for mobile sign-up button
const MobileSignUpButton = styled(Button)({
  display: 'none',
  width: '100%',
  maxWidth: '280px',
  height: '50px',
  background: 'linear-gradient(90deg, #3CB6E3 0%, #21647D 100%)',
  border: '1px solid #EFFAFC',
  borderRadius: '100px',
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#FFFFFF',
  textTransform: 'none',
  marginTop: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: 'linear-gradient(90deg, #35A3CC, #1A5369)',
  },
  '@media (max-width: 900px)': {
    display: 'none',
  },
});

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { setDirection } = useAnimation();

  const handleSignUpClick = () => {
    setDirection('left'); // Set animation direction
    setTimeout(() => {
      router.push('/signup');
    }, 100); // Small delay to ensure animation starts before navigation
  };

  // Animation variants for the white circle
  const circleVariants = {
    initial: {
      scale: 0.95,
      rotate: -3
    },
    animate: {
      scale: [0.95, 1.02, 0.95],
      rotate: [-3, 3, -3],
      transition: {
        duration: 20,
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
        repeatType: "reverse" as const
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
        <WelcomeSection>
          <WhiteCircle
            initial="initial"
            animate="animate"
            variants={circleVariants}
          />
          <LogoContainer>
            <Logo color="blue" position="relative" />
          </LogoContainer>
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
            Hello
          </WelcomeTitle>
          <WelcomeText
            initial="initial"
            animate="animate"
            variants={textVariants}
            custom={1}
          >
            Enter your personal details <br /> and start with us
          </WelcomeText>
          <SignUpButton
            onClick={handleSignUpClick}
            disableRipple
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={buttonVariants}
          >
            Sign Up
          </SignUpButton>
        </WelcomeSection>

        <FormSection>
          <MobileLogoContainer>
            <Logo color="white" position="relative" />
          </MobileLogoContainer>
          <FormContainer>
            <LoginTitle>Log In</LoginTitle>
            <LoginSubtitle>-Or use your email account-</LoginSubtitle>
            <LoginForm onSignUpClick={handleSignUpClick} />
          </FormContainer>
        </FormSection>
      </PageContainer>
    </PageTransition>
  );
};

export default LoginPage;

