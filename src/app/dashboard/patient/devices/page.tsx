'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    Divider,
    Chip,
    useMediaQuery,
    useTheme,
    FormGroup,
    Button
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import DeviceStatusSidebar from '../../../../components/patient/DeviceStatusSidebar';
import DeviceChecklist from '../../../../components/patient/DeviceChecklist';
import { usePathname } from 'next/navigation';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    overflow: 'hidden',
    height: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
}));

const MainContent = styled(Box)(({ theme }) => ({
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: theme.spacing(3),
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#A3A0A035' : '#333',
        borderRadius: '4px',
    },
}));

const DevicesContainer = styled(Paper)(({ theme }) => ({
    maxWidth: '1300px',
    margin: '0 auto',
    padding: theme.spacing(3),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const SetupSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
}));

const InstructionText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontSize: '16px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
}));

const ChecklistButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.mode === 'light' ? '#267997' : '#4d94ac',
    border: `1px solid ${theme.palette.mode === 'light' ? '#267997' : '#4d94ac'}`,
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '14px',
    padding: '6px 16px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(38, 121, 151, 0.08)' : 'rgba(38, 121, 151, 0.15)',
    },
    marginLeft: theme.spacing(2),
}));

const AppCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    height: '130px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 8px 16px rgba(0, 0, 0, ${theme.palette.mode === 'light' ? '0.08' : '0.2'})`,
        border: `1px solid ${theme.palette.mode === 'light' ? '#267997' : '#4d94ac'}`,
    },
}));

const SmallAppCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    height: '60px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 8px rgba(0, 0, 0, ${theme.palette.mode === 'light' ? '0.05' : '0.15'})`,
        border: `1px solid ${theme.palette.mode === 'light' ? '#267997' : '#4d94ac'}`,
    },
}));

const AppIcon = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '60px',
    position: 'relative',
    marginBottom: theme.spacing(1),
}));

const SmallAppIcon = styled(Box)(({ theme }) => ({
    width: '40px',
    height: '40px',
    position: 'relative',
    marginRight: theme.spacing(1.5),
}));

const AppName = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    textAlign: 'center',
}));

const ConnectedIndicator = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    height: '22px',
    fontSize: '10px',
    fontWeight: 'bold',
}));

const DevicesPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const pathname = usePathname();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [skipStep, setSkipStep] = useState(false);
    const [connectedApps, setConnectedApps] = useState<string[]>([]);
    const [showChecklist, setShowChecklist] = useState(false);

    const handleToggleConnection = (appName: string) => {
        if (connectedApps.includes(appName)) {
            setConnectedApps(connectedApps.filter(app => app !== appName));
        } else {
            setConnectedApps([...connectedApps, appName]);
        }
    };

    // Main health apps
    const healthApps = [
        { name: 'Apple Health', icon: '/icons/appleHealth.svg', id: 'apple-health' },
        { name: 'Google Fit', icon: '/images/google fit.png', id: 'google-fit' },
        { name: 'Fitbit', icon: '/images/fitbit.png', id: 'fitbit' },
        { name: 'Strava', icon: '/images/strava.png', id: 'strava' },
        { name: 'Oura', icon: '/images/Oura.png', id: 'oura' },
        { name: 'iHealth', icon: '/images/iHealth.png', id: 'ihealth' },
        { name: 'Dexcom', icon: '/images/dexcom.png', id: 'dexcom' },
        { name: 'WHOOP', icon: '/images/WHOOP.png', id: 'whoop' },
    ];

    // Other supported apps
    const otherApps = [
        { name: 'Apple Watch', icon: '/images/apple watch.png', id: 'apple-watch' },
        { name: 'Samsung', icon: '/images/samsung.png', id: 'samsung' },
        { name: 'Flo', icon: '/images/Flo.png', id: 'flo' },
        { name: 'My Fitness Pal', icon: '/images/fitness.png', id: 'fitness-pal' },
        { name: 'Medisafe', icon: '/images/medisafe.png', id: 'medisafe' },
        { name: 'Clue', icon: '/images/Clue.png', id: 'clue' },
    ];

    useEffect(() => {
        // Implement logic to determine the active tab based on the pathname
        // This is a placeholder and should be replaced with actual implementation
        setShowChecklist(false);
    }, [pathname]);

    return (
        <PageContainer>
            <MainContent>
                <DevicesContainer>
                    <SectionTitle>Devices & Apps</SectionTitle>

                    <SetupSection>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                }}
                            >
                                Set Up Medicare
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}
                            >
                                Connect your health devices and apps
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={skipStep}
                                            onChange={() => setSkipStep(!skipStep)}
                                            sx={{
                                                color: mode === 'light' ? '#267997' : '#4d94ac',
                                                '&.Mui-checked': {
                                                    color: '#267997',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                            }}
                                        >
                                            Skip Step
                                        </Typography>
                                    }
                                />
                            </FormGroup>
                            <ChecklistButton
                                onClick={() => setShowChecklist(!showChecklist)}
                                startIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            >
                                Checklist
                            </ChecklistButton>
                        </Box>
                    </SetupSection>

                    {/* Show checklist if the button is clicked */}
                    {showChecklist && (
                        <DeviceChecklist connectedDevices={connectedApps.length} />
                    )}

                    <InstructionText>
                        Tap to connect to ...
                    </InstructionText>

                    {/* Main Health Apps Section */}
                    <Grid container spacing={2}>
                        {healthApps.map((app) => (
                            <Grid item xs={6} sm={4} md={3} key={app.id}>
                                <AppCard onClick={() => handleToggleConnection(app.id)}>
                                    {connectedApps.includes(app.id) && (
                                        <ConnectedIndicator label="Connected" size="small" />
                                    )}
                                    <AppIcon>
                                        <Image
                                            src={app.icon}
                                            alt={app.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </AppIcon>
                                    <AppName>{app.name}</AppName>
                                </AppCard>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Other Supported Apps Section */}
                    <Box sx={{ mt: 5, mb: 3 }}>
                        <Divider sx={{ mb: 3 }} />
                        <SubSectionTitle>Other supported apps</SubSectionTitle>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            }}
                        >
                            Medicare also supports data from apps via Apple Health, Google Fit, or exports
                        </Typography>

                        <Grid container spacing={2}>
                            {otherApps.map((app) => (
                                <Grid item xs={12} sm={6} md={4} key={app.id}>
                                    <SmallAppCard onClick={() => handleToggleConnection(app.id)}>
                                        {connectedApps.includes(app.id) && (
                                            <ConnectedIndicator label="Connected" size="small" />
                                        )}
                                        <SmallAppIcon>
                                            <Image
                                                src={app.icon}
                                                alt={app.name}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </SmallAppIcon>
                                        <AppName>{app.name}</AppName>
                                    </SmallAppCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Health Data Integration Section */}
                    <Box sx={{ mt: 5, mb: 3 }}>
                        <Divider sx={{ mb: 3 }} />
                        <SubSectionTitle>Health Data Integration</SubSectionTitle>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            }}
                        >
                            Connect your devices to automatically sync health data with your Medicare account. This helps your healthcare providers get a complete picture of your health.
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                borderRadius: '12px',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#267997' : '#4d94ac',
                                }}
                            >
                                Benefits of connecting devices
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>1</Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                Automated Tracking
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', ml: 5 }}>
                                            No manual entry needed - your health data syncs automatically
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>2</Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                Comprehensive View
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', ml: 5 }}>
                                            Provide doctors with a complete picture of your health trends
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>3</Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                Better Insights
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', ml: 5 }}>
                                            Receive personalized health insights based on your data
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

                    {/* Data Privacy Section */}
                    <Box sx={{ mt: 4 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '12px',
                                fontStyle: 'italic',
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                textAlign: 'center',
                            }}
                        >
                            Your privacy is important to us. Medicare only accesses the health data you explicitly authorize.
                            You can disconnect devices at any time and manage your data sharing preferences in your profile settings.
                        </Typography>
                    </Box>
                </DevicesContainer>
            </MainContent>

            {/* Status Sidebar - only visible on desktop/larger tablets */}
            {!isTablet && (
                <DeviceStatusSidebar
                    connectedDevices={connectedApps.length}
                    uploadedFiles={1}
                    connectedSystems={0}
                />
            )}
        </PageContainer>
    );
};

export default DevicesPage; 