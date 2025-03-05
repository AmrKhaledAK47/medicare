'use client';

import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import Tooltip from '@mui/material/Tooltip';

type ThemeOption = 'light' | 'dark' | 'colorBlind';

const ThemeSwitcherContainer = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
        bottom: '20px',
        right: '20px',
    }
}));

const ThemeButton = styled(motion.button)<{ isOpen: boolean }>(({ isOpen }) => ({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    background: 'var(--primaryGradient)',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: 'var(--buttonShadow)',
    zIndex: 1001,
    '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    '@media (max-width: 768px)': {
        width: '48px',
        height: '48px',
    }
}));

const ThemeOptionsContainer = styled(motion.div)({
    position: 'absolute',
    bottom: '70px',
    right: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
        bottom: '60px',
    }
});

const ThemeOption = styled(motion.button)<{ themeType: string }>(({ themeType }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease, transform 0.3s ease',
    color: 'white',
    background: themeType === 'light'
        ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        : themeType === 'dark'
            ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
            : 'linear-gradient(135deg, #0072B2 0%, #5BBCD6 100%)',
    '&:hover': {
        transform: 'scale(1.1)',
    },
    '@media (max-width: 768px)': {
        width: '36px',
        height: '36px',
    },
}));

const ThemeTooltip = styled(Tooltip)({
    '& .MuiTooltip-tooltip': {
        backgroundColor: 'var(--cardBackground)',
        color: 'var(--text)',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '0.75rem',
        borderRadius: '8px',
        padding: '8px 12px',
    },
});

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<ThemeMode | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Click outside to close options
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-theme-switcher="true"]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleThemeChange = (newTheme: ThemeMode) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    // Choose icon based on current theme
    const getMainIcon = () => {
        switch (theme) {
            case 'dark':
                return <DarkModeIcon />;
            case 'colorBlind':
                return <VisibilityIcon />;
            default:
                return <Brightness7Icon />;
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const optionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
    };

    return (
        <ThemeSwitcherContainer data-theme-switcher="true" ref={containerRef}>
            <ThemeButton
                isOpen={isOpen}
                onClick={toggleOptions}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme options"
            >
                {getMainIcon()}
            </ThemeButton>

            <AnimatePresence>
                {isOpen && (
                    <ThemeOptionsContainer
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}
                    >
                        <ThemeTooltip
                            title="Light Mode"
                            placement="left"
                            open={hoveredOption === 'light'}
                            arrow
                        >
                            <ThemeOption
                                themeType="light"
                                onClick={() => handleThemeChange('light')}
                                onMouseEnter={() => setHoveredOption('light')}
                                onMouseLeave={() => setHoveredOption(null)}
                                variants={optionVariants}
                                aria-label="Light mode"
                            >
                                <Brightness7Icon fontSize="small" />
                            </ThemeOption>
                        </ThemeTooltip>

                        <ThemeTooltip
                            title="Dark Mode"
                            placement="left"
                            open={hoveredOption === 'dark'}
                            arrow
                        >
                            <ThemeOption
                                themeType="dark"
                                onClick={() => handleThemeChange('dark')}
                                onMouseEnter={() => setHoveredOption('dark')}
                                onMouseLeave={() => setHoveredOption(null)}
                                variants={optionVariants}
                                aria-label="Dark mode"
                            >
                                <DarkModeIcon fontSize="small" />
                            </ThemeOption>
                        </ThemeTooltip>

                        <ThemeTooltip
                            title="Color Blind Mode"
                            placement="left"
                            open={hoveredOption === 'colorBlind'}
                            arrow
                        >
                            <ThemeOption
                                themeType="colorBlind"
                                onClick={() => handleThemeChange('colorBlind')}
                                onMouseEnter={() => setHoveredOption('colorBlind')}
                                onMouseLeave={() => setHoveredOption(null)}
                                variants={optionVariants}
                                aria-label="Color blind mode"
                            >
                                <VisibilityIcon fontSize="small" />
                            </ThemeOption>
                        </ThemeTooltip>
                    </ThemeOptionsContainer>
                )}
            </AnimatePresence>
        </ThemeSwitcherContainer>
    );
};

export default ThemeSwitcher; 