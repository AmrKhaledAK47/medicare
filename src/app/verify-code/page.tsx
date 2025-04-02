'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, Button, TextField, useMediaQuery, useTheme, LinearProgress, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Logo from '../../components/common/Logo';
import { useAnimation } from '@/context/AnimationContext';
import PageTransition from '@/components/common/PageTransition';

const PageContainer = styled('div')({
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: '0 20px',
    overflow: 'hidden',
 
    '@media (min-width: 2000px)': {
        maxWidth: '100vw',
        margin: '0 auto',
    },
    '@media (max-width: 480px)': {
        paddingTop :'70px',
        minHeight: '100vh',
        height: 'auto',
        alignItems: 'flex-start',
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

const VerificationCard = styled(motion.div)({
    width: '100%',
    maxWidth: '840px',
    position: 'relative',
    padding: '60px 40px',
    background: '#FFFFFF',
    boxShadow: '0px 309px 123px rgba(0, 0, 0, 0.01), 0px 174px 104px rgba(0, 0, 0, 0.05), 0px 77px 77px rgba(0, 0, 0, 0.09), 0px 19px 42px rgba(0, 0, 0, 0.1)',
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '105px',
    '@media (max-width: 768px)': {
        padding: '50px 20px',
        borderRadius: '30px',
        marginTop: '80px',
    },
    '@media (max-width: 480px)': {
        padding: '40px 15px',
        borderRadius: '25px',
        marginTop: '60px',
        minHeight: 'auto',
    }
});

const ImageContainer = styled('div')({
    position: 'absolute',
    top: '-120px',
    width: '240px',
    height: '240px',
    '@media (max-width: 768px)': {
        width: '180px',
        height: '180px',
        top: '-90px',
    },
    '@media (max-width: 480px)': {
        width: '150px',
        height: '150px',
        top: '-75px',
    }
});

const Title = styled(motion(Typography))({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '42px',
    color: '#2583A0',
    marginBottom: '16px',
    marginTop: '60px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
        fontSize: '24px',
        lineHeight: '36px',
        marginTop: '40px',
    },
    '@media (max-width: 480px)': {
        fontSize: '20px',
        lineHeight: '30px',
        marginTop: '30px',
    }
});

const Subtitle = styled(motion(Typography))({
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '24px',
    color: 'rgba(35, 84, 103, 0.7)',
    marginBottom: '40px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
        fontSize: '14px',
        lineHeight: '21px',
        marginBottom: '30px',
    },
    '@media (max-width: 480px)': {
        fontSize: '12px',
        lineHeight: '18px',
        marginBottom: '25px',
    }
});

const EmailText = styled('span')({
    color: 'rgba(35, 84, 103, 1)',
    fontWeight: 600,
});

const InputContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
    width: '100%',
    maxWidth: '360px',
    '@media (max-width: 768px)': {
        gap: '8px',
        maxWidth: '320px',
    },
    '@media (max-width: 480px)': {
        gap: '6px',
        maxWidth: '280px',
    }
});

const ErrorMessage = styled(motion.div)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FF4D4F',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '20px',
    gap: '8px',
    '@media (max-width: 480px)': {
        fontSize: '12px',
    }
});

const CodeInput = styled(TextField)(({ error }: { error?: boolean }) => ({
    width: '54px',
    height: '54px',
    '& .MuiInputBase-root': {
        height: '100%',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        color: error ? '#FF4D4F' : '#217C99',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '24px',
        fontWeight: 600,
        textAlign: 'center',
        border: error ? '2px solid #FF4D4F' : '1px solid #217C99',
        transition: 'all 0.3s ease',
        '&.Mui-focused': {
            border: error ? '2px solid #FF4D4F' : '2px solid #217C99',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiInputBase-input': {
        textAlign: 'center',
        padding: '0',
    },
    '@media (max-width: 768px)': {
        width: '48px',
        height: '48px',
        '& .MuiInputBase-root': {
            fontSize: '20px',
        },
    },
    '@media (max-width: 480px)': {
        width: '40px',
        height: '40px',
        '& .MuiInputBase-root': {
            fontSize: '18px',
        },
    }
}));

const ResendText = styled(motion(Typography))({
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '21px',
    color: 'rgba(35, 84, 103, 0.7)',
    marginBottom: '40px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
        fontSize: '13px',
        lineHeight: '19px',
        marginBottom: '30px',
    },
    '@media (max-width: 480px)': {
        fontSize: '12px',
        lineHeight: '18px',
        marginBottom: '25px',
    }
});

const ResendLink = styled('span')({
    fontWeight: 600,
    cursor: 'pointer',
    color: 'rgba(35, 84, 103, 1)',
    '&:hover': {
        textDecoration: 'underline',
    }
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '700px',
    marginTop: '20px',
    gap: '20px',
    '@media (max-width: 768px)': {
        maxWidth: '500px',
    },
    '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
    }
});

const CancelButton = styled(motion(Button))({
    width: '300px',
    height: '55px',
    background: '#FFFFFF',
    border: '1px solid #FFFFFF',
    boxShadow: '0px 45px 18px rgba(0, 0, 0, 0.01), 0px 25px 15px rgba(0, 0, 0, 0.05), 0px 11px 11px rgba(0, 0, 0, 0.09), 0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '27px',
    textAlign: 'center',
    color: '#235467',
    textTransform: 'none',
    '&:hover': {
        background: '#F8F8F8',
    },
    '@media (max-width: 768px)': {
        width: '220px',
        height: '50px',
        fontSize: '16px',
        lineHeight: '24px',
    },
    '@media (max-width: 480px)': {
        width: '100%',
        maxWidth: '280px',
        height: '45px',
        fontSize: '15px',
        lineHeight: '22px',
    }
});

const VerifyButton = styled(motion(Button))({
    width: '300px',
    height: '55px',
    background: 'linear-gradient(90.01deg, #217C99 19.93%, #16ABD9 104.84%)',
    border: '1px solid #FFFFFF',
    boxShadow: '0px 30px 12px rgba(0, 0, 0, 0.01), 0px 17px 10px rgba(0, 0, 0, 0.05), 0px 8px 8px rgba(0, 0, 0, 0.09), 0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '27px',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
        background: 'linear-gradient(90.01deg, #16667f 19.93%, #1193bd 104.84%)',
    },
    '@media (max-width: 768px)': {
        width: '220px',
        height: '50px',
        fontSize: '16px',
        lineHeight: '24px',
    },
    '@media (max-width: 480px)': {
        width: '100%',
        maxWidth: '280px',
        height: '45px',
        fontSize: '15px',
        lineHeight: '22px',
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
    opacity: 0.05
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
    background: 'linear-gradient(90deg, #217C99 19.93%, #16ABD9 104.84%)',
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
    color: '#2583A0',
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

// Progress bar for verification timeout
const TimerProgress = styled(LinearProgress)({
    width: '100%',
    maxWidth: '360px',
    height: '4px',
    borderRadius: '2px',
    marginBottom: '15px',
    '& .MuiLinearProgress-bar': {
        background: 'linear-gradient(90deg, #217C99 19.93%, #16ABD9 104.84%)',
    }
});

// Animation wrap for input fields
const AnimatedInput = styled(motion.div)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const VerifyCodePage = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const { setDirection } = useAnimation();

    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const patternRef = useRef<HTMLDivElement>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [timerProgress, setTimerProgress] = useState(100);
    const [activeInput, setActiveInput] = useState<number | null>(null);
    const [codeComplete, setCodeComplete] = useState(false);
    const [verificationError, setVerificationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    // Initialize inputRefs
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);

        // Focus first input on mount
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 500);
    }, []);

    // Effect to create and animate the pattern
    useEffect(() => {
        if (!patternRef.current) return;

        const createVerificationPattern = () => {
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

            // Draw verification symbols
            const drawVerificationSymbol = (x: number, y: number, size: number) => {
                ctx.save();
                ctx.translate(x, y);

                // Random selection between different symbols
                const symbolType = Math.floor(Math.random() * 3);

                ctx.fillStyle = '#217C99';
                ctx.lineWidth = size / 10;
                ctx.strokeStyle = '#217C99';

                switch (symbolType) {
                    case 0: // Number symbol
                        // Draw a random digit
                        ctx.font = `${size}px "Poppins", sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.globalAlpha = 0.15;
                        ctx.fillText(`${Math.floor(Math.random() * 10)}`, 0, 0);
                        break;

                    case 1: // Circle symbol (representing code dots)
                        ctx.beginPath();
                        ctx.globalAlpha = 0.1;
                        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        // Inner circle
                        ctx.globalAlpha = 0.15;
                        ctx.beginPath();
                        ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
                        ctx.fill();
                        break;

                    case 2: // Lock symbol
                        ctx.globalAlpha = 0.12;
                        // Body of lock
                        ctx.fillRect(-size / 3, -size / 8, size / 1.5, size / 1.3);
                        // Arc of lock
                        ctx.beginPath();
                        ctx.arc(0, -size / 4, size / 3, Math.PI, 0);
                        ctx.stroke();
                        break;
                }

                ctx.restore();
            };

            // Create a grid of symbols
            const gridSize = Math.max(60, Math.min(100, window.innerWidth / 15));
            const rows = Math.ceil(canvas.height / gridSize);
            const cols = Math.ceil(canvas.width / gridSize);

            // Add symbols with random offsets
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * gridSize + (Math.random() * 20 - 10);
                    const y = i * gridSize + (Math.random() * 20 - 10);
                    const size = gridSize * 0.3 * (0.7 + Math.random() * 0.6);

                    drawVerificationSymbol(x, y, size);
                }
            }
        };

        // Initialize pattern
        createVerificationPattern();

        // Recreate on window resize
        const handleResize = () => {
            createVerificationPattern();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Countdown timer effect (for visual purpose)
    useEffect(() => {
        // Only start timer when there's at least one digit entered
        if (verificationCode.some(digit => digit !== '')) {
            const timer = setInterval(() => {
                setTimerProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 0.05;
                });
            }, 100);

            return () => {
                clearInterval(timer);
            };
        }
    }, [verificationCode]);

    // Check if code is complete
    useEffect(() => {
        const isComplete = verificationCode.every(digit => digit !== '');
        setCodeComplete(isComplete);

        // Auto verify when code is complete
        if (isComplete) {
            // Reset timer
            setTimerProgress(100);
        }
    }, [verificationCode]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        // Reset error state when typing
        if (verificationError) {
            setVerificationError(false);
        }

        // Move to next input if value is entered
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
            setActiveInput(index + 1);
        }
    };

    const handleFocus = (index: number) => {
        setActiveInput(index);
    };

    const handleBlur = () => {
        setActiveInput(null);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveInput(index - 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/[^\d]/g, '');

        if (pastedData) {
            const newVerificationCode = [...verificationCode];

            for (let i = 0; i < pastedData.length; i++) {
                if (i < 6) {
                    newVerificationCode[i] = pastedData[i];
                }
            }

            setVerificationCode(newVerificationCode);

            // Focus the next empty input or the last input
            const nextEmptyIndex = newVerificationCode.findIndex(val => val === '');
            if (nextEmptyIndex !== -1) {
                inputRefs.current[nextEmptyIndex]?.focus();
                setActiveInput(nextEmptyIndex);
            } else {
                inputRefs.current[5]?.focus();
                setActiveInput(5);
            }
        }
    };

    const handleCancel = () => {
        setDirection('right');
        setTimeout(() => {
            router.push('/forgot-password');
        }, 100);
    };

    const handleVerify = () => {
        const code = verificationCode.join('');

        // Check if code is complete
        if (code.length === 6) {
            console.log('Verification code:', code);

            // Simulate verification
            if (code === '123456') { // In real app, this would be a proper verification
                // Show success animation
                setShowSuccess(true);

                // Navigate to reset password page after success animation
                setTimeout(() => {
                    setDirection('left');
                    router.push('/reset-password');
                }, 2000);
            } else {
                // Show error animation and message
                setVerificationError(true);
                setErrorMessage('Invalid verification code. Please try again.');

                // Shake animation will be triggered by state change
                setTimeout(() => {
                    // Clear the code
                    setVerificationCode(['', '', '', '', '', '']);
                    // Focus first input
                    inputRefs.current[0]?.focus();
                    setActiveInput(0);

                    // Reset error state after a delay
                    setTimeout(() => {
                        setVerificationError(false);
                    }, 2000);
                }, 800);
            }
        }
    };

    const handleResend = () => {
        // Reset timer
        setTimerProgress(100);

        // Logic to resend code
        console.log('Resending code');

        // Reset the inputs
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setActiveInput(0);

        // Reset error state
        setVerificationError(false);
    };

    // Animation variants
    const containerVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: custom * 0.1 + 0.2
            }
        })
    };

    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.6
            }
        },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1
            }
        }
    };

    // Input container animation variants
    const inputContainerVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.4,
                staggerChildren: 0.08
            }
        },
        error: {
            x: [0, -10, 10, -10, 10, -5, 5, 0],
            transition: {
                duration: 0.6,
                ease: "easeInOut"
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

    // Error message animation
    const errorMessageVariants = {
        initial: {
            opacity: 0,
            y: -10
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    // Error icon animation
    const errorIconVariants = {
        initial: {
            scale: 0,
            rotate: 0
        },
        animate: {
            scale: 1,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5,
                ease: "easeOut"
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

                <VerificationCard
                    initial="initial"
                    animate="animate"
                    variants={containerVariants}
                >
                    <ImageContainer>
                        <motion.div
                            variants={illustrationVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <Image
                                src="/images/otp-image.svg"
                                alt="Verification Illustration"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </motion.div>
                    </ImageContainer>

                    <Title
                        initial="initial"
                        animate="animate"
                        variants={textVariants}
                        custom={0}
                    >
                        Enter verification code
                    </Title>

                    <Subtitle
                        initial="initial"
                        animate="animate"
                        variants={textVariants}
                        custom={1}
                    >
                        A 6-digit verification code has been sent to <EmailText>mrmon****@gmail.com</EmailText>
                    </Subtitle>

                    {verificationCode.some(digit => digit !== '') && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ width: '100%', maxWidth: '360px', marginBottom: '15px' }}
                        >
                            <TimerProgress
                                variant="determinate"
                                value={timerProgress}
                            />
                        </motion.div>
                    )}

                    {/* Error message */}
                    <AnimatePresence>
                        {verificationError && (
                            <ErrorMessage
                                variants={errorMessageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <motion.div variants={errorIconVariants}>
                                    <ErrorOutlineIcon color="error" fontSize="small" />
                                </motion.div>
                                {errorMessage}
                            </ErrorMessage>
                        )}
                    </AnimatePresence>

                    <motion.div
                        variants={inputContainerVariants}
                        initial="initial"
                        animate={verificationError ? "error" : "animate"}
                    >
                        <InputContainer>
                            {verificationCode.map((digit, index) => {
                                // Determine the animation state for this input
                                const isActive = activeInput === index;
                                const isFilled = digit !== "";
                                const isError = verificationError;

                                return (
                                    <AnimatedInput
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: isActive ? 1.1 : 1,
                                            boxShadow: isActive
                                                ? '0px 4px 10px rgba(33, 124, 153, 0.2)'
                                                : 'none',
                                            backgroundColor: isError
                                                ? 'rgba(255, 77, 79, 0.05)'
                                                : isFilled
                                                    ? 'rgba(33, 124, 153, 0.05)'
                                                    : 'transparent',
                                            transition: {
                                                duration: 0.3,
                                                delay: index * 0.08
                                            }
                                        }}
                                    >
                                        <CodeInput
                                            variant="outlined"
                                            error={verificationError}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            onFocus={() => handleFocus(index)}
                                            onBlur={handleBlur}
                                            inputRef={(el) => { inputRefs.current[index] = el; }}
                                            inputProps={{
                                                maxLength: 1,
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                autoComplete: 'off'
                                            }}
                                        />
                                    </AnimatedInput>
                                );
                            })}
                        </InputContainer>
                    </motion.div>

                    <ResendText
                        initial="initial"
                        animate="animate"
                        variants={textVariants}
                        custom={2}
                    >
                        Didn't get a code ? <ResendLink onClick={handleResend}>Click to resend</ResendLink>
                    </ResendText>

                    <ButtonContainer>
                        <CancelButton
                            onClick={handleCancel}
                            disableRipple
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                        >
                            Cancel
                        </CancelButton>

                        <VerifyButton
                            onClick={handleVerify}
                            disableRipple
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            disabled={verificationCode.some(digit => digit === '')}
                        >
                            Verify
                        </VerifyButton>
                    </ButtonContainer>
                </VerificationCard>

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
                                <LockOpenIcon style={{ fontSize: 'inherit' }} />
                            </SuccessIcon>
                            <SuccessMessage
                                variants={successMessageVariants}
                                initial="initial"
                                animate="animate"
                            >
                                Verification Successful!
                            </SuccessMessage>
                            <SuccessMessageText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.6, duration: 0.5 }
                                }}
                            >
                                Redirecting to reset password...
                            </SuccessMessageText>
                        </SuccessOverlay>
                    )}
                </AnimatePresence>

            </PageContainer>
        </PageTransition>
    );
};

export default VerifyCodePage; 