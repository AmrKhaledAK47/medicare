'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingRedirectProps {
    message?: string;
    userName?: string;
    duration?: number;
}

const LoadingContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #21647D 0%, #3CB6E3 100%)',
    overflow: 'hidden',
    position: 'relative',
}));

const ContentWrapper = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    padding: '0 20px',
    textAlign: 'center',
});

const LoadingText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#FFFFFF',
    marginTop: '20px',
    textAlign: 'center',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        lineHeight: '30px',
    },
}));

const SubText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '10px',
    textAlign: 'center',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '20px',
    },
}));

const MedicalCircle = styled(motion.div)({
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3CB6E3 0%, #21647D 100%)',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        boxSizing: 'border-box',
    },
    '@media (max-width: 600px)': {
        width: '100px',
        height: '100px',
        '&::before': {
            width: '80px',
            height: '80px',
        },
        '&::after': {
            width: '120px',
            height: '120px',
        },
    },
});

const IconWrapper = styled(motion.div)({
    position: 'relative',
    zIndex: 2,
    fontSize: '36px',
    color: '#FFFFFF',
    '@media (max-width: 600px)': {
        fontSize: '30px',
    },
});

const BackgroundBubble = styled(motion.div)({
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
});

// Simplified dots animation using CSS
const DotsContainer = styled('span')({
    display: 'inline-block',
    '&::after': {
        content: '"."',
        animation: 'dots 1.5s steps(5, end) infinite',
        '@keyframes dots': {
            '0%, 20%': {
                color: 'rgba(255, 255, 255, 0)',
                textShadow:
                    '.25em 0 0 rgba(255, 255, 255, 0), .5em 0 0 rgba(255, 255, 255, 0)'
            },
            '40%': {
                color: 'white',
                textShadow:
                    '.25em 0 0 rgba(255, 255, 255, 0), .5em 0 0 rgba(255, 255, 255, 0)'
            },
            '60%': {
                textShadow:
                    '.25em 0 0 white, .5em 0 0 rgba(255, 255, 255, 0)'
            },
            '80%, 100%': {
                textShadow:
                    '.25em 0 0 white, .5em 0 0 white'
            }
        }
    }
});

const LoadingRedirect: React.FC<LoadingRedirectProps> = ({
    message = 'Redirecting you to your dashboard',
    userName,
    duration = 5000
}) => {
    const [progress, setProgress] = useState(0);

    // Animate progress for the loading effect
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 50);

        return () => clearInterval(interval);
    }, [duration]);

    // Create random bubbles for background effect
    const bubbles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.floor(Math.random() * 100) + 50,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        duration: Math.floor(Math.random() * 20) + 10
    }));

    return (
        <LoadingContainer>
            {/* Background bubbles */}
            {bubbles.map(bubble => (
                <BackgroundBubble
                    key={bubble.id}
                    initial={{
                        x: `${bubble.x}%`,
                        y: `${bubble.y}%`,
                        width: bubble.size,
                        height: bubble.size,
                        opacity: 0.1
                    }}
                    animate={{
                        x: [`${bubble.x}%`, `${(bubble.x + 10) % 100}%`],
                        y: [`${bubble.y}%`, `${(bubble.y + 15) % 100}%`],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: bubble.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}

            <ContentWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <MedicalCircle
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            '0 0 20px rgba(255, 255, 255, 0.2)',
                            '0 0 30px rgba(255, 255, 255, 0.4)',
                            '0 0 20px rgba(255, 255, 255, 0.2)'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <IconWrapper
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <motion.div
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                y: [0, -2, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            ⚕️
                        </motion.div>
                    </IconWrapper>
                </MedicalCircle>

                <LoadingText>
                    {message}<DotsContainer />
                </LoadingText>

                <AnimatePresence>
                    {userName && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <SubText>
                                Welcome, <motion.span
                                    animate={{
                                        color: ['#FFFFFF', '#EFFAFC', '#FFFFFF']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    style={{ fontWeight: 600 }}
                                >
                                    {userName}
                                </motion.span>! We're preparing your personalized experience.
                            </SubText>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subtle progress indicator */}
                <Box sx={{
                    width: '200px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    mt: 4,
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '4px',
                            position: 'absolute',
                            left: 0,
                            top: 0
                        }}
                    />
                </Box>
            </ContentWrapper>
        </LoadingContainer>
    );
};

export default LoadingRedirect; 