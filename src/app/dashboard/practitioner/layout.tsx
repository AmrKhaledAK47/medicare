'use client';

import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge, Link as MuiLink, useMediaQuery, Drawer, Button, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../../../components/practitioner/Sidebar';
import Logo from '../../../components/common/Logo';
import { useThemeContext, ThemeContextProvider } from '../../../components/practitioner/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import RootProvider from '@/providers/RootProvider';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from '@/components/auth/LogoutButton';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

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

export default function PractitionerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RootProvider requireAuth={true} allowedRoles={['practitioner']}>
            <ThemeContextProvider>
                <PractitionerDashboardContent>{children}</PractitionerDashboardContent>
            </ThemeContextProvider>
        </RootProvider>
    );
}

function PractitionerDashboardContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(true);
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();

    // Profile menu state
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleLogout = () => {
        handleProfileMenuClose();
        logout();
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
                            Practitioner Dashboard
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
                                placeholder="Search patients, appointments..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
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
                                    <Badge badgeContent={3} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#21647D', color: 'white' } }}>
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

                        {/* Profile Avatar */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                size="small"
                                sx={{ p: 0 }}
                                aria-controls={isProfileMenuOpen ? 'profile-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isProfileMenuOpen ? 'true' : undefined}
                            >
                                <Avatar
                                    alt={user?.name || "Dr. Jane Smith"}
                                    src="/avatars/doctor.png"
                                    sx={{
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 },
                                        border: '2px solid #21647D'
                                    }}
                                />
                            </IconButton>
                            {!isMobile && (
                                <Box
                                    sx={{
                                        ml: 1,
                                        display: { xs: 'none', sm: 'block' },
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleProfileMenuOpen}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: mode === 'light' ? '#333' : '#FFF',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {user?.name || "Dr. Jane Smith"}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '12px',
                                            color: mode === 'light' ? '#666' : '#CCC',
                                            lineHeight: 1
                                        }}
                                    >
                                        Practitioner
                                    </Typography>
                                </Box>
                            )}

                            {/* Profile Menu */}
                            <Menu
                                id="profile-menu"
                                anchorEl={profileMenuAnchorEl}
                                open={isProfileMenuOpen}
                                onClose={handleProfileMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'profile-button',
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                        mt: 1.5,
                                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1,
                                            fontSize: '0.9rem',
                                            color: mode === 'light' ? '#333' : '#FFF',
                                            '&:hover': {
                                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleProfileMenuClose}>
                                    <FaUserCircle style={{ marginRight: 8, color: '#21647D' }} />
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleProfileMenuClose}>
                                    <FaCog style={{ marginRight: 8, color: '#21647D' }} />
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <FaSignOutAlt style={{ marginRight: 8, color: '#21647D' }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Sidebar - hidden on mobile, shown in drawer */}
                {!isTablet ? (
                    <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
                ) : (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better mobile performance
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: 240,
                                backgroundColor: mode === 'light' ? 'white' : '#1A1A1A',
                            },
                        }}
                    >
                        <Sidebar isExpanded={true} toggleSidebar={() => { }} />
                    </Drawer>
                )}

                {/* Page content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 3 },
                        overflow: 'auto',
                        backgroundColor: mode === 'light' ? '#F8FAFC' : '#121212',
                        height: 'calc(100vh - 70px)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
} 