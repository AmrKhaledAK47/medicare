'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Divider } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';

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
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const drawerWidth = isExpanded ? 240 : 80;

    const handleThemeToggle = (newMode: 'light' | 'dark') => {
        setMode(newMode);
        // Here you would implement your theme-switching logic
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: 1000,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid #EEF1F4',
                    transition: 'width 0.2s ease-in-out',
                    overflow: 'hidden', // Prevent scrolling
                    backgroundColor: 'white',
                    zIndex: 1000,
                    pt: '15px', // Add padding top to account for AppBar height
                    mt: '70px',
                    borderRadius: '10px',
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
                {/* Toggle button for sidebar expansion - positioned mid-right side */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: -5,
                        top: '7%',
                        transform: 'translateY(-50%)',
                        zIndex: 1200,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={toggleSidebar}
                >
                    <Box
                        sx={{
                            width: 21,
                            height: 21,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '18.16px',
                            backgroundColor: '#ffffff',
                            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 0.2s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.06152 1.99999L2.00012 9.0614L9.06152 16.1228" stroke="black" strokeWidth="2.26974" strokeLinecap="square" />
                        </svg>
                    </Box>
                </Box>

                {/* Navigation menu */}
                <List sx={{ width: '100%', mt: 0, pt: 1, px: 2 }}>
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
                                            <Box sx={{ position: 'relative', width: 23, height: 23 }}>
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'contain',
                                                        filter: isActive ? 'brightness(0) invert(1)' : 'none'
                                                    }}
                                                />
                                            </Box>
                                        </ListItemIcon>
                                        {isExpanded && (
                                            <ListItemText
                                                primary={item.name}
                                                sx={{
                                                    opacity: 1,
                                                    color: isActive ? 'white' : '#21647D',
                                                    '& .MuiListItemText-primary': {
                                                        fontWeight: 500,
                                                        fontSize: '1rem',
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
                    <ListItem disablePadding sx={{ mb: 'auto' }}>
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
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                            </ListItemIcon>
                            {isExpanded && (
                                <ListItemText
                                    primary="Log Out"
                                    sx={{
                                        opacity: 1,
                                        color: '#21647D',
                                        '& .MuiListItemText-primary': {
                                            fontWeight: 500,
                                            fontSize: '1rem',
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
                        <ListItem disablePadding sx={{ mb: 0 }}>
                            <Link href="/add" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                        <Box sx={{ position: 'relative', width: 26, height: 26 }}>
                                            <Image
                                                src="/icons/add.svg"
                                                alt="Add"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </Box>
                                    </ListItemIcon>
                                    {isExpanded && (
                                        <ListItemText
                                            primary="Add"
                                            sx={{
                                                opacity: 1,
                                                color: '#21647D',
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: 500,
                                                    fontSize: '1rem',
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding sx={{ mb: 0 }}>
                            <Link href="/dark" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                        <Box sx={{ position: 'relative', width: 28, height: 28 }}>
                                            <Image
                                                src="/icons/dark.svg"
                                                alt="Dark"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </Box>
                                    </ListItemIcon>
                                    {isExpanded && (
                                        <ListItemText
                                            primary="Dark"
                                            sx={{
                                                opacity: 1,
                                                color: '#21647D',
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: 500,
                                                    fontSize: '1rem',
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Box>

            </Box>
        </Drawer>
    );
};

export default Sidebar; 