'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/context/AnimationContext';

interface PageTransitionProps {
    children: ReactNode;
}

// Create a client-side only component to prevent hydration mismatches
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const { direction } = useAnimation();
    const [isMounted, setIsMounted] = useState(false);

    // Only run on client-side
    useEffect(() => {
        // Set mounted state to true after component mounts
        setIsMounted(true);
    }, []);

    const variants = {
        initial: {
            x: direction === 'right' ? '100%' : '-100%',
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: {
            x: direction === 'right' ? '-100%' : '100%',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    // During server rendering or first client render, return a plain div
    // This ensures hydration matching between server and client
    if (!isMounted) {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
        );
    }

    // Once mounted on client, use motion.div for animations
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            style={{ width: '100%', height: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition; 