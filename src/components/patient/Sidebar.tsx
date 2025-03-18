'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Divider } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';

// Create a theme context
const ThemeContext = createContext<{
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}>({
    mode: 'light',
    toggleTheme: () => { },
});

// ThemeProvider component
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
    }, [mode]);

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setMode(savedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

interface SidebarProps {
    isExpanded: boolean;
    toggleSidebar: () => void;
}

const menuItems = [
    { name: 'Dashboard', icon: '/icons/home.svg', path: '/dashboard/patient' },
    { name: 'Profile', icon: '/icons/profile.svg', path: '/dashboard/patient/profile' },
    { name: 'Health Overview', icon: '/icons/file.svg', path: '/dashboard/patient/health-overview' },
    { name: 'Schedule', icon: '/icons/schedule.svg', path: '/dashboard/patient/schedule' },
    { name: 'Medical Records', icon: '/icons/record.svg', path: '/dashboard/patient/records' },
    { name: 'Devices & Apps', icon: '/icons/device.svg', path: '/dashboard/patient/devices' },
    { name: 'Payment', icon: '/icons/pay.svg', path: '/dashboard/patient/payment' },
];

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
    const pathname = usePathname();
    const { mode, toggleTheme } = useThemeContext();

    const drawerWidth = isExpanded ? 240 : 80;

    return (
        <>
            {/* Toggle button outside of Drawer for proper visibility */}
            <Box
                sx={{
                    position: 'fixed',
                    left: isExpanded ? 228 : 68,
                    top: 110,
                    zIndex: 9999,
                    cursor: 'pointer',
                    transition: 'left 0.2s ease-in-out',
                }}
                onClick={toggleSidebar}
            >
                <Box
                    sx={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        border: '1px solid #EEF1F4',
                    }}
                >
                    <svg width="8" height="12" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.06152 1.99999L2.00012 9.0614L9.06152 16.1228" stroke="#217C99" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            </Box>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1200,

                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #EEF1F4',
                        transition: 'width 0.2s ease-in-out',
                        overflow: 'hidden', // Prevent scrolling
                        backgroundColor: mode === 'light' ? 'white' : '#1A1A1A',
                        pt: '15px', // Add padding top to account for AppBar height
                        borderRadius: '10px',
                        position: 'relative',
                    },
                }}
            >
                <Box
                    sx={{
                        height: '88vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Navigation menu */}
                    <List sx={{ width: '100%', mt: 0.5, pt: 1, px: 2 }}>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;

                            return (
                                <Link href={item.path} key={item.name} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem disablePadding sx={{ mb: 0.8 }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                px: 1.6,
                                                py: 1,
                                                borderRadius: '8px',
                                                backgroundColor: isActive ? '#267997' : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: isActive ? '#21647D' : 'rgba(33, 100, 125, 0.08)',
                                                }
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: isExpanded ? 2 : 'auto',
                                                    justifyContent: 'center',
                                                    color: isActive ? 'white' : '#21647D',
                                                }}
                                            >
                                                <Box sx={{ position: 'relative', width: 25, height: 25 }}>
                                                    <Image
                                                        src={item.icon}
                                                        alt={item.name}
                                                        fill
                                                        style={{
                                                            objectFit: 'contain',
                                                            filter: isActive ? 'brightness(0) invert(1)' : (mode === 'dark' && !isActive) ? 'invert(0.8)' : 'none',
                                                        }}
                                                    />
                                                </Box>
                                            </ListItemIcon>
                                            {isExpanded && (
                                                <ListItemText
                                                    primary={item.name}
                                                    sx={{
                                                        opacity: 1,
                                                        color: isActive ? 'white' : mode === 'light' ? '#21647D' : '#B8C7CC',
                                                        '& .MuiListItemText-primary': {
                                                            fontWeight: 500,
                                                            fontSize: '0.9rem',
                                                        },
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            );
                        })}

                        {/* Log Out button added to menu list */}
                        <ListItem disablePadding sx={{ mb: 2 }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    px: 2,
                                    py: 1,
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isExpanded ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: '#21647D',
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: 22.5, height: 22.5 }}>
                                        <Image
                                            src="/icons/logout.svg"
                                            alt="Log Out"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                filter: mode === 'dark' ? 'invert(0.8)' : 'none'
                                            }}
                                        />
                                    </Box>
                                </ListItemIcon>
                                {isExpanded && (
                                    <ListItemText
                                        primary="Log Out"
                                        sx={{
                                            opacity: 1,
                                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                            '& .MuiListItemText-primary': {
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                            },
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {/* Additional Links at the bottom */}
                    <Box sx={{ mt: 'auto', px: 2 }}>
                        <List>
                            {/* Only show Add button when sidebar is collapsed */}
                            {!isExpanded && (
                                <ListItem disablePadding sx={{ mb: 0.2 }}>
                                    <Link href="/add" passHref style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                px: 1.6,
                                                py: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                                }
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: isExpanded ? 2 : 'auto',
                                                    justifyContent: 'center',
                                                    color: '#21647D',
                                                }}
                                            >
                                                <Box sx={{ position: 'relative', width: 26, height: 26 }}>
                                                    <Image
                                                        src="/icons/add.svg"
                                                        alt="Add"
                                                        fill
                                                        style={{
                                                            objectFit: 'contain',
                                                            filter: mode === 'dark' ? 'invert(0.8)' : 'none'
                                                        }}
                                                    />
                                                </Box>
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            )}

                            {/* Add theme switcher button when sidebar is collapsed */}
                            {!isExpanded && (
                                <ListItem disablePadding sx={{ mb: 0.2 }}>
                                    <ListItemButton
                                        onClick={toggleTheme}
                                        sx={{
                                            minHeight: 48,
                                            px: 1.6,
                                            py: 1,
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                            }
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 'auto',
                                                justifyContent: 'center',
                                                color: '#21647D',
                                            }}
                                        >
                                            <Box sx={{ position: 'relative', width: 26, height: 26 }}>
                                                <Image
                                                    src="/icons/light-dark.svg"
                                                    alt="Theme Toggle"
                                                    fill
                                                    style={{
                                                        objectFit: 'contain',
                                                        filter: mode === 'dark' ? 'invert(0.8)' : 'none'
                                                    }}
                                                />
                                            </Box>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    </Box>

                    {/* Theme Switcher - only show when expanded */}
                    {isExpanded && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '4px',
                                isolation: 'isolate',
                                position: 'relative',
                                width: '210px',
                                height: '48px',
                                mx: 'auto',
                                mb: 2,
                                mt: 2,
                                background: '#00000020',
                                borderRadius: '14px',
                            }}
                        >
                            {/* Light Mode Button */}
                            <Box
                                onClick={() => mode === 'dark' && toggleTheme()}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '0px 10px',
                                    gap: '10px',
                                    position: 'absolute',
                                    width: '105px',
                                    height: '40px',
                                    left: '4px',
                                    top: '4px',
                                    background: mode === 'light' ? '#FFFFFF' : 'transparent',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    zIndex: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: '24px',
                                        height: '24px',
                                    }}
                                >
                                    {/* Sun Icon */}
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11" cy="11" r="5" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" />
                                        <line x1="11" y1="1" x2="11" y2="3" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="11" y1="19" x2="11" y2="21" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="21" y1="11" x2="19" y2="11" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="3" y1="11" x2="1" y2="11" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="18.364" y1="3.63603" x2="16.95" y2="5.05025" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="5.05024" y1="16.95" x2="3.63602" y2="18.364" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="18.364" y1="18.364" x2="16.95" y2="16.95" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="5.05024" y1="5.05025" x2="3.63602" y2="3.63603" stroke={mode === 'light' ? "#000000" : "#FFFFFF"} strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </Box>
                                <Typography
                                    sx={{
                                        width: '40px',
                                        height: '24px',
                                        fontFamily: 'poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        lineHeight: '24px',
                                        color: mode === 'light' ? '#000000' : '#FFFFFF',
                                    }}
                                >
                                    Light
                                </Typography>
                            </Box>

                            {/* Dark Mode Button */}
                            <Box
                                onClick={() => mode === 'light' && toggleTheme()}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '0px 10px',
                                    gap: '10px',
                                    position: 'absolute',
                                    width: '105px',
                                    height: '40px',
                                    right: '4px',
                                    top: '4px',
                                    background: mode === 'dark' ? '#1A1A1A' : 'transparent',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    zIndex: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: '24px',
                                        height: '24px',
                                    }}
                                >
                                    {/* Moon Icon */}
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.25 10.2941C1.25 15.2647 5.27944 19.2941 10.25 19.2941C14.1027 19.2941 17.3899 16.8733 18.6737 13.4698C18.6737 13.4698 12.25 13 9.75 10.5C7.26408 8.01408 6.75 2 6.75 2C3.51806 3.36551 1.25 6.56494 1.25 10.2941Z" stroke="white" stroke-width="1.5" stroke-linecap="square" />
                                    </svg>
                                </Box>
                                <Typography
                                    sx={{
                                        width: '37px',
                                        height: '24px',
                                        fontFamily: 'poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        lineHeight: '24px',
                                        color: '#ffffff',
                                    }}
                                >
                                    Dark
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar; 