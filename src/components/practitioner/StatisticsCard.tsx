'use client';

import React, { ReactElement } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import { IconType } from 'react-icons';

interface StatisticsCardProps {
    title: string;
    value: number | string;
    icon: ReactElement;
    color: string;
    change?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
    borderRadius: 12,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    },
}));

const IconContainer = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
}));

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    title,
    value,
    icon,
    color,
    change,
    subtitle
}) => {
    const { mode } = useThemeContext();

    // Generate a lighter version of the color for the background
    const getBgColor = () => {
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Return with opacity
        return `rgba(${r}, ${g}, ${b}, 0.15)`;
    };

    return (
        <StyledPaper
            elevation={0}
            sx={{
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
            }}
        >
            <IconContainer bgColor={getBgColor()}>
                {React.cloneElement(icon, {
                    size: 24,
                    color: color,
                    style: {
                        filter: mode === 'dark' ? 'brightness(1.2)' : 'none'
                    }
                })}
            </IconContainer>

            <Typography
                variant="body2"
                sx={{
                    color: mode === 'light' ? '#666' : '#B8C7CC',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    mb: 0.5,
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    color: mode === 'light' ? '#333' : '#FFF',
                    mb: 0.5,
                }}
            >
                {value}
            </Typography>

            {subtitle && (
                <Typography
                    variant="caption"
                    sx={{
                        color: mode === 'light' ? '#888' : '#AAA',
                        fontSize: '0.75rem',
                    }}
                >
                    {subtitle}
                </Typography>
            )}

            {change && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 0.5,
                            color: change.isPositive ? '#4CAF50' : '#F44336',
                        }}
                    >
                        {change.isPositive ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: change.isPositive ? '#4CAF50' : '#F44336',
                            fontWeight: 500,
                        }}
                    >
                        {change.isPositive ? '+' : ''}{change.value}% from last month
                    </Typography>
                </Box>
            )}
        </StyledPaper>
    );
};

export default StatisticsCard; 