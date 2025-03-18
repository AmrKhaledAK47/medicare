'use client';

import React, { useState } from 'react';
import { Box, Typography, List, ListItemIcon, ListItemText, Paper, ListItemButton, Collapse } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';

interface QuickAction {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const QuickActions: React.FC = () => {
    const { mode } = useThemeContext();
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const actions: QuickAction[] = [
        {
            id: 'consultation',
            title: 'Request Consultation',
            subtitle: 'Talk to a specialist',
            icon: (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92183 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            ),
        },
        {
            id: 'hospital',
            title: 'Locate a hospital near you',
            subtitle: 'Find closest hospitals',
            icon: (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            ),
        },
        {
            id: 'emergency',
            title: 'Emergency',
            subtitle: 'Request immediate help',
            icon: (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                    }}
                >
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 2.42942C21 1.04053 19.6191 0.0744902 18.3144 0.550601L11.0165 3.21371L3.68817 3.78675C1.60632 3.94954 0 5.68638 0 7.77457V9.22543C0 11.3136 1.60633 13.0505 3.68817 13.2133L4.10077 13.2455L4.80448 19.3589C4.97774 20.864 6.25202 22 7.76707 22C9.55425 22 10.9401 20.4388 10.7282 18.6643L10.1375 13.7176L11.0165 13.7863L18.3144 16.4494C19.6191 16.9255 21 15.9595 21 14.5706V2.42942ZM3.84408 5.78066L10.2308 5.28125V11.7188L3.84409 11.2193C2.80316 11.1379 2 10.2695 2 9.22543V7.77457C2 6.73047 2.80316 5.86206 3.84408 5.78066ZM19 14.5706L12.2308 12.1004V4.89959L19 2.42942L19 14.5706ZM6.79136 19.1302L6.13226 13.4044L8.10431 13.5586L8.7423 18.9014C8.81209 19.4858 8.35567 20 7.76707 20C7.2681 20 6.84842 19.6259 6.79136 19.1302Z" fill="#21647D" />
                    </svg>
                </Box>
            ),
        },
    ];

    const handleMouseEnter = (id: string) => {
        setActiveAction(id);
    };

    const handleMouseLeave = () => {
        setActiveAction(null);
    };

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    position: 'relative',
                    fontFamily: 'poppins',
                    color: mode === 'light' ? '#000000' : '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    mb: 2,
                    pb: 0.5,
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '141px',
                        height: '3px',
                        backgroundColor: '#217C99',
                        borderRadius: '5px'
                    }
                }}
            >
                Quick Actions
            </Typography>

            <List
                sx={{
                    width: '100%',
                    bgcolor: mode === 'light' ? 'background.paper' : '#2B2B2B',
                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: mode === 'light' ? '0 2px 4px rgba(0,0,0,0.02)' : 'none',
                }}
            >
                {actions.map((action, index) => (
                    <React.Fragment key={action.id}>
                        <ListItemButton
                            alignItems="center"
                            onMouseEnter={() => handleMouseEnter(action.id)}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                                py: 2,
                                px: 2.5,
                                transition: 'all 0.2s ease',
                                transform: activeAction === action.id ? 'translateX(5px)' : 'translateX(0)',
                                '&:hover': {
                                    backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 56, mt: 0 }}>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={action.title}
                                secondary={action.subtitle}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    fontSize: '0.95rem',
                                    fontFamily: 'poppins',
                                    mb: 0.5
                                }}
                                secondaryTypographyProps={{
                                    color: mode === 'light' ? '#6C7A89' : '#888',
                                    fontSize: '0.8rem',
                                    fontFamily: 'poppins'
                                }}
                            />
                            <Box
                                sx={{
                                    ml: 1,
                                    alignSelf: 'center',
                                    color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    transition: 'transform 0.2s ease',
                                    transform: activeAction === action.id ? 'translateX(5px)' : 'translateX(0)',
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </Box>
                        </ListItemButton>
                        {index < actions.length - 1 && (
                            <Box sx={{ mx: 2.5 }}>
                                <Box sx={{ height: '1px', backgroundColor: mode === 'light' ? '#EEF1F4' : '#333' }} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default QuickActions;