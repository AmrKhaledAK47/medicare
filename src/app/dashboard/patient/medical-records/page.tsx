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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Chip,
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
    fontWeight: 500,
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

// NEW STYLED COMPONENTS
const MedicalRecordItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(1.5),
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#333',
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'light'
            ? '0px 2px 8px rgba(0, 0, 0, 0.05)'
            : '0px 2px 8px rgba(0, 0, 0, 0.2)',
    },
}));

const RecordItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontWeight: 600,
        fontFamily: '"Poppins", sans-serif',
        fontSize: '15px',
        color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    },
    '& .MuiListItemText-secondary': {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '14px',
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        marginTop: '4px',
    },
}));

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ALL THE ICON COMPONENTS
const AllergiesIcon = () => (
    <img src="/icons/allergies.svg" alt="Allergies" width="30px" height="30px" />
);

const ClinicalVitalsIcon = () => (
    <img src="/icons/Clinical-vitals.svg" alt="Clinical Vitals" width="30px" height="30px" />
);

const ConditionsIcon = () => (
    <img src="/icons/conditions.svg" alt="Conditions" width="36px" height="36px" />
);

const ImmunizationsIcon = () => (
    <img src="/icons/immunizations.svg" alt="Immunizations" width="36px" height="36px" />
);

const ImagingIcon = () => (
    <img src="/icons/imaging.svg" alt="Imaging" width="36px" height="36px" />
);

const FamilyHistoryIcon = () => (
    <img src="/icons/Family-history.svg" alt="Family History" width="36px" height="36px" />
);

const LabResultsIcon = () => (
    <img src="/icons/Test-results.svg" alt="Lab Results" width="34px" height="34px" />
);

const MedicationsIcon = () => (
    <img src="/icons/medications.svg" alt="Medications" width="34px" height="34px" />
);

const ProceduresIcon = () => (
    <img src="/icons/procedures.svg" alt="Procedures" width="34px" height="34px" />
);

const TabPanel = (props: any) => {
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
            {value === index && <Box>{children}</Box>}
        </Box>
    );
};

// Add the StyledHeartIcon component back
const StyledHeartIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M28.1667 7.54167C28.1667 3.82525 25.0284 0.8125 21.1571 0.8125C18.2626 0.8125 15.7779 2.4967 14.7083 4.89998C13.6387 2.4967 11.154 0.8125 8.25955 0.8125C4.38828 0.8125 1.25 3.82525 1.25 7.54167C1.25 18.3391 14.7083 25.4861 14.7083 25.4861C14.7083 25.4861 28.1667 18.3391 28.1667 7.54167Z" fill="#21647D" stroke="#21647D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

// Update styling for the share button
const ShareButton = styled(Button)(({ theme }) => ({
    color: '#21647D',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#1a5268',
    },
}));

// ShareIcon component
const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Update the MedicationToggleButton component with better styling
const MedicationToggleButton = styled(Button)(({ theme }) => ({
    color: '#267997',
    backgroundColor: 'transparent',
    fontWeight: 600,
    fontSize: '14px',
    padding: '6px 16px',
    borderRadius: '6px',
    textTransform: 'none',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'light' ? '#E5E5E5' : '#444'}`,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
        boxShadow: 'none',
    },
}));

// Enhance MedicationItem to have more visual appeal and hover effect
const MedicationItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5, 1),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    transition: 'background-color 0.2s ease',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#333',
    },
}));

// Add the medication typography components back
const MedicationName = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    marginBottom: theme.spacing(0.5),
    fontFamily: '"Poppins", sans-serif',
}));

const MedicationDosage = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginBottom: theme.spacing(0.5),
    fontFamily: '"Poppins", sans-serif',
}));

const MedicationInstructions = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontFamily: '"Poppins", sans-serif',
}));

// Add a checkbox component for active medications
const ActiveCheckbox = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#21647D" />
        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add a more detailed InactiveMedicationBadge component
const InactiveMedicationBadge = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#FFF2F2' : '#3A2A2A',
    color: '#E16A6A',
    borderRadius: '4px',
    padding: '3px 10px',
    fontSize: '12px',
    fontWeight: 500,
    marginTop: '8px',
}));

// Add CheckIcon component for active medication badge
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add ActiveMedicationBadge component
const ActiveMedicationBadge = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#F0FFF4' : '#2A3A2A',
    color: '#4CAF50',
    borderRadius: '4px',
    padding: '3px 10px',
    fontSize: '12px',
    fontWeight: 500,
    marginLeft: '12px',
}));

// Add AllergyView related components and interfaces
interface Allergy {
    id: string;
    name: string;
    reactions: string[];
    severity: 'high' | 'moderate' | 'low';
    notes?: string;
    onsetDate?: string;
    status?: 'Active' | 'Inactive';
}

// Add back button icon
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add edit icon
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add delete icon
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 6H5H21" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Style the allergy item with hover effect
const AllergyItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    transition: 'all 0.2s ease',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#333',
    },
}));

// Style the allergy name
const AllergyName = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    marginBottom: theme.spacing(0.5),
    fontFamily: '"Poppins", sans-serif',
}));

// Style the allergy description
const AllergyDescription = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    fontFamily: '"Poppins", sans-serif',
}));

// Style the back button
const BackButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    padding: 0,
    minWidth: 'auto',
    '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.mode === 'light' ? '#1a5268' : '#FFFFFF',
    },
}));

// Add AllergyIcon component for the yellow hand icon
const AllergyIcon = () => (
    <Box sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2
    }}>
        <img src="/icons/allergies.svg" alt="Allergies Icon" width={30} height={30} />
    </Box>
);

// Add a button for adding new allergies
const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#21647D' : '#21647D',
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#1a5268' : '#1a5268',
        boxShadow: 'none',
    },
}));

// Add a 'plus' icon for the add button
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Style for severity badge
const SeverityBadge = styled(Box)<{ severity: 'high' | 'moderate' | 'low' }>(({ theme, severity }) => {
    const colors = {
        high: {
            bg: '#FFF2F2',
            text: '#E16A6A',
            darkBg: '#3A2A2A',
        },
        moderate: {
            bg: '#FFF5E0',
            text: '#F9A825',
            darkBg: '#3A3020',
        },
        low: {
            bg: '#F0FFF4',
            text: '#4CAF50',
            darkBg: '#2A3A2A',
        },
    };

    return {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: theme.palette.mode === 'light' ? colors[severity].bg : colors[severity].darkBg,
        color: colors[severity].text,
        borderRadius: '4px',
        padding: '3px 10px',
        fontSize: '12px',
        fontWeight: 500,
        marginLeft: '12px',
    };
});

// Form Dialog Styles
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        width: '500px',
        maxWidth: '90vw',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2B2B2B',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontWeight: 600,
    padding: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2.5),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2.5),
    '& label': {
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#21647D' : '#21647D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#21647D',
        },
    },
}));

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.08)' : 'rgba(184, 199, 204, 0.08)',
    },
}));

const SaveButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#21647D',
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    padding: '6px 16px',
    '&:hover': {
        backgroundColor: '#1a5268',
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#444',
        color: theme.palette.mode === 'light' ? '#A3A0A0' : '#777',
    },
}));

// Add Condition-related interfaces and styled components
interface Condition {
    id: number;
    name: string;
    clinicalStatus: 'Active' | 'Inactive';
    category: string;
    verificationStatus: 'Confirmed' | 'Problem';
    bodySite: string;
    severity: 'Severe' | 'Moderate' | 'Mild';
    recordedDate: string;
    notes?: string;
    riskLevel?: 'High' | 'Medium' | 'Low';
    treatingPhysician?: string;
    lastUpdated?: string;
}

// Style the condition-related components
const ConditionsTableContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: theme.palette.mode === 'light' ? '0px 2px 8px rgba(0, 0, 0, 0.05)' : 'none',
}));

const TableHead = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr 1.2fr 1fr 1fr',
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#1E2A2F',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const TableHeadCell = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    display: 'flex',
    alignItems: 'center',
}));

const TableRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr 1.2fr 1fr 1fr',
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    transition: 'background-color 0.2s ease',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#333',
    },
}));

const TableCell = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
}));

// Styled components for status badges
const StatusBadge = styled(Box)<{ status: 'Active' | 'Inactive' | 'Confirmed' | 'Problem' | 'normal' | 'abnormal' | 'pending' }>(({ theme, status }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'capitalize',
    ...(status === 'Active' && {
        backgroundColor: '#E3F2FD',
        color: '#1976D2',
    }),
    ...(status === 'Inactive' && {
        backgroundColor: '#F5F5F5',
        color: '#757575',
    }),
    ...(status === 'Confirmed' && {
        backgroundColor: '#E8F5E9',
        color: '#2E7D32',
    }),
    ...(status === 'Problem' && {
        backgroundColor: '#FFEBEE',
        color: '#C62828',
    }),
    ...(status === 'normal' && {
        backgroundColor: '#E8F5E9',
        color: '#2E7D32',
    }),
    ...(status === 'abnormal' && {
        backgroundColor: '#FFEBEE',
        color: '#C62828',
    }),
    ...(status === 'pending' && {
        backgroundColor: '#FFF8E1',
        color: '#F57C00',
    }),
}));

const SeverityIndicator = styled(Box)<{ severity: 'Severe' | 'Moderate' | 'Mild' }>(({ theme, severity }) => {
    const colors = {
        Severe: '#E16A6A',
        Moderate: '#F9A825',
        Mild: '#4CAF50',
    };

    return {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: colors[severity],
        marginRight: theme.spacing(1),
    };
});

// Add FilterButton component for condition filtering
const FilterButton = styled(Button)(({ theme }) => ({
    color: '#267997',
    backgroundColor: 'transparent',
    fontWeight: 500,
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '6px',
    textTransform: 'none',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'light' ? '#E5E5E5' : '#444'}`,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#333',
        boxShadow: 'none',
    },
}));

// Add FilterIcon component
const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add SortIcon component
const SortIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 6H20M6 12H18M8 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Add InfoCard component for condition details
const InfoCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    borderRadius: '12px',
    marginBottom: theme.spacing(3),
}));

const InfoCardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    marginBottom: theme.spacing(2),
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(1.5),
    '&:last-child': {
        marginBottom: 0,
    },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#E5E5E5' : '#444',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#21647D' : '#21647D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#21647D',
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
    },
}));

// Add Immunization related interfaces and styled components
interface Immunization {
    id: string;
    name: string;
    type: string;
    date: string;
    status: 'Active' | 'Expired' | 'Scheduled';
    nextDoseDate?: string;
    manufacturer?: string;
    lotNumber?: string;
    administeredBy?: string;
    location?: string;
    notes?: string;
}

// Styled components for immunization items
const ImmunizationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
}));

const ImmunizationItem = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: '16px',
    cursor: 'pointer',
    borderRadius: '12px',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444444'}`,
    transition: 'all 0.2s ease-in-out',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#353535',
        borderColor: theme.palette.mode === 'light' ? '#D6E4EC' : '#505050',
    },
}));

const ImmunizationName = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const ImmunizationInfo = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginTop: '4px',
}));

// Update the ImmunizationBadge component to handle label properly
const ImmunizationBadge = styled(Chip)<{ status: string }>(({ theme, status }) => ({
    height: '22px',
    fontSize: '12px',
    fontWeight: 500,
    marginLeft: '10px',
    padding: '0 8px',
    backgroundColor: status === 'Active'
        ? theme.palette.mode === 'light' ? '#E9F7EF' : '#1E4A30'
        : status === 'Expired'
            ? theme.palette.mode === 'light' ? '#FEECEB' : '#4A1E1E'
            : theme.palette.mode === 'light' ? '#E3F2FD' : '#1E344A',
    color: status === 'Active'
        ? theme.palette.mode === 'light' ? '#27AE60' : '#4CAF50'
        : status === 'Expired'
            ? theme.palette.mode === 'light' ? '#E16A6A' : '#EF5350'
            : theme.palette.mode === 'light' ? '#2196F3' : '#64B5F6',
    '& .MuiChip-label': {
        padding: '0 6px',
    },
}));

// Add after the Immunization interface
interface FamilyMember {
    id: string;
    name: string;
    gender: 'Male' | 'Female';
    age: string;
    relationship: 'Mother' | 'Father' | 'Sibling' | 'Grandparent' | 'Child' | 'Uncle' | 'Other';
    heartDisease: number; // 0 = No, 1 = Yes
    bloodGlucoseLevel: number;
    diabetes: number; // 0 = No, 1 = Yes
    hba1cLevel: number;
    notes?: string;
}

// Replace the FamilyHistoryTable and related styled components with fixed typing
const FamilyHistoryTable = styled(Box)(({ theme }) => ({
    width: '100%',
    overflowX: 'auto',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const TableHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: theme.palette.mode === 'light' ? '#21647D' : '#2D526A',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
}));

const TableHeaderCell = styled(Typography)<{ width?: string }>(({ theme, width }) => ({
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: '14px',
    width: width || 'auto',
    padding: '0 8px',
}));

const FamilyTableRow = styled(Box)<{ isOdd?: boolean }>(({ theme, isOdd }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: isOdd
        ? theme.palette.mode === 'light' ? '#F8FBFC' : '#333'
        : theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    '&:last-child': {
        borderBottom: 'none',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
    },
}));

const FamilyTableCell = styled(Typography)<{ width?: string }>(({ theme, width }) => ({
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontSize: '14px',
    width: width || 'auto',
    padding: '0 8px',
}));

const AddFamilyMemberButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2D2D2D',
    color: theme.palette.mode === 'light' ? '#21647D' : '#64B5F6',
    border: `1px solid ${theme.palette.mode === 'light' ? '#D6E4EC' : '#505050'}`,
    borderRadius: '8px',
    padding: '8px 16px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#EBF4F8' : '#383838',
        boxShadow: 'none',
    },
}));

// Add after the immunizations mock data
const familyMembers: FamilyMember[] = [
    {
        id: '1',
        name: 'Jane Hibbert',
        gender: 'Male',
        age: '55years',
        relationship: 'Father',
        heartDisease: 1,
        bloodGlucoseLevel: 140,
        diabetes: 1,
        hba1cLevel: 6.6,
        notes: 'Type 2 diabetes, managed with medication and diet.'
    },
    {
        id: '2',
        name: 'Marth Harriet',
        gender: 'Female',
        age: '43years',
        relationship: 'Mother',
        heartDisease: 1,
        bloodGlucoseLevel: 80,
        diabetes: 1,
        hba1cLevel: 5.6,
        notes: 'Hypertension, well-controlled with medication.'
    },
    {
        id: '3',
        name: 'Jane Hibbert',
        gender: 'Male',
        age: '53years',
        relationship: 'Uncle',
        heartDisease: 0,
        bloodGlucoseLevel: 150,
        diabetes: 0,
        hba1cLevel: 6.6,
        notes: 'No significant health issues.'
    },
    {
        id: '4',
        name: 'Marth Harriet',
        gender: 'Male',
        age: '60years',
        relationship: 'Grandparent',
        heartDisease: 0,
        bloodGlucoseLevel: 140,
        diabetes: 1,
        hba1cLevel: 6.1,
        notes: 'History of stroke, takes blood thinners.'
    }
];

// Add after the FamilyMember interface
interface LabResult {
    id: string;
    name: string;
    value: string;
    status: 'normal' | 'abnormal' | 'pending';
    unit: string;
    referenceRange: string;
    date: string;
    category: string;
    notes?: string;
}

// Add after other styled components
const LabResultsTable = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    borderRadius: '12px',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
}));

const LabResultTableHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: theme.palette.mode === 'light' ? '#F4F7F9' : '#333333',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
}));

const LabResultTableHeaderCell = styled(Box)<{ width: string }>(({ theme, width }) => ({
    width: width,
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC'
}));

const LabResultRow = styled(Box)<{ isHeader?: boolean }>(({ theme, isHeader }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: isHeader
        ? theme.palette.mode === 'light' ? '#F9FAFB' : '#363636'
        : theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F9FAFB' : '#363636',
    },
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const LabResultCell = styled(Box)<{ width: string }>(({ theme, width }) => ({
    width: width,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    display: 'flex',
    alignItems: 'center'
}));

const AddLabResultButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2D2D2D',
    color: theme.palette.mode === 'light' ? '#21647D' : '#64B5F6',
    border: `1px solid ${theme.palette.mode === 'light' ? '#D6E4EC' : '#505050'}`,
    borderRadius: '8px',
    padding: '8px 16px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#EBF4F8' : '#383838',
        boxShadow: 'none',
    },
}));

// Add after other mock data arrays (like familyMembers)
const labResults: LabResult[] = [
    {
        id: '1',
        name: 'Basic Metabolic Panel',
        value: 'Multiple',
        status: 'normal',
        unit: 'Various',
        referenceRange: 'Various',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel',
        notes: 'Complete panel within normal range'
    },
    {
        id: '2',
        name: 'Sodium',
        value: '139',
        status: 'normal',
        unit: 'mmol/L',
        referenceRange: '135-145',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel'
    },
    {
        id: '3',
        name: 'Chloride',
        value: '105',
        status: 'normal',
        unit: 'mmol/L',
        referenceRange: '96-106',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel'
    },
    {
        id: '4',
        name: 'Potassium',
        value: '4.7',
        status: 'normal',
        unit: 'mmol/L',
        referenceRange: '3.5-5.0',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel'
    },
    {
        id: '5',
        name: 'Carbon Dioxide',
        value: '20',
        status: 'normal',
        unit: 'mmol/L',
        referenceRange: '20-29',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel'
    },
    {
        id: '6',
        name: 'Glucose Blood',
        value: '127',
        status: 'abnormal',
        unit: 'mg/dL',
        referenceRange: '70-100',
        date: '2023-10-15',
        category: 'Diabetes Tests',
        notes: 'Elevated glucose level indicating possible insulin resistance. Consider follow-up testing and lifestyle modifications.'
    },
    {
        id: '7',
        name: 'HbA1c',
        value: '6.8',
        status: 'abnormal',
        unit: '%',
        referenceRange: '<5.7',
        date: '2023-09-28',
        category: 'Diabetes Tests',
        notes: 'Pre-diabetic range. Consider lifestyle changes and monitoring.'
    },
    {
        id: '8',
        name: 'Creatinine',
        value: '0.9',
        status: 'normal',
        unit: 'mg/dL',
        referenceRange: '0.6-1.2',
        date: '2023-10-15',
        category: 'Basic Metabolic Panel'
    },
    {
        id: '9',
        name: 'Total Cholesterol',
        value: '215',
        status: 'abnormal',
        unit: 'mg/dL',
        referenceRange: '<200',
        date: '2023-09-28',
        category: 'Lipid Panel',
        notes: 'Slightly elevated. Consider dietary changes.'
    },
    {
        id: '10',
        name: 'LDL Cholesterol',
        value: '142',
        status: 'abnormal',
        unit: 'mg/dL',
        referenceRange: '<100',
        date: '2023-09-28',
        category: 'Lipid Panel',
        notes: 'Elevated LDL. Recommend lifestyle modifications and reassessment in 3 months.'
    },
    {
        id: '11',
        name: 'HDL Cholesterol',
        value: '49',
        status: 'normal',
        unit: 'mg/dL',
        referenceRange: '>40',
        date: '2023-09-28',
        category: 'Lipid Panel'
    },
    {
        id: '12',
        name: 'Triglycerides',
        value: '120',
        status: 'normal',
        unit: 'mg/dL',
        referenceRange: '<150',
        date: '2023-09-28',
        category: 'Lipid Panel'
    }
];

// Add after the LabResult interface
interface Procedure {
    id: string;
    name: string;
    performer: string;
    bodySite: string;
    outcome: 'Successful' | 'Unsuccessful' | 'Pending';
    status: 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled';
    datePerformed: string;
    notes?: string;
    complications?: string;
    followUpRequired?: boolean;
    followUpDate?: string;
    isEmergency?: boolean;
}

// Add after other styled components
const ProceduresTable = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    borderRadius: '12px',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
}));

const ProcedureTableHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: theme.palette.mode === 'light' ? '#F4F7F9' : '#333333',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
}));

const ProcedureTableHeaderCell = styled(Box)<{ width: string }>(({ theme, width }) => ({
    width: width,
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC'
}));

const ProcedureRow = styled(Box)<{ isHeader?: boolean }>(({ theme, isHeader }) => ({
    display: 'flex',
    padding: '12px 16px',
    backgroundColor: isHeader
        ? theme.palette.mode === 'light' ? '#F9FAFB' : '#363636'
        : theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F9FAFB' : '#363636',
    },
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const ProcedureCell = styled(Box)<{ width: string }>(({ theme, width }) => ({
    width: width,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    display: 'flex',
    alignItems: 'center'
}));

const AddProcedureButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#2D2D2D',
    color: theme.palette.mode === 'light' ? '#21647D' : '#64B5F6',
    border: `1px solid ${theme.palette.mode === 'light' ? '#D6E4EC' : '#505050'}`,
    borderRadius: '8px',
    padding: '8px 16px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#EBF4F8' : '#383838',
        boxShadow: 'none',
    },
}));

// Add after other mock data arrays (like familyMembers)
const procedures: Procedure[] = [
    {
        id: '1',
        name: 'Heart valve replacement',
        performer: 'Dr. Leslie Alexander',
        bodySite: 'Heart valve structure',
        outcome: 'Successful',
        status: 'Completed',
        datePerformed: '2012-12-01',
        notes: 'Mitral valve replaced with mechanical valve. Patient recovered well post-procedure.',
        complications: 'None',
        followUpRequired: true,
        followUpDate: '2013-01-15',
        isEmergency: false
    },
    {
        id: '2',
        name: 'Heart valve replacement',
        performer: 'Dr. Leslie Alexander',
        bodySite: 'Heart valve structure',
        outcome: 'Successful',
        status: 'Completed',
        datePerformed: '2012-12-01',
        notes: 'Aortic valve replaced. Procedure went as expected with no complications.',
        followUpRequired: true,
        followUpDate: '2013-01-15'
    },
    {
        id: '3',
        name: 'Heart valve replacement',
        performer: 'Dr. Leslie Alexander',
        bodySite: 'Heart valve structure',
        outcome: 'Successful',
        status: 'Completed',
        datePerformed: '2012-12-01',
        notes: 'Tricuspid valve repaired and reinforced. Minimal blood loss during procedure.',
        followUpRequired: true,
        followUpDate: '2013-01-20'
    },
    {
        id: '4',
        name: 'Heart valve replacement',
        performer: 'Dr. Leslie Alexander',
        bodySite: 'Heart valve structure',
        outcome: 'Successful',
        status: 'Completed',
        datePerformed: '2012-12-01',
        notes: 'Pulmonary valve replacement performed. Patient stable throughout procedure.',
        followUpRequired: true,
        followUpDate: '2013-01-10'
    }
];

// Add after the Procedure interface
interface Imaging {
    id: string;
    name: string;
    modality: 'MRI' | 'CT' | 'X-Ray' | 'Ultrasound' | 'PET' | 'Angiography';
    bodyPart: string;
    date: string;
    physician: string;
    facility: string;
    status: 'Completed' | 'Pending' | 'Scheduled';
    findings?: string;
    impression?: string;
    images: {
        thumbnail: string;
        fullSize: string;
        dicom?: string;
    }[];
    notes?: string;
    urgency?: 'Routine' | 'Urgent' | 'STAT';
    followUpRequired?: boolean;
    followUpDate?: string;
}

const MedicalRecordsPage = () => {
    const { mode } = useThemeContext();
    const [tabValue, setTabValue] = useState(1); // Set to 1 to show Medical Record tab by default
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [showActiveMedications, setShowActiveMedications] = useState(true);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedAllergy, setSelectedAllergy] = useState<any>(null);
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
    const [selectedImmunization, setSelectedImmunization] = useState<Immunization | null>(null);
    const [immunizationViewMode, setImmunizationViewMode] = useState<'list' | 'calendar' | 'overdue'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterActive, setFilterActive] = useState<boolean | null>(null);
    const [filterImmunizationStatus, setFilterImmunizationStatus] = useState<'Active' | 'Expired' | 'Scheduled' | null>(null);
    const [openAddImmunizationDialog, setOpenAddImmunizationDialog] = useState(false);
    const [newImmunization, setNewImmunization] = useState<Partial<Immunization>>({
        id: '',
        name: '',
        type: '',
        date: '',
        status: 'Active'
    });

    // Add New Allergy Dialog State
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newAllergy, setNewAllergy] = useState({
        name: '',
        description: '',
        severity: 'moderate' as 'high' | 'moderate' | 'low'
    });

    // Add these state variables after the other state variables in the MedicalRecordsPage component
    const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);
    const [openAddFamilyMemberDialog, setOpenAddFamilyMemberDialog] = useState(false);
    const [newFamilyMember, setNewFamilyMember] = useState<Partial<FamilyMember>>({
        id: '',
        name: '',
        gender: 'Male',
        age: '',
        relationship: 'Other',
        heartDisease: 0,
        bloodGlucoseLevel: 0,
        diabetes: 0,
        hba1cLevel: 0
    });

    // Add after other state variables in the MedicalRecordsPage component
    const [selectedLabResult, setSelectedLabResult] = useState<LabResult | null>(null);
    const [openAddLabResultDialog, setOpenAddLabResultDialog] = useState(false);
    const [newLabResult, setNewLabResult] = useState<Partial<LabResult>>({
        id: '',
        name: '',
        value: '',
        status: 'normal',
        unit: '',
        referenceRange: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        notes: ''
    });
    const [labResultCategoryFilter, setLabResultCategoryFilter] = useState<string | null>(null);

    // Add after the labResultCategoryFilter state variable
    const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
    const [openAddProcedureDialog, setOpenAddProcedureDialog] = useState(false);
    const [newProcedure, setNewProcedure] = useState<Partial<Procedure>>({
        id: '',
        name: '',
        performer: '',
        bodySite: '',
        outcome: 'Successful',
        status: 'Completed',
        datePerformed: new Date().toISOString().split('T')[0],
        notes: ''
    });

    // Add a new state variable for procedure filtering
    const [procedureOutcomeFilter, setProcedureOutcomeFilter] = useState<'Successful' | 'Unsuccessful' | 'Pending' | null>(null);

    // Add after the procedureOutcomeFilter state variable
    const [selectedImaging, setSelectedImaging] = useState<Imaging | null>(null);
    const [openAddImagingDialog, setOpenAddImagingDialog] = useState(false);
    const [imagingModalityFilter, setImagingModalityFilter] = useState<Imaging['modality'] | null>(null);
    const [imagingFiles, setImagingFiles] = useState<File[]>([]);
    const [newImaging, setNewImaging] = useState<Partial<Imaging>>({
        id: '',
        name: '',
        modality: 'MRI',
        bodyPart: '',
        date: new Date().toISOString().split('T')[0],
        physician: '',
        facility: '',
        status: 'Completed',
        images: [],
        notes: ''
    });

    // Add New Condition Dialog State
    const [openAddConditionDialog, setOpenAddConditionDialog] = useState(false);
    const [newCondition, setNewCondition] = useState<Partial<Condition>>({
        id: 0,
        name: '',
        clinicalStatus: 'Active',
        category: 'Diagnosis',
        verificationStatus: 'Confirmed',
        bodySite: '',
        severity: 'Moderate',
        recordedDate: new Date().toISOString().split('T')[0]
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
        setSearchQuery('');

        // Reset selected items and filters based on which section is clicked
        if (section === 'allergies') {
            setSelectedAllergy(null);
            setFilterActive(null);
        } else if (section === 'conditions') {
            setSelectedCondition(null);
            setFilterActive(null);
        } else if (section === 'immunizations') {
            setSelectedImmunization(null);
            setFilterImmunizationStatus(null);
            setImmunizationViewMode('list');
        } else if (section === 'familyHistory') {
            setSelectedFamilyMember(null);
        } else if (section === 'labResults') {
            setSelectedLabResult(null);
            setLabResultCategoryFilter(null);
        } else if (section === 'procedures') {
            setSelectedProcedure(null);
            setProcedureOutcomeFilter(null);
        } else if (section === 'imaging') {
            setSelectedImaging(null);
            setImagingModalityFilter(null);
        }
    };

    const handleShareAllRecords = () => {
        console.log('Sharing all records');
        // Logic to share all records would go here
    };

    // Update the mock data for active medications to match the image
    const activeMedications = [
        {
            id: 1,
            name: 'Ursofalk 300',
            dosage: '2 Pills - 02:00 PM',
            instructions: ''
        },
        {
            id: 2,
            name: 'Indever 20',
            dosage: '1 Pill - 02:20 PM',
            instructions: ''
        },
        {
            id: 3,
            name: 'Docusate Oral',
            dosage: '100 mg every day at bedtime for constipation treatment',
            instructions: ''
        },
        {
            id: 4,
            name: 'Donepezil Oral',
            dosage: '10 mg every day at bedtime',
            instructions: ''
        },
        {
            id: 5,
            name: 'Losartan Oral',
            dosage: '100 mg every day',
            instructions: ''
        },
        {
            id: 6,
            name: 'Ursofalk 300',
            dosage: '2 Pills - 02:00 PM',
            instructions: ''
        },
        {
            id: 7,
            name: 'Indever 20',
            dosage: '1 Pill - 02:20 PM',
            instructions: ''
        },
        {
            id: 8,
            name: 'Docusate Oral',
            dosage: '100 mg every day at bedtime for constipation treatment',
            instructions: ''
        },
        {
            id: 9,
            name: 'Donepezil Oral',
            dosage: '10 mg every day at bedtime',
            instructions: ''
        },
        {
            id: 10,
            name: 'Losartan Oral',
            dosage: '100 mg every day',
            instructions: ''
        }
    ];

    // Update the mock data for inactive medications
    const inactiveMedications = [
        {
            id: 101,
            name: 'Metformin',
            dosage: '500 mg twice daily',
            instructions: 'Discontinued on Jan 15, 2023',
            discontinuedReason: 'Replaced with alternate therapy'
        },
        {
            id: 102,
            name: 'Lisinopril',
            dosage: '10 mg once daily',
            instructions: 'Discontinued on Mar 5, 2023',
            discontinuedReason: 'Side effects'
        },
        {
            id: 103,
            name: 'Atorvastatin',
            dosage: '20 mg once daily at bedtime',
            instructions: 'Discontinued on Feb 22, 2023',
            discontinuedReason: 'Not required anymore'
        },
        {
            id: 104,
            name: 'Levothyroxine',
            dosage: '50 mcg once daily on empty stomach',
            instructions: 'Discontinued on Apr 18, 2023',
            discontinuedReason: 'Dosage adjustment needed'
        },
        {
            id: 105,
            name: 'Omeprazole',
            dosage: '20 mg once daily before breakfast',
            instructions: 'Discontinued on May 3, 2023',
            discontinuedReason: 'Course completed'
        },
        {
            id: 106,
            name: 'Amoxicillin',
            dosage: '500 mg three times daily',
            instructions: 'Discontinued on Jan 30, 2023',
            discontinuedReason: 'Course completed'
        },
        {
            id: 107,
            name: 'Prednisone',
            dosage: '10 mg daily with taper',
            instructions: 'Discontinued on Feb 15, 2023',
            discontinuedReason: 'Course completed'
        },
        {
            id: 108,
            name: 'Sertraline',
            dosage: '50 mg daily',
            instructions: 'Discontinued on Mar 22, 2023',
            discontinuedReason: 'Switched to alternative'
        },
        {
            id: 109,
            name: 'Hydrochlorothiazide',
            dosage: '12.5 mg daily',
            instructions: 'Discontinued on Apr 10, 2023',
            discontinuedReason: 'Low blood pressure'
        },
        {
            id: 110,
            name: 'Montelukast',
            dosage: '10 mg daily at bedtime',
            instructions: 'Discontinued on May 5, 2023',
            discontinuedReason: 'Seasonal use only'
        },
        {
            id: 111,
            name: 'Gabapentin',
            dosage: '300 mg three times daily',
            instructions: 'Discontinued on Jan 20, 2023',
            discontinuedReason: 'Pain resolved'
        },
        {
            id: 112,
            name: 'Warfarin',
            dosage: '5 mg daily',
            instructions: 'Discontinued on Feb 28, 2023',
            discontinuedReason: 'Switched to DOAC'
        },
        {
            id: 113,
            name: 'Amlodipine',
            dosage: '5 mg daily',
            instructions: 'Discontinued on Mar 15, 2023',
            discontinuedReason: 'Blood pressure controlled with other medications'
        }
    ];

    const toggleMedicationView = () => {
        setShowActiveMedications(!showActiveMedications);
    };

    // Enhanced Allergies data with severity
    const allergies: Allergy[] = [
        {
            id: '1',
            name: 'Penicillin',
            reactions: ['Hives', 'Difficulty breathing'],
            severity: 'high',
            notes: 'Patient experienced anaphylaxis requiring emergency treatment.',
            onsetDate: 'June 15, 2010',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Peanuts',
            reactions: ['Skin rash', 'Swelling'],
            severity: 'moderate',
            notes: 'Avoid all nut products. Patient carries EpiPen.',
            onsetDate: 'August 3, 2015',
            status: 'Active'
        },
        {
            id: '3',
            name: 'Latex',
            reactions: ['Contact dermatitis'],
            severity: 'low',
            notes: 'Mild reaction to latex gloves.',
            onsetDate: 'January 22, 2020',
            status: 'Active'
        },
        {
            id: '4',
            name: 'Sulfa Drugs',
            reactions: ['Skin rash', 'Fever'],
            severity: 'moderate',
            notes: 'Developed after taking sulfamethoxazole.',
            onsetDate: 'March 11, 2018',
            status: 'Active'
        },
        {
            id: '5',
            name: 'Aspirin',
            reactions: ['Hives', 'Wheezing'],
            severity: 'moderate',
            notes: 'Cross-sensitivity with other NSAIDs is possible.',
            onsetDate: 'September 30, 2019',
            status: 'Inactive'
        }
    ];

    const handleBackToRecords = () => {
        setSelectedSection(null);
        setSelectedAllergy(null);
        setSelectedCondition(null);
        setSelectedImmunization(null);
        setSelectedFamilyMember(null);
        setSelectedLabResult(null);
        setSelectedProcedure(null);
        setSelectedImaging(null);
        setSearchQuery('');
        setFilterActive(null);
        setFilterImmunizationStatus(null);
        setLabResultCategoryFilter(null);
        setProcedureOutcomeFilter(null);
        setImagingModalityFilter(null);
    };

    const handleEditAllergy = (id: string) => {
        console.log(`Edit allergy with ID: ${id}`);
        // Here you would implement edit functionality
    };

    const handleDeleteAllergy = (id: string) => {
        console.log(`Delete allergy with ID: ${id}`);
        // Here you would implement delete functionality
    };

    const handleAddNewAllergy = () => {
        setOpenAddDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenAddDialog(false);
        // Reset form
        setNewAllergy({
            name: '',
            description: '',
            severity: 'moderate'
        });
    };

    const handleAllergyInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setNewAllergy({
            ...newAllergy,
            [name as string]: value
        });
    };

    const handleSeverityChange = (event: SelectChangeEvent<"high" | "low" | "moderate">) => {
        setNewAllergy({
            ...newAllergy,
            severity: event.target.value as "high" | "low" | "moderate"
        });
    };

    const handleSaveAllergy = () => {
        console.log('Saving new allergy:', newAllergy);
        // Here you would implement API call to save the allergy
        // For now, we'll just close the dialog
        handleCloseDialog();
    };

    // Add conditions data
    const conditions: Condition[] = [
        {
            id: 1,
            name: 'Heart valve disorder',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Heart structure',
            severity: 'Moderate',
            recordedDate: '2012-12-01',
            notes: 'Patient presents with mitral valve regurgitation. Regular monitoring required.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. Sarah Johnson',
            lastUpdated: '2023-05-15'
        },
        {
            id: 2,
            name: 'Malignant neoplastic',
            clinicalStatus: 'Inactive',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Entire head and neck',
            severity: 'Severe',
            recordedDate: '2012-12-01',
            notes: 'Successfully treated. Regular follow-ups scheduled for monitoring.',
            riskLevel: 'High',
            treatingPhysician: 'Dr. Michael Chen',
            lastUpdated: '2023-04-22'
        },
        {
            id: 3,
            name: 'Bacterial infectious',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Problem',
            bodySite: 'Pulmonary vascular',
            severity: 'Moderate',
            recordedDate: '2012-12-01',
            notes: 'Currently treating with antibiotics. Patient showing improvement.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. Jessica Williams',
            lastUpdated: '2023-06-10'
        },
        {
            id: 4,
            name: 'Bacterial sepsis',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Pulmonary vascular',
            severity: 'Moderate',
            recordedDate: '2012-12-01',
            notes: 'Managing with IV antibiotics. Close monitoring required.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. Jessica Williams',
            lastUpdated: '2023-06-05'
        },
        {
            id: 5,
            name: 'Chronic kidney disease',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Kidney structure',
            severity: 'Moderate',
            recordedDate: '2013-03-15',
            notes: 'Stage 2 CKD. Regular monitoring of kidney function and blood pressure.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. Robert Turner',
            lastUpdated: '2023-05-30'
        },
        {
            id: 6,
            name: 'Type 2 diabetes mellitus',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Entire body',
            severity: 'Moderate',
            recordedDate: '2014-09-22',
            notes: 'Well-controlled with oral medications and diet. HbA1c 6.8%.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. Sarah Johnson',
            lastUpdated: '2023-06-12'
        },
        {
            id: 7,
            name: 'Essential hypertension',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Cardiovascular system',
            severity: 'Mild',
            recordedDate: '2014-09-22',
            notes: 'Well-controlled with medication. Target BP < 140/90 mmHg.',
            riskLevel: 'Low',
            treatingPhysician: 'Dr. Sarah Johnson',
            lastUpdated: '2023-06-12'
        },
        {
            id: 8,
            name: 'Seasonal allergic rhinitis',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Nasal structure',
            severity: 'Mild',
            recordedDate: '2015-04-10',
            notes: 'Manageable with antihistamines during spring and summer.',
            riskLevel: 'Low',
            treatingPhysician: 'Dr. Lisa Martinez',
            lastUpdated: '2023-04-05'
        },
        {
            id: 9,
            name: 'Osteoarthritis',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: 'Knee joint',
            severity: 'Moderate',
            recordedDate: '2016-11-18',
            notes: 'Manageable with pain medication and physical therapy. Recommending weight management.',
            riskLevel: 'Medium',
            treatingPhysician: 'Dr. James Peterson',
            lastUpdated: '2023-05-25'
        },
        {
            id: 10,
            name: 'Gastroesophageal reflux disease',
            clinicalStatus: 'Inactive',
            category: 'Diagnosis',
            verificationStatus: 'Problem',
            bodySite: 'Esophageal structure',
            severity: 'Mild',
            recordedDate: '2017-08-03',
            notes: 'Previously treated with PPIs. Currently managed with lifestyle modifications.',
            riskLevel: 'Low',
            treatingPhysician: 'Dr. Robert Turner',
            lastUpdated: '2023-01-15'
        }
    ];

    // Filter and search conditions
    const filteredConditions = conditions.filter(condition => {
        const matchesSearch = condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            condition.bodySite.toLowerCase().includes(searchQuery.toLowerCase());

        if (filterActive === null) {
            return matchesSearch;
        }

        return matchesSearch && (filterActive ? condition.clinicalStatus === 'Active' : condition.clinicalStatus === 'Inactive');
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterClick = (active: boolean | null) => {
        setFilterActive(active);
    };

    const handleConditionClick = (condition: Condition) => {
        setSelectedCondition(condition);
    };

    const handleBackToConditions = () => {
        setSelectedCondition(null);
    };

    // Add immunizations data
    const immunizations: Immunization[] = [
        {
            id: '1',
            name: 'COVID-19',
            type: 'mRNA Vaccine (Pfizer-BioNTech)',
            date: 'May 15, 2023',
            status: 'Active',
            manufacturer: 'Pfizer Inc.',
            lotNumber: 'EL0725',
            administeredBy: 'Dr. Sarah Johnson',
            location: 'Community Health Clinic',
            notes: 'Patient tolerated the vaccine well with no immediate adverse reactions. This was the second booster dose.'
        },
        {
            id: '2',
            name: 'Influenza (Seasonal Flu)',
            type: 'Quadrivalent Inactivated Vaccine',
            date: 'October 10, 2023',
            status: 'Active',
            manufacturer: 'Sanofi Pasteur',
            lotNumber: 'UJ349A2',
            administeredBy: 'Nurse William Chen',
            location: 'Workplace Vaccination Program'
        },
        {
            id: '3',
            name: 'Hepatitis B',
            type: 'Recombinant Vaccine',
            date: 'January 5, 2020',
            status: 'Active',
            manufacturer: 'Merck & Co.',
            lotNumber: 'HBV78923',
            administeredBy: 'Dr. Michael Rodriguez',
            location: 'University Health Services'
        },
        {
            id: '4',
            name: 'Tetanus, Diphtheria, & Pertussis (Tdap)',
            type: 'Toxoid Vaccine',
            date: 'June 12, 2018',
            status: 'Expired',
            manufacturer: 'GSK',
            lotNumber: 'TD56789',
            administeredBy: 'Dr. Emily Davis',
            location: 'Family Medicine Associates',
            notes: 'Due for renewal. CDC recommends Tdap booster every 10 years.'
        },
        {
            id: '5',
            name: 'Shingles (Herpes Zoster)',
            type: 'Recombinant Vaccine (Shingrix)',
            date: 'August 3, 2024',
            status: 'Scheduled',
            location: 'Community Health Center'
        },
        {
            id: '6',
            name: 'Pneumococcal',
            type: 'Conjugate Vaccine (PCV13)',
            date: 'March 21, 2022',
            status: 'Active',
            manufacturer: 'Pfizer Inc.',
            lotNumber: 'PCN45678',
            administeredBy: 'Dr. Lisa Thompson',
            location: 'Geriatric Health Partners'
        },
        {
            id: '7',
            name: 'Varicella (Chickenpox)',
            type: 'Live Attenuated Vaccine',
            date: 'September 8, 2019',
            status: 'Active',
            manufacturer: 'Merck & Co.',
            lotNumber: 'VAR34521',
            administeredBy: 'Dr. Thomas Wilson',
            location: 'City Medical Group'
        },
        {
            id: '8',
            name: 'Hepatitis A',
            type: 'Inactivated Vaccine',
            date: 'July 11, 2024',
            status: 'Scheduled',
            location: 'Travel Medicine Clinic',
            notes: 'Pre-travel immunization for international trip.'
        }
    ];

    // Add handler functions for immunizations after the handleBackToConditions function
    const handleImmunizationClick = (immunization: Immunization) => {
        setSelectedImmunization(immunization);
    };

    const handleBackToImmunizations = () => {
        setSelectedImmunization(null);
    };

    const handleAddImmunization = () => {
        setNewImmunization({
            id: '',
            name: '',
            type: '',
            date: '',
            status: 'Active'
        });
        setOpenAddImmunizationDialog(true);
    };

    const handleCloseImmunizationDialog = () => {
        setOpenAddImmunizationDialog(false);
    };

    const handleImmunizationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewImmunization((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImmunizationStatusChange = (event: SelectChangeEvent) => {
        setNewImmunization((prev) => ({
            ...prev,
            status: event.target.value as 'Active' | 'Expired' | 'Scheduled'
        }));
    };

    const handleSaveImmunization = () => {
        console.log('New immunization saved:', newImmunization);
        // In a real application, you would save this to your backend
        setOpenAddImmunizationDialog(false);
    };

    const handleFilterImmunizationStatus = (status: 'Active' | 'Expired' | 'Scheduled' | null) => {
        setFilterImmunizationStatus(status);
    };

    const handleChangeImmunizationViewMode = (mode: 'list' | 'calendar' | 'overdue') => {
        setImmunizationViewMode(mode);
    };

    // Filter immunizations based on search and status
    const filteredImmunizations = immunizations.filter((immunization) => {
        // Apply search filter
        const matchesSearch = searchQuery
            ? immunization.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            immunization.type.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        // Apply status filter
        const matchesStatus = filterImmunizationStatus
            ? immunization.status === filterImmunizationStatus
            : true;

        return matchesSearch && matchesStatus;
    });

    // Add these handlers after the other handlers
    const handleFamilyMemberClick = (familyMember: FamilyMember) => {
        setSelectedFamilyMember(familyMember);
    };

    const handleBackToFamilyHistory = () => {
        setSelectedFamilyMember(null);
    };

    const handleAddFamilyMember = () => {
        setNewFamilyMember({
            id: '',
            name: '',
            gender: 'Male',
            age: '',
            relationship: 'Other',
            heartDisease: 0,
            bloodGlucoseLevel: 0,
            diabetes: 0,
            hba1cLevel: 0
        });
        setOpenAddFamilyMemberDialog(true);
    };

    const handleCloseFamilyMemberDialog = () => {
        setOpenAddFamilyMemberDialog(false);
    };

    const handleFamilyMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFamilyMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRelationshipChange = (event: SelectChangeEvent) => {
        setNewFamilyMember(prev => ({
            ...prev,
            relationship: event.target.value as FamilyMember['relationship']
        }));
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setNewFamilyMember(prev => ({
            ...prev,
            gender: event.target.value as 'Male' | 'Female'
        }));
    };

    const handleNumberInputChange = (field: keyof FamilyMember) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setNewFamilyMember(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSaveFamilyMember = () => {
        console.log('New family member saved:', newFamilyMember);
        // In a real application, you would save this to your backend
        setOpenAddFamilyMemberDialog(false);
    };

    // Add after other handler functions
    const handleLabResultClick = (labResult: LabResult) => {
        setSelectedLabResult(labResult);
    };

    const handleBackToLabResults = () => {
        setSelectedLabResult(null);
    };

    const handleAddLabResult = () => {
        setNewLabResult({
            id: '',
            name: '',
            value: '',
            status: 'normal',
            unit: '',
            referenceRange: '',
            date: new Date().toISOString().split('T')[0],
            category: '',
            notes: ''
        });
        setOpenAddLabResultDialog(true);
    };

    const handleCloseLabResultDialog = () => {
        setOpenAddLabResultDialog(false);
    };

    const handleLabResultInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLabResult(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLabResultStatusChange = (event: SelectChangeEvent) => {
        setNewLabResult(prev => ({
            ...prev,
            status: event.target.value as 'normal' | 'abnormal' | 'pending'
        }));
    };

    const handleSaveLabResult = () => {
        console.log('New lab result saved:', newLabResult);
        // In a real application, you would save this to your backend
        setOpenAddLabResultDialog(false);
    };

    const handleFilterLabResultCategory = (category: string | null) => {
        setLabResultCategoryFilter(category);
    };

    // Add these handler functions after the labResults handler functions
    const handleProcedureClick = (procedure: Procedure) => {
        setSelectedProcedure(procedure);
    };

    const handleBackToProcedures = () => {
        setSelectedProcedure(null);
    };

    const handleAddProcedure = () => {
        setNewProcedure({
            id: '',
            name: '',
            performer: '',
            bodySite: '',
            outcome: 'Successful',
            status: 'Completed',
            datePerformed: new Date().toISOString().split('T')[0],
            notes: ''
        });
        setOpenAddProcedureDialog(true);
    };

    const handleCloseProcedureDialog = () => {
        setOpenAddProcedureDialog(false);
    };

    const handleProcedureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProcedure(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProcedureOutcomeChange = (event: SelectChangeEvent) => {
        setNewProcedure(prev => ({
            ...prev,
            outcome: event.target.value as 'Successful' | 'Unsuccessful' | 'Pending'
        }));
    };

    const handleProcedureStatusChange = (event: SelectChangeEvent) => {
        setNewProcedure(prev => ({
            ...prev,
            status: event.target.value as 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled'
        }));
    };

    const handleSaveProcedure = () => {
        console.log('New procedure saved:', newProcedure);
        // In a real application, you would save this to your backend
        setOpenAddProcedureDialog(false);
    };

    // Add after other styled components like StatusBadge
    const ProcedureStatusBadge = styled(Box)<{ status: 'Successful' | 'Unsuccessful' | 'Pending' | 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled' }>(({ theme, status }) => {
        let backgroundColor = '';
        let textColor = '';

        if (status === 'Successful' || status === 'Completed') {
            backgroundColor = theme.palette.mode === 'light' ? '#E6F4EA' : '#0F3D1F';
            textColor = theme.palette.mode === 'light' ? '#1D8649' : '#81C995';
        } else if (status === 'Unsuccessful') {
            backgroundColor = theme.palette.mode === 'light' ? '#FCE7E7' : '#4D1414';
            textColor = theme.palette.mode === 'light' ? '#D83232' : '#E67C73';
        } else if (status === 'Pending' || status === 'In Progress') {
            backgroundColor = theme.palette.mode === 'light' ? '#FFF7E6' : '#4D3A14';
            textColor = theme.palette.mode === 'light' ? '#F29D38' : '#FDBE60';
        } else if (status === 'Scheduled') {
            backgroundColor = theme.palette.mode === 'light' ? '#E3F2FD' : '#0D3B66';
            textColor = theme.palette.mode === 'light' ? '#1A73E8' : '#90CAF9';
        } else if (status === 'Cancelled') {
            backgroundColor = theme.palette.mode === 'light' ? '#F5F5F5' : '#333333';
            textColor = theme.palette.mode === 'light' ? '#757575' : '#9E9E9E';
        }

        return {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor,
            color: textColor,
        };
    });

    // Add a new handler function for procedure filtering
    const handleFilterProcedureOutcome = (outcome: 'Successful' | 'Unsuccessful' | 'Pending' | null) => {
        setProcedureOutcomeFilter(outcome);
    };

    // Add these new styled components for the timeline
    const TimelineContainer = styled(Box)(({ theme }) => ({
        position: 'relative',
        margin: '30px 0',
        padding: '20px 0',
    }));

    const TimelineLine = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        backgroundColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
        transform: 'translateX(-50%)',
    }));

    const TimelineItem = styled(Box)(({ theme }) => ({
        position: 'relative',
        padding: '0 30px 30px 30px',
        '&:last-child': {
            paddingBottom: 0,
        },
    }));

    const TimelineDate = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '6px 10px',
        backgroundColor: theme.palette.mode === 'light' ? '#21647D' : '#1E3D5A',
        color: '#FFFFFF',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        zIndex: 2,
    }));

    const TimelineContent = styled(Box)(({ theme }) => ({
        position: 'relative',
        padding: '16px',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
        border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        marginTop: '30px',
    }));

    const TimelineDot = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: '30px',
        left: '50%',
        width: '16px',
        height: '16px',
        backgroundColor: theme.palette.mode === 'light' ? '#21647D' : '#64B5F6',
        borderRadius: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
    }));

    // Add handler functions for imaging after the procedure handler functions
    const handleImagingClick = (imaging: Imaging) => {
        setSelectedImaging(imaging);
    };

    const handleBackToImaging = () => {
        setSelectedImaging(null);
    };

    const handleAddImaging = () => {
        setNewImaging({
            id: '',
            name: '',
            modality: 'MRI',
            bodyPart: '',
            date: new Date().toISOString().split('T')[0],
            physician: '',
            facility: '',
            status: 'Completed',
            images: [],
            notes: ''
        });
        setImagingFiles([]);
        setOpenAddImagingDialog(true);
    };

    const handleCloseImagingDialog = () => {
        setOpenAddImagingDialog(false);
    };

    const handleImagingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewImaging(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImagingModalityChange = (event: SelectChangeEvent) => {
        setNewImaging(prev => ({
            ...prev,
            modality: event.target.value as Imaging['modality']
        }));
    };

    const handleImagingStatusChange = (event: SelectChangeEvent) => {
        setNewImaging(prev => ({
            ...prev,
            status: event.target.value as 'Completed' | 'Pending' | 'Scheduled'
        }));
    };

    const handleImagingFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImagingFiles(prev => [...prev, ...filesArray]);
        }
    };

    const handleRemoveImagingFile = (index: number) => {
        setImagingFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveImaging = () => {
        console.log('New imaging saved:', newImaging);
        console.log('Imaging files to upload:', imagingFiles);
        // In a real application, you would upload the files and save the imaging data
        setOpenAddImagingDialog(false);
    };

    const handleFilterImagingModality = (modality: Imaging['modality'] | null) => {
        setImagingModalityFilter(modality);
    };

    // Add after the ProcedureStatusBadge component
    const ImagingStatusBadge = styled(Box)<{ status: 'Completed' | 'Pending' | 'Scheduled' }>(({ theme, status }) => {
        let backgroundColor = '';
        let textColor = '';

        if (status === 'Completed') {
            backgroundColor = theme.palette.mode === 'light' ? '#E6F4EA' : '#0F3D1F';
            textColor = theme.palette.mode === 'light' ? '#1D8649' : '#81C995';
        } else if (status === 'Pending') {
            backgroundColor = theme.palette.mode === 'light' ? '#FFF7E6' : '#4D3A14';
            textColor = theme.palette.mode === 'light' ? '#F29D38' : '#FDBE60';
        } else if (status === 'Scheduled') {
            backgroundColor = theme.palette.mode === 'light' ? '#E3F2FD' : '#0D3B66';
            textColor = theme.palette.mode === 'light' ? '#1A73E8' : '#90CAF9';
        }

        return {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor,
            color: textColor,
        };
    });

    // Add after the TimelineContent styled component
    const ImagingCard = styled(Box)(({ theme }) => ({
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
        border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
    }));

    const ImagingInfo = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
    }));

    const ImagingTitle = styled(Typography)(({ theme }) => ({
        fontWeight: 600,
        fontSize: '16px',
        color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
        marginBottom: theme.spacing(1),
    }));

    const ImagingDetail = styled(Typography)(({ theme }) => ({
        fontSize: '14px',
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        marginBottom: theme.spacing(0.5),
    }));

    const DicomUploadBox = styled(Box)(({ theme }) => ({
        border: `2px dashed ${theme.palette.mode === 'light' ? '#D6E4EC' : '#444'}`,
        borderRadius: '8px',
        padding: theme.spacing(3),
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : 'rgba(43, 43, 43, 0.5)',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#EBF4F8' : '#333',
        },
    }));

    const FileInput = styled('input')({
        display: 'none',
    });

    // Add this mock imaging data after the procedures array
    const imagingStudies: Imaging[] = [
        {
            id: '1',
            name: 'Brain MRI',
            modality: 'MRI',
            bodyPart: 'Brain',
            date: '2023-03-15',
            physician: 'Dr. Sarah Reynolds',
            facility: 'General Hospital',
            status: 'Completed',
            findings: 'No abnormalities detected in the brain parenchyma. Ventricles are of normal size and configuration. No evidence of mass effect or midline shift. No acute infarct or hemorrhage.',
            impression: 'Normal brain MRI study.',
            images: [
                {
                    thumbnail: '/images/brain-imaging.png',
                    fullSize: '/images/brain-imaging.png',
                    dicom: '/dicom/brain-mri.dcm'
                }
            ],
            notes: 'Patient tolerated the procedure well. No contrast was used.',
            urgency: 'Routine',
            followUpRequired: false
        },
        {
            id: '2',
            name: 'Chest X-Ray',
            modality: 'X-Ray',
            bodyPart: 'Chest',
            date: '2023-04-02',
            physician: 'Dr. James Wilson',
            facility: 'City Medical Center',
            status: 'Completed',
            findings: 'Lungs are clear bilaterally. No focal consolidation, pneumothorax, or pleural effusion. Heart size is normal. No hilar lymphadenopathy.',
            impression: 'Normal chest X-ray.',
            images: [
                {
                    thumbnail: '/images/chest-xray-thumb.png',
                    fullSize: '/images/chest-xray.png',
                    dicom: '/dicom/chest-xray.dcm'
                }
            ],
            notes: 'Routine annual examination.',
            urgency: 'Routine',
            followUpRequired: false
        },
        {
            id: '3',
            name: 'Abdominal CT Scan',
            modality: 'CT',
            bodyPart: 'Abdomen',
            date: '2023-05-20',
            physician: 'Dr. Emma Rodriguez',
            facility: 'General Hospital',
            status: 'Completed',
            findings: 'Liver, spleen, pancreas, adrenals, and kidneys appear normal. No intra-abdominal lymphadenopathy. No free fluid or free air.',
            impression: 'Unremarkable CT of the abdomen.',
            images: [
                {
                    thumbnail: '/images/abdominal-ct-thumb.png',
                    fullSize: '/images/abdominal-ct.png',
                    dicom: '/dicom/abdominal-ct.dcm'
                }
            ],
            notes: 'Performed with IV contrast.',
            urgency: 'Routine',
            followUpRequired: false
        }
    ];

    // Handler for opening the Add Condition dialog
    const handleAddCondition = () => {
        setOpenAddConditionDialog(true);
    };

    // Handler for closing the Add Condition dialog
    const handleCloseConditionDialog = () => {
        setOpenAddConditionDialog(false);
        // Reset form
        setNewCondition({
            id: 0,
            name: '',
            clinicalStatus: 'Active',
            category: 'Diagnosis',
            verificationStatus: 'Confirmed',
            bodySite: '',
            severity: 'Moderate',
            recordedDate: new Date().toISOString().split('T')[0]
        });
    };

    // Handler for condition input changes
    const handleConditionInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setNewCondition({
            ...newCondition,
            [name as string]: value
        });
    };

    // Handler for category change
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setNewCondition({
            ...newCondition,
            category: event.target.value
        });
    };

    // Handler for condition status change
    const handleConditionStatusChange = (event: SelectChangeEvent) => {
        setNewCondition({
            ...newCondition,
            clinicalStatus: event.target.value as 'Active' | 'Inactive'
        });
    };

    // Handler for verification status change
    const handleVerificationStatusChange = (event: SelectChangeEvent) => {
        setNewCondition({
            ...newCondition,
            verificationStatus: event.target.value as 'Confirmed' | 'Problem'
        });
    };

    // Handler for severity change
    const handleConditionSeverityChange = (event: SelectChangeEvent) => {
        setNewCondition({
            ...newCondition,
            severity: event.target.value as 'Severe' | 'Moderate' | 'Mild'
        });
    };

    // Handler for saving the new condition
    const handleSaveCondition = () => {
        console.log('Saving new condition:', newCondition);
        // Here you would implement API call to save the condition
        // For now, we'll just close the dialog
        handleCloseConditionDialog();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'hidden',
                height: 'calc(100vh - 64px)',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1A1A1A',
            }}
        >
            <RecordsContainer
                sx={{
                    minWidth: '85vw'
                }}
            >
                {/* Page Title */}
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: mode === 'light' ? '#21647D' : '#FFFFFF'
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
                        <StyledTabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                            <Tab label="Medical History" value={0} />
                            <Tab label="Medical Record" value={1} />
                            <Tab label="Medications" value={2} />
                        </StyledTabs>

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

                    {/* Medical Record Tab Content - Updated with Conditions section */}
                    <TabPanel value={tabValue} index={1}>
                        {selectedSection === 'immunizations' ? (
                            // Immunizations detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedImmunization && (
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Box sx={{ display: 'flex', mr: 2 }}>
                                                <Button
                                                    variant={immunizationViewMode === 'list' ? 'contained' : 'outlined'}
                                                    sx={{
                                                        borderRadius: '4px 0 0 4px',
                                                        borderRight: 0,
                                                        backgroundColor: immunizationViewMode === 'list' ? '#21647D' : 'transparent',
                                                        color: immunizationViewMode === 'list' ? '#FFFFFF' : '#21647D',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: immunizationViewMode === 'list' ? '#1a5268' : 'rgba(33, 100, 125, 0.04)',
                                                        },
                                                    }}
                                                    onClick={() => handleChangeImmunizationViewMode('list')}
                                                >
                                                    List View
                                                </Button>
                                                <Button
                                                    variant={immunizationViewMode === 'calendar' ? 'contained' : 'outlined'}
                                                    sx={{
                                                        borderRadius: '0',
                                                        borderLeft: 0,
                                                        borderRight: 0,
                                                        backgroundColor: immunizationViewMode === 'calendar' ? '#21647D' : 'transparent',
                                                        color: immunizationViewMode === 'calendar' ? '#FFFFFF' : '#21647D',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: immunizationViewMode === 'calendar' ? '#1a5268' : 'rgba(33, 100, 125, 0.04)',
                                                        },
                                                    }}
                                                    onClick={() => handleChangeImmunizationViewMode('calendar')}
                                                >
                                                    Calendar
                                                </Button>
                                                <Button
                                                    variant={immunizationViewMode === 'overdue' ? 'contained' : 'outlined'}
                                                    sx={{
                                                        borderRadius: '0 4px 4px 0',
                                                        borderLeft: 0,
                                                        backgroundColor: immunizationViewMode === 'overdue' ? '#21647D' : 'transparent',
                                                        color: immunizationViewMode === 'overdue' ? '#FFFFFF' : '#21647D',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: immunizationViewMode === 'overdue' ? '#1a5268' : 'rgba(33, 100, 125, 0.04)',
                                                        },
                                                    }}
                                                    onClick={() => handleChangeImmunizationViewMode('overdue')}
                                                >
                                                    Overdue
                                                </Button>
                                            </Box>
                                            <SearchInput
                                                placeholder="Search immunizations..."
                                                variant="outlined"
                                                size="small"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImmunizationStatus(filterImmunizationStatus === 'Active' ? null : 'Active')}
                                                sx={{
                                                    backgroundColor: filterImmunizationStatus === 'Active' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Active
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImmunizationStatus(filterImmunizationStatus === 'Expired' ? null : 'Expired')}
                                                sx={{
                                                    backgroundColor: filterImmunizationStatus === 'Expired' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Expired
                                            </FilterButton>
                                            <AddButton
                                                startIcon={<PlusIcon />}
                                                onClick={handleAddImmunization}
                                            >
                                                Add Immunization
                                            </AddButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Immunizations header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ImmunizationsIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedImmunization ? selectedImmunization.name : 'Immunizations'}
                                    </Typography>
                                    {selectedImmunization && selectedImmunization.status && (
                                        <ImmunizationBadge
                                            status={selectedImmunization.status}
                                            label={selectedImmunization.status}
                                        />
                                    )}
                                </Box>

                                {selectedImmunization ? (
                                    // Immunization detail view
                                    <Box>
                                        <InfoCard>
                                            <InfoCardTitle>Immunization Details</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Name:</InfoLabel>
                                                <InfoValue>{selectedImmunization.name}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Type:</InfoLabel>
                                                <InfoValue>{selectedImmunization.type}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Date:</InfoLabel>
                                                <InfoValue>{selectedImmunization.date}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Status:</InfoLabel>
                                                <InfoValue>
                                                    <ImmunizationBadge
                                                        status={selectedImmunization.status}
                                                        label={selectedImmunization.status}
                                                    />
                                                </InfoValue>
                                            </InfoItem>
                                            {selectedImmunization.nextDoseDate && (
                                                <InfoItem>
                                                    <InfoLabel>Next Dose:</InfoLabel>
                                                    <InfoValue>{selectedImmunization.nextDoseDate}</InfoValue>
                                                </InfoItem>
                                            )}
                                        </InfoCard>

                                        {(selectedImmunization.manufacturer || selectedImmunization.lotNumber || selectedImmunization.administeredBy || selectedImmunization.location) && (
                                            <InfoCard>
                                                <InfoCardTitle>Administration Details</InfoCardTitle>
                                                {selectedImmunization.manufacturer && (
                                                    <InfoItem>
                                                        <InfoLabel>Manufacturer:</InfoLabel>
                                                        <InfoValue>{selectedImmunization.manufacturer}</InfoValue>
                                                    </InfoItem>
                                                )}
                                                {selectedImmunization.lotNumber && (
                                                    <InfoItem>
                                                        <InfoLabel>Lot Number:</InfoLabel>
                                                        <InfoValue>{selectedImmunization.lotNumber}</InfoValue>
                                                    </InfoItem>
                                                )}
                                                {selectedImmunization.administeredBy && (
                                                    <InfoItem>
                                                        <InfoLabel>Administered By:</InfoLabel>
                                                        <InfoValue>{selectedImmunization.administeredBy}</InfoValue>
                                                    </InfoItem>
                                                )}
                                                {selectedImmunization.location && (
                                                    <InfoItem>
                                                        <InfoLabel>Location:</InfoLabel>
                                                        <InfoValue>{selectedImmunization.location}</InfoValue>
                                                    </InfoItem>
                                                )}
                                            </InfoCard>
                                        )}

                                        {selectedImmunization.notes && (
                                            <InfoCard>
                                                <InfoCardTitle>Notes</InfoCardTitle>
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                    lineHeight: 1.6
                                                }}>
                                                    {selectedImmunization.notes}
                                                </Typography>
                                            </InfoCard>
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            {selectedImmunization.status !== 'Expired' && (
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        borderColor: '#E16A6A',
                                                        color: '#E16A6A',
                                                        textTransform: 'none',
                                                        mr: 2,
                                                        '&:hover': {
                                                            borderColor: '#d32f2f',
                                                            backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                        },
                                                    }}
                                                >
                                                    Mark as Expired
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit Immunization
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Immunizations list view
                                    <>
                                        {immunizationViewMode === 'list' ? (
                                            <ImmunizationContainer>
                                                {filteredImmunizations.length > 0 ? (
                                                    filteredImmunizations.map((immunization) => (
                                                        <ImmunizationItem
                                                            key={immunization.id}
                                                            onClick={() => handleImmunizationClick(immunization)}
                                                        >
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                <Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <ImmunizationName>{immunization.name}</ImmunizationName>
                                                                        {immunization.status && (
                                                                            <ImmunizationBadge
                                                                                status={immunization.status}
                                                                                label={immunization.status}
                                                                            />
                                                                        )}
                                                                    </Box>
                                                                    {immunization.type && (
                                                                        <ImmunizationInfo sx={{ mb: 0.5 }}>{immunization.type}</ImmunizationInfo>
                                                                    )}
                                                                    <ImmunizationInfo>
                                                                        {immunization.status === 'Scheduled'
                                                                            ? `Scheduled for: ${immunization.date}`
                                                                            : `Administered: ${immunization.date}`}
                                                                    </ImmunizationInfo>
                                                                </Box>
                                                                <ChevronIcon style={{ color: mode === 'light' ? '#267997' : '#B8C7CC' }} />
                                                            </Box>
                                                        </ImmunizationItem>
                                                    ))
                                                ) : (
                                                    <Box sx={{ p: 3, textAlign: 'center' }}>
                                                        <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            No immunizations found matching your search criteria.
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </ImmunizationContainer>
                                        ) : immunizationViewMode === 'calendar' ? (
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="h6" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 2 }}>
                                                    Calendar View Coming Soon
                                                </Typography>
                                                <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    The immunization calendar view is currently in development.
                                                </Typography>
                                            </Box>
                                        ) : (
                                            // Overdue view
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                    Overdue Immunizations
                                                </Typography>
                                                <ImmunizationContainer>
                                                    {immunizations.filter(i => i.status === 'Expired').length > 0 ? (
                                                        immunizations
                                                            .filter(i => i.status === 'Expired')
                                                            .map((immunization) => (
                                                                <ImmunizationItem
                                                                    key={immunization.id}
                                                                    onClick={() => handleImmunizationClick(immunization)}
                                                                >
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                        <Box>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                                <ImmunizationName>{immunization.name}</ImmunizationName>
                                                                                <ImmunizationBadge
                                                                                    status="Expired"
                                                                                    label="Needs Renewal"
                                                                                />
                                                                            </Box>
                                                                            {immunization.type && (
                                                                                <ImmunizationInfo sx={{ mb: 0.5 }}>{immunization.type}</ImmunizationInfo>
                                                                            )}
                                                                            <ImmunizationInfo>Last dose: {immunization.date}</ImmunizationInfo>
                                                                        </Box>
                                                                        <Button
                                                                            variant="outlined"
                                                                            size="small"
                                                                            sx={{
                                                                                color: '#21647D',
                                                                                borderColor: '#21647D',
                                                                                textTransform: 'none',
                                                                                '&:hover': {
                                                                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                                                                },
                                                                            }}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleAddImmunization();
                                                                            }}
                                                                        >
                                                                            Schedule Renewal
                                                                        </Button>
                                                                    </Box>
                                                                </ImmunizationItem>
                                                            ))
                                                    ) : (
                                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                                No overdue immunizations found. You're up to date!
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </ImmunizationContainer>

                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                    Upcoming Immunizations
                                                </Typography>
                                                <ImmunizationContainer>
                                                    {immunizations.filter(i => i.status === 'Scheduled').length > 0 ? (
                                                        immunizations
                                                            .filter(i => i.status === 'Scheduled')
                                                            .map((immunization) => (
                                                                <ImmunizationItem
                                                                    key={immunization.id}
                                                                    onClick={() => handleImmunizationClick(immunization)}
                                                                >
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                        <Box>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                                <ImmunizationName>{immunization.name}</ImmunizationName>
                                                                                <ImmunizationBadge
                                                                                    status="Scheduled"
                                                                                    label="Scheduled"
                                                                                />
                                                                            </Box>
                                                                            {immunization.type && (
                                                                                <ImmunizationInfo sx={{ mb: 0.5 }}>{immunization.type}</ImmunizationInfo>
                                                                            )}
                                                                            <ImmunizationInfo>Scheduled for: {immunization.date}</ImmunizationInfo>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Button
                                                                                variant="outlined"
                                                                                size="small"
                                                                                sx={{
                                                                                    color: '#E16A6A',
                                                                                    borderColor: '#E16A6A',
                                                                                    textTransform: 'none',
                                                                                    mr: 1,
                                                                                    '&:hover': {
                                                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                                                    },
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                }}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                            <Button
                                                                                variant="outlined"
                                                                                size="small"
                                                                                sx={{
                                                                                    color: '#21647D',
                                                                                    borderColor: '#21647D',
                                                                                    textTransform: 'none',
                                                                                    '&:hover': {
                                                                                        backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                                                                    },
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                }}
                                                                            >
                                                                                Reschedule
                                                                            </Button>
                                                                        </Box>
                                                                    </Box>
                                                                </ImmunizationItem>
                                                            ))
                                                    ) : (
                                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                                            <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                                No upcoming immunizations scheduled.
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </ImmunizationContainer>
                                            </Box>
                                        )}

                                        {/* Immunization guidelines */}
                                        <Box sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            borderRadius: '12px',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1
                                            }}>
                                                About Immunizations
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7
                                            }}>
                                                Immunizations are an important part of your preventive healthcare. They help protect you from serious diseases and
                                                contribute to overall community health. Regular immunizations according to recommended schedules
                                                help ensure you remain protected throughout your life. Consult with your healthcare provider about
                                                which vaccines are appropriate for you based on your age, health status, and risk factors.
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        ) : selectedSection === 'conditions' ? (
                            // Conditions detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedCondition && (
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <SearchInput
                                                placeholder="Search conditions..."
                                                variant="outlined"
                                                size="small"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterClick(filterActive === true ? null : true)}
                                                sx={{
                                                    backgroundColor: filterActive === true ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Active
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterClick(filterActive === false ? null : false)}
                                                sx={{
                                                    backgroundColor: filterActive === false ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Inactive
                                            </FilterButton>
                                            <AddButton
                                                startIcon={<PlusIcon />}
                                                onClick={handleAddCondition}
                                            >
                                                Add Condition
                                            </AddButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Conditions header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ConditionsIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedCondition ? selectedCondition.name : 'Conditions'}
                                    </Typography>
                                </Box>

                                {selectedCondition ? (
                                    // Condition detail view
                                    <Box>
                                        <InfoCard>
                                            <InfoCardTitle>Condition Details</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Name:</InfoLabel>
                                                <InfoValue>{selectedCondition.name}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Clinical Status:</InfoLabel>
                                                <InfoValue>
                                                    <StatusBadge status={selectedCondition.clinicalStatus}>
                                                        {selectedCondition.clinicalStatus}
                                                    </StatusBadge>
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Category:</InfoLabel>
                                                <InfoValue>{selectedCondition.category}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Verification Status:</InfoLabel>
                                                <InfoValue>
                                                    <StatusBadge status={selectedCondition.verificationStatus}>
                                                        {selectedCondition.verificationStatus}
                                                    </StatusBadge>
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Body Site:</InfoLabel>
                                                <InfoValue>{selectedCondition.bodySite}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Severity:</InfoLabel>
                                                <InfoValue sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <SeverityIndicator severity={selectedCondition.severity} />
                                                    {selectedCondition.severity}
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Recorded Date:</InfoLabel>
                                                <InfoValue>{selectedCondition.recordedDate}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoCardTitle>Additional Information</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Risk Level:</InfoLabel>
                                                <InfoValue>{selectedCondition.riskLevel || 'Not specified'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Treating Physician:</InfoLabel>
                                                <InfoValue>{selectedCondition.treatingPhysician || 'Not assigned'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Last Updated:</InfoLabel>
                                                <InfoValue>{selectedCondition.lastUpdated || 'Not available'}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoCardTitle>Clinical Notes</InfoCardTitle>
                                            <Typography sx={{
                                                fontSize: '14px',
                                                color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                lineHeight: 1.6
                                            }}>
                                                {selectedCondition.notes || 'No clinical notes available.'}
                                            </Typography>
                                        </InfoCard>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#E16A6A',
                                                    color: '#E16A6A',
                                                    textTransform: 'none',
                                                    mr: 2,
                                                    '&:hover': {
                                                        borderColor: '#d32f2f',
                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                    },
                                                }}
                                            >
                                                Archive Condition
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit Condition
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Conditions list view (table)
                                    <ConditionsTableContainer>
                                        <TableHead>
                                            <TableHeadCell>Name <SortIcon style={{ marginLeft: '4px' }} /></TableHeadCell>
                                            <TableHeadCell>Clinical Status</TableHeadCell>
                                            <TableHeadCell>Category</TableHeadCell>
                                            <TableHeadCell>Verification Status</TableHeadCell>
                                            <TableHeadCell>Body Site</TableHeadCell>
                                            <TableHeadCell>Severity</TableHeadCell>
                                            <TableHeadCell>Recorded Date</TableHeadCell>
                                        </TableHead>

                                        {filteredConditions.length > 0 ? (
                                            filteredConditions.map((condition) => (
                                                <TableRow
                                                    key={condition.id}
                                                    onClick={() => handleConditionClick(condition)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell sx={{ fontWeight: 500 }}>{condition.name}</TableCell>
                                                    <TableCell>
                                                        <StatusBadge status={condition.clinicalStatus}>
                                                            {condition.clinicalStatus}
                                                        </StatusBadge>
                                                    </TableCell>
                                                    <TableCell>{condition.category}</TableCell>
                                                    <TableCell>
                                                        <StatusBadge status={condition.verificationStatus}>
                                                            {condition.verificationStatus}
                                                        </StatusBadge>
                                                    </TableCell>
                                                    <TableCell>{condition.bodySite}</TableCell>
                                                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <SeverityIndicator severity={condition.severity} />
                                                        {condition.severity}
                                                    </TableCell>
                                                    <TableCell>{condition.recordedDate}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                                <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    No conditions found matching your search criteria.
                                                </Typography>
                                            </Box>
                                        )}
                                    </ConditionsTableContainer>
                                )}

                                {/* About Conditions Section */}
                                <Box sx={{
                                    mt: 4,
                                    p: 3,
                                    backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                    border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    borderRadius: '12px',
                                }}>
                                    <Typography variant="subtitle1" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        mb: 1
                                    }}>
                                        About Conditions
                                    </Typography>
                                    <Typography sx={{
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        fontSize: '14px',
                                        lineHeight: 1.7
                                    }}>
                                        Medical conditions are health problems or diseases that affect your health.
                                        Keeping track of your conditions helps your healthcare providers maintain a complete
                                        picture of your health and provide appropriate care. It's important to document
                                        both active and inactive conditions, as past medical history can be relevant to
                                        future treatment decisions.
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography sx={{
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            mb: 0.5
                                        }}>
                                            Condition Statuses:
                                        </Typography>
                                        <Box component="ul" sx={{
                                            pl: 2,
                                            m: 0,
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            fontSize: '14px',
                                        }}>
                                            <li><strong>Active:</strong> Current health problems requiring attention or monitoring.</li>
                                            <li><strong>Inactive:</strong> Previous conditions that are resolved or in remission.</li>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ) : selectedSection === 'allergies' ? (
                            // Allergies detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    <AddButton
                                        onClick={handleAddNewAllergy}
                                        startIcon={<PlusIcon />}
                                    >
                                        Add New Allergy
                                    </AddButton>
                                </Box>

                                {/* Allergies header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <AllergyIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        Allergies
                                    </Typography>
                                </Box>

                                {/* Allergies list */}
                                <Box
                                    sx={{
                                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                                        border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        mb: 2,
                                        boxShadow: mode === 'light' ? '0px 2px 8px rgba(0, 0, 0, 0.05)' : 'none',
                                    }}
                                >
                                    {allergies.map((allergy) => (
                                        <AllergyItem key={allergy.id}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AllergyName>{allergy.name}</AllergyName>
                                                        <SeverityBadge severity={allergy.severity}>
                                                            {allergy.severity === 'high' ? 'High' : allergy.severity === 'moderate' ? 'Moderate' : 'Low'} Severity
                                                        </SeverityBadge>
                                                    </Box>
                                                    <AllergyDescription>
                                                        {allergy.reactions.join(', ')}
                                                        {allergy.notes && ` - ${allergy.notes}`}
                                                    </AllergyDescription>
                                                </Box>
                                                <Box>
                                                    <IconButton
                                                        onClick={() => handleEditAllergy(allergy.id)}
                                                        sx={{
                                                            color: mode === 'light' ? '#21647D' : '#64B5F6',
                                                            '&:hover': {
                                                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.04)' : 'rgba(100, 181, 246, 0.04)',
                                                            },
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDeleteAllergy(allergy.id)}
                                                        sx={{
                                                            color: '#E16A6A',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                            },
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </AllergyItem>
                                    ))}
                                </Box>

                                {/* Additional info about allergies */}
                                <Box sx={{
                                    mt: 4,
                                    p: 3,
                                    backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                    border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    borderRadius: '12px',
                                }}>
                                    <Typography variant="subtitle1" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        mb: 1
                                    }}>
                                        About Allergies
                                    </Typography>
                                    <Typography sx={{
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        fontSize: '14px',
                                        lineHeight: 1.7
                                    }}>
                                        Allergies are an immune system response to substances that are normally harmless.
                                        It's important to keep your allergy information up to date to ensure proper medical care.
                                        If you experience new allergic reactions or changes in symptoms, please add or update your allergies.
                                    </Typography>
                                </Box>
                            </Box>
                        ) : selectedSection === 'familyHistory' ? (
                            // Family History detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedFamilyMember && (
                                        <AddFamilyMemberButton
                                            startIcon={<PlusIcon />}
                                            onClick={handleAddFamilyMember}
                                        >
                                            Add Family Member
                                        </AddFamilyMemberButton>
                                    )}
                                </Box>

                                {/* Family History header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <FamilyHistoryIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        Family History
                                    </Typography>
                                </Box>

                                {selectedFamilyMember ? (
                                    // Family Member detail view
                                    <Box>
                                        <InfoCard>
                                            <InfoCardTitle>Family Member Details</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Name:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.name}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Gender:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.gender}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Age:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.age}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Relationship:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.relationship}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoCardTitle>Medical Information</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Heart Disease:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.heartDisease ? 'Yes' : 'No'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Blood Glucose Level:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.bloodGlucoseLevel}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Diabetes:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.diabetes ? 'Yes' : 'No'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>HbA1c Level:</InfoLabel>
                                                <InfoValue>{selectedFamilyMember.hba1cLevel}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        {selectedFamilyMember.notes && (
                                            <InfoCard>
                                                <InfoCardTitle>Notes</InfoCardTitle>
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                    lineHeight: 1.6
                                                }}>
                                                    {selectedFamilyMember.notes}
                                                </Typography>
                                            </InfoCard>
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#E16A6A',
                                                    color: '#E16A6A',
                                                    textTransform: 'none',
                                                    mr: 2,
                                                    '&:hover': {
                                                        borderColor: '#d32f2f',
                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Family History list view
                                    <Box>
                                        {/* Family members table */}
                                        <FamilyHistoryTable>
                                            <TableHeader>
                                                <TableHeaderCell width="15%">Name</TableHeaderCell>
                                                <TableHeaderCell width="10%">Gender</TableHeaderCell>
                                                <TableHeaderCell width="10%">Age</TableHeaderCell>
                                                <TableHeaderCell width="18%">Heart Disease</TableHeaderCell>
                                                <TableHeaderCell width="18%">Blood Glucose Level</TableHeaderCell>
                                                <TableHeaderCell width="15%">Diabetes</TableHeaderCell>
                                                <TableHeaderCell width="14%">HbA1c Level</TableHeaderCell>
                                            </TableHeader>

                                            {familyMembers.map((member, index) => (
                                                <FamilyTableRow
                                                    key={member.id}
                                                    isOdd={index % 2 !== 0}
                                                    onClick={() => handleFamilyMemberClick(member)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <FamilyTableCell width="15%">{member.name}</FamilyTableCell>
                                                    <FamilyTableCell width="10%">{member.gender}</FamilyTableCell>
                                                    <FamilyTableCell width="10%">{member.age}</FamilyTableCell>
                                                    <FamilyTableCell width="18%">{member.heartDisease ? 'Yes' : 'No'}</FamilyTableCell>
                                                    <FamilyTableCell width="18%">{member.bloodGlucoseLevel}</FamilyTableCell>
                                                    <FamilyTableCell width="15%">{member.diabetes ? 'Yes' : 'No'}</FamilyTableCell>
                                                    <FamilyTableCell width="14%">{member.hba1cLevel}</FamilyTableCell>
                                                </FamilyTableRow>
                                            ))}
                                        </FamilyHistoryTable>

                                        {/* About Family History section */}
                                        <Box sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            borderRadius: '12px',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1
                                            }}>
                                                About Family History
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7
                                            }}>
                                                Family medical history is an important part of understanding your own health risks. Many medical conditions have genetic components, and knowledge of diseases that run in your family can help your healthcare provider recommend appropriate screening tests, lifestyle changes, or preventive measures. Regularly update your family history with new information, and consider sharing your own health status with relatives when appropriate to help them maintain accurate records.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : selectedSection === 'labResults' ? (
                            // Lab Results detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedLabResult && (
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <SearchInput
                                                placeholder="Search lab results..."
                                                variant="outlined"
                                                size="small"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterLabResultCategory(labResultCategoryFilter === 'normal' ? null : 'normal')}
                                                sx={{
                                                    backgroundColor: labResultCategoryFilter === 'normal' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Normal
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterLabResultCategory(labResultCategoryFilter === 'abnormal' ? null : 'abnormal')}
                                                sx={{
                                                    backgroundColor: labResultCategoryFilter === 'abnormal' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Abnormal
                                            </FilterButton>
                                            <AddButton
                                                startIcon={<PlusIcon />}
                                                onClick={handleAddLabResult}
                                            >
                                                Add Lab Result
                                            </AddButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Lab Results header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <LabResultsIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedLabResult ? selectedLabResult.name : 'Lab Results'}
                                    </Typography>
                                </Box>

                                {selectedLabResult ? (
                                    // Lab Result detail view
                                    <Box>
                                        <InfoCard>
                                            <InfoCardTitle>Lab Result Details</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Name:</InfoLabel>
                                                <InfoValue>{selectedLabResult.name}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Value:</InfoLabel>
                                                <InfoValue>{selectedLabResult.value}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Status:</InfoLabel>
                                                <InfoValue>
                                                    <StatusBadge status={selectedLabResult.status}>
                                                        {selectedLabResult.status}
                                                    </StatusBadge>
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Unit:</InfoLabel>
                                                <InfoValue>{selectedLabResult.unit}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Reference Range:</InfoLabel>
                                                <InfoValue>{selectedLabResult.referenceRange}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Date:</InfoLabel>
                                                <InfoValue>{selectedLabResult.date}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Category:</InfoLabel>
                                                <InfoValue>{selectedLabResult.category}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoCardTitle>Notes</InfoCardTitle>
                                            <Typography sx={{
                                                fontSize: '14px',
                                                color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                lineHeight: 1.6
                                            }}>
                                                {selectedLabResult.notes || 'No additional notes available.'}
                                            </Typography>
                                        </InfoCard>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#E16A6A',
                                                    color: '#E16A6A',
                                                    textTransform: 'none',
                                                    mr: 2,
                                                    '&:hover': {
                                                        borderColor: '#d32f2f',
                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit Lab Result
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Lab Results list view
                                    <Box>
                                        {/* Lab results table */}
                                        <LabResultsTable>
                                            <LabResultTableHeader>
                                                <LabResultTableHeaderCell width="15%">Name</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="15%">Status</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="15%">Category</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="10%">Value</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="15%">Unit</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="15%">Reference Range</LabResultTableHeaderCell>
                                                <LabResultTableHeaderCell width="14%">Date</LabResultTableHeaderCell>
                                            </LabResultTableHeader>

                                            {labResults.filter(result => {
                                                const matchesSearch = result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    result.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    result.status.toLowerCase().includes(searchQuery.toLowerCase());

                                                if (labResultCategoryFilter === null) {
                                                    return matchesSearch;
                                                }

                                                return matchesSearch && (labResultCategoryFilter === 'normal' ? result.status === 'normal' : labResultCategoryFilter === 'abnormal' ? result.status === 'abnormal' : true);
                                            }).map((result) => (
                                                <LabResultRow
                                                    key={result.id}
                                                    isHeader={result.id === '1'}
                                                    onClick={() => handleLabResultClick(result)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <LabResultCell width="15%">{result.name}</LabResultCell>
                                                    <LabResultCell width="15%">
                                                        <StatusBadge status={result.status}>
                                                            {result.status}
                                                        </StatusBadge>
                                                    </LabResultCell>
                                                    <LabResultCell width="15%">{result.category}</LabResultCell>
                                                    <LabResultCell width="10%">{result.value}</LabResultCell>
                                                    <LabResultCell width="15%">{result.unit}</LabResultCell>
                                                    <LabResultCell width="15%">{result.referenceRange}</LabResultCell>
                                                    <LabResultCell width="14%">{result.date}</LabResultCell>
                                                </LabResultRow>
                                            ))}
                                        </LabResultsTable>

                                        {/* About Lab Results section */}
                                        <Box sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            borderRadius: '12px',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1
                                            }}>
                                                About Lab Results
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7
                                            }}>
                                                Lab results are an important part of your healthcare. They help diagnose and monitor your health status. Regularly update your lab results with new information to ensure accurate and timely medical care.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : selectedSection === 'procedures' ? (
                            // Procedures detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedProcedure && (
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <SearchInput
                                                placeholder="Search procedures..."
                                                variant="outlined"
                                                size="small"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Box>
                                                    ),
                                                }}
                                                sx={{ width: 250 }}
                                            />
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterProcedureOutcome(procedureOutcomeFilter === 'Successful' ? null : 'Successful')}
                                                sx={{
                                                    backgroundColor: procedureOutcomeFilter === 'Successful' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Successful
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterProcedureOutcome(procedureOutcomeFilter === 'Unsuccessful' ? null : 'Unsuccessful')}
                                                sx={{
                                                    backgroundColor: procedureOutcomeFilter === 'Unsuccessful' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Unsuccessful
                                            </FilterButton>
                                            <AddButton
                                                startIcon={<PlusIcon />}
                                                onClick={handleAddProcedure}
                                            >
                                                Add Procedure
                                            </AddButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Procedures header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ProceduresIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedProcedure ? selectedProcedure.name : 'Procedures'}
                                    </Typography>
                                </Box>

                                {selectedProcedure ? (
                                    // Procedure detail view
                                    <Box>
                                        <InfoCard>
                                            <InfoCardTitle>Procedure Details</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Name:</InfoLabel>
                                                <InfoValue>{selectedProcedure.name}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Performer:</InfoLabel>
                                                <InfoValue>{selectedProcedure.performer}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Body Site:</InfoLabel>
                                                <InfoValue>{selectedProcedure.bodySite}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Outcome:</InfoLabel>
                                                <InfoValue>
                                                    <ProcedureStatusBadge status={selectedProcedure.outcome}>
                                                        {selectedProcedure.outcome}
                                                    </ProcedureStatusBadge>
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Status:</InfoLabel>
                                                <InfoValue>
                                                    <ProcedureStatusBadge status={selectedProcedure.status}>
                                                        {selectedProcedure.status}
                                                    </ProcedureStatusBadge>
                                                </InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Date Performed:</InfoLabel>
                                                <InfoValue>{selectedProcedure.datePerformed}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoCardTitle>Additional Information</InfoCardTitle>
                                            <InfoItem>
                                                <InfoLabel>Notes:</InfoLabel>
                                                <InfoValue>{selectedProcedure.notes || 'No additional notes available.'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Complications:</InfoLabel>
                                                <InfoValue>{selectedProcedure.complications || 'None'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Follow-up Required:</InfoLabel>
                                                <InfoValue>{selectedProcedure.followUpRequired ? 'Yes' : 'No'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Follow-up Date:</InfoLabel>
                                                <InfoValue>{selectedProcedure.followUpDate || 'Not scheduled'}</InfoValue>
                                            </InfoItem>
                                            <InfoItem>
                                                <InfoLabel>Emergency:</InfoLabel>
                                                <InfoValue>{selectedProcedure.isEmergency ? 'Yes' : 'No'}</InfoValue>
                                            </InfoItem>
                                        </InfoCard>

                                        {/* Procedure Timeline */}
                                        <InfoCard>
                                            <InfoCardTitle>Procedure Timeline</InfoCardTitle>
                                            <TimelineContainer>
                                                <TimelineLine />
                                                <TimelineItem>
                                                    <TimelineDate>{selectedProcedure.datePerformed}</TimelineDate>
                                                    <TimelineDot />
                                                    <TimelineContent>
                                                        <Typography sx={{
                                                            fontWeight: 600,
                                                            color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                            mb: 1
                                                        }}>
                                                            Procedure Performed
                                                        </Typography>
                                                        <Typography sx={{
                                                            fontSize: '14px',
                                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                        }}>
                                                            {selectedProcedure.name} was performed by {selectedProcedure.performer} with {selectedProcedure.outcome.toLowerCase()} outcome.
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                                {selectedProcedure.followUpRequired && selectedProcedure.followUpDate && (
                                                    <TimelineItem>
                                                        <TimelineDate>{selectedProcedure.followUpDate}</TimelineDate>
                                                        <TimelineDot />
                                                        <TimelineContent>
                                                            <Typography sx={{
                                                                fontWeight: 600,
                                                                color: mode === 'light' ? '#333333' : '#FFFFFF',
                                                                mb: 1
                                                            }}>
                                                                Follow-up Appointment
                                                            </Typography>
                                                            <Typography sx={{
                                                                fontSize: '14px',
                                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                            }}>
                                                                Scheduled follow-up appointment to assess recovery and procedure results.
                                                            </Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )}
                                            </TimelineContainer>
                                        </InfoCard>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#E16A6A',
                                                    color: '#E16A6A',
                                                    textTransform: 'none',
                                                    mr: 2,
                                                    '&:hover': {
                                                        borderColor: '#d32f2f',
                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit Procedure
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Procedures list view
                                    <Box>
                                        {/* Procedures table */}
                                        <ProceduresTable>
                                            <ProcedureTableHeader>
                                                <ProcedureTableHeaderCell width="20%">Name</ProcedureTableHeaderCell>
                                                <ProcedureTableHeaderCell width="15%">Performer</ProcedureTableHeaderCell>
                                                <ProcedureTableHeaderCell width="15%">Body Site</ProcedureTableHeaderCell>
                                                <ProcedureTableHeaderCell width="10%">Outcome</ProcedureTableHeaderCell>
                                                <ProcedureTableHeaderCell width="15%">Status</ProcedureTableHeaderCell>
                                                <ProcedureTableHeaderCell width="14%">Date Performed</ProcedureTableHeaderCell>
                                            </ProcedureTableHeader>

                                            {procedures.filter(procedure => {
                                                const matchesSearch = procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    procedure.performer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    procedure.bodySite.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    procedure.status.toLowerCase().includes(searchQuery.toLowerCase());

                                                if (procedureOutcomeFilter === null) {
                                                    return matchesSearch;
                                                }

                                                return matchesSearch && procedure.outcome === procedureOutcomeFilter;
                                            }).map((procedure) => (
                                                <ProcedureRow
                                                    key={procedure.id}
                                                    isHeader={procedure.id === '1'}
                                                    onClick={() => handleProcedureClick(procedure)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <ProcedureCell width="20%">{procedure.name}</ProcedureCell>
                                                    <ProcedureCell width="15%">{procedure.performer}</ProcedureCell>
                                                    <ProcedureCell width="15%">{procedure.bodySite}</ProcedureCell>
                                                    <ProcedureCell width="10%">
                                                        <ProcedureStatusBadge status={procedure.outcome}>
                                                            {procedure.outcome}
                                                        </ProcedureStatusBadge>
                                                    </ProcedureCell>
                                                    <ProcedureCell width="15%">
                                                        <ProcedureStatusBadge status={procedure.status}>
                                                            {procedure.status}
                                                        </ProcedureStatusBadge>
                                                    </ProcedureCell>
                                                    <ProcedureCell width="14%">{procedure.datePerformed}</ProcedureCell>
                                                </ProcedureRow>
                                            ))}
                                        </ProceduresTable>

                                        {/* About Procedures section */}
                                        <Box sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            borderRadius: '12px',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 2
                                            }}>
                                                About Procedures
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7,
                                                mb: 2
                                            }}>
                                                Medical procedures are diagnostic or therapeutic interventions performed to diagnose, monitor, or treat health conditions. They range from simple tests to complex surgeries. Keeping track of your procedures helps maintain a comprehensive health record and informs future care decisions.
                                            </Typography>

                                            <Typography variant="subtitle2" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1,
                                                mt: 2
                                            }}>
                                                Why Track Your Procedures?
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mt: 0, color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                                <li>Provides your healthcare team with valuable information about your medical history</li>
                                                <li>Helps prevent unnecessary repetition of procedures</li>
                                                <li>Enables monitoring of outcomes and recovery progress</li>
                                                <li>Identifies patterns in your health that may require attention</li>
                                                <li>Supports informed decision-making for future treatments</li>
                                            </Box>

                                            <Typography variant="subtitle2" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1,
                                                mt: 2
                                            }}>
                                                Important Information to Track
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mt: 0, color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                                <li>Procedure name and date performed</li>
                                                <li>Healthcare provider who performed the procedure</li>
                                                <li>Location or facility where it was performed</li>
                                                <li>Reason for the procedure</li>
                                                <li>Results and outcomes</li>
                                                <li>Any complications or follow-up requirements</li>
                                            </Box>

                                            <Box sx={{
                                                mt: 3,
                                                p: 2,
                                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(33, 100, 125, 0.2)',
                                                borderRadius: '8px',
                                                border: `1px solid ${mode === 'light' ? 'rgba(33, 100, 125, 0.2)' : 'rgba(33, 100, 125, 0.3)'}`
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    color: mode === 'light' ? '#21647D' : '#90CAF9',
                                                    fontStyle: 'italic'
                                                }}>
                                                    Always consult with your healthcare provider before making decisions based on procedure information in your medical record. This information is intended to support, not replace, the relationship between you and your healthcare professionals.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : selectedSection === 'imaging' ? (
                            // Imaging detail view
                            <Box sx={{ mb: 3 }}>
                                {/* Header with back button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BackButton onClick={handleBackToRecords} startIcon={<BackIcon />}>
                                            Medical Records
                                        </BackButton>
                                    </Box>
                                    {!selectedImaging && (
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <SearchInput
                                                placeholder="Search imaging studies..."
                                                variant="outlined"
                                                size="small"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'MRI' ? null : 'MRI')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'MRI' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                MRI
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'CT' ? null : 'CT')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'CT' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                CT
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'X-Ray' ? null : 'X-Ray')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'X-Ray' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                X-Ray
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'Ultrasound' ? null : 'Ultrasound')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'Ultrasound' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Ultrasound
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'PET' ? null : 'PET')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'PET' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                PET
                                            </FilterButton>
                                            <FilterButton
                                                startIcon={<FilterIcon />}
                                                onClick={() => handleFilterImagingModality(imagingModalityFilter === 'Angiography' ? null : 'Angiography')}
                                                sx={{
                                                    backgroundColor: imagingModalityFilter === 'Angiography' ? '#E3F2FD' : 'transparent',
                                                }}
                                            >
                                                Angiography
                                            </FilterButton>
                                            <AddButton
                                                startIcon={<PlusIcon />}
                                                onClick={handleAddImaging}
                                            >
                                                Add Imaging
                                            </AddButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Imaging header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ImagingIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                        {selectedImaging ? selectedImaging.name : 'Imaging Studies'}
                                    </Typography>
                                </Box>

                                {selectedImaging ? (
                                    // Imaging detail view
                                    <Box>
                                        <InfoCard sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                <InfoCardTitle>Imaging Details</InfoCardTitle>
                                                <ImagingStatusBadge status={selectedImaging.status}>
                                                    {selectedImaging.status}
                                                </ImagingStatusBadge>
                                            </Box>

                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <InfoItem>
                                                        <InfoLabel>Study Name:</InfoLabel>
                                                        <InfoValue>{selectedImaging.name}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Modality:</InfoLabel>
                                                        <InfoValue>{selectedImaging.modality}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Body Part:</InfoLabel>
                                                        <InfoValue>{selectedImaging.bodyPart}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Date Performed:</InfoLabel>
                                                        <InfoValue>{selectedImaging.date}</InfoValue>
                                                    </InfoItem>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InfoItem>
                                                        <InfoLabel>Physician:</InfoLabel>
                                                        <InfoValue>{selectedImaging.physician}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Facility:</InfoLabel>
                                                        <InfoValue>{selectedImaging.facility}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Urgency:</InfoLabel>
                                                        <InfoValue>{selectedImaging.urgency || 'Not specified'}</InfoValue>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoLabel>Follow-up Required:</InfoLabel>
                                                        <InfoValue>{selectedImaging.followUpRequired ? 'Yes' : 'No'}</InfoValue>
                                                    </InfoItem>
                                                    {selectedImaging.followUpRequired && selectedImaging.followUpDate && (
                                                        <InfoItem>
                                                            <InfoLabel>Follow-up Date:</InfoLabel>
                                                            <InfoValue>{selectedImaging.followUpDate}</InfoValue>
                                                        </InfoItem>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </InfoCard>

                                        {/* Image Viewer */}
                                        <InfoCard sx={{ mb: 3 }}>
                                            <InfoCardTitle>Image Viewer</InfoCardTitle>
                                            <Box sx={{
                                                width: '100%',
                                                height: 400,
                                                backgroundColor: '#000',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
                                                {selectedImaging.images && selectedImaging.images.length > 0 ? (
                                                    <img
                                                        src={selectedImaging.images[0].fullSize}
                                                        alt={selectedImaging.name}
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography color="white">No images available</Typography>
                                                )}

                                                {/* Image controls */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                                    padding: '8px 16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <IconButton size="small" sx={{ color: 'white' }}>
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 3H21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M9 21H3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 3L14 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M3 21L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton size="small" sx={{ color: 'white' }}>
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M11 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M8 11H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton size="small" sx={{ color: 'white' }}>
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M8 11H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </IconButton>
                                                    </Box>

                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        startIcon={
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M17 8L12 3L7 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        }
                                                        sx={{
                                                            backgroundColor: '#21647D',
                                                            '&:hover': {
                                                                backgroundColor: '#1a5268',
                                                            },
                                                            textTransform: 'none',
                                                        }}
                                                    >
                                                        Download DICOM
                                                    </Button>
                                                </Box>
                                            </Box>

                                            {/* Thumbnails */}
                                            {selectedImaging.images && selectedImaging.images.length > 1 && (
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    mt: 2,
                                                    overflowX: 'auto',
                                                    pb: 1,
                                                    '&::-webkit-scrollbar': {
                                                        height: '6px',
                                                    },
                                                    '&::-webkit-scrollbar-track': {
                                                        background: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        background: mode === 'light' ? '#A3A0A091' : '#333',
                                                        borderRadius: '4px',
                                                    },
                                                }}>
                                                    {selectedImaging.images.map((image, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                width: 80,
                                                                height: 80,
                                                                borderRadius: '4px',
                                                                overflow: 'hidden',
                                                                cursor: 'pointer',
                                                                border: index === 0 ? `2px solid #21647D` : `2px solid transparent`,
                                                                '&:hover': {
                                                                    opacity: 0.9,
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                src={image.thumbnail}
                                                                alt={`${selectedImaging.name} thumbnail ${index + 1}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}
                                        </InfoCard>

                                        <InfoCard sx={{ mb: 3 }}>
                                            <InfoCardTitle>Findings & Impression</InfoCardTitle>
                                            <Box sx={{ mb: 3 }}>
                                                <Typography sx={{
                                                    fontWeight: 600,
                                                    fontSize: '15px',
                                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                    mb: 1
                                                }}>
                                                    Findings
                                                </Typography>
                                                <Typography sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '14px',
                                                    lineHeight: 1.6
                                                }}>
                                                    {selectedImaging.findings || 'No findings recorded.'}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 600,
                                                    fontSize: '15px',
                                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                    mb: 1
                                                }}>
                                                    Impression
                                                </Typography>
                                                <Typography sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '14px',
                                                    lineHeight: 1.6
                                                }}>
                                                    {selectedImaging.impression || 'No impression recorded.'}
                                                </Typography>
                                            </Box>
                                        </InfoCard>

                                        {selectedImaging.notes && (
                                            <InfoCard>
                                                <InfoCardTitle>Notes</InfoCardTitle>
                                                <Typography sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '14px',
                                                    lineHeight: 1.6
                                                }}>
                                                    {selectedImaging.notes}
                                                </Typography>
                                            </InfoCard>
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#E16A6A',
                                                    color: '#E16A6A',
                                                    textTransform: 'none',
                                                    mr: 2,
                                                    '&:hover': {
                                                        borderColor: '#d32f2f',
                                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#21647D',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                            >
                                                Edit Imaging Study
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    // Imaging list view
                                    <Box>
                                        {/* Imaging studies grid view */}
                                        <Grid container spacing={3}>
                                            {imagingStudies
                                                .filter(imaging => {
                                                    const matchesSearch = imaging.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        imaging.modality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        imaging.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        imaging.physician.toLowerCase().includes(searchQuery.toLowerCase());

                                                    if (imagingModalityFilter === null) {
                                                        return matchesSearch;
                                                    }

                                                    return matchesSearch && imaging.modality === imagingModalityFilter;
                                                })
                                                .map((imaging) => (
                                                    <Grid item xs={12} sm={6} md={4} key={imaging.id}>
                                                        <ImagingCard onClick={() => handleImagingClick(imaging)}>
                                                            <Box sx={{
                                                                position: 'relative',
                                                                height: 180,
                                                                backgroundColor: '#f0f0f0',
                                                                overflow: 'hidden'
                                                            }}>
                                                                {imaging.images && imaging.images.length > 0 ? (
                                                                    <img
                                                                        src={imaging.images[0].thumbnail}
                                                                        alt={imaging.name}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover',
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Box sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        height: '100%',
                                                                        backgroundColor: mode === 'light' ? '#f0f0f0' : '#333'
                                                                    }}>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            No image available
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                                <Box sx={{
                                                                    position: 'absolute',
                                                                    top: 10,
                                                                    right: 10,
                                                                    backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(33, 33, 33, 0.8)',
                                                                    padding: '4px 8px',
                                                                    borderRadius: '4px',
                                                                }}>
                                                                    <ImagingStatusBadge status={imaging.status}>
                                                                        {imaging.status}
                                                                    </ImagingStatusBadge>
                                                                </Box>
                                                            </Box>
                                                            <ImagingInfo>
                                                                <ImagingTitle>{imaging.name}</ImagingTitle>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                                    <ImagingDetail><strong>Modality:</strong> {imaging.modality}</ImagingDetail>
                                                                    <ImagingDetail><strong>Date:</strong> {imaging.date}</ImagingDetail>
                                                                </Box>
                                                                <ImagingDetail><strong>Body Part:</strong> {imaging.bodyPart}</ImagingDetail>
                                                                <ImagingDetail><strong>Physician:</strong> {imaging.physician}</ImagingDetail>
                                                            </ImagingInfo>
                                                        </ImagingCard>
                                                    </Grid>
                                                ))}
                                        </Grid>

                                        {/* DICOM File Upload Section */}
                                        <Box sx={{ mt: 4 }}>
                                            <Typography variant="h6" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 2
                                            }}>
                                                Upload DICOM Files
                                            </Typography>

                                            <FileInput
                                                id="dicom-file-input"
                                                type="file"
                                                multiple
                                                accept=".dcm,.dicom"
                                                onChange={handleImagingFileChange}
                                            />

                                            <DicomUploadBox
                                                onClick={() => document.getElementById('dicom-file-input')?.click()}
                                            >
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 2
                                                }}>
                                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 15V3M12 3L7 8M12 3L17 8" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M20 17V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V17" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                    <Typography sx={{
                                                        fontWeight: 500,
                                                        color: mode === 'light' ? '#21647D' : '#64B5F6',
                                                        mb: 1
                                                    }}>
                                                        Drag & Drop DICOM Files Here
                                                    </Typography>

                                                    <Typography sx={{
                                                        fontSize: '14px',
                                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    }}>
                                                        or click to browse your files
                                                    </Typography>
                                                </Box>
                                            </DicomUploadBox>

                                            {imagingFiles.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    <Typography variant="subtitle2" sx={{
                                                        fontWeight: 600,
                                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                        mb: 1
                                                    }}>
                                                        Selected Files ({imagingFiles.length})
                                                    </Typography>

                                                    <Box sx={{
                                                        border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                                        borderRadius: '8px',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {imagingFiles.map((file, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    p: 2,
                                                                    borderBottom: index < imagingFiles.length - 1 ? `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}` : 'none',
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M14 2V8H20" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    <Typography sx={{ ml: 2, color: mode === 'light' ? '#333333' : '#FFFFFF' }}>
                                                                        {file.name}
                                                                    </Typography>
                                                                </Box>
                                                                <IconButton
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveImagingFile(index);
                                                                    }}
                                                                    size="small"
                                                                    sx={{ color: '#E16A6A' }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Box>
                                                        ))}
                                                    </Box>

                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<PlusIcon />}
                                                            onClick={handleAddImaging}
                                                            sx={{
                                                                backgroundColor: '#21647D',
                                                                color: '#FFFFFF',
                                                                textTransform: 'none',
                                                                '&:hover': {
                                                                    backgroundColor: '#1a5268',
                                                                },
                                                            }}
                                                        >
                                                            Create Imaging Study
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>

                                        {/* About Imaging section */}
                                        <Box sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                            borderRadius: '12px',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 2
                                            }}>
                                                About Medical Imaging
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7,
                                                mb: 2
                                            }}>
                                                Medical imaging refers to various techniques used to create visual representations of the interior of a body for clinical analysis and medical intervention. These imaging studies help healthcare providers diagnose conditions, monitor treatment progress, and plan surgical procedures.
                                            </Typography>

                                            <Typography variant="subtitle2" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1,
                                                mt: 2
                                            }}>
                                                Types of Medical Imaging
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mt: 0, color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                                <li><strong>MRI (Magnetic Resonance Imaging):</strong> Uses magnetic fields and radio waves to create detailed images of organs and tissues.</li>
                                                <li><strong>CT (Computed Tomography):</strong> Combines X-rays taken from different angles to create cross-sectional images.</li>
                                                <li><strong>X-Ray:</strong> Uses radiation to produce images of structures inside the body, particularly bones.</li>
                                                <li><strong>Ultrasound:</strong> Uses sound waves to create images of organs and tissues.</li>
                                                <li><strong>PET (Positron Emission Tomography):</strong> Shows how tissues and organs are functioning.</li>
                                                <li><strong>Angiography:</strong> Visualizes blood vessels and organs, especially the heart, kidneys, and brain.</li>
                                            </Box>

                                            <Typography variant="subtitle2" sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 1,
                                                mt: 2
                                            }}>
                                                Understanding DICOM Files
                                            </Typography>
                                            <Typography sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '14px',
                                                lineHeight: 1.7,
                                                mb: 2
                                            }}>
                                                DICOM (Digital Imaging and Communications in Medicine) is the standard format for storing and transmitting medical images. DICOM files contain both the image data and patient information, ensuring that images are properly associated with the correct patient and study.
                                            </Typography>

                                            <Box sx={{
                                                mt: 3,
                                                p: 2,
                                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(33, 100, 125, 0.2)',
                                                borderRadius: '8px',
                                                border: `1px solid ${mode === 'light' ? 'rgba(33, 100, 125, 0.2)' : 'rgba(33, 100, 125, 0.3)'}`
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    color: mode === 'light' ? '#21647D' : '#90CAF9',
                                                    fontStyle: 'italic'
                                                }}>
                                                    Always consult with your healthcare provider to understand the results of your imaging studies. This information is intended to support, not replace, the relationship between you and your healthcare professionals.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            // Original Medical Record list view
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                                            <path d="M9 11H15M9 15H15M9 7H15M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#E16A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                            Clinical data
                                        </Typography>
                                    </Box>

                                    {/* Share All Records Button */}
                                    <ShareButton onClick={handleShareAllRecords} startIcon={<ShareIcon />}>
                                        Share All Records
                                    </ShareButton>
                                </Box>

                                <List sx={{ padding: 0 }}>
                                    {/* Allergies */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('allergies')}
                                        onMouseEnter={() => setHoveredSection('allergies')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <AllergiesIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Allergies"
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                    <Typography component="span" sx={{ fontSize: '14px', color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                        3 diagnosed allergies
                                                    </Typography>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            backgroundColor: '#FFF5E0',
                                                            color: '#FFA500',
                                                            borderRadius: '4px',
                                                            padding: '2px 8px',
                                                            ml: 2,
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        2 Duplicates to review
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'allergies' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Clinical vitals */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('clinicalVitals')}
                                        onMouseEnter={() => setHoveredSection('clinicalVitals')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <ClinicalVitalsIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Clinical vitals"
                                            secondary="24 vitals records"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'clinicalVitals' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Conditions */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('conditions')}
                                        onMouseEnter={() => setHoveredSection('conditions')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <ConditionsIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Conditions"
                                            secondary="3 Known conditions"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'conditions' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Immunizations */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('immunizations')}
                                        onMouseEnter={() => setHoveredSection('immunizations')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <ImmunizationsIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Immunizations"
                                            secondary="12 Total immunizations"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'immunizations' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Imaging */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('imaging')}
                                        onMouseEnter={() => setHoveredSection('imaging')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <ImagingIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Imaging"
                                            secondary={`${imagingStudies.length} Imaging studies`}
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'imaging' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Family History */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('familyHistory')}
                                        onMouseEnter={() => setHoveredSection('familyHistory')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <FamilyHistoryIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Family History"
                                            secondary="4 Records"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'familyHistory' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Lab results */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('labResults')}
                                        onMouseEnter={() => setHoveredSection('labResults')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <LabResultsIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Lab results"
                                            secondary="5 Lab results"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'labResults' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Medications */}
                                    <MedicalRecordItem
                                        onClick={() => { setTabValue(2); }} // Change to directly navigate to Medications tab
                                        onMouseEnter={() => setHoveredSection('medications')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <MedicationsIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Medications"
                                            secondary="24 Medications"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'medications' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>

                                    {/* Procedures */}
                                    <MedicalRecordItem
                                        onClick={() => handleSectionClick('procedures')}
                                        onMouseEnter={() => setHoveredSection('procedures')}
                                        onMouseLeave={() => setHoveredSection(null)}
                                    >
                                        <ListItemIcon>
                                            <ProceduresIcon />
                                        </ListItemIcon>
                                        <RecordItemText
                                            primary="Procedures"
                                            secondary="1 Record"
                                        />
                                        <ListItemSecondaryAction>
                                            <ChevronIcon style={{ color: hoveredSection === 'procedures' ? '#267997' : '#6C7A89' }} />
                                        </ListItemSecondaryAction>
                                    </MedicalRecordItem>
                                </List>
                            </Box>
                        )}
                    </TabPanel>

                    {/* Medications Tab Content */}
                    <TabPanel value={tabValue} index={2}>
                        <Box sx={{ mb: 3 }}>
                            {/* Header with toggle button */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <MedicationsIcon />
                                    <Typography variant="h6" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        ml: 1.5
                                    }}>
                                        {showActiveMedications ? 'Active Medications' : 'Inactive Medications'}
                                    </Typography>

                                    {showActiveMedications && (
                                        <ActiveMedicationBadge>
                                            <CheckIcon style={{ color: 'currentColor', marginRight: '4px' }} />
                                            Current
                                        </ActiveMedicationBadge>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <SearchInput
                                        placeholder="Search medications..."
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Box>
                                            ),
                                        }}
                                        sx={{ width: 250 }}
                                    />
                                    <MedicationToggleButton
                                        onClick={toggleMedicationView}
                                        disableRipple
                                        startIcon={
                                            showActiveMedications ?
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4V20M20 12H4" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                :
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13L9 17L19 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                        }
                                    >
                                        {showActiveMedications ? `INACTIVE(${inactiveMedications.length})` : 'ACTIVE MEDICATIONS'}
                                    </MedicationToggleButton>
                                    <AddButton
                                        startIcon={<PlusIcon />}
                                        onClick={() => console.log('Add new medication')}
                                    >
                                        Add Medication
                                    </AddButton>
                                </Box>
                            </Box>

                            {/* Medications list */}
                            <Box
                                sx={{
                                    backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                                    border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    mb: 4,
                                    maxHeight: '50vh',
                                    overflowY: 'auto',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: mode === 'light' ? '#F5F9FA' : '#1A1A1A',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: mode === 'light' ? '#A3A0A091' : '#333',
                                        borderRadius: '4px',
                                    },
                                }}
                            >
                                <Box>
                                    {showActiveMedications ? (
                                        // Filter active medications based on search query
                                        activeMedications
                                            .filter(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                med.dosage.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((med) => (
                                                <MedicationItem key={med.id}>
                                                    <Box sx={{ display: 'flex', px: 2 }}>
                                                        <Box sx={{ mr: 2, pt: 0.5 }}>
                                                            <ActiveCheckbox />
                                                        </Box>
                                                        <Box sx={{ flex: 1 }}>
                                                            <MedicationName>{med.name}</MedicationName>
                                                            <MedicationDosage>{med.dosage}</MedicationDosage>
                                                            {med.instructions && (
                                                                <MedicationInstructions>{med.instructions}</MedicationInstructions>
                                                            )}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', pt: 0.5 }}>
                                                            <IconButton size="small" sx={{ color: '#4CAF50' }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton size="small" sx={{ color: '#E16A6A' }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </MedicationItem>
                                            ))
                                    ) : (
                                        // Filter inactive medications based on search query
                                        inactiveMedications
                                            .filter(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                med.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                med.discontinuedReason.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((med) => (
                                                <MedicationItem key={med.id}>
                                                    <Box sx={{ display: 'flex', px: 2 }}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                <MedicationName>{med.name}</MedicationName>
                                                                <InactiveMedicationBadge>
                                                                    Discontinued
                                                                </InactiveMedicationBadge>
                                                            </Box>
                                                            <MedicationDosage>{med.dosage}</MedicationDosage>
                                                            {med.instructions && (
                                                                <MedicationInstructions>{med.instructions}</MedicationInstructions>
                                                            )}
                                                            <Box sx={{
                                                                mt: 1,
                                                                fontSize: '13px',
                                                                fontStyle: 'italic',
                                                                color: mode === 'light' ? '#777' : '#aaa'
                                                            }}>
                                                                {med.discontinuedReason}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </MedicationItem>
                                            ))
                                    )}
                                </Box>
                            </Box>

                            {/* About Medications section */}
                            <Box sx={{
                                p: 3,
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#2B2B2B',
                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                borderRadius: '12px',
                            }}>
                                <Typography variant="subtitle1" sx={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    mb: 1
                                }}>
                                    About Medications
                                </Typography>
                                <Typography sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    fontSize: '14px',
                                    lineHeight: 1.7
                                }}>
                                    Medications are an essential part of your healthcare plan. This section provides a comprehensive list of your current and past medications. Active medications are those you are currently taking, while inactive medications have been discontinued.
                                    Always consult with your healthcare provider before making any changes to your medication regimen.
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                                    <Typography sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        fontSize: '14px'
                                    }}>
                                        Medication Safety Tips:
                                    </Typography>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        <li style={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px', marginBottom: '8px' }}>
                                            Always take medications as prescribed by your healthcare provider
                                        </li>
                                        <li style={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px', marginBottom: '8px' }}>
                                            Keep a current list of all medications you are taking
                                        </li>
                                        <li style={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px', marginBottom: '8px' }}>
                                            Inform your healthcare provider of any side effects
                                        </li>
                                        <li style={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px', marginBottom: '8px' }}>
                                            Store medications properly, away from direct sunlight and moisture
                                        </li>
                                        <li style={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '14px' }}>
                                            Dispose of expired medications properly
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                        </Box>
                    </TabPanel>
                </RecordSection>
            </RecordsContainer>

            {/* Add New Allergy Dialog */}
            <StyledDialog
                open={openAddDialog}
                onClose={handleCloseDialog}
                aria-labelledby="add-allergy-dialog-title"
            >
                <StyledDialogTitle id="add-allergy-dialog-title">
                    Add New Allergy
                </StyledDialogTitle>
                <StyledDialogContent>
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Allergy Name"
                        type="text"
                        fullWidth
                        value={newAllergy.name}
                        onChange={handleAllergyInputChange}
                        placeholder="e.g., Pollen Allergy, Food Allergy"
                    />
                    <StyledTextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={newAllergy.description}
                        onChange={handleAllergyInputChange}
                        placeholder="Describe the allergy, triggers, and symptoms"
                    />
                    <StyledFormControl fullWidth>
                        <InputLabel id="severity-label">Severity</InputLabel>
                        <Select
                            labelId="severity-label"
                            id="severity"
                            name="severity"
                            value={newAllergy.severity}
                            label="Severity"
                            onChange={handleSeverityChange}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="moderate">Moderate</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </StyledFormControl>
                </StyledDialogContent>
                <StyledDialogActions>
                    <CancelButton onClick={handleCloseDialog}>
                        Cancel
                    </CancelButton>
                    <SaveButton
                        onClick={handleSaveAllergy}
                        disabled={!newAllergy.name || !newAllergy.description}
                    >
                        Save Allergy
                    </SaveButton>
                </StyledDialogActions>
            </StyledDialog>

            {/* Add Immunization Dialog */}
            <Dialog
                open={openAddImmunizationDialog}
                onClose={handleCloseImmunizationDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Immunization
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Immunization Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newImmunization.name}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="type"
                                label="Immunization Type"
                                variant="outlined"
                                fullWidth
                                required
                                value={newImmunization.type}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="immunization-status-label">Status</InputLabel>
                                <Select
                                    labelId="immunization-status-label"
                                    id="immunization-status"
                                    name="status"
                                    value={newImmunization.status}
                                    label="Status"
                                    onChange={handleImmunizationStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                                    <MenuItem value="Expired">Expired</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="date"
                                label={newImmunization.status === 'Scheduled' ? 'Scheduled Date' : 'Administration Date'}
                                type="date"
                                variant="outlined"
                                fullWidth
                                required
                                value={newImmunization.date}
                                onChange={handleImmunizationInputChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="manufacturer"
                                label="Manufacturer"
                                variant="outlined"
                                fullWidth
                                value={newImmunization.manufacturer || ''}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="lotNumber"
                                label="Lot Number"
                                variant="outlined"
                                fullWidth
                                value={newImmunization.lotNumber || ''}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="administeredBy"
                                label="Administered By"
                                variant="outlined"
                                fullWidth
                                value={newImmunization.administeredBy || ''}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="location"
                                label="Location"
                                variant="outlined"
                                fullWidth
                                value={newImmunization.location || ''}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newImmunization.notes || ''}
                                onChange={handleImmunizationInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseImmunizationDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveImmunization}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Immunization
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Family Member Dialog */}
            <Dialog
                open={openAddFamilyMemberDialog}
                onClose={handleCloseFamilyMemberDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Family Member
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newFamilyMember.name}
                                onChange={handleFamilyMemberInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    name="gender"
                                    value={newFamilyMember.gender || 'Male'}
                                    label="Gender"
                                    onChange={handleGenderChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="age"
                                label="Age"
                                variant="outlined"
                                fullWidth
                                required
                                value={newFamilyMember.age}
                                onChange={handleNumberInputChange('age')}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="relationship-label">Relationship</InputLabel>
                                <Select
                                    labelId="relationship-label"
                                    id="relationship"
                                    name="relationship"
                                    value={newFamilyMember.relationship || 'Other'}
                                    label="Relationship"
                                    onChange={handleRelationshipChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Mother">Mother</MenuItem>
                                    <MenuItem value="Father">Father</MenuItem>
                                    <MenuItem value="Sibling">Sibling</MenuItem>
                                    <MenuItem value="Grandparent">Grandparent</MenuItem>
                                    <MenuItem value="Child">Child</MenuItem>
                                    <MenuItem value="Uncle">Uncle</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="heart-disease-label">Heart Disease</InputLabel>
                                <Select
                                    labelId="heart-disease-label"
                                    id="heartDisease"
                                    name="heartDisease"
                                    value={newFamilyMember.heartDisease === undefined ? 0 : newFamilyMember.heartDisease}
                                    label="Heart Disease"
                                    onChange={(e) => setNewFamilyMember(prev => ({ ...prev, heartDisease: e.target.value as number }))}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="bloodGlucoseLevel"
                                label="Blood Glucose Level"
                                variant="outlined"
                                fullWidth
                                required
                                value={newFamilyMember.bloodGlucoseLevel}
                                onChange={handleNumberInputChange('bloodGlucoseLevel')}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="diabetes-label">Diabetes</InputLabel>
                                <Select
                                    labelId="diabetes-label"
                                    id="diabetes"
                                    name="diabetes"
                                    value={newFamilyMember.diabetes === undefined ? 0 : newFamilyMember.diabetes}
                                    label="Diabetes"
                                    onChange={(e) => setNewFamilyMember(prev => ({ ...prev, diabetes: e.target.value as number }))}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="hba1cLevel"
                                label="HbA1c Level"
                                variant="outlined"
                                fullWidth
                                required
                                value={newFamilyMember.hba1cLevel}
                                onChange={handleNumberInputChange('hba1cLevel')}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newFamilyMember.notes || ''}
                                onChange={handleFamilyMemberInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseFamilyMemberDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveFamilyMember}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Family Member
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Lab Result Dialog */}
            <Dialog
                open={openAddLabResultDialog}
                onClose={handleCloseLabResultDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Lab Result
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Lab Result Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newLabResult.name}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="value"
                                label="Value"
                                variant="outlined"
                                fullWidth
                                required
                                value={newLabResult.value}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    name="status"
                                    value={newLabResult.status}
                                    label="Status"
                                    onChange={handleLabResultStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="abnormal">Abnormal</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="unit"
                                label="Unit"
                                variant="outlined"
                                fullWidth
                                value={newLabResult.unit || ''}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="referenceRange"
                                label="Reference Range"
                                variant="outlined"
                                fullWidth
                                value={newLabResult.referenceRange || ''}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="date"
                                label="Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                required
                                value={newLabResult.date}
                                onChange={handleLabResultInputChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="category"
                                label="Category"
                                variant="outlined"
                                fullWidth
                                value={newLabResult.category || ''}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newLabResult.notes || ''}
                                onChange={handleLabResultInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseLabResultDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveLabResult}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Lab Result
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Procedure Dialog */}
            <Dialog
                open={openAddProcedureDialog}
                onClose={handleCloseProcedureDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Procedure
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Procedure Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newProcedure.name}
                                onChange={handleProcedureInputChange}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="performer"
                                label="Performer"
                                variant="outlined"
                                fullWidth
                                required
                                value={newProcedure.performer}
                                onChange={handleProcedureInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="outcome-label">Outcome</InputLabel>
                                <Select
                                    labelId="outcome-label"
                                    id="outcome"
                                    name="outcome"
                                    value={newProcedure.outcome}
                                    label="Outcome"
                                    onChange={handleProcedureOutcomeChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Successful">Successful</MenuItem>
                                    <MenuItem value="Unsuccessful">Unsuccessful</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    name="status"
                                    value={newProcedure.status}
                                    label="Status"
                                    onChange={handleProcedureStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="datePerformed"
                                label="Date Performed"
                                type="date"
                                variant="outlined"
                                fullWidth
                                required
                                value={newProcedure.datePerformed}
                                onChange={handleProcedureInputChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newProcedure.notes || ''}
                                onChange={handleProcedureInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseProcedureDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveProcedure}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Procedure
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Imaging Dialog */}
            <Dialog
                open={openAddImagingDialog}
                onClose={handleCloseImagingDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Imaging Study
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Imaging Study Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newImaging.name}
                                onChange={handleImagingInputChange}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="modality-label">Modality</InputLabel>
                                <Select
                                    labelId="modality-label"
                                    id="modality"
                                    name="modality"
                                    value={newImaging.modality}
                                    label="Modality"
                                    onChange={handleImagingModalityChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="MRI">MRI</MenuItem>
                                    <MenuItem value="CT">CT</MenuItem>
                                    <MenuItem value="X-Ray">X-Ray</MenuItem>
                                    <MenuItem value="Ultrasound">Ultrasound</MenuItem>
                                    <MenuItem value="PET">PET</MenuItem>
                                    <MenuItem value="Angiography">Angiography</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="bodyPart"
                                label="Body Part"
                                variant="outlined"
                                fullWidth
                                value={newImaging.bodyPart}
                                onChange={handleImagingInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="physician"
                                label="Physician"
                                variant="outlined"
                                fullWidth
                                value={newImaging.physician}
                                onChange={handleImagingInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <TextField
                                name="facility"
                                label="Facility"
                                variant="outlined"
                                fullWidth
                                value={newImaging.facility}
                                onChange={handleImagingInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    name="status"
                                    value={newImaging.status}
                                    label="Status"
                                    onChange={handleImagingStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="date"
                                label="Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                required
                                value={newImaging.date}
                                onChange={handleImagingInputChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newImaging.notes || ''}
                                onChange={handleImagingInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseImagingDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveImaging}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Imaging Study
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Condition Dialog */}
            <Dialog
                open={openAddConditionDialog}
                onClose={handleCloseConditionDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <DialogTitle sx={{
                    p: 2.5,
                    fontWeight: 600,
                    color: mode === 'light' ? '#333333' : '#FFFFFF',
                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    Add New Condition
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Condition Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={newCondition.name}
                                onChange={handleConditionInputChange}
                                sx={{
                                    mb: 2,
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="clinical-status-label">Clinical Status</InputLabel>
                                <Select
                                    labelId="clinical-status-label"
                                    id="clinicalStatus"
                                    name="clinicalStatus"
                                    value={newCondition.clinicalStatus || 'Active'}
                                    label="Clinical Status"
                                    onChange={handleConditionStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={newCondition.category || 'Diagnosis'}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Diagnosis">Diagnosis</MenuItem>
                                    <MenuItem value="Problem">Problem</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="verification-status-label">Verification Status</InputLabel>
                                <Select
                                    labelId="verification-status-label"
                                    id="verificationStatus"
                                    name="verificationStatus"
                                    value={newCondition.verificationStatus || 'Confirmed'}
                                    label="Verification Status"
                                    onChange={handleVerificationStatusChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                                    <MenuItem value="Problem">Problem</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="bodySite"
                                label="Body Site"
                                variant="outlined"
                                fullWidth
                                required
                                value={newCondition.bodySite}
                                onChange={handleConditionInputChange}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="severity-label">Severity</InputLabel>
                                <Select
                                    labelId="severity-label"
                                    id="severity"
                                    name="severity"
                                    value={newCondition.severity || 'Moderate'}
                                    label="Severity"
                                    onChange={handleConditionSeverityChange}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }}
                                >
                                    <MenuItem value="Severe">Severe</MenuItem>
                                    <MenuItem value="Moderate">Moderate</MenuItem>
                                    <MenuItem value="Mild">Mild</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="recordedDate"
                                label="Recorded Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                required
                                value={newCondition.recordedDate}
                                onChange={handleConditionInputChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notes"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newCondition.notes || ''}
                                onChange={handleConditionInputChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: mode === 'light' ? '#F9FAFB' : '#333',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`
                }}>
                    <Button
                        onClick={handleCloseConditionDialog}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveCondition}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Save Condition
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MedicalRecordsPage; 