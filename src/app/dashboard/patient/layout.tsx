'use client';

import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge, Link as MuiLink, useMediaQuery, Drawer, Button } from '@mui/material';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../../../components/patient/Sidebar';
import Logo from '../../../components/common/Logo';
import { useThemeContext } from '../../../components/patient/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : '#2B2B2B',
    marginRight: theme.spacing(2),
    paddingLeft: 10,
    width: '100%',
    maxWidth: '500px',
    height: '48px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        maxWidth: '100%',
        height: '40px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.mode === 'light' ? '#888' : '#999',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#333' : '#FFF',
    width: '100%',
    height: '100%',
    fontSize: '17px',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
    },
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px 10px 35px',
        },
    },
}));

export default function PatientDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* AppBar */}
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{
                    backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                    borderBottom: mode === 'light' ? '4px solid #EEF1F4' : '4px solid #333',
                    boxShadow: 'none',
                    height: { xs: '60px', sm: '70px' },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ 
                    justifyContent: 'space-between', 
                    height: { xs: '56px', sm: '64px' },
                    minHeight: { xs: 'auto', sm: '64px' },
                    px: { xs: 1, sm: 2 }
                }}>
                    {/* Logo and title */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isTablet && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 1 }}
                            >
                                <MenuIcon sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }} />
                            </IconButton>
                        )}
                        <Link href="/">
                            <Logo color={mode === 'light' ? "blue" : "white"} position="relative" />
                        </Link>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                ml: -2, 
                                marginTop: 1, 
                                fontWeight: 500, 
                                display: { xs: 'none', lg: 'block' }, 
                                fontSize: '15px', 
                                color: mode === 'light' ? "#97A4A9" : "#B8C7CC", 
                                fontFamily: "poppins" 
                            }}
                        >
                            Dashboard overview
                        </Typography>
                    </Box>

                    {/* Search bar - hide on very small screens */}
                    {!isMobile && (
                        <Search sx={{ 
                            mx: 'auto', 
                            flexGrow: 1, 
                            ml: { xs: 1, sm: 2, md: 4 },
                            maxWidth: { xs: '200px', sm: '300px', md: '500px' }
                        }}>
                            <SearchIconWrapper>
                                <Image 
                                    src="/icons/search.svg" 
                                    alt="Search" 
                                    width={20}
                                    height={20}
                                    style={{ 
                                        objectFit: 'contain', 
                                        filter: mode === 'dark' ? 'invert(0.8)' : 'none' 
                                    }} 
                                />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search here..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    )}

                    {/* Share Profile link - hide on small screens */}
                    {!isTablet && (
                        <MuiLink 
                            href="/share-profile" 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mr: { md: 1, lg: 2 }, 
                                textDecoration: 'none', 
                                color: mode === 'light' ? '#21647D' : '#B8C7CC', 
                                fontSize: { md: '15px', lg: '17px' },
                                fontWeight: 650, 
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Share Profile
                        </MuiLink>
                    )}

                    {/* Right section: notifications and profile */}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        {!isMobile && (
                            <>
                                <IconButton
                                    size={isMobile ? "small" : "large"}
                                    sx={{ mr: { xs: 1, sm: 2 } }}
                                >
                                    <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#21647D', color: 'white' } }}>
                                        <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                                            <Image
                                                src="/icons/chat.svg"
                                                alt="Chat"
                                                fill
                                                style={{ objectFit: 'contain', filter: mode === 'dark' ? 'invert(0.8)' : 'none' }}
                                            />
                                        </Box>
                                    </Badge>
                                </IconButton>

                                <IconButton
                                    size={isMobile ? "small" : "large"}
                                    sx={{ mr: { xs: 1, sm: 2 } }}
                                >
                                    <Badge badgeContent={0} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#21647D', color: 'white' } }}>
                                        <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                                            <Image
                                                src="/icons/notification.svg"
                                                alt="Notifications"
                                                fill
                                                style={{ objectFit: 'contain', filter: mode === 'dark' ? 'invert(0.8)' : 'none' }}
                                            />
                                        </Box>
                                    </Badge>
                                </IconButton>
                            </>
                        )}

                        <Avatar
                            alt="Patient"
                            src="/avatars/patient.png"
                            sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Content area with sidebar and main content */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', }}>
                {/* Sidebar - regular view for desktop */}
                {!isTablet && (
                    <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
                )}

                {/* Sidebar - drawer for mobile */}
                {isTablet && (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile
                        }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: 280,
                                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                            },
                        }}
                    >
                        <Sidebar isExpanded={true} toggleSidebar={handleDrawerToggle} />
                    </Drawer>
                )}

                {/* Mobile search bar - visible only on small screens */}
                {isMobile && (
                    <Box sx={{ 
                        position: 'sticky', 
                        top: 0, 
                        backgroundColor: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                        zIndex: 10,
                        p: 1.5,
                        borderBottom: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    }}>
                        {/* <Search sx={{ width: '100%', maxWidth: '100%', mx: 0 }}>
                            <SearchIconWrapper>
                                <Image 
                                    src="/icons/search.svg" 
                                    alt="Search" 
                                    width={20}
                                    height={20}
                                    style={{ 
                                        objectFit: 'contain', 
                                        filter: mode === 'dark' ? 'invert(0.8)' : 'none' 
                                    }} 
                                />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search here..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}
                    </Box>
                )}

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        backgroundColor: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {/* Main content area */}
                    {children}

                    {/* Mobile actions bar - enhanced for better usability */}
                    {isTablet && (
                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                                borderTop: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                                py: 1.5,
                                px: 2,
                                zIndex: 10,
                                boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <IconButton 
                                size="medium"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                    p: 1,
                                    '&:hover': {
                                        backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                    },
                                }}
                            >
                                <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#21647D', color: 'white' } }}>
                                    <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                                        <Image
                                            src="/icons/chat.svg"
                                            alt="Chat"
                                            fill
                                            style={{ objectFit: 'contain', filter: mode === 'dark' ? 'invert(0.8)' : 'none' }}
                                        />
                                    </Box>
                                </Badge>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        mt: 0.5, 
                                        fontSize: '10px',
                                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    }}
                                >
                                    Chat
                                </Typography>
                            </IconButton>
                            
                            <IconButton 
                                size="medium"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                    p: 1,
                                    '&:hover': {
                                        backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                    },
                                }}
                            >
                                <Badge badgeContent={0} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#21647D', color: 'white' } }}>
                                    <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                                        <Image
                                            src="/icons/notification.svg"
                                            alt="Notifications"
                                            fill
                                            style={{ objectFit: 'contain', filter: mode === 'dark' ? 'invert(0.8)' : 'none' }}
                                        />
                                    </Box>
                                </Badge>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        mt: 0.5, 
                                        fontSize: '10px',
                                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    }}
                                >
                                    Alerts
                                </Typography>
                            </IconButton>
                            
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#21647D',
                                    color: 'white',
                                    borderRadius: '20px',
                                    px: 2,
                                    py: 1,
                                    fontSize: '12px',
                                    height: '36px',
                                    minWidth: '110px',
                                    boxShadow: '0 4px 8px rgba(33, 100, 125, 0.25)',
                                    '&:hover': {
                                        backgroundColor: '#1A5369',
                                    },
                                }}
                            >
                                Share Profile
                            </Button>
                            
                            <IconButton 
                                size="medium" 
                                onClick={handleDrawerToggle}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                    p: 1,
                                    '&:hover': {
                                        backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                    },
                                }}
                            >
                                <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                                    <MenuIcon sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }} />
                                </Box>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        mt: 0.5, 
                                        fontSize: '10px',
                                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    }}
                                >
                                    Menu
                                </Typography>
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
} 