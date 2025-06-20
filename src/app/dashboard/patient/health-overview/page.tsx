'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Tabs, Tab, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
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

const ContentSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: 'none',
    border: `1.5px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
}));

const VisualizationSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const VisualizationHeader = styled(Box)(({ theme }) => ({
    backgroundColor: '#1A7A8E',
    color: 'white',
    padding: theme.spacing(2),
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    marginBottom: theme.spacing(2),
}));

const ChartContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '8px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
}));

const DataTable = styled(TableContainer)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    marginTop: theme.spacing(2),
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
        fontWeight: 600,
    },
    '& .MuiTableCell-body': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    },
}));

const BMIScale = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
}));

const BMIBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '30px',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

const BMISegment = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ theme, bgColor }) => ({
    height: '100%',
    width: '25%',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const CustomTabs = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
    width: 'fit-content',
    padding: '4px',
    borderRadius: '28px',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
}));

const TabButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
    minWidth: '130px',
    padding: '8px 20px',
    borderRadius: '24px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: active
        ? theme.palette.mode === 'light'
            ? '#FFFFFF'
            : '#2B2B2B'
        : 'transparent',
    color: active
        ? '#235467'
        : theme.palette.mode === 'light'
            ? '#6C7A89'
            : '#B8C7CC',
    boxShadow: active ? '0px 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
    '&:hover': {
        backgroundColor: active
            ? theme.palette.mode === 'light'
                ? '#FFFFFF'
                : '#2B2B2B'
            : theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(43, 43, 43, 0.6)',
    },
}));

const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            sx={{ width: '100%' }}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
};

const SectionHeading = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#235467',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginBottom: '4px',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '16px',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    marginBottom: theme.spacing(2),
}));

// Chart Components
const BloodPressureChart = () => {
    // This is a simplified version of a chart, in a real app you'd use a charting library
    return (
        <Box sx={{ height: '250px', position: 'relative', mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Blood Pressure Chart</Typography>

            {/* Y-axis labels */}
            <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="body2">200</Typography>
                <Typography variant="body2">150</Typography>
                <Typography variant="body2">100</Typography>
                <Typography variant="body2">50</Typography>
            </Box>

            {/* Chart lines */}
            <Box sx={{ position: 'relative', ml: 5, height: '180px' }}>
                {/* Systolic line */}
                <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none">
                    <polyline
                        points="0,130 100,120 200,100 300,90 400,110 500,80 600,90"
                        fill="none"
                        stroke="#FF6B8A"
                        strokeWidth="2"
                    />
                    {/* Points */}
                    <circle cx="0" cy="130" r="4" fill="#FF6B8A" />
                    <circle cx="100" cy="120" r="4" fill="#FF6B8A" />
                    <circle cx="200" cy="100" r="4" fill="#FF6B8A" />
                    <circle cx="300" cy="90" r="4" fill="#FF6B8A" />
                    <circle cx="400" cy="110" r="4" fill="#FF6B8A" />
                    <circle cx="500" cy="80" r="4" fill="#FF6B8A" />
                    <circle cx="600" cy="90" r="4" fill="#FF6B8A" />

                    {/* Diastolic line */}
                    <polyline
                        points="0,150 100,140 200,130 300,120 400,120 500,110 600,120"
                        fill="none"
                        stroke="#A156D0"
                        strokeWidth="2"
                    />
                    {/* Points */}
                    <circle cx="0" cy="150" r="4" fill="#A156D0" />
                    <circle cx="100" cy="140" r="4" fill="#A156D0" />
                    <circle cx="200" cy="130" r="4" fill="#A156D0" />
                    <circle cx="300" cy="120" r="4" fill="#A156D0" />
                    <circle cx="400" cy="120" r="4" fill="#A156D0" />
                    <circle cx="500" cy="110" r="4" fill="#A156D0" />
                    <circle cx="600" cy="120" r="4" fill="#A156D0" />
                </svg>
            </Box>

            {/* X-axis labels */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, ml: 5 }}>
                <Typography variant="body2">19-04-2011</Typography>
                <Typography variant="body2">24-04-2012</Typography>
                <Typography variant="body2">17-05-2016</Typography>
                <Typography variant="body2">18-05-2016</Typography>
                <Typography variant="body2">9-08-2020</Typography>
                <Typography variant="body2">23-05-2018</Typography>
            </Box>

            {/* Legend */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#A156D0', mr: 1 }}></Box>
                    <Typography variant="body2">Diastolic</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF6B8A', mr: 1 }}></Box>
                    <Typography variant="body2">Systolic</Typography>
                </Box>
            </Box>
        </Box>
    );
};

const BMIChart = () => {
    // BMI value is 20.5 (from the data)
    const bmiValue = 20.5;
    // Calculate position (0-100%) based on BMI value
    const position = ((bmiValue - 10) / 30) * 100;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Body Mass Index</Typography>

            {/* BMI Scale */}
            <Box sx={{ position: 'relative', mt: 4, mx: 2 }}>
                <BMIBar>
                    <BMISegment bgColor="#FF9A6C">
                        {bmiValue < 18.5 && (
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                {bmiValue}
                            </Typography>
                        )}
                    </BMISegment>
                    <BMISegment bgColor="#66C796">
                        {bmiValue >= 18.5 && bmiValue < 25 && (
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                {bmiValue}
                            </Typography>
                        )}
                    </BMISegment>
                    <BMISegment bgColor="#FFC745">
                        {bmiValue >= 25 && bmiValue < 30 && (
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                {bmiValue}
                            </Typography>
                        )}
                    </BMISegment>
                    <BMISegment bgColor="#FF6B6B">
                        {bmiValue >= 30 && (
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                {bmiValue}
                            </Typography>
                        )}
                    </BMISegment>
                </BMIBar>

                {/* BMI Indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -10,
                        left: `${position}%`,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#333',
                        border: '3px solid white',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                    }}
                />

                {/* Scale Values */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">10</Typography>
                    <Typography variant="body2">20</Typography>
                    <Typography variant="body2">30</Typography>
                    <Typography variant="body2">40</Typography>
                </Box>

                {/* Legend */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#FF9A6C', borderRadius: '2px', mr: 0.5 }}></Box>
                        <Typography variant="body2">Below 18.5 (Under weight)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#66C796', borderRadius: '2px', mr: 0.5 }}></Box>
                        <Typography variant="body2">18.5-24.9 (Normal)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#FFC745', borderRadius: '2px', mr: 0.5 }}></Box>
                        <Typography variant="body2">25-29.9 (Over weight)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#FF6B6B', borderRadius: '2px', mr: 0.5 }}></Box>
                        <Typography variant="body2">30 over (Obesity)</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

const HealthOverviewPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tabValue, setTabValue] = useState(0); // Default to Health Overview

    const handleTabChange = (newValue: number) => {
        setTabValue(newValue);
    };

    // Sample data for allergies
    const allergiesData = [
        { allergy: 'Allergy to grass pollen', criticality: 'Low', category: 'Food', status: 'Confirmed' },
        { allergy: 'Allergy to mould', criticality: 'Low', category: 'Food', status: 'Confirmed' },
        { allergy: 'Dander (animal) allergy', criticality: 'Low', category: 'Food', status: 'Confirmed' },
        { allergy: 'House dust mite allergy', criticality: 'Low', category: 'Food', status: 'Confirmed' },
        { allergy: 'Allergy to tree pollen', criticality: 'Low', category: 'Food', status: 'Confirmed' },
    ];

    // Sample data for conditions
    const conditionsData = [
        { condition: 'Acute viral pharyngitis (disorder)', recordedDate: '29-010-2019', clinicalStatus: 'Active', status: 'Confirmed' },
        { condition: 'Acute viral pharyngitis (disorder)', recordedDate: '29-010-2019', clinicalStatus: 'Resolved', status: 'Confirmed' },
        { condition: 'Acute viral pharyngitis (disorder)', recordedDate: '29-010-2019', clinicalStatus: 'Resolved', status: 'Confirmed' },
        { condition: 'Sprain of ankle', recordedDate: '29-010-2019', clinicalStatus: 'Resolved', status: 'Confirmed' },
    ];

    // Sample data for immunizations
    const immunizationsData = [
        { immunization: 'Influenza, seasonal, injectable, preservative free', recordedDate: '29-010-2019', status: 'Completed' },
        { immunization: 'Influenza, seasonal, injectable, preservative free', recordedDate: '29-010-2019', status: 'Completed' },
        { immunization: 'Influenza, seasonal, injectable, preservative free', recordedDate: '29-010-2018', status: 'Completed' },
        { immunization: 'Influenza, seasonal, injectable, preservative free', recordedDate: '29-010-2018', status: 'Completed' },
    ];

    // Sample data for procedures
    const proceduresData = [
        { procedure: 'Documentation of current medications', recordedDate: '29-010-2019', status: 'Completed' },
        { procedure: 'Documentation of current medications', recordedDate: '29-010-2019', status: 'Completed' },
        { procedure: 'Documentation of current medications', recordedDate: '29-010-2019', status: 'Completed' },
        { procedure: 'Documentation of current medications', recordedDate: '29-010-2018', status: 'Completed' },
    ];

    return (
        <PageContainer>
            {/* Tab switcher */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box /> {/* Empty box for layout balance */}
                <CustomTabs>
                    <TabButton
                        active={tabValue === 0}
                        onClick={() => handleTabChange(0)}
                    >
                        Health Overview
                    </TabButton>
                    <TabButton
                        active={tabValue === 1}
                        onClick={() => handleTabChange(1)}
                    >
                        Health Summary
                    </TabButton>
                </CustomTabs>
                <Button
                    variant="outlined"
                    startIcon={
                        <img src="/icons/export.svg" alt="Export" />
                    }
                    sx={{
                        color: '#267997',
                        borderColor: '#E5E5E5',
                        '&:hover': {
                            borderColor: '#21647D',
                            backgroundColor: 'rgba(33, 100, 125, 0.04)',
                        },
                        textTransform: 'none',
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '15px',
                    }}
                >
                    Export
                </Button>
            </Box>

            {/* Health Overview Tab */}
            <TabPanel value={tabValue} index={0}>
                <ContentSection>
                    {/* Blood Pressure Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Blood Pressure</Typography>
                        </VisualizationHeader>
                        <ChartContainer>
                            <BloodPressureChart />
                        </ChartContainer>
                    </VisualizationSection>

                    {/* Height & Weight and BMI Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Height & Weight and BMI</Typography>
                        </VisualizationHeader>
                        <ChartContainer>
                            <BMIChart />
                        </ChartContainer>
                    </VisualizationSection>

                    {/* Allergies Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Allergies</Typography>
                        </VisualizationHeader>
                        <DataTable component={Paper}>
                            <Table aria-label="allergies table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Allergy</TableCell>
                                        <TableCell>Criticality</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allergiesData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.allergy}</TableCell>
                                            <TableCell>{row.criticality}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DataTable>
                    </VisualizationSection>

                    {/* Conditions Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Conditions</Typography>
                        </VisualizationHeader>
                        <DataTable component={Paper}>
                            <Table aria-label="conditions table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Conditions</TableCell>
                                        <TableCell>Recorded Date</TableCell>
                                        <TableCell>Clinical Status</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {conditionsData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.condition}</TableCell>
                                            <TableCell>{row.recordedDate}</TableCell>
                                            <TableCell>{row.clinicalStatus}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DataTable>
                    </VisualizationSection>

                    {/* Immunizations Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Immunizations</Typography>
                        </VisualizationHeader>
                        <DataTable component={Paper}>
                            <Table aria-label="immunizations table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Immunizations</TableCell>
                                        <TableCell>Recorded Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {immunizationsData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.immunization}</TableCell>
                                            <TableCell>{row.recordedDate}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DataTable>
                    </VisualizationSection>

                    {/* Procedures Section */}
                    <VisualizationSection>
                        <VisualizationHeader>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Procedures</Typography>
                        </VisualizationHeader>
                        <DataTable component={Paper}>
                            <Table aria-label="procedures table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Procedures</TableCell>
                                        <TableCell>Recorded Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {proceduresData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.procedure}</TableCell>
                                            <TableCell>{row.recordedDate}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DataTable>
                    </VisualizationSection>
                </ContentSection>
            </TabPanel>

            {/* Health Summary Tab */}
            <TabPanel value={tabValue} index={1}>
                <ContentSection>
                    <SectionHeading>Health Summary Report</SectionHeading>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Patient Profile:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoLabel>Age</InfoLabel>
                                <InfoValue>26 years</InfoValue>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoLabel>Gender</InfoLabel>
                                <InfoValue>Male</InfoValue>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoLabel>Height</InfoLabel>
                                <InfoValue>161.3 Cm</InfoValue>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoLabel>Weight</InfoLabel>
                                <InfoValue>55 Kg</InfoValue>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoLabel>BMI</InfoLabel>
                                <InfoValue>20.5</InfoValue>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Blood Pressure Data:
                        </Typography>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                            The patient's blood pressure readings over the years have fluctuated. The most recent reading on 2020-08-09
                            shows a systolic blood pressure of 131.88 mmHg and a diastolic blood pressure of 84.77 mmHg, which is slightly
                            higher than the normal range but not indicative of hypertension. Earlier readings from 2011 to 2018 have been
                            within normal limits, with occasional increases in systolic pressure.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Allergies:
                        </Typography>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                            The patient has confirmed low-criticality allergies to grass pollen, mould, animal dander, house dust mite,
                            and tree pollen. These are categorized as food allergies, which may be a misclassification unless the patient has
                            specific food triggers related to these allergens.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Conditions:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - Perennial allergic with seasonal variation (active since 2010-05-09)
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - Acute viral pharyngitis (resolved, episodes in 2016 and 2019)
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - Sprain of ankle (resolved, occurred in 2016)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Procedures:
                        </Typography>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                            Documentation of current medications has been completed on multiple occasions (2011, 2017, 2018).
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Immunizations:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - The patient has received multiple doses of the seasonal influenza vaccine (injectable, preservative-free) from 2011 to 2019
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - The patient has completed the HPV (quadrivalent) vaccination series
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - The patient has received the meningococcal MCV4P vaccine and Tdap vaccine
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Medications:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - Acetaminophen and Penicillin V Potassium have been stopped
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - The patient currently has active prescriptions for NDA020800 (Epinephrine Auto-Injector), Xaz (28 Day Pack), and Loratadine (Chewable Tablet)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Labs:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    The patient's lab results from 2016 show normal platelet volume and distribution width, with a slightly elevated platelet count of 324.84 × 10^3/μL.
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    • Erythrocyte distribution width, MCH, MCV, hematocrit, and erythrocytes are within normal ranges.
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    - Hemoglobin levels are slightly low at 12.25 g/dL, which could indicate mild anemia.
                                </Typography>
                                <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    • Lab results from 2011 show a higher hemoglobin level of 14.96 g/dL and a lower leukocyte count of 7.10 × 10^3/μL.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: mode === 'light' ? '#454747' : '#FFFFFF'
                        }}>
                            Conclusion:
                        </Typography>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                            The patient is a 26-years-old male with a history of allergies and minor health conditions that have been resolved. He
                            has a slightly elevated blood pressure reading in his most recent check-up, which should be monitored. The patient
                            has a history of mild anemia based on hemoglobin levels from 2016.
                        </Typography>
                        <Typography sx={{ color: mode === 'light' ? '#454747' : '#FFFFFF', mb: 2 }}>
                            He is up to date on vaccinations and has an active prescription for an epinephrine auto-injector, indicating a
                            preparedness for potential severe allergic reactions. Regular follow-up is recommended to monitor blood pressure
                            and potential anemia, as well as to manage his perennial allergic rhinitis.
                        </Typography>
                    </Box>
                </ContentSection>
            </TabPanel>
        </PageContainer>
    );
};

export default HealthOverviewPage; 