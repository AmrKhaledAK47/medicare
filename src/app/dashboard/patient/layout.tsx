'use client';

import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../../../components/patient/Sidebar';
import Logo from '../../../components/common/Logo';
import { useThemeContext } from '../../../components/patient/Sidebar';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : '#2B2B2B',
    marginRight: theme.spacing(2),
    paddingLeft: 10,
    width: '100%',
    maxWidth: '500px', // Increased width for a longer search bar
    height: '48px', // Reduced height
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1), // Adjusted padding for smaller height
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
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(3)})`, // Adjusted for icon
        transition: theme.transitions.create('width'),
        width: '100%',
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

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* AppBar - Now positioned at the top of the entire layout */}
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{
                    backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                    borderBottom: mode === 'light' ? '4px solid #EEF1F4' : '4px solid #333',
                    boxShadow: 'none',
                    height: '70px',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', height: '64px' }}>
                    {/* Logo and title - Use the Logo component */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/">
                            <Logo color={mode === 'light' ? "blue" : "white"} position="relative" />
                        </Link>
                        <Typography variant="body2" sx={{ ml: -2, marginTop: 1, fontWeight: 500, display: { xs: 'none', md: 'block' }, fontSize: '15px', color: mode === 'light' ? "#97A4A9" : "#B8C7CC", fontFamily: "poppins" }}>
                            Dashboard overview
                        </Typography>
                    </Box>

                    {/* Search bar */}
                    <Search sx={{ mx: 'auto', flexGrow: 1, ml: 4, }}>
                        <SearchIconWrapper>
                            <Image src="/icons/search.svg" alt="Search" fill style={{ objectFit: 'contain', marginLeft: 10, filter: mode === 'dark' ? 'invert(0.8)' : 'none' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search here..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <MuiLink href="/share-profile" sx={{ display: 'flex', alignItems: 'center', mr: 2, textDecoration: 'none', color: mode === 'light' ? '#21647D' : '#B8C7CC', fontSize: '17px', fontWeight: 650, marginRight: '30px' }}>
                        Share Profile
                    </MuiLink>

                    {/* Right section: notifications and profile */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <IconButton
                            size="large"
                            sx={{ mr: 2 }}
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
                            size="large"
                            sx={{ mr: 2 }}
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

                        <Avatar
                            alt="Patient"
                            src="/avatars/patient.png"
                            sx={{ width: 40, height: 40 }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Content area with sidebar and main content */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
                {/* Sidebar */}
                <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

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
                        zIndex: 1, // Lower z-index than the sidebar toggle
                    }}
                >
                    {/* Main content area */}
                    {children}
                </Box>
            </Box>
        </Box>
    );
} 