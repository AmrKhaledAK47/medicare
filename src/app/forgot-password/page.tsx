'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, Button, TextField, InputAdornment, useMediaQuery, useTheme, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Logo from '../../components/common/Logo';
import { useAnimation } from '@/context/AnimationContext';
import PageTransition from '@/components/common/PageTransition';
import Input from '@/components/common/Input';

interface ForgotPasswordValues {
    email: string;
}

const PageContainer = styled('div')({
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    background: '#FFFFFF',
    '@media (min-width: 2000px)': {
        maxWidth: '100vw',
        margin: '0 auto',
    },
    '@media (max-width: 480px)': {
        paddingTop :'80px',
        flexDirection: 'column',
        minHeight: '100vh',
        height: 'auto',
        overflow: 'hidden',
       
    }
});

const FormSection = styled('div')({
    width: '50%',
    minHeight: '100vh',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
  
    '@media (min-width: 2000px)': {
        width: '50%',
    },
    '@media (max-width: 1200px)': {
        width: '55%',
    },
    '@media (max-width: 900px)': {
        width: '100%',
    },
    '@media (max-width: 480px)': {
        minHeight: '100vh',
        height: 'auto',
        padding: '20px 0',
    }
});

const ImageSection = styled('div')({
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    background: '#F8FCFD',
    '@media (min-width: 2000px)': {
        width: '50%',
    },
    '@media (max-width: 1200px)': {
        width: '45%',
    },
    '@media (max-width: 900px)': {
        display: 'none',
    },
    '@media (max-width: 480px)': {
        width: '100%',
        height: '40%',
        display:'none',
    }
});

const LogoContainer = styled('div')({
    position: 'absolute',
    top: '31px',
    left: '56px',
    zIndex: 10,
    '@media (min-width: 2000px)': {
        top: '40px',
        left: '80px',
    },
    '@media (max-width: 480px)': {
        top: '20px',
        left: '20px',
    }
});

const FormContainer = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: '480px',
    margin: '0 auto',
    minHeight: '100vh',
    height: 'auto',
    padding: '0 20px',
    '@media (min-width: 2000px)': {
        maxWidth: '600px',
        marginTop: '30px',
    },
    '@media (max-width: 1400px)': {
        maxWidth: '450px',
    },
    '@media (max-width: 900px)': {
        maxWidth: '100%',
        padding: '0 40px',
    },
    '@media (max-width: 480px)': {
        padding: '0 20px',
        minHeight: '100vh',
        height: 'auto',
        justifyContent: 'flex-start',
        marginTop: '60px',
    }
});

const Title = styled(motion(Typography))({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '54px',
    color: '#2C809D',
    marginBottom: '16px',
    '@media (min-width: 2000px)': {
        fontSize: '42px',
        lineHeight: '60px',
    },
    '@media (max-width: 1400px)': {
        fontSize: '32px',
        lineHeight: '48px',
    },
    '@media (max-width: 900px)': {
        fontSize: '32px',
        lineHeight: '42px',
    },
    '@media (max-width: 480px)': {
        fontSize: '24px',
        lineHeight: '36px',
    }
});

const Subtitle = styled(motion(Typography))({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#235467',
    marginBottom: '40px',
    '@media (min-width: 2000px)': {
        fontSize: '18px',
        lineHeight: '28px',
    },
    '@media (max-width: 1400px)': {
        fontSize: '16px',
        lineHeight: '22px',
    },
    '@media (max-width: 900px)': {
        fontSize: '16px',
        lineHeight: '20px',
        marginBottom: '30px',
    },
    '@media (max-width: 480px)': {
        fontSize: '14px',
        lineHeight: '18px',
        marginBottom: '25px',
    }
});

const SubmitButton = styled(motion(Button))({
    width: '240px',
    height: '55px',
    marginTop: '30px',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
    borderRadius: '100px',
    border: '1px solid #ffffff',
    boxShadow: '0px 64px 26px rgba(0, 0, 0, 0.01), 0px 36px 22px rgba(0, 0, 0, 0.05), 0px 16px 16px rgba(0, 0, 0, 0.09), 0px 4px 9px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
        background: 'linear-gradient(90deg, #35A3CC 0%, #1A5369 100%)',
    },
    '@media (min-width: 2000px)': {
        width: '280px',
        height: '65px',
        fontSize: '22px',
        lineHeight: '36px',
    },
    '@media (max-width: 1400px)': {
        width: '250px',
        height: '55px',
        fontSize: '18px',
        lineHeight: '32px',
    },
    '@media (max-width: 900px)': {
        width: '250px',
        height: '60px',
        fontSize: '18px',
        lineHeight: '26px',
    },
    '@media (max-width: 480px)': {
        width: '220px',
        height: '45px',
        fontSize: '14px',
        marginTop: '20px',
        marginBottom: '16px',
    }
});

const LoginPrompt = styled(motion(Typography))({
    fontFamily: '"Poppins", sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#235467',
    marginTop: '10px',
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
    '@media (max-width: 900px)': {
        fontSize: '16px',
        lineHeight: '16px',
    },
    '@media (max-width: 600px)': {
        fontSize: '14px',
        lineHeight: '16px',
    }
});

const LoginLink = styled('span')({
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#2C809D',
    '&:hover': {
        textDecoration: 'underline',
    }
});

const EmailInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-root': {
        color: '#235467',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        '&::before': {
            borderBottom: '1px solid #2C809D',
        },
        '&::after': {
            borderBottom: '2px solid #2C809D',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid #2C809D',
        },
        '& .MuiInputAdornment-root': {
            color: '#2C809D',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#235467',
        fontFamily: "Poppins",
        fontSize: '16px',
        fontWeight: 450,
        '&.Mui-focused': {
            color: '#2C809D',
        },
    },
    '& .MuiFormHelperText-root': {
        fontFamily: "Poppins",
        fontSize: '12px',
        marginTop: '2px',
        color: '#ff1744',
    },
}));

const IconContainer = styled(Box)({
    width: '20px',
    height: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    '@media (max-width: 1400px)': {
        width: '18px',
        height: '18px',
    }
});

const IllustrationContainer = styled('div')({
    width: '70%',
    height: '70%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 1200px)': {
        width: '80%',
        height: '80%',
    }
});

const PatternBackground = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    opacity: 0.07
  
});

const SuccessOverlay = styled(motion.div)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    '@media (max-width: 600px)': {
        width: '100vw',
        height: '100vh',
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

const SuccessIcon = styled(motion.div)({
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: 'white',
    fontSize: '60px',
    '@media (max-width: 600px)': {
        width: '100px',
        height: '100px',
        fontSize: '50px',
        marginBottom: '20px'
    }
});

const SuccessMessage = styled(motion.h2)({
    fontFamily: '"Poppins", sans-serif',
    fontSize: '28px',
    color: '#2C809D',
    marginBottom: '16px',
    fontWeight: 600,
    textAlign: 'center',
    '@media (max-width: 600px)': {
        fontSize: '24px',
        marginBottom: '12px',
        padding: '0 20px'
    }
});

const SuccessMessageText = styled(motion.p)({
    fontFamily: "Poppins",
    color: '#235467',
    textAlign: 'center',
    padding: '0 20px',
    '@media (max-width: 600px)': {
        fontSize: '14px',
        padding: '0 15px'
    }
});

const EmailInputAnimated = styled(motion.div)({
    width: '100%',
    position: 'relative'
});

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

const ForgotPasswordPage = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const { setDirection } = useAnimation();

    const patternRef = useRef<HTMLDivElement>(null);
    const [patternOpacity, setPatternOpacity] = useState(0.04);
    const [showSuccess, setShowSuccess] = useState(false);
    const [emailStatus, setEmailStatus] = useState({
        isTyping: false,
        isValid: false
    });

    // Fix for mobile viewport height issues
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        return () => {
            window.removeEventListener('resize', setVH);
        };
    }, []);

    // Effect to create and animate the pattern
    useEffect(() => {
        if (!patternRef.current) return;

        const createEmailPattern = () => {
            const container = patternRef.current;
            if (!container) return;

            // Clear previous pattern
            container.innerHTML = '';

            // Create a canvas for the pattern
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw email envelope symbols
            const drawEmailSymbol = (x: number, y: number, size: number, rotation: number) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);

                // Email envelope shape
                ctx.fillStyle = '#2C809D';
                ctx.globalAlpha = 0.6;

                // Envelope body
                ctx.beginPath();
                ctx.rect(-size / 2, -size / 3, size, size * 0.66);
                ctx.fill();

                // Envelope flap
                ctx.beginPath();
                ctx.moveTo(-size / 2, -size / 3);
                ctx.lineTo(0, 0);
                ctx.lineTo(size / 2, -size / 3);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            };

            // Create a grid of email symbols
            const gridSize = Math.max(50, Math.min(100, window.innerWidth / 20));
            const rows = Math.ceil(canvas.height / gridSize);
            const cols = Math.ceil(canvas.width / gridSize);

            // Random offset for each symbol to make pattern less rigid
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * gridSize + (Math.random() * 15 - 7.5);
                    const y = i * gridSize + (Math.random() * 15 - 7.5);
                    const size = gridSize * 0.3 * (0.8 + Math.random() * 0.4); // Random size variation
                    const rotation = Math.random() * 0.3 - 0.15; // slight random rotation

                    drawEmailSymbol(x, y, size, rotation);
                }
            }

            // Apply overall opacity
            canvas.style.opacity = patternOpacity.toString();
        };

        // Initialize pattern
        createEmailPattern();

        // Recreate on window resize
        const handleResize = () => {
            createEmailPattern();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [patternOpacity]);

    const handleLoginClick = () => {
        setDirection('right'); // Set animation direction
        setTimeout(() => {
            router.push('/login');
        }, 100);
    };

    const handleEmailChange = (value: string) => {
        setEmailStatus({
            isTyping: value.length > 0,
            isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        });

        // Adjust pattern opacity based on email validity
        if (value.length > 0) {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setPatternOpacity(isValid ? 0.07 : 0.04);
        } else {
            setPatternOpacity(0.04);
        }
    };

    const handleSubmit = (values: ForgotPasswordValues, { setSubmitting }: FormikHelpers<ForgotPasswordValues>) => {
        // Handle submission logic here
        console.log('Form values', values);

        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            // Show success animation
            setShowSuccess(true);

            // Navigate to verification code page after success animation
            setTimeout(() => {
                setDirection('left');
                router.push('/verify-code');
            }, 2000);
        }, 1000);
    };

    // Animation variants for content
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
                delay: custom * 0.2 + 0.3
            }
        })
    };

    // Enhanced button animation with hover effect
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
                delay: 0.9
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: '0px 84px 34px rgba(0, 0, 0, 0.01), 0px 42px 28px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.09), 0px 8px 12px rgba(0, 0, 0, 0.1)',
            transition: {
                duration: 0.3
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1
            }
        }
    };

    // Input animation variants
    const inputVariants = {
        initial: {
            scale: 1
        },
        focus: {
            scale: 1.02,
            transition: { duration: 0.3 }
        },
        valid: {
            scale: 1.02,
            boxShadow: '0px 10px 15px -3px rgba(44, 128, 157, 0.1)',
            transition: { duration: 0.3 }
        }
    };

    // Email input icon animation
    const iconVariants = {
        initial: {
            rotate: 0
        },
        animate: {
            rotate: [0, -10, 10, -5, 5, 0],
            transition: {
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                repeat: 0
            }
        }
    };

    // Success animation variants
    const successIconVariants = {
        initial: {
            scale: 0,
            rotate: -180
        },
        animate: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "backOut"
            }
        }
    };

    const successMessageVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.4
            }
        }
    };

    // Animation for illustration
    const illustrationVariants = {
        initial: {
            opacity: 0,
            scale: 0.9,
            y: 20
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    return (
        <PageTransition>
            <PageContainer style={{ height: 'calc(var(--vh, 1vh) * 100)', overflow: 'hidden', position: 'relative' }}>
                {/* Add dynamic pattern background */}
                <PatternBackground ref={patternRef} />

                <LogoContainer>
                    <Logo color="blue" position="relative" />
                </LogoContainer>

                <FormSection>
                    <FormContainer>
                        <Title
                            initial="initial"
                            animate="animate"
                            variants={textVariants}
                            custom={0}
                        >
                            Forgot Password
                        </Title>
                        <Subtitle
                            initial="initial"
                            animate="animate"
                            variants={textVariants}
                            custom={1}
                        >
                            Enter your email to recieve a password reset code
                        </Subtitle>

                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                                <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <EmailInputAnimated
                                        variants={inputVariants}
                                        initial="initial"
                                        animate={emailStatus.isValid ? "valid" : emailStatus.isTyping ? "focus" : "initial"}
                                    >
                                        <EmailInput
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            variant="standard"
                                            value={values.email}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleEmailChange(e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconContainer>
                                                            <motion.div
                                                                variants={iconVariants}
                                                                initial="initial"
                                                                animate={emailStatus.isTyping ? "animate" : "initial"}
                                                            >
                                                                <EmailIcon sx={{ color: emailStatus.isValid ? '#4caf50' : '#2C809D' }} />
                                                            </motion.div>
                                                        </IconContainer>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </EmailInputAnimated>

                                    <SubmitButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        disableRipple
                                        initial="initial"
                                        animate="animate"
                                        whileHover="hover"
                                        whileTap="tap"
                                        variants={buttonVariants}
                                    >
                                        Send Reset Code
                                    </SubmitButton>

                                    <LoginPrompt
                                        initial="initial"
                                        animate="animate"
                                        variants={textVariants}
                                        custom={3}
                                    >
                                        Remember your password? <LoginLink onClick={handleLoginClick}>Log In</LoginLink>
                                    </LoginPrompt>
                                </Form>
                            )}
                        </Formik>
                    </FormContainer>
                </FormSection>

                <ImageSection>
                    <IllustrationContainer>
                        <motion.div
                            variants={illustrationVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <Image
                                src="/images/forgot-password.svg"
                                alt="Forgot Password Illustration"
                                fill
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                        </motion.div>
                    </IllustrationContainer>
                </ImageSection>

                {/* Success overlay animation */}
                <AnimatePresence>
                    {showSuccess && (
                        <SuccessOverlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SuccessIcon
                                variants={successIconVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <MarkEmailReadIcon style={{ fontSize: 'inherit' }} />
                            </SuccessIcon>
                            <SuccessMessage
                                variants={successMessageVariants}
                                initial="initial"
                                animate="animate"
                            >
                                Reset Code Sent!
                            </SuccessMessage>
                            <SuccessMessageText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.6, duration: 0.5 }
                                }}
                            >
                                Check your email for the verification code
                            </SuccessMessageText>
                        </SuccessOverlay>
                    )}
                </AnimatePresence>
            </PageContainer>
        </PageTransition>
    );
};

export default ForgotPasswordPage; 