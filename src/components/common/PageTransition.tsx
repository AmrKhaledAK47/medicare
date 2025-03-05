'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/context/AnimationContext';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const { direction } = useAnimation();

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