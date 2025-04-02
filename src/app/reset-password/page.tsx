'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, Button, TextField, InputAdornment, useMediaQuery, useTheme, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Logo from '../../components/common/Logo';
import { useAnimation } from '@/context/AnimationContext';
import PageTransition from '@/components/common/PageTransition';

interface ResetPasswordValues {
    password: string;
    confirmPassword: string;
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
        paddingTop :'60px',
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
        display: 'none',
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

const ResetButton = styled(motion(Button))({
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

const PasswordInput = styled(TextField)(({ theme }) => ({
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
        fontSize: '20px',
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

const PasswordStrengthBar = styled(LinearProgress)<{ value: number }>(({ value }) => ({
    marginTop: '5px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#e0e0e0',
    '.MuiLinearProgress-bar': {
        backgroundColor: value < 33 ? '#f44336' : value < 66 ? '#ff9800' : '#4caf50',
        transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
    }
}));

const PasswordRequirement = styled(motion.div)({
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#235467',
    marginTop: '4px',
    fontFamily: '"Montserrat", sans-serif',
    gap: '5px'
});

const FloatingElement = styled(motion.div)({
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(15px)',
    opacity: 0.1,
    background: 'linear-gradient(45deg, #21647D, #3CB6E3)',
    zIndex: 1
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
    background: 'linear-gradient(45deg, #21647D, #3CB6E3)',
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
    color: '#21647D',
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
    fontFamily: '"Poppins", sans-serif',
    color: '#235467',
    textAlign: 'center',
    padding: '0 20px',
    '@media (max-width: 600px)': {
        fontSize: '14px',
        padding: '0 15px'
    }
});

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password')
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

const ResetPasswordPage = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const { setDirection } = useAnimation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [requirements, setRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
    });

    const patternRef = useRef<HTMLDivElement>(null);
    const [patternOpacity, setPatternOpacity] = useState(0.04);
    const [patternColor, setPatternColor] = useState('#2C809D');

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

    const handleLoginClick = () => {
        setDirection('right'); // Set animation direction
        setTimeout(() => {
            router.push('/login');
        }, 100);
    };

    const handlePasswordChange = (password: string) => {
        // Check password requirements
        const hasLength = password.length >= 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[@$!%*?&]/.test(password);

        setRequirements({
            length: hasLength,
            lowercase: hasLowercase,
            uppercase: hasUppercase,
            number: hasNumber,
            special: hasSpecial
        });

        // Calculate password strength (0-100)
        const requirements = [hasLength, hasLowercase, hasUppercase, hasNumber, hasSpecial];
        const metRequirements = requirements.filter(Boolean).length;
        const strength = Math.min(100, (metRequirements / requirements.length) * 100);

        setPasswordStrength(strength);
    };

    const handleSubmit = (values: ResetPasswordValues, { setSubmitting }: FormikHelpers<ResetPasswordValues>) => {
        // Handle submission logic here
        console.log('Form values', values);

        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            // Show success animation
            setShowSuccess(true);

            // Navigate to login page after success animation
            setTimeout(() => {
                setDirection('left');
                router.push('/login');
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

    // Floating elements animation
    const floatingVariants = {
        animate: (custom: number) => ({
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.1, 1, 0.9, 1],
            transition: {
                x: {
                    duration: 20 + custom * 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                y: {
                    duration: 15 + custom * 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                scale: {
                    duration: 10 + custom * 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        })
    };

    // Input animation variants
    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: { duration: 0.3 }
        },
        blur: {
            scale: 1,
            transition: { duration: 0.3 }
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

    // Requirement item animation
    const requirementVariants = {
        initial: { opacity: 0, x: -10 },
        animate: (custom: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.2 + custom * 0.1,
                duration: 0.3
            }
        })
    };

    // Update pattern based on password strength
    useEffect(() => {
        if (passwordStrength > 0) {
            setPatternOpacity(0.04 + (passwordStrength * 0.001)); // subtle increase in opacity
            setPatternColor(
                passwordStrength < 33 ? '#f44336' :
                    passwordStrength < 66 ? '#ff9800' : '#4caf50'
            );
        } else {
            setPatternOpacity(0.04);
            setPatternColor('#2C809D');
        }
    }, [passwordStrength]);

    // Effect to create and animate the pattern
    useEffect(() => {
        if (!patternRef.current) return;

        const createSecurityPattern = () => {
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

            // Define pattern elements (locks, shields, etc)
            const drawSecuritySymbol = (x: number, y: number, size: number, rotation: number) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);

                // Draw a shield or lock shape
                ctx.fillStyle = patternColor;
                ctx.beginPath();

                // Shield shape
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(size / 2, -size / 4);
                ctx.lineTo(size / 2, size / 3);
                ctx.lineTo(0, size / 2);
                ctx.lineTo(-size / 2, size / 3);
                ctx.lineTo(-size / 2, -size / 4);
                ctx.closePath();
                ctx.fill();

                // Inner detail for visual interest
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(0, -size / 8, size / 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            };

            // Create a grid of security symbols
            const gridSize = Math.max(40, Math.min(80, window.innerWidth / 20));
            const rows = Math.ceil(canvas.height / gridSize);
            const cols = Math.ceil(canvas.width / gridSize);

            // Random offset for each symbol to make pattern less rigid
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * gridSize + (Math.random() * 10);
                    const y = i * gridSize + (Math.random() * 10);
                    const size = gridSize * 0.4;
                    const rotation = Math.random() * 0.2 - 0.1; // slight random rotation

                    drawSecuritySymbol(x, y, size, rotation);
                }
            }

            // Apply overall opacity
            canvas.style.opacity = patternOpacity.toString();
        };

        // Initialize pattern
        createSecurityPattern();

        // Recreate on window resize
        const handleResize = () => {
            createSecurityPattern();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [patternColor, patternOpacity]);

    return (
        <PageTransition>
            <PageContainer style={{ height: 'calc(var(--vh, 1vh) * 100)', overflow: 'hidden', position: 'relative' }}>
                {/* Replace floating elements with dynamic pattern background */}
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
                            Reset Password
                        </Title>
                        <Subtitle
                            initial="initial"
                            animate="animate"
                            variants={textVariants}
                            custom={1}
                        >
                            Secure your account with a new password
                        </Subtitle>

                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                                <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div
                                        style={{ width: '100%' }}
                                        variants={inputVariants}
                                        initial="blur"
                                        whileFocus="focus"
                                        animate={Object.values(requirements).some(Boolean) ? "focus" : "blur"}
                                    >
                                        <PasswordInput
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            variant="standard"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handlePasswordChange(e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOffIcon sx={{ color: '#2C809D' }} />
                                                            ) : (
                                                                <VisibilityIcon sx={{ color: '#2C809D' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon sx={{ color: '#2C809D', fontSize: '20px' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </motion.div>

                                    {values.password.length > 0 && (
                                        <Box sx={{ width: '100%', mb: 2 }}>
                                            <PasswordStrengthBar
                                                variant="determinate"
                                                value={passwordStrength}
                                            />

                                            <AnimatePresence>
                                                <Box sx={{ mt: 1 }}>
                                                    <PasswordRequirement
                                                        initial="initial"
                                                        animate="animate"
                                                        variants={requirementVariants}
                                                        custom={0}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            color={requirements.length ? "primary" : "disabled"}
                                                        />
                                                        <Typography variant="caption" color={requirements.length ? "primary" : "text.secondary"}>
                                                            At least 8 characters
                                                        </Typography>
                                                    </PasswordRequirement>

                                                    <PasswordRequirement
                                                        initial="initial"
                                                        animate="animate"
                                                        variants={requirementVariants}
                                                        custom={1}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            color={requirements.lowercase ? "primary" : "disabled"}
                                                        />
                                                        <Typography variant="caption" color={requirements.lowercase ? "primary" : "text.secondary"}>
                                                            One lowercase letter
                                                        </Typography>
                                                    </PasswordRequirement>

                                                    <PasswordRequirement
                                                        initial="initial"
                                                        animate="animate"
                                                        variants={requirementVariants}
                                                        custom={2}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            color={requirements.uppercase ? "primary" : "disabled"}
                                                        />
                                                        <Typography variant="caption" color={requirements.uppercase ? "primary" : "text.secondary"}>
                                                            One uppercase letter
                                                        </Typography>
                                                    </PasswordRequirement>

                                                    <PasswordRequirement
                                                        initial="initial"
                                                        animate="animate"
                                                        variants={requirementVariants}
                                                        custom={3}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            color={requirements.number ? "primary" : "disabled"}
                                                        />
                                                        <Typography variant="caption" color={requirements.number ? "primary" : "text.secondary"}>
                                                            One number
                                                        </Typography>
                                                    </PasswordRequirement>

                                                    <PasswordRequirement
                                                        initial="initial"
                                                        animate="animate"
                                                        variants={requirementVariants}
                                                        custom={4}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            color={requirements.special ? "primary" : "disabled"}
                                                        />
                                                        <Typography variant="caption" color={requirements.special ? "primary" : "text.secondary"}>
                                                            One special character
                                                        </Typography>
                                                    </PasswordRequirement>
                                                </Box>
                                            </AnimatePresence>
                                        </Box>
                                    )}

                                    <motion.div
                                        style={{ width: '100%' }}
                                        variants={inputVariants}
                                        initial="blur"
                                        whileFocus="focus"
                                    >
                                        <PasswordInput
                                            fullWidth
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            variant="standard"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <VisibilityOffIcon sx={{ color: '#2C809D' }} />
                                                            ) : (
                                                                <VisibilityIcon sx={{ color: '#2C809D' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon sx={{ color: '#2C809D', fontSize: '20px' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </motion.div>

                                    <ResetButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        disableRipple
                                        initial="initial"
                                        animate="animate"
                                        whileHover="hover"
                                        whileTap="tap"
                                        variants={buttonVariants}
                                    >
                                        Reset Password
                                    </ResetButton>

                                    <LoginPrompt
                                        initial="initial"
                                        animate="animate"
                                        variants={textVariants}
                                        custom={3}
                                    >
                                        Back to log in? <LoginLink onClick={handleLoginClick}>Log In</LoginLink>
                                    </LoginPrompt>
                                </Form>
                            )}
                        </Formik>
                    </FormContainer>
                </FormSection>

                <ImageSection>
                    <IllustrationContainer>
                        <motion.div
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.5 }
                            }}
                        >
                            <Image
                                src="/images/reset-image.svg"
                                alt="Reset Password Illustration"
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
                                <CheckCircleOutlineIcon style={{ fontSize: 'inherit' }} />
                            </SuccessIcon>
                            <SuccessMessage
                                variants={successMessageVariants}
                                initial="initial"
                                animate="animate"
                            >
                                Password Reset Successfully!
                            </SuccessMessage>
                            <SuccessMessageText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.6, duration: 0.5 }
                                }}
                            >
                                Redirecting to login...
                            </SuccessMessageText>
                        </SuccessOverlay>
                    )}
                </AnimatePresence>
            </PageContainer>
        </PageTransition>
    );
};

export default ResetPasswordPage; 