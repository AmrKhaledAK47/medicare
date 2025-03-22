'use client';

import React, { useState, useContext, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Grid,
    Tabs,
    Tab,
    Divider,
    Button,
    IconButton,
    Container,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '@/context/ThemeContext';

// Styled components
const HeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: '12px',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
}));

const VitalBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
    position: 'relative',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
    },
}));

const VitalIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '8px',
    right: '10px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    opacity: 0.6,
}));

const VitalValue = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
    marginBottom: theme.spacing(1),
}));

const VitalLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontWeight: 400,
}));

const DataRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
}));

const DataLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

const DataValue = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const ExportButton = styled(Button)(({ theme }) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#E8F4F8' : '#333',
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
    fontWeight: 500,
    fontSize: '0.9rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#D7EDF4' : '#444',
    },
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    '& .MuiTabs-indicator': {
        backgroundColor: '#267997',
        height: '3px',
        borderRadius: '3px',
    },
    '& .MuiTabs-flexContainer': {
        position: 'relative',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    '&.Mui-selected': {
        color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
        fontWeight: 600,
    },
    transition: 'all 0.2s ease',
}));

const TestResultBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
    marginBottom: theme.spacing(2),
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#E8F4F8' : '#3A3A3A',
        boxShadow: theme.palette.mode === 'light' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.2)',
    },
}));

const MedicationItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5, 3),
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.mode === 'light' ? '#E8F4F8' : '#333'}`,
    background: theme.palette.mode === 'light' ? '#fff' : '#282828',
    boxShadow: theme.palette.mode === 'light' ? '0 2px 4px rgba(0,0,0,0.03)' : 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'light' ? '0 4px 12px rgba(0,0,0,0.05)' : '0 4px 12px rgba(0,0,0,0.1)',
    },
}));

const MedicationLeftSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
});

const MedicationIcon = styled(Box)(({ theme }) => ({
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    background: theme.palette.mode === 'light' ? '#E8F4F8' : '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2.5),
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
}));

const MedicationContent = styled(Box)({
    flex: 1,
});

const MedicationName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.mode === 'light' ? '#267997' : '#fff',
}));

const MedicationDosage = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginTop: '2px',
}));

const MedicationStatus = styled(Box)(({ active }: { active: boolean }) => ({
    fontWeight: 500,
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    background: active ? '#E6F7ED' : '#FFE9E9',
    color: active ? '#1A9D59' : '#E53E3E',
    letterSpacing: '0.4px',
    marginLeft: '12px',
}));

const RefillButton = styled(Button)(({ theme }) => ({
    padding: '6px 12px',
    borderRadius: '8px',
    background: theme.palette.mode === 'light' ? '#E8F4F8' : '#333',
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
    fontWeight: 500,
    fontSize: '0.8rem',
    textTransform: 'none',
    '&:hover': {
        background: theme.palette.mode === 'light' ? '#D7EDF4' : '#444',
    },
}));

interface MedicalRecordTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: MedicalRecordTabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`medical-record-tabpanel-${index}`}
            aria-labelledby={`medical-record-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

// Add medications data
const medications = [
    {
        id: 1,
        name: 'Lisinopril',
        dosage: '10mg once daily',
        instructions: 'Take with food in the morning',
        active: true,
        refills: 2,
        icon: 'pill',
    },
    {
        id: 2,
        name: 'Metformin',
        dosage: '500mg twice daily',
        instructions: 'Take with meals',
        active: true,
        refills: 5,
        icon: 'capsule',
    },
    {
        id: 3,
        name: 'Prednisone',
        dosage: '5mg once daily',
        instructions: 'Take in the morning with food',
        active: false,
        refills: 0,
        icon: 'tablet',
    },
    {
        id: 4,
        name: 'Fluoxetine',
        dosage: '20mg once daily',
        instructions: 'Take in the morning',
        active: true,
        refills: 3,
        icon: 'pill',
    },
];

const ChartContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#282828',
    border: `1px solid ${theme.palette.mode === 'light' ? '#E8F4F8' : '#333'}`,
    boxShadow: theme.palette.mode === 'light' ? '0 2px 4px rgba(0,0,0,0.03)' : 'none',
    marginBottom: theme.spacing(3),
}));

const ChartHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
});

const TimeRangeSelector = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
    borderRadius: '8px',
    padding: '4px',
}));

const TimeRangeButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
    padding: '4px 12px',
    minWidth: 'unset',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'none',
    backgroundColor: active ? (theme.palette.mode === 'light' ? '#fff' : '#282828') : 'transparent',
    color: active
        ? (theme.palette.mode === 'light' ? '#267997' : '#fff')
        : (theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC'),
    boxShadow: active ? (theme.palette.mode === 'light' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none') : 'none',
    '&:hover': {
        backgroundColor: active
            ? (theme.palette.mode === 'light' ? '#fff' : '#282828')
            : (theme.palette.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.05)'),
    },
}));

const HistoryEventList = styled(Box)(({ theme }) => ({
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(0, 1),
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#f1f1f1' : '#333',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#888' : '#555',
        borderRadius: '4px',
    },
}));

const EventItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#E8F4F8' : '#333'}`,
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const EventDate = styled(Box)(({ theme }) => ({
    minWidth: '90px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#888',
    fontSize: '0.85rem',
    fontWeight: 500,
}));

const EventTypeChip = styled(Chip)(({ theme }) => ({
    height: '22px',
    fontSize: '0.7rem',
    fontWeight: 500,
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.mode === 'light' ? '#E8F4F8' : '#333',
    color: theme.palette.mode === 'light' ? '#267997' : '#B8C7CC',
}));

const CanvasChart = styled('canvas')({
    width: '100%',
    height: '100%',
});

// Mock data for charts
const mockHealthEvents = [
    { date: 'Jun 12, 2023', type: 'Visit', description: 'Annual physical examination' },
    { date: 'Apr 05, 2023', type: 'Labs', description: 'Blood work - Complete metabolic panel' },
    { date: 'Feb 22, 2023', type: 'Vaccine', description: 'Influenza vaccination' },
    { date: 'Jan 10, 2023', type: 'Visit', description: 'Follow-up appointment' },
    { date: 'Nov 15, 2022', type: 'Procedure', description: 'Endoscopy' },
    { date: 'Oct 03, 2022', type: 'Visit', description: 'Consultation with specialist' },
    { date: 'Sep 18, 2022', type: 'Labs', description: 'Lipid panel tests' },
    { date: 'Aug 27, 2022', type: 'Referral', description: 'Referred to Cardiology' },
];

const MedicalRecordsPage = () => {
    const { mode } = useThemeContext();
    const [tabValue, setTabValue] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');

        if (printWindow) {
            // Get the content to print
            const contentToPrint = contentRef.current;

            if (contentToPrint) {
                // Apply print styles
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Medicare - Medical Records</title>
                            <style>
                                body {
                                    font-family: 'Poppins', sans-serif;
                                    color: #333;
                                    background: white;
                                    padding: 20px;
                                }
                                .header {
                                    display: flex;
                                    align-items: center;
                                    margin-bottom: 20px;
                                    border-bottom: 1px solid #eee;
                                    padding-bottom: 10px;
                                }
                                .logo {
                                    font-size: 24px;
                                    font-weight: bold;
                                    color: #267997;
                                    margin-right: 20px;
                                }
                                .title {
                                    font-size: 20px;
                                    color: #333;
                                }
                                .timestamp {
                                    font-size: 12px;
                                    color: #6C7A89;
                                    margin-top: 5px;
                                }
                                h1, h2, h3, h4, h5, h6 {
                                    color: #267997;
                                    margin-top: 20px;
                                    margin-bottom: 10px;
                                }
                                .section {
                                    margin-bottom: 20px;
                                    page-break-inside: avoid;
                                }
                                .record-item {
                                    display: flex;
                                    margin-bottom: 8px;
                                }
                                .record-label {
                                    width: 200px;
                                    font-weight: 500;
                                    color: #6C7A89;
                                }
                                .record-value {
                                    font-weight: 600;
                                }
                                .patient-info {
                                    display: flex;
                                    margin-bottom: 20px;
                                }
                                .patient-details {
                                    margin-left: 20px;
                                }
                                .vitals-container {
                                    display: grid;
                                    grid-template-columns: repeat(3, 1fr);
                                    gap: 15px;
                                    margin-bottom: 20px;
                                }
                                .vital-item {
                                    padding: 10px;
                                    border: 1px solid #eee;
                                    border-radius: 8px;
                                }
                                .vital-value {
                                    font-size: 18px;
                                    font-weight: bold;
                                    color: #267997;
                                }
                                .vital-label {
                                    font-size: 14px;
                                    color: #6C7A89;
                                }
                                table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    margin-bottom: 20px;
                                }
                                th, td {
                                    padding: 8px;
                                    text-align: left;
                                    border-bottom: 1px solid #eee;
                                }
                                th {
                                    background-color: #f8f8f8;
                                    color: #267997;
                                    font-weight: 600;
                                }
                                @media print {
                                    body {
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                    .no-print {
                                        display: none;
                                    }
                                    .page-break {
                                        page-break-after: always;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="header">
                                <div class="logo">Medicare</div>
                                <div>
                                    <div class="title">Medical Records</div>
                                    <div class="timestamp">Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h2>Patient Information</h2>
                                <div class="patient-info">
                                    <div class="patient-image">
                                        <img src="/images/patient-photo.jpg" width="100" height="100" style="border-radius: 50%; object-fit: cover;" />
                                    </div>
                                    <div class="patient-details">
                                        <div class="record-item">
                                            <div class="record-label">Name</div>
                                            <div class="record-value">Noah Brown</div>
                                        </div>
                                        <div class="record-item">
                                            <div class="record-label">Gender</div>
                                            <div class="record-value">Male</div>
                                        </div>
                                        <div class="record-item">
                                            <div class="record-label">Age</div>
                                            <div class="record-value">26 years</div>
                                        </div>
                                        <div class="record-item">
                                            <div class="record-label">Contact</div>
                                            <div class="record-value">+1 (555) 123-4567</div>
                                        </div>
                                        <div class="record-item">
                                            <div class="record-label">Patient ID</div>
                                            <div class="record-value">PAT-2023-0042</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h2>Vital Statistics</h2>
                                <div class="vitals-container">
                                    <div class="vital-item">
                                        <div class="vital-value">120 mg/dt</div>
                                        <div class="vital-label">Blood glucose level</div>
                                    </div>
                                    <div class="vital-item">
                                        <div class="vital-value">55 Kg</div>
                                        <div class="vital-label">Weight</div>
                                    </div>
                                    <div class="vital-item">
                                        <div class="vital-value">70 bpm</div>
                                        <div class="vital-label">Heart rate</div>
                                    </div>
                                    <div class="vital-item">
                                        <div class="vital-value">71%</div>
                                        <div class="vital-label">Oxygen saturation</div>
                                    </div>
                                    <div class="vital-item">
                                        <div class="vital-value">98.1 F</div>
                                        <div class="vital-label">Body temperature</div>
                                    </div>
                                    <div class="vital-item">
                                        <div class="vital-value">120/80 mm hg</div>
                                        <div class="vital-label">Blood pressure</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="section page-break">
                                <h2>Test Results</h2>
                                <h3>Lipid Panel & Glucose</h3>
                                <table>
                                    <tr>
                                        <th>Test</th>
                                        <th>Result</th>
                                        <th>Reference Range</th>
                                    </tr>
                                    <tr>
                                        <td>Total Cholesterol</td>
                                        <td>200 mg/dL</td>
                                        <td>&lt;200 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>HDL</td>
                                        <td>50 mg/dL</td>
                                        <td>&gt;40 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>LDL</td>
                                        <td>130 mg/dL</td>
                                        <td>&lt;100 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>Triglycerides</td>
                                        <td>100 mg/dL</td>
                                        <td>&lt;150 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>Glucose</td>
                                        <td>90 mg/dL</td>
                                        <td>70-99 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>Hemoglobin A1c</td>
                                        <td>5%</td>
                                        <td>&lt;5.7%</td>
                                    </tr>
                                </table>
                                
                                <h3>Complete Metabolic Panel</h3>
                                <table>
                                    <tr>
                                        <th>Test</th>
                                        <th>Result</th>
                                        <th>Reference Range</th>
                                    </tr>
                                    <tr>
                                        <td>WBC</td>
                                        <td>6.0 K/uL</td>
                                        <td>4.5-11.0 K/uL</td>
                                    </tr>
                                    <tr>
                                        <td>Hgb</td>
                                        <td>14 g/dL</td>
                                        <td>13.5-17.5 g/dL</td>
                                    </tr>
                                    <tr>
                                        <td>Plt</td>
                                        <td>200 K/uL</td>
                                        <td>150-450 K/uL</td>
                                    </tr>
                                    <tr>
                                        <td>Na</td>
                                        <td>140 mmol/L</td>
                                        <td>135-145 mmol/L</td>
                                    </tr>
                                    <tr>
                                        <td>K</td>
                                        <td>4.0 mmol/L</td>
                                        <td>3.5-5.0 mmol/L</td>
                                    </tr>
                                    <tr>
                                        <td>Cr</td>
                                        <td>0.9 mg/dL</td>
                                        <td>0.6-1.2 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td>AST</td>
                                        <td>20 U/L</td>
                                        <td>&lt;40 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>ALT</td>
                                        <td>25 U/L</td>
                                        <td>&lt;41 U/L</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div class="section">
                                <h2>Medications</h2>
                                <table>
                                    <tr>
                                        <th>Medication</th>
                                        <th>Dosage</th>
                                        <th>Instructions</th>
                                        <th>Status</th>
                                    </tr>
                                    <tr>
                                        <td>Lisinopril</td>
                                        <td>10mg once daily</td>
                                        <td>Take with food in the morning</td>
                                        <td>Active</td>
                                    </tr>
                                    <tr>
                                        <td>Metformin</td>
                                        <td>500mg twice daily</td>
                                        <td>Take with meals</td>
                                        <td>Active</td>
                                    </tr>
                                    <tr>
                                        <td>Fluoxetine</td>
                                        <td>20mg once daily</td>
                                        <td>Take in the morning</td>
                                        <td>Active</td>
                                    </tr>
                                    <tr>
                                        <td>Prednisone</td>
                                        <td>5mg once daily</td>
                                        <td>Take in the morning with food</td>
                                        <td>Inactive</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div class="section no-print">
                                <button onclick="window.print(); window.close();" style="padding: 10px 20px; background: #267997; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">Print Report</button>
                            </div>
                        </body>
                    </html>
                `);

                printWindow.document.close();

                // Focus on the new window (this is required for some browsers)
                printWindow.focus();
            }
        }
    };

    return (
        <Box sx={{ p: 0, position: 'relative' }}>
            <ExportButton
                startIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 18V6C19 5.44772 18.5523 5 18 5H12H6C5.44772 5 5 5.44772 5 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 21H16H19C19.5523 21 20 20.5523 20 20V13H4V20C4 20.5523 4.44772 21 5 21H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 13.01V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13.01V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 13.01V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                onClick={handlePrint}
            >
                Export Records
            </ExportButton>

            <Box ref={contentRef}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    padding: 3,
                    mb: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PatientAvatar>
                            <Image
                                src="/images/patient-photo.jpg"
                                alt="Patient"
                                width={70}
                                height={70}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </PatientAvatar>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h5" sx={{
                                color: mode === 'light' ? '#30323E' : '#fff',
                                fontWeight: 600
                            }}>
                                Noah Brown
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC'
                            }}>
                                26 • Male
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC'
                            }}>
                                Contact: +1 (555) 123-4567
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <PatientInfoBadge sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Patient ID: PAT-2023-0042
                            </Typography>
                        </PatientInfoBadge>
                        <PatientInfoBadge>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Insurance: BlueCross #BC-439522
                            </Typography>
                        </PatientInfoBadge>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                    pt: 0
                }}>
                    <PatientVitalsSection>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" fillOpacity="0.5" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>120 mg/dt</VitalValue>
                                    <VitalLabel>Blood glucose level</VitalLabel>
                                </VitalBox>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3V21M9 21H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.5 8.5L6.5 7.5M18.5 8.5L17.5 7.5M6 13H3M21 13H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>55 Kg</VitalValue>
                                    <VitalLabel>Weight</VitalLabel>
                                </VitalBox>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 3C4.2 3 2 5.2 2 8C2 10.8 4.2 13 7 13H17C19.8 13 22 15.2 22 18C22 20.8 19.8 23 17 23H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 9L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13 1L17 3L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>70 bpm</VitalValue>
                                    <VitalLabel>Heart rate</VitalLabel>
                                </VitalBox>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" fillOpacity="0.4" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>71%</VitalValue>
                                    <VitalLabel>Oxygen saturation</VitalLabel>
                                </VitalBox>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5 3H6.5C5.4 3 4.5 3.9 4.5 5V21L12 18L19.5 21V5C19.5 3.9 18.6 3 17.5 3Z" fill="currentColor" fillOpacity="0.4" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>98.1 F</VitalValue>
                                    <VitalLabel>Body temperature</VitalLabel>
                                </VitalBox>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <VitalBox>
                                    <VitalIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M18 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </VitalIcon>
                                    <VitalValue>120/80 mm hg</VitalValue>
                                    <VitalLabel>Blood pressure</VitalLabel>
                                </VitalBox>
                            </Grid>
                        </Grid>
                    </PatientVitalsSection>

                    <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <StyledTabs value={tabValue} onChange={handleTabChange}>
                                <StyledTab label="Medical History" />
                                <StyledTab label="Medical Record" />
                                <StyledTab label="Medications" />
                            </StyledTabs>
                        </Box>

                        <TabPanel value={tabValue} index={0}>
                            <Box sx={{ p: 3 }}>
                                {/* Medical History content */}
                            </Box>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <Box sx={{ p: 3 }}>
                                {/* Medical Record content */}
                            </Box>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Box sx={{ p: 3 }}>
                                {/* Medications content */}
                            </Box>
                        </TabPanel>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MedicalRecordsPage; 