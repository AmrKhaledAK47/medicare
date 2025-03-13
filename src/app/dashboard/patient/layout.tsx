'use client';

import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../../../components/patient/Sidebar';
import Logo from '../../../components/common/Logo';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
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
    color: '#888',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#333',
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
                    backgroundColor: 'white',
                    borderBottom: '1px solid #EEF1F4',
                    boxShadow: 'none',
                    height: '70px',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', height: '64px' }}>
                    {/* Logo and title - Use the Logo component */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/">
                            <Logo color="blue" position="relative" />
                        </Link>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 2, fontWeight: 600, display: { xs: 'none', md: 'block' }, fontSize: '17px' }}>
                            Dashboard overview
                        </Typography>
                    </Box>

                    {/* Search bar */}
                    <Search sx={{ mx: 'auto', flexGrow: 1, ml: 4 }}>
                        <SearchIconWrapper>
                            <Image src="/icons/search.svg" alt="Search" fill style={{ objectFit: 'contain' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search here..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <MuiLink href="/share-profile" sx={{ display: 'flex', alignItems: 'center', mr: 2, textDecoration: 'none', color: '#21647D', fontSize: '17px', fontWeight: 600, marginRight: '30px' }}>
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
                                        style={{ objectFit: 'contain' }}
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
                                        style={{ objectFit: 'contain' }}
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
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
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
                        backgroundColor: '#F5F9FA',
                        zIndex: -1,
                    }}
                >
                    {/* Main content area */}
                    {children}
                </Box>
            </Box>
        </Box>
    );
} 