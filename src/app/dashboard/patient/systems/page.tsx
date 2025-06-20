'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    useMediaQuery,
    useTheme,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Divider,
    Chip,
    IconButton,
    InputAdornment,
    CircularProgress,
    Avatar,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActionArea,
    Badge,
    Alert,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import DeviceStatusSidebar from '../../../../components/patient/DeviceStatusSidebar';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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

const SystemsContainer = styled(Paper)(({ theme }) => ({
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

const PlaceholderText = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    textAlign: 'center',
}));

const ConnectButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#267997',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '10px 24px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#21647D',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}));

const InfoBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.8)' : 'rgba(26, 26, 26, 0.8)',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2B2B2B',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontWeight: 600,
    padding: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const SearchField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#262626',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light' ? '#CCD6DD' : '#444',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#267997',
        },
    },
}));

const ProviderListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    padding: 0,
}));

const ProviderAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: '#267997',
    color: '#FFFFFF',
    width: 40,
    height: 40,
}));

const ConnectInfoCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

const MedicalInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    marginTop: theme.spacing(2),
}));

const MedicalInfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
}));

const MedicalInfoIcon = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
}));

const ActivityFeed = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

const ActivityItem = styled(Box)<{ unread?: boolean }>(({ theme, unread }) => ({
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
    backgroundColor: unread
        ? theme.palette.mode === 'light' ? '#F0F8FB' : '#263238'
        : 'transparent',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    position: 'relative',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2B333B',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: -5,
        backgroundColor: '#267997',
        color: 'white',
    },
}));

const StatusIndicator = styled('div')<{ status: string }>(({ theme, status }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor:
        status === 'confirmed' ? '#34A853' :
            status === 'scheduled' ? '#FBBC05' :
                status === 'completed' ? '#4285F4' :
                    status === 'cancelled' ? '#EA4335' :
                        '#6C7A89',
    display: 'inline-block',
    marginRight: theme.spacing(1),
}));

const ProviderCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    boxShadow: 'none',
    height: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
}));

const TabsContainer = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    marginBottom: theme.spacing(2),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 500,
    minWidth: '120px',
    fontFamily: '"Poppins", sans-serif',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    '&.Mui-selected': {
        color: '#267997',
        fontWeight: 600,
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '8px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    boxShadow: 'none',
}));

const SystemsPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const pathname = usePathname();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Enhanced dialog states
    const [openConnectDialog, setOpenConnectDialog] = useState(false);
    const [connectStep, setConnectStep] = useState(1);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    // New functionality states
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [showRecentActivity, setShowRecentActivity] = useState(true);
    const [sortOption, setSortOption] = useState('alphabetical');
    const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
    const [providerToDisconnect, setProviderToDisconnect] = useState<string | null>(null);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [selectedMedicalInfo, setSelectedMedicalInfo] = useState<any>(null);
    const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
    const [unreadCount, setUnreadCount] = useState(1);

    // Mock data for providers with improved categorization and realistic names
    const providers = [
        // Major Hospitals
        {
            id: '1',
            name: 'Mayo Clinic',
            location: 'Rochester, MN',
            category: 'Hospital',
            image: '/icons/hospital.svg',
            popularity: 'Popular',
            features: ['Lab Results', 'Medications', 'Appointments', 'Imaging']
        },
        {
            id: '2',
            name: 'Cleveland Clinic',
            location: 'Cleveland, OH',
            category: 'Hospital',
            image: '/icons/hospital.svg',
            popularity: 'Popular',
            features: ['Lab Results', 'Medications', 'Appointments', 'Imaging', 'Notes']
        },
        {
            id: '3',
            name: 'Massachusetts General Hospital',
            location: 'Boston, MA',
            category: 'Hospital',
            image: '/icons/hospital.svg',
            features: ['Lab Results', 'Medications', 'Appointments']
        },
        // Primary Care
        {
            id: '4',
            name: 'Evergreen Family Practice',
            location: 'Seattle, WA',
            category: 'Primary Care',
            image: '/icons/clinic.svg',
            features: ['Appointments', 'Notes', 'Prescriptions']
        },
        {
            id: '5',
            name: 'Sunshine Family Medicine',
            location: 'Miami, FL',
            category: 'Primary Care',
            image: '/icons/clinic.svg',
            features: ['Appointments', 'Notes', 'Prescriptions']
        },
        // Specialty Clinics
        {
            id: '6',
            name: 'Advanced Cardiology Associates',
            location: 'Chicago, IL',
            category: 'Specialty',
            image: '/icons/specialty.svg',
            features: ['Lab Results', 'ECG Reports', 'Appointments']
        },
        {
            id: '7',
            name: 'Northside Pediatrics',
            location: 'Atlanta, GA',
            category: 'Specialty',
            image: '/icons/specialty.svg',
            features: ['Growth Charts', 'Vaccinations', 'Appointments']
        },
        // Telehealth
        {
            id: '8',
            name: 'Teladoc Health',
            location: 'Virtual',
            category: 'Telehealth',
            image: '/icons/telehealth.svg',
            popularity: 'Popular',
            features: ['Video Visits', 'Prescriptions', 'Notes']
        },
        {
            id: '9',
            name: 'Amwell',
            location: 'Virtual',
            category: 'Telehealth',
            image: '/icons/telehealth.svg',
            features: ['Video Visits', 'Prescriptions', 'Notes']
        },
        // Mental Health
        {
            id: '10',
            name: 'Mindful Behavioral Health',
            location: 'San Francisco, CA',
            category: 'Mental Health',
            image: '/icons/mental-health.svg',
            features: ['Therapy Notes', 'Appointments', 'Assessments']
        },
    ];

    // Predefined provider categories for filtering
    const providerCategories = [
        { id: 'all', name: 'All Providers' },
        { id: 'hospital', name: 'Hospitals' },
        { id: 'primary', name: 'Primary Care' },
        { id: 'specialty', name: 'Specialty Clinics' },
        { id: 'telehealth', name: 'Telehealth' },
        { id: 'mental-health', name: 'Mental Health' }
    ];

    // Enhanced mock data for medical info with detailed records and better categorization
    const medicalInfo = [
        {
            id: '1',
            type: 'Annual Physical Examination',
            date: 'May 2, 2023',
            location: 'Mayo Clinic',
            description: 'Comprehensive annual check-up with blood work and vitals',
            doctor: 'Dr. Sarah Johnson',
            icon: {
                bg: '#E8EAFC',
                color: '#6470E5',
                component: <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#6470E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '2',
            type: 'Vital Signs',
            date: 'May 2, 2023',
            location: 'Mayo Clinic',
            description: 'Blood pressure: 120/80 mmHg, Heart rate: 72 bpm, Temperature: 98.6°F',
            doctor: 'Dr. Sarah Johnson',
            icon: {
                bg: '#FFE8EC',
                color: '#F75D74',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4 5.6C19.5348 4.73483 18.5144 4.06363 17.3914 3.63431C16.2684 3.20499 15.0678 3.02736 13.8701 3.11647C12.6723 3.20558 11.5066 3.55934 10.4598 4.15343C9.41295 4.74753 8.5073 5.56669 7.8 6.55M4.8 12C4.8 13.9096 5.45928 15.7625 6.67878 17.242C7.89828 18.7216 9.60072 19.6762 11.4816 19.9381C13.3624 20.1999 15.2737 19.7535 16.8771 18.6776C18.4805 17.6017 19.6722 15.9612 20.2 14.1" stroke="#F75D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8V12L14.5 14.5" stroke="#F75D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 3L21 21" stroke="#F75D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '3',
            type: 'Allergy Test Results',
            date: 'June 15, 2023',
            location: 'Mayo Clinic',
            description: 'Positive for pollen and dust mites, negative for food allergens',
            doctor: 'Dr. Michael Reynolds',
            actionable: true,
            icon: {
                bg: '#E8F7FC',
                color: '#4CACF8',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 11C10.433 11 12 9.433 12 7.5C12 5.567 10.433 4 8.5 4C6.567 4 5 5.567 5 7.5C5 9.433 6.567 11 8.5 11Z" stroke="#4CACF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.5 22C21.433 22 23 20.433 23 18.5C23 16.567 21.433 15 19.5 15C17.567 15 16 16.567 16 18.5C16 20.433 17.567 22 19.5 22Z" stroke="#4CACF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 15.5L17 18" stroke="#4CACF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 7.5C17 8.97 16.45 10.45 15.44 11.44C14.45 12.45 12.97 13 11.5 13C10.04 13 8.55 12.45 7.56 11.44C6.55 10.45 6 8.97 6 7.5" stroke="#4CACF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '4',
            type: 'Medications',
            date: 'Current',
            location: 'Mayo Clinic',
            description: 'Lisinopril 10mg (daily), Atorvastatin 20mg (daily), Cetirizine 10mg (as needed)',
            doctor: 'Dr. Sarah Johnson',
            actionable: true,
            icon: {
                bg: '#FFF8E0',
                color: '#FFB800',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 2L18 2" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V14" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22H15C16.1046 22 17 21.1046 17 20V11C17 9.89543 16.1046 9 15 9H9C7.89543 9 7 9.89543 7 11V20C7 21.1046 7.89543 22 9 22Z" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '5',
            type: 'Lab Results',
            date: 'May 10, 2023',
            location: 'Mayo Clinic',
            description: 'Complete Blood Count, Lipid Panel, Comprehensive Metabolic Panel',
            doctor: 'Dr. Sarah Johnson',
            status: 'Abnormal results',
            actionable: true,
            icon: {
                bg: '#E0F8F1',
                color: '#2DC98A',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6L5 6" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 18L3 18" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 3L10 5" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 19V21" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 6C5 8.20914 6.79086 10 9 10H11C13.2091 10 15 11.7909 15 14C15 16.2091 13.2091 18 11 18H9C6.79086 18 5 16.2091 5 14" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '6',
            type: 'Imaging',
            date: 'April 5, 2023',
            location: 'Mayo Clinic',
            description: 'Chest X-ray and abdominal ultrasound',
            doctor: 'Dr. James Wilson',
            icon: {
                bg: '#F0E7FC',
                color: '#9747FF',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16L8 12L10 14L15 9L20 14" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="9" r="1" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
        {
            id: '7',
            type: 'Immunizations',
            date: 'January 20, 2023',
            location: 'Mayo Clinic',
            description: 'Influenza (seasonal), COVID-19 booster',
            doctor: 'Dr. Lisa Chen',
            icon: {
                bg: '#E6F4EA',
                color: '#34A853',
                component: <Box sx={{ display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.4 15L18 13.6L16.6 15M18 12C17.4067 12 16.8266 12.1759 16.3333 12.5056C15.8399 12.8352 15.4554 13.3038 15.2284 13.8519C15.0013 14.4001 14.9419 15.0033 15.0576 15.5853C15.1734 16.1672 15.4591 16.7018 15.8787 17.1213C16.2982 17.5409 16.8328 17.8266 17.4147 17.9424C17.9967 18.0581 18.5999 17.9987 19.1481 17.7716C19.6962 17.5446 20.1648 17.1601 20.4944 16.6667C20.8241 16.1734 21 15.5933 21 15C21 14.2044 20.6839 13.4413 20.1213 12.8787C19.5587 12.3161 18.7956 12 18 12Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V10" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 15V17C7 17.5304 7.21071 18.0391 7.58579 18.4142C7.96086 18.7893 8.46957 19 9 19H12" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 9V11" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 9V11" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 9V11" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            }
        },
    ];

    // Recent health data updates - activity feed
    const recentUpdates = [
        {
            id: '1',
            type: 'New Lab Results',
            date: '2 days ago',
            source: 'Mayo Clinic',
            description: 'Cholesterol panel results are available',
            status: 'unread'
        },
        {
            id: '2',
            type: 'Appointment Note',
            date: '1 week ago',
            source: 'Mayo Clinic',
            description: 'Dr. Johnson added notes from your recent visit',
            status: 'read'
        },
        {
            id: '3',
            type: 'Prescription Renewed',
            date: '2 weeks ago',
            source: 'Mayo Clinic',
            description: 'Your Lisinopril prescription was renewed',
            status: 'read'
        },
    ];

    // Define upcoming appointments
    const upcomingAppointments = [
        {
            id: '1',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Primary Care',
            date: '2023-10-15T10:30:00',
            location: 'Mayo Clinic',
            type: 'In-person',
            status: 'confirmed'
        },
        {
            id: '2',
            doctor: 'Dr. Michael Reynolds',
            specialty: 'Allergist',
            date: '2023-10-22T14:00:00',
            location: 'Mayo Clinic',
            type: 'Telehealth',
            status: 'scheduled'
        }
    ];

    // Filter providers based on search query and selected category
    const filteredProviders = providers.filter(provider => {
        const matchesQuery = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' ||
            provider.category.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesQuery && matchesCategory;
    });

    // Sort providers based on selected sort option
    const sortedProviders = [...filteredProviders].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'popularity') {
            return a.popularity ? -1 : (b.popularity ? 1 : 0);
        } else if (sortOption === 'location') {
            return a.location.localeCompare(b.location);
        }
        return 0;
    });

    // Open connect dialog
    const handleOpenConnectDialog = () => {
        setOpenConnectDialog(true);
        setConnectStep(1);
        setSelectedProvider(null);
        setSearchQuery('');
        setSelectedCategory('all');
    };

    // Close connect dialog
    const handleCloseConnectDialog = () => {
        setOpenConnectDialog(false);
    };

    // Handle provider selection
    const handleSelectProvider = (providerId: string) => {
        setSelectedProvider(providerId);
        setConnectStep(2);
    };

    // Handle category selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Handle back button
    const handleBack = () => {
        if (connectStep > 1) {
            setConnectStep(connectStep - 1);
        } else {
            handleCloseConnectDialog();
        }
    };

    // Handle connect
    const handleConnect = () => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setConnected(true);
            setOpenConnectDialog(false);

            // Add to connected providers
            if (selectedProvider) {
                setConnectedProviders([...connectedProviders, selectedProvider]);
            }
        }, 2000);
    };

    // Handle disconnect
    const handleDisconnect = (providerId: string) => {
        setProviderToDisconnect(providerId);
        setDisconnectDialogOpen(true);
    };

    // Confirm disconnect
    const confirmDisconnect = () => {
        setDisconnectDialogOpen(false);

        // Remove from connected providers
        const updatedProviders = connectedProviders.filter(id => id !== providerToDisconnect);
        setConnectedProviders(updatedProviders);

        // If no providers left, set connected to false
        if (updatedProviders.length === 0) {
            setConnected(false);
        }
    };

    // Handle view medical info details
    const handleViewMedicalInfo = (info: any) => {
        setSelectedMedicalInfo(info);
        setInfoDialogOpen(true);
    };

    // Handle marking updates as read
    const handleMarkAsRead = (updateId: string) => {
        const updatedRecentUpdates = recentUpdates.map(update =>
            update.id === updateId ? { ...update, status: 'read' } : update
        );

        // Update unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    // Render dialog content based on step
    const renderDialogContent = () => {
        switch (connectStep) {
            case 1:
                return (
                    <>
                        <Typography variant="h6" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Search for your healthcare provider
                        </Typography>

                        <SearchField
                            fullWidth
                            placeholder="Search by provider name or location"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#6C7A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 21L16.65 16.65" stroke="#6C7A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Provider Categories */}
                        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {providerCategories.map(category => (
                                <Chip
                                    key={category.id}
                                    label={category.name}
                                    onClick={() => handleCategoryChange(category.id)}
                                    sx={{
                                        backgroundColor: selectedCategory === category.id
                                            ? '#267997'
                                            : mode === 'light' ? '#F5F9FA' : '#262626',
                                        color: selectedCategory === category.id
                                            ? '#FFFFFF'
                                            : mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        fontWeight: 500,
                                        borderRadius: '16px',
                                        '&:hover': {
                                            backgroundColor: selectedCategory === category.id
                                                ? '#21647D'
                                                : mode === 'light' ? '#EEF1F4' : '#333',
                                        }
                                    }}
                                />
                            ))}
                        </Box>

                        {/* View Type Toggle and Sort */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                    onClick={() => setViewType('grid')}
                                    sx={{
                                        bgcolor: viewType === 'grid' ? (mode === 'light' ? '#F5F9FA' : '#262626') : 'transparent',
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </IconButton>
                                <IconButton
                                    onClick={() => setViewType('list')}
                                    sx={{
                                        bgcolor: viewType === 'list' ? (mode === 'light' ? '#F5F9FA' : '#262626') : 'transparent',
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </IconButton>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    Sort by:
                                </Typography>
                                <Select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    size="small"
                                    sx={{
                                        minWidth: 120,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: mode === 'light' ? '#F5F9FA' : '#262626',
                                        }
                                    }}
                                >
                                    <MenuItem value="alphabetical">A-Z</MenuItem>
                                    <MenuItem value="popularity">Popularity</MenuItem>
                                    <MenuItem value="location">Location</MenuItem>
                                </Select>
                            </Box>
                        </Box>

                        {viewType === 'list' ? (
                            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                                {sortedProviders.length > 0 ? (
                                    sortedProviders.map(provider => (
                                        <ProviderListItem key={provider.id} disablePadding>
                                            <ListItemButton onClick={() => handleSelectProvider(provider.id)} sx={{ p: 2 }}>
                                                <ListItemIcon sx={{ minWidth: 56 }}>
                                                    <ProviderAvatar sx={{ bgcolor: getProviderCategoryColor(provider.category) }}>
                                                        {provider.name.charAt(0)}
                                                    </ProviderAvatar>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                                {provider.name}
                                                            </Typography>
                                                            {provider.popularity && (
                                                                <Chip
                                                                    label="Popular"
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: '20px',
                                                                        fontSize: '10px',
                                                                        backgroundColor: '#E6F4EA',
                                                                        color: '#34A853',
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                                {provider.location} • {provider.category}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                                                {provider.features && provider.features.map((feature, idx) => (
                                                                    <Chip
                                                                        key={idx}
                                                                        label={feature}
                                                                        size="small"
                                                                        sx={{
                                                                            height: '20px',
                                                                            fontSize: '10px',
                                                                            backgroundColor: mode === 'light' ? '#F5F9FA' : '#333',
                                                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ProviderListItem>
                                    ))
                                ) : (
                                    <Typography sx={{ p: 2, textAlign: 'center', color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                        No providers found. Try a different search term or category.
                                    </Typography>
                                )}
                            </List>
                        ) : (
                            <Grid container spacing={2}>
                                {sortedProviders.length > 0 ? (
                                    sortedProviders.map(provider => (
                                        <Grid item xs={12} sm={6} md={4} key={provider.id}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    cursor: 'pointer',
                                                    height: '100%',
                                                    borderRadius: '12px',
                                                    border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    }
                                                }}
                                                onClick={() => handleSelectProvider(provider.id)}
                                            >
                                                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <ProviderAvatar sx={{ bgcolor: getProviderCategoryColor(provider.category), mr: 1 }}>
                                                            {provider.name.charAt(0)}
                                                        </ProviderAvatar>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                                {provider.name}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                                {provider.location}
                                                            </Typography>
                                                        </Box>
                                                        {provider.popularity && (
                                                            <Chip
                                                                label="Popular"
                                                                size="small"
                                                                sx={{
                                                                    height: '20px',
                                                                    fontSize: '10px',
                                                                    backgroundColor: '#E6F4EA',
                                                                    color: '#34A853',
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                    <Divider sx={{ mb: 1.5 }} />
                                                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                                        {provider.category}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                                                        {provider.features && provider.features.map((feature, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                label={feature}
                                                                size="small"
                                                                sx={{
                                                                    height: '20px',
                                                                    fontSize: '10px',
                                                                    backgroundColor: mode === 'light' ? '#F5F9FA' : '#333',
                                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography sx={{ p: 2, textAlign: 'center', color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            No providers found. Try a different search term or category.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </>
                );
            case 2:
                const provider = providers.find(p => p.id === selectedProvider);
                return (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <ProviderAvatar sx={{ bgcolor: getProviderCategoryColor(provider?.category || ''), mr: 2, width: 48, height: 48 }}>
                                {provider?.name.charAt(0)}
                            </ProviderAvatar>
                            <Box>
                                <Typography variant="h6" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    {provider?.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    {provider?.location} • {provider?.category}
                                </Typography>
                            </Box>
                        </Box>

                        <InfoBox>
                            <Typography variant="body1" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                Connecting to {provider?.name} will allow you to:
                            </Typography>
                            <Box component="ul" sx={{ pl: 2 }}>
                                <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    View your medical records from this provider
                                </Typography>
                                <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    Import lab results, medications, and appointments
                                </Typography>
                                <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    Receive notifications about new records
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', fontWeight: 500 }}>
                                You will need to log in to your {provider?.name} patient portal
                            </Typography>
                        </InfoBox>

                        <Box sx={{ mt: 2, p: 2, bgcolor: mode === 'light' ? '#F8FBFC' : '#262626', borderRadius: '8px' }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 16V12" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8H12.01" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                About this connection
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                This connection is secure and uses FHIR standard for healthcare data exchange. You can disconnect at any time.
                                Your data will be synchronized but will remain private and only accessible to you.
                            </Typography>
                        </Box>

                        {provider?.features && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    Available data types:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {provider.features.map((feature, idx) => (
                                        <Chip
                                            key={idx}
                                            label={feature}
                                            size="small"
                                            sx={{
                                                backgroundColor: mode === 'light' ? '#F5F9FA' : '#333',
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    // Helper function to get color based on provider category
    const getProviderCategoryColor = (category: string = '') => {
        const colors: Record<string, string> = {
            'Hospital': '#267997',
            'Primary Care': '#34A853',
            'Specialty': '#9747FF',
            'Telehealth': '#4285F4',
            'Mental Health': '#F75D74'
        };

        return colors[category] || '#6C7A89';
    };

    return (
        <PageContainer>
            <MainContent>
                <SystemsContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <SectionTitle>Connect Providers</SectionTitle>

                        {connected && (
                            <StyledBadge badgeContent={unreadCount} color="primary" invisible={unreadCount === 0}>
                                <ActionButton
                                    variant="outlined"
                                    onClick={() => setShowRecentActivity(!showRecentActivity)}
                                    startIcon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    sx={{
                                        color: '#267997',
                                        borderColor: '#E5E5E5',
                                        '&:hover': {
                                            borderColor: '#267997',
                                            backgroundColor: 'rgba(38, 121, 151, 0.04)',
                                        }
                                    }}
                                >
                                    Activity
                                </ActionButton>
                            </StyledBadge>
                        )}
                    </Box>

                    {!connected ? (
                        <>
                            <InfoBox>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    Note: You can always import your complete medical record by uploading Document and PDF
                                </Typography>
                            </InfoBox>

                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                    <ConnectInfoCard>
                                        <Typography variant="h6" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                            Connect your patient portals to see your lab tests, meds, doctor notes, and more!
                                        </Typography>
                                        <ConnectButton
                                            onClick={handleOpenConnectDialog}
                                            endIcon={
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                        >
                                            Connect Providers
                                        </ConnectButton>
                                    </ConnectInfoCard>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        padding: 3,
                                        borderRadius: '12px',
                                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#263238',
                                        border: `1px solid ${mode === 'light' ? '#D6E8EE' : '#344047'}`,
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(38, 121, 151, 0.1)',
                                                mr: 2
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 16V12" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 8H12.01" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Box>
                                            <Typography variant="h6" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                Why Connect?
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 2 }}>
                                            Connecting your healthcare providers gives you a complete picture of your health in one place.
                                            You'll have access to your lab results, medications, appointments, and more.
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            <Chip
                                                label="Lab Results"
                                                size="small"
                                                sx={{ backgroundColor: 'rgba(38, 121, 151, 0.1)', color: '#267997' }}
                                            />
                                            <Chip
                                                label="Medications"
                                                size="small"
                                                sx={{ backgroundColor: 'rgba(38, 121, 151, 0.1)', color: '#267997' }}
                                            />
                                            <Chip
                                                label="Appointments"
                                                size="small"
                                                sx={{ backgroundColor: 'rgba(38, 121, 151, 0.1)', color: '#267997' }}
                                            />
                                            <Chip
                                                label="Doctor Notes"
                                                size="small"
                                                sx={{ backgroundColor: 'rgba(38, 121, 151, 0.1)', color: '#267997' }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Typography variant="body2" sx={{ textAlign: 'center', color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mt: 4 }}>
                                Connecting does not share data back to your provider. You control who you share with and you can delete your data at any time
                            </Typography>
                        </>
                    ) : (
                        <>
                            {showRecentActivity && (
                                <ActivityFeed>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', fontWeight: 600 }}>
                                            Recent Activity
                                        </Typography>
                                        <Button
                                            variant="text"
                                            size="small"
                                            sx={{
                                                color: '#267997',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            View All
                                        </Button>
                                    </Box>

                                    {recentUpdates.map(update => (
                                        <ActivityItem key={update.id} unread={update.status === 'unread'}>
                                            {update.status === 'unread' && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: -2,
                                                    transform: 'translateY(-50%)',
                                                    width: 4,
                                                    height: 16,
                                                    backgroundColor: '#267997',
                                                    borderRadius: '0 2px 2px 0'
                                                }} />
                                            )}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: '50%',
                                                        backgroundColor: mode === 'light' ? '#F5F9FA' : '#333',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mr: 2
                                                    }}>
                                                        {update.type === 'New Lab Results' && (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                                <path d="M3 6L5 6" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M5 18L3 18" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M10 3L10 5" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M10 19V21" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M5 6C5 8.20914 6.79086 10 9 10H11C13.2091 10 15 11.7909 15 14C15 16.2091 13.2091 18 11 18H9C6.79086 18 5 16.2091 5 14" stroke="#2DC98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                        {update.type === 'Appointment Note' && (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                                <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M9 7H10" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M9 13H15" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M9 17H15" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                        {update.type === 'Prescription Renewed' && (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                                <path d="M6 2L18 2" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12 6V14" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M9 22H15C16.1046 22 17 21.1046 17 20V11C17 9.89543 16.1046 9 15 9H9C7.89543 9 7 9.89543 7 11V20C7 21.1046 7.89543 22 9 22Z" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                            {update.type}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            {update.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                        {update.date}
                                                    </Typography>
                                                    {update.status === 'unread' && (
                                                        <Button
                                                            size="small"
                                                            variant="text"
                                                            onClick={() => handleMarkAsRead(update.id)}
                                                            sx={{
                                                                textTransform: 'none',
                                                                color: '#267997',
                                                                p: 0,
                                                                minWidth: 'auto',
                                                                fontSize: '12px',
                                                                mt: 0.5
                                                            }}
                                                        >
                                                            Mark as read
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </ActivityItem>
                                    ))}
                                </ActivityFeed>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    Connected Providers
                                </Typography>
                                <ActionButton
                                    variant="contained"
                                    onClick={handleOpenConnectDialog}
                                    sx={{
                                        backgroundColor: '#267997',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#21647D',
                                        }
                                    }}
                                >
                                    Add Provider
                                </ActionButton>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <ConnectInfoCard>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ProviderAvatar sx={{ mr: 2 }}>M</ProviderAvatar>
                                                <Box>
                                                    <Typography variant="h6" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                        Mayo Clinic
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                        Connected on {new Date().toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Chip
                                                label="Connected"
                                                sx={{
                                                    backgroundColor: '#E6F4EA',
                                                    color: '#34A853',
                                                    fontWeight: 500,
                                                    borderRadius: '16px',
                                                }}
                                            />
                                        </Box>

                                        <TabsContainer>
                                            <Tabs
                                                value={0}
                                                sx={{
                                                    minHeight: '42px',
                                                    '& .MuiTabs-indicator': {
                                                        backgroundColor: '#267997',
                                                    }
                                                }}
                                            >
                                                <StyledTab label="Available Data" />
                                                <StyledTab label="Appointments" />
                                                <StyledTab label="Settings" />
                                            </Tabs>
                                        </TabsContainer>

                                        <Typography variant="subtitle2" sx={{ mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF', fontWeight: 600 }}>
                                            Available Medical Information
                                        </Typography>

                                        <MedicalInfoBox>
                                            {medicalInfo.map(info => (
                                                <MedicalInfoRow key={info.id}>
                                                    <MedicalInfoIcon sx={{ bgcolor: info.icon.bg }}>
                                                        {info.icon.component}
                                                    </MedicalInfoIcon>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                                {info.type}
                                                            </Typography>
                                                            {info.status && (
                                                                <Chip
                                                                    label={info.status}
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: '20px',
                                                                        fontSize: '10px',
                                                                        backgroundColor: '#FFF4E5',
                                                                        color: '#F9A825',
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                        {info.date && (
                                                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                                {info.date} {info.location && `• ${info.location}`}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    {info.actionable && (
                                                        <Button
                                                            variant="text"
                                                            size="small"
                                                            onClick={() => handleViewMedicalInfo(info)}
                                                            sx={{
                                                                minWidth: 'auto',
                                                                color: '#267997',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(38, 121, 151, 0.04)',
                                                                }
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    )}
                                                </MedicalInfoRow>
                                            ))}
                                        </MedicalInfoBox>

                                        <Divider sx={{ my: 2 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                    Upcoming Appointments
                                                </Typography>
                                                {upcomingAppointments.length > 0 ? (
                                                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                        Next: {upcomingAppointments[0].doctor} • {new Date(upcomingAppointments[0].date).toLocaleDateString()}
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                        No upcoming appointments
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderColor: '#E5E5E5',
                                                    color: '#267997',
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        borderColor: '#CCD6DD',
                                                        backgroundColor: 'rgba(38, 121, 151, 0.04)',
                                                    }
                                                }}
                                            >
                                                View All
                                            </Button>
                                        </Box>

                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleDisconnect('1')}
                                                sx={{
                                                    borderColor: '#E5E5E5',
                                                    color: '#267997',
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        borderColor: '#CCD6DD',
                                                        backgroundColor: 'rgba(38, 121, 151, 0.04)',
                                                    }
                                                }}
                                            >
                                                Disconnect
                                            </Button>
                                        </Box>
                                    </ConnectInfoCard>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={{
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: `1px dashed ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                        borderRadius: '12px',
                                        backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                                    }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                            Connect Another Provider
                                        </Typography>
                                        <ConnectButton
                                            onClick={handleOpenConnectDialog}
                                            size="small"
                                            sx={{ px: 3 }}
                                        >
                                            Connect
                                        </ConnectButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </SystemsContainer>
            </MainContent>

            {/* Connect Providers Dialog */}
            <StyledDialog
                open={openConnectDialog}
                onClose={handleCloseConnectDialog}
                fullWidth
            >
                <StyledDialogTitle>
                    {connectStep === 1 ? 'Connect Healthcare Provider' : 'Provider Connection'}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseConnectDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? 'rgba(108, 122, 137, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                            },
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                </StyledDialogTitle>
                <StyledDialogContent>
                    {renderDialogContent()}
                </StyledDialogContent>
                <StyledDialogActions>
                    <Button
                        onClick={handleBack}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            fontFamily: '"Poppins", sans-serif',
                            textTransform: 'none',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? 'rgba(108, 122, 137, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                            },
                        }}
                    >
                        {connectStep === 1 ? 'Cancel' : 'Back'}
                    </Button>
                    {connectStep === 2 && (
                        <Button
                            onClick={handleConnect}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#267997',
                                color: '#ffffff',
                                fontFamily: '"Poppins", sans-serif',
                                textTransform: 'none',
                                borderRadius: '8px',
                                px: 4,
                                '&:hover': {
                                    backgroundColor: '#21647D',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: mode === 'light' ? '#CCD6DD' : '#444',
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                            ) : (
                                'Connect'
                            )}
                        </Button>
                    )}
                </StyledDialogActions>
            </StyledDialog>

            {/* Medical Info Dialog */}
            <Dialog
                open={infoDialogOpen}
                onClose={() => setInfoDialogOpen(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                    }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                }}>
                    <Typography variant="h6">{selectedMedicalInfo?.type}</Typography>
                    <IconButton
                        onClick={() => setInfoDialogOpen(false)}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedMedicalInfo && (
                        <Box sx={{ pt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MedicalInfoIcon sx={{ bgcolor: selectedMedicalInfo.icon.bg, mr: 2 }}>
                                    {selectedMedicalInfo.icon.component}
                                </MedicalInfoIcon>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedMedicalInfo.type}
                                    </Typography>
                                    {selectedMedicalInfo.date && (
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            {selectedMedicalInfo.date} • {selectedMedicalInfo.location}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    Description
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    {selectedMedicalInfo.description}
                                </Typography>
                            </Box>

                            {selectedMedicalInfo.doctor && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        Healthcare Provider
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                        {selectedMedicalInfo.doctor}
                                    </Typography>
                                </Box>
                            )}

                            {selectedMedicalInfo.status && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        Status
                                    </Typography>
                                    <Chip
                                        label={selectedMedicalInfo.status}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#FFF4E5',
                                            color: '#F9A825',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                        onClick={() => setInfoDialogOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#267997',
                            color: '#ffffff',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#21647D',
                            }
                        }}
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Disconnect Confirmation Dialog */}
            <Dialog
                open={disconnectDialogOpen}
                onClose={() => setDisconnectDialogOpen(false)}
                maxWidth="xs"
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                    }
                }}
            >
                <DialogTitle sx={{ borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}` }}>
                    Disconnect Provider
                </DialogTitle>
                <DialogContent sx={{ pt: 2, mt: 1 }}>
                    <Typography variant="body1" sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                        Are you sure you want to disconnect this provider? You will no longer receive updates about your medical records from this provider.
                    </Typography>
                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                        You can reconnect at any time.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDisconnectDialogOpen(false)}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDisconnect}
                        variant="contained"
                        sx={{
                            backgroundColor: '#EA4335',
                            color: '#ffffff',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#D32F2F',
                            }
                        }}
                    >
                        Disconnect
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Status Sidebar - only visible on desktop/larger tablets */}
            {!isTablet && (
                <DeviceStatusSidebar
                    connectedDevices={0}
                    uploadedFiles={0}
                    connectedSystems={connected ? 1 : 0}
                />
            )}
        </PageContainer>
    );
};

export default SystemsPage; 