'use client';

import React from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/context/AuthContext';

interface LogoutButtonProps {
    variant?: 'icon' | 'text';
    color?: string;
    size?: 'small' | 'medium' | 'large';
    tooltip?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
    variant = 'text',
    color = '#21647D',
    size = 'medium',
    tooltip = 'Logout'
}) => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // No need to redirect as the AuthContext will handle it
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (variant === 'icon') {
        return (
            <Tooltip title={tooltip}>
                <IconButton
                    onClick={handleLogout}
                    size={size}
                    sx={{ color }}
                    aria-label="logout"
                >
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            size={size}
            sx={{
                color,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton; 