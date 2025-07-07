'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Divider } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';
import LogoutButton from '@/components/auth/LogoutButton';

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

// Practitioner-specific menu items
const menuItems = [
    { name: 'Dashboard', icon: '/icons/home.svg', path: '/dashboard/practitioner' },
    { name: 'Patients', icon: '/icons/profile.svg', path: '/dashboard/practitioner/patients' },
    { name: 'Appointments', icon: '/icons/appointment.svg', path: '/dashboard/practitioner/appointments' },
    { name: 'Reports', icon: '/icons/file.svg', path: '/dashboard/practitioner/reports' },
    { name: 'Medications', icon: '/icons/medications.svg', path: '/dashboard/practitioner/medications' },
    { name: 'Messages', icon: '/icons/chat.svg', path: '/dashboard/practitioner/messages' },
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
                    zIndex: 9000,
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
                                                            filter: isActive
                                                                ? 'brightness(0) invert(1)'
                                                                : item.name === "Dashboard" && !isActive
                                                                    ? 'invert(61%) sepia(95%) saturate(380%) hue-rotate(152deg) brightness(84%) contrast(88%)'
                                                                    : mode === 'dark' && !isActive
                                                                        ? 'invert(0.8)'
                                                                        : 'none',
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
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
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
                                    <LogoutButton
                                        variant="text"
                                        color={mode === 'light' ? '#21647D' : '#B8C7CC'}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {/* Theme toggle at the bottom */}
                    <Box sx={{ mt: 'auto', mb: 2, px: 2, display: 'flex', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                backgroundColor: mode === 'light' ? '#F5F5F5' : '#2B2B2B',
                                borderRadius: '100px',
                                padding: '5px',
                                width: isExpanded ? '80%' : '60px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                onClick={() => {
                                    if (mode !== 'light') toggleTheme();
                                }}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: mode === 'light' ? '#FFFFFF' : 'transparent',
                                    borderRadius: '100px',
                                    padding: '5px 10px',
                                    flex: 1,
                                    cursor: 'pointer',
                                    boxShadow: mode === 'light' ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                                }}
                            >
                                <Box sx={{ position: 'relative', width: 18, height: 18, mr: isExpanded ? 1 : 0 }}>
                                    <Image
                                        src="/icons/light-mode.svg"
                                        alt="Light Mode"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                {isExpanded && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                        }}
                                    >
                                        Light
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                onClick={() => {
                                    if (mode !== 'dark') toggleTheme();
                                }}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: mode === 'dark' ? '#1A1A1A' : 'transparent',
                                    borderRadius: '100px',
                                    padding: '5px 10px',
                                    flex: 1,
                                    cursor: 'pointer',
                                    boxShadow: mode === 'dark' ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                                }}
                            >
                                <Box sx={{ position: 'relative', width: 18, height: 18, mr: isExpanded ? 1 : 0 }}>
                                    <Image
                                        src="/icons/dark-mode.svg"
                                        alt="Dark Mode"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                {isExpanded && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            color: mode === 'dark' ? '#FFFFFF' : '#97A4A9',
                                        }}
                                    >
                                        Dark
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar; 