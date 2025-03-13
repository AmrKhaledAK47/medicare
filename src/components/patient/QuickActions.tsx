'use client';

import React from 'react';
import { Box, Typography, List, ListItemIcon, ListItemText, Paper, ListItemButton } from '@mui/material';
import Image from 'next/image';

interface QuickAction {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const QuickActions: React.FC = () => {
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
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#F0F8FB',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#F0F8FB',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#F0F8FB',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.96001 22H15.04C16.63 22 17.4 20.44 16.8 19L14.75 14.5C14.27 13.44 12.76 13.4 12.25 14.46L10.08 19.07C9.54001 20.44 10.31 22 11.87 22" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.25 13.75C18.0779 13.5747 18.856 13.2099 19.52 12.68C19.846 12.4432 20.1161 12.1265 20.307 11.7587C20.4979 11.3909 20.6035 10.9826 20.6152 10.5653C20.627 10.148 20.5445 9.7339 20.3741 9.3554C20.2037 8.9769 19.9505 8.6451 19.6352 8.3897C19.3199 8.1342 18.9509 7.9616 18.5583 7.8843C18.1657 7.807 17.7597 7.8271 17.3765 7.9431C16.9934 8.0591 16.6438 8.2679 16.36 8.55" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.64002 8.54998C7.34872 8.26834 6.99129 8.06068 6.60036 7.94714C6.20944 7.83361 5.79623 7.81708 5.39766 7.89868C4.99909 7.98028 4.62515 8.15762 4.30633 8.41806C3.98751 8.67851 3.73241 9.01543 3.56055 9.3987C3.38868 9.78198 3.30511 10.2007 3.31597 10.6224C3.32683 11.044 3.43177 11.4576 3.62139 11.8308C3.81101 12.204 4.08097 12.5262 4.41116 12.7683C5.07543 13.2851 5.85148 13.6448 6.68002 13.82" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    mb: 2,
                    borderBottom: '2px solid #21647D',
                    display: 'inline-block',
                    pb: 0.5,
                }}
            >
                Quick Actions
            </Typography>

            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    border: '1px solid #EEF1F4',
                    borderRadius: '15px',
                    overflow: 'hidden',
                }}
            >
                {actions.map((action, index) => (
                    <React.Fragment key={action.id}>
                        <ListItemButton
                            alignItems="flex-start"
                            sx={{
                                py: 2,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.05)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 42, mt: 0.5 }}>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={action.title}
                                secondary={action.subtitle}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    color: '#21647D',
                                    fontSize: '0.95rem',
                                }}
                                secondaryTypographyProps={{
                                    color: '#6C7A89',
                                    fontSize: '0.8rem',
                                }}
                            />
                            <Box
                                sx={{
                                    ml: 1,
                                    alignSelf: 'center',
                                    color: '#21647D',
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </Box>
                        </ListItemButton>
                        {index < actions.length - 1 && (
                            <Box sx={{ mx: 2.5 }}>
                                <Box sx={{ height: '1px', backgroundColor: '#EEF1F4' }} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default QuickActions;