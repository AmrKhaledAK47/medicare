'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import { useRouter, usePathname } from 'next/navigation';

// Styled components
const SidebarContainer = styled(Paper)(({ theme }) => ({
    width: '380px',
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#A3A0A091' : '#333',
        borderRadius: '4px',
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    marginBottom: theme.spacing(1),
}));

const StatusItem = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: active ? '#F7FDFF' : 'transparent',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: active ? '#F7FDFF' : theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    },
}));

const StatusIcon = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
    width: '40px',
    height: '40px',
    position: 'relative',
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: active ? 'none' : theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
}));

const StatusInfo = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const StatusTitle = styled(Typography)<{ active?: boolean }>(({ theme, active }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: active ? '#000000' : theme.palette.mode === 'light' ? '#6C7A89' : '#FFFFFF',
}));

const StatusDescription = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

interface DeviceStatusSidebarProps {
    connectedDevices: number;
    uploadedFiles: number;
    connectedSystems: number;
}

type StatusItemType = 'devices' | 'files' | 'systems';

const DeviceStatusSidebar: React.FC<DeviceStatusSidebarProps> = ({
    connectedDevices = 0,
    uploadedFiles = 1,
    connectedSystems = 0,
}) => {
    const { mode } = useThemeContext();
    const router = useRouter();
    const pathname = usePathname() || '';

    // Determine the active status based on the current pathname
    const getInitialActiveStatus = (): StatusItemType => {
        if (pathname.includes('/files')) return 'files';
        if (pathname.includes('/systems')) return 'systems';
        return 'devices';
    };

    const [activeStatus, setActiveStatus] = useState<StatusItemType>(getInitialActiveStatus());

    // Update active status when pathname changes
    useEffect(() => {
        if (pathname.includes('/files')) {
            setActiveStatus('files');
        } else if (pathname.includes('/systems')) {
            setActiveStatus('systems');
        } else if (pathname.includes('/devices')) {
            setActiveStatus('devices');
        }
    }, [pathname]);

    const handleStatusClick = (status: StatusItemType) => {
        setActiveStatus(status);

        // Define navigation paths for each status
        const paths = {
            devices: '/dashboard/patient/devices',
            files: '/dashboard/patient/files',
            systems: '/dashboard/patient/systems'
        };

        // Navigate to the selected path
        router.push(paths[status]);
    };

    return (
        <SidebarContainer elevation={0}>
            <SectionTitle>Status</SectionTitle>

            {/* Devices & Apps Status */}
            <StatusItem
                active={activeStatus === 'devices'}
                onClick={() => handleStatusClick('devices')}
            >
                <StatusIcon active={activeStatus === 'devices'}>
                    <Box sx={{ position: 'relative', width: 30, height: 30 }}>
                        <Image
                            src="/icons/device-gray.svg"
                            alt="Devices"
                            fill
                            style={{
                                objectFit: 'contain',
                                filter: activeStatus === 'devices' ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(125deg) brightness(90%) contrast(95%)' : 'none'
                            }}
                        />
                    </Box>
                </StatusIcon>
                <StatusInfo>
                    <StatusTitle active={activeStatus === 'devices'}>Devices & Apps</StatusTitle>
                    <StatusDescription>
                        {connectedDevices > 0
                            ? `${connectedDevices} Connected`
                            : 'None Connected'}
                    </StatusDescription>
                </StatusInfo>
            </StatusItem>

            {/* File Uploads Status */}
            <StatusItem
                active={activeStatus === 'files'}
                onClick={() => handleStatusClick('files')}
            >
                <StatusIcon active={activeStatus === 'files'}>
                    <Box sx={{
                        width: 30,
                        height: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            src="/icons/file-upload.svg"
                            alt="File Upload"
                            width={18}
                            height={18}
                            style={{
                                filter: activeStatus === 'files' ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(125deg) brightness(90%) contrast(95%)' : 'none'
                            }}
                        />
                    </Box>
                </StatusIcon>
                <StatusInfo>
                    <StatusTitle active={activeStatus === 'files'}>File Uploads</StatusTitle>
                    <StatusDescription>
                        {uploadedFiles} file{uploadedFiles !== 1 ? 's' : ''} uploaded
                    </StatusDescription>
                </StatusInfo>
            </StatusItem>

            {/* Health System Status */}
            <StatusItem
                active={activeStatus === 'systems'}
                onClick={() => handleStatusClick('systems')}
            >
                <StatusIcon active={activeStatus === 'systems'}>
                    <Box sx={{
                        width: 30,
                        height: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            src="/icons/health-system.svg"
                            alt="Health System"
                            width={20}
                            height={20}
                            style={{
                                filter: activeStatus === 'systems' ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(125deg) brightness(90%) contrast(95%)' : 'none'
                            }}
                        />
                    </Box>
                </StatusIcon>
                <StatusInfo>
                    <StatusTitle active={activeStatus === 'systems'}>Health System</StatusTitle>
                    <StatusDescription>
                        {connectedSystems > 0
                            ? `${connectedSystems} Connected`
                            : 'None Connected'}
                    </StatusDescription>
                </StatusInfo>
            </StatusItem>

            {/* Additional Information */}
            <Box sx={{ mt: 'auto', pt: 3 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '14px',
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                    }}
                >
                    <strong>Need help?</strong> Our support team can help you connect your devices or troubleshoot connection issues.
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '14px',
                        mt: 2,
                        color: '#267997',
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline',
                        }
                    }}
                >
                    Contact Support
                </Typography>
            </Box>
        </SidebarContainer>
    );
};

export default DeviceStatusSidebar; 