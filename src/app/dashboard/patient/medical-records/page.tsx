'use client';

import React, { useState, SVGProps } from 'react';
import {
    Box,
    Typography,
    Grid,
    Avatar,
    Paper,
    Tabs,
    Tab,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import theme from '@/styles/theme';

// Styled components
const RecordsContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: '1300px',
    margin: '0 auto',
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#F5F9FA' : '#1A1A1A',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#A3A0A091' : '#333',
        borderRadius: '4px',
    },
}));

const RecordSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: 'none',
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
}));

const PatientInfoSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    marginBottom: theme.spacing(3),
    padding: 0,
    overflow: 'hidden',
}));

const VitalsSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '92.5%',
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    marginBottom: theme.spacing(3),
    padding: 0,
    overflow: 'hidden',
}));

const VitalsHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2, 1, 2),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
}));

const VitalsContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
    },
}));

const VitalItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    '& .MuiTabs-indicator': {
        backgroundColor: theme.palette.primary.main,
        height: '3px',
    },
    '& .MuiTab-root': {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '16px',
        fontFamily: '"Poppins", sans-serif',
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        '&.Mui-selected': {
            color: theme.palette.primary.main,
        },
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : '#B8C7CC',
    display: 'flex',
    alignItems: 'center',
}));

const ValueText = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
    marginBottom: theme.spacing(0.5),
}));

const LabelText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const PatientInfoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontSize: '14px',
    lineHeight: '1.5',
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            sx={{ pt: 3 }}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </Box>
    );
}

const StyledHeartIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M28.1667 7.54167C28.1667 3.82525 25.0284 0.8125 21.1571 0.8125C18.2626 0.8125 15.7779 2.4967 14.7083 4.89998C13.6387 2.4967 11.154 0.8125 8.25955 0.8125C4.38828 0.8125 1.25 3.82525 1.25 7.54167C1.25 18.3391 14.7083 25.4861 14.7083 25.4861C14.7083 25.4861 28.1667 18.3391 28.1667 7.54167Z" fill="#21647D" stroke="#21647D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const MedicalRecordsPage = () => {
    const { mode } = useThemeContext();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'hidden',
                height: 'calc(100vh - 64px)',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1A1A1A'
            }}
        >
            <RecordsContainer>
                {/* Page Title */}
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: mode === 'light' ? '#000000' : '#FFFFFF'
                    }}
                >
                    Medical Records
                </Typography>

                {/* Main Content Layout - Patient Info and Vitals side by side */}
                <Grid container spacing={3}>
                    {/* Patient Info Card - Left Side */}
                    <Grid item xs={12} md={5} lg={4}>
                        <PatientInfoSection>
                            <Box sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <Avatar
                                        src="/avatars/patient1.png"
                                        alt="Noah Brown"
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mr: 3,
                                            borderRadius: '10%',
                                        }}
                                    />
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                            Noah Brown
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Typography
                                                sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Male
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Age:26
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ ml: 0.5 }}>
                                    <PatientInfoText sx={{ mb: 1 }}>
                                        noahbrown@gmail.com
                                    </PatientInfoText>
                                    <PatientInfoText sx={{ mb: 1 }}>
                                        972-810-1206
                                    </PatientInfoText>
                                    <PatientInfoText sx={{ mb: 1 }}>
                                        ID: ZZZ0019
                                    </PatientInfoText>
                                    <PatientInfoText>
                                        10/21/1990
                                    </PatientInfoText>
                                </Box>
                            </Box>
                        </PatientInfoSection>
                    </Grid>

                    {/* Vitals Section - Right Side */}
                    <Grid item xs={12} md={7} lg={8}>
                        <VitalsSection>
                            <VitalsHeader>
                                <StyledHeartIcon width="22px" height="22px" />
                                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1, color: '#21647D' }}>
                                    Vitals
                                </Typography>
                            </VitalsHeader>

                            <VitalsContent>
                                {/* Blood Glucose */}
                                <VitalItem>
                                    <ValueText>120 mg/dt</ValueText>
                                    <LabelText>Blood glucose level</LabelText>
                                </VitalItem>

                                {/* Weight */}
                                <VitalItem>
                                    <ValueText>55 Kg</ValueText>
                                    <LabelText>Weight</LabelText>
                                </VitalItem>

                                {/* Heart Rate */}
                                <VitalItem>
                                    <ValueText>70 bpm</ValueText>
                                    <LabelText>Heart rate</LabelText>
                                </VitalItem>

                                {/* Oxygen Saturation */}
                                <VitalItem>
                                    <ValueText>71%</ValueText>
                                    <LabelText>Oxygen saturation</LabelText>
                                </VitalItem>

                                {/* Body Temperature */}
                                <VitalItem>
                                    <ValueText>98.1 F</ValueText>
                                    <LabelText>Body temperature</LabelText>
                                </VitalItem>

                                {/* Blood Pressure */}
                                <VitalItem>
                                    <ValueText>120/80 mm hg</ValueText>
                                    <LabelText>Blood pressure</LabelText>
                                </VitalItem>
                            </VitalsContent>
                        </VitalsSection>
                    </Grid>
                </Grid>

                {/* Tabs and Medical Records Content */}
                <RecordSection>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="medical records tabs">
                            <Tab label="Medical History" id="tab-0" aria-controls="tabpanel-0" />
                            <Tab label="Medical Record" id="tab-1" aria-controls="tabpanel-1" />
                            <Tab label="Medications" id="tab-2" aria-controls="tabpanel-2" />
                        </StyledTabs>

                        <Button
                            variant="outlined"
                            startIcon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                            sx={{
                                color: '#267997',
                                borderColor: '#267997',
                                '&:hover': {
                                    borderColor: '#21647D',
                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                },
                                textTransform: 'none',
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            Export
                        </Button>
                    </Box>

                    {/* Medical History Tab Content */}
                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ mb: 4 }}>
                            <SectionTitle>Summary</SectionTitle>
                            <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', lineHeight: 1.7 }}>
                                Noah is a 26-year-old Male with no known allergies or drug sensitivities. She has a history of
                                seasonal allergies and occasional migraines. She takes medications regularly.
                            </Typography>
                            <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mt: 1 }}>
                                Age: 26, Height: 5'10, Weight: 55Kg
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <SectionTitle>Vitals & Labs</SectionTitle>
                            <Grid container spacing={0.5}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Blood glucose level</InfoLabel>
                                        <InfoValue>120 mg/dt</InfoValue>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Weight</InfoLabel>
                                        <InfoValue>55 Kg</InfoValue>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Blood pressure</InfoLabel>
                                        <InfoValue>120/80 mm hg</InfoValue>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Heart rate</InfoLabel>
                                        <InfoValue>70 bpm</InfoValue>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Body temperature</InfoLabel>
                                        <InfoValue>98.1 F</InfoValue>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 1 }}>
                                        <InfoLabel>Oxygen saturation</InfoLabel>
                                        <InfoValue>71%</InfoValue>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <SectionTitle>Lipid Panel & Glucose</SectionTitle>
                            <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '14px' }}>
                                Total Cholesterol: 200 mg/dL, HDL: 50 mg/dL, LDL: 130 mg/dL, Triglycerides: 100 mg/dL,
                                Glucose: 90 mg/dL, Hemoglobin A1c: 5%
                            </Typography>
                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '13px', mt: 1 }}>
                                Date: June 1, 2022
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <SectionTitle>Complete Metabolic Panel</SectionTitle>
                            <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '14px' }}>
                                WBC: 6.0 K/µL, Hgb: 14 g/dL, Plt: 200 K/µL, Na: 140 mmol/L, K: 4.0 mmol/L, Cr: 0.9 mg/dL, AST: 20 U/L, ALT: 25 U/L
                            </Typography>
                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '13px', mt: 1 }}>
                                Date: June 1, 2022
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <SectionTitle>Infectious Disease Screen</SectionTitle>
                            <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '14px' }}>
                                HIV: Non-reactive, Hepatitis B: Immune (HBsAb+), Hepatitis C: Non-reactive
                            </Typography>
                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '13px', mt: 1 }}>
                                Date: June 1, 2022
                            </Typography>
                        </Box>
                    </TabPanel>

                    {/* Medical Record Tab Content */}
                    <TabPanel value={tabValue} index={1}>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Medical Record content will appear here.
                        </Typography>
                    </TabPanel>

                    {/* Medications Tab Content */}
                    <TabPanel value={tabValue} index={2}>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Medications content will appear here.
                        </Typography>
                    </TabPanel>
                </RecordSection>
            </RecordsContainer>
        </Box>
    );
};

export default MedicalRecordsPage; 