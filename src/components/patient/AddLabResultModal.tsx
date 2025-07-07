'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
        border: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
        overflow: 'hidden',
        animation: `${fadeIn} 0.3s ease-out`,
        maxWidth: '500px',
        width: '90%',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.8)' : 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(5px)',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: '24px',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.5rem',
    borderBottom: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.2)' : 'rgba(184, 199, 204, 0.2)',
        borderRadius: '4px',
    },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: '16px 24px',
    borderTop: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    fontFamily: 'poppins',
    textTransform: 'none',
    padding: '10px 20px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
}));

// Biomarker types for dropdown
const biomarkerTypes = [
    { value: 'cholesterol-total', label: 'Total Cholesterol' },
    { value: 'cholesterol-hdl', label: 'HDL Cholesterol' },
    { value: 'cholesterol-ldl', label: 'LDL Cholesterol' },
    { value: 'triglycerides', label: 'Triglycerides' },
    { value: 'glucose', label: 'Glucose' },
    { value: 'a1c', label: 'HbA1c' },
    { value: 'creatinine', label: 'Creatinine' },
    { value: 'bun', label: 'BUN' },
    { value: 'egfr', label: 'eGFR' },
    { value: 'alt', label: 'ALT' },
    { value: 'ast', label: 'AST' },
    { value: 'alp', label: 'ALP' },
    { value: 'bilirubin', label: 'Bilirubin' },
    { value: 'hemoglobin', label: 'Hemoglobin' },
    { value: 'hematocrit', label: 'Hematocrit' },
    { value: 'platelets', label: 'Platelets' },
    { value: 'wbc', label: 'White Blood Cells' },
    { value: 'rbc', label: 'Red Blood Cells' },
    { value: 'tsh', label: 'TSH' },
    { value: 't3', label: 'T3' },
    { value: 't4', label: 'T4' },
    { value: 'calcium', label: 'Calcium' },
    { value: 'vitamin-d', label: 'Vitamin D' },
    { value: 'phosphorus', label: 'Phosphorus' },
    { value: 'blood-pressure', label: 'Blood Pressure' },
];

// Unit options for different biomarker types
const getUnitOptions = (biomarkerType: string) => {
    switch (biomarkerType) {
        case 'cholesterol-total':
        case 'cholesterol-hdl':
        case 'cholesterol-ldl':
        case 'triglycerides':
        case 'glucose':
            return ['mg/dL', 'mmol/L'];
        case 'a1c':
            return ['%', 'mmol/mol'];
        case 'creatinine':
            return ['mg/dL', 'μmol/L'];
        case 'bun':
            return ['mg/dL', 'mmol/L'];
        case 'egfr':
            return ['mL/min/1.73m²'];
        case 'alt':
        case 'ast':
        case 'alp':
            return ['U/L', 'μkat/L'];
        case 'bilirubin':
            return ['mg/dL', 'μmol/L'];
        case 'hemoglobin':
            return ['g/dL', 'g/L'];
        case 'hematocrit':
            return ['%'];
        case 'platelets':
        case 'wbc':
        case 'rbc':
            return ['x10^3/μL', 'x10^9/L'];
        case 'tsh':
            return ['μIU/mL', 'mIU/L'];
        case 't3':
        case 't4':
            return ['ng/dL', 'pmol/L'];
        case 'calcium':
        case 'phosphorus':
            return ['mg/dL', 'mmol/L'];
        case 'vitamin-d':
            return ['ng/mL', 'nmol/L'];
        case 'blood-pressure':
            return ['mmHg'];
        default:
            return [''];
    }
};

// Get reference range for a biomarker type
const getDefaultReferenceRange = (biomarkerType: string) => {
    switch (biomarkerType) {
        case 'cholesterol-total':
            return '< 200 mg/dL';
        case 'cholesterol-hdl':
            return '> 40 mg/dL';
        case 'cholesterol-ldl':
            return '< 100 mg/dL';
        case 'triglycerides':
            return '< 150 mg/dL';
        case 'glucose':
            return '70-99 mg/dL';
        case 'a1c':
            return '< 5.7%';
        case 'creatinine':
            return '0.7-1.3 mg/dL';
        case 'bun':
            return '7-20 mg/dL';
        case 'egfr':
            return '> 60 mL/min/1.73m²';
        case 'alt':
            return '7-56 U/L';
        case 'ast':
            return '8-48 U/L';
        case 'alp':
            return '45-115 U/L';
        case 'bilirubin':
            return '0.1-1.2 mg/dL';
        case 'hemoglobin':
            return '13.5-17.5 g/dL';
        case 'hematocrit':
            return '38.8-50%';
        case 'platelets':
            return '150-450 x10^3/μL';
        case 'wbc':
            return '4.5-11.0 x10^3/μL';
        case 'rbc':
            return '4.5-5.9 x10^6/μL';
        case 'tsh':
            return '0.4-4.0 μIU/mL';
        case 't3':
            return '80-200 ng/dL';
        case 't4':
            return '5.1-14.1 μg/dL';
        case 'calcium':
            return '8.6-10.3 mg/dL';
        case 'vitamin-d':
            return '20-50 ng/mL';
        case 'phosphorus':
            return '2.5-4.5 mg/dL';
        case 'blood-pressure':
            return '< 120/80 mmHg';
        default:
            return '';
    }
};

interface AddLabResultModalProps {
    open: boolean;
    onClose: () => void;
    biomarker?: {
        name?: string;
        type?: string;
        defaultUnit?: string;
    } | null;
}

const AddLabResultModal: React.FC<AddLabResultModalProps> = ({ open, onClose, biomarker }) => {
    const { mode } = useThemeContext();
    const [formData, setFormData] = useState({
        biomarkerType: biomarker?.type || '',
        value: '',
        unit: biomarker?.defaultUnit || '',
        date: new Date(),
        referenceRange: '',
        notes: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    // Reset form when modal opens or biomarker changes
    React.useEffect(() => {
        if (open) {
            const selectedType = biomarker?.type || '';
            setFormData({
                biomarkerType: selectedType,
                value: '',
                unit: biomarker?.defaultUnit || (selectedType ? getUnitOptions(selectedType)[0] : ''),
                date: new Date(),
                referenceRange: selectedType ? getDefaultReferenceRange(selectedType) : '',
                notes: '',
            });
            setErrors({});
        }
    }, [open, biomarker]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = e.target.name as string;
        const value = e.target.value as string;

        if (name === 'biomarkerType') {
            // Update unit and reference range when biomarker type changes
            const units = getUnitOptions(value);
            const defaultUnit = units.length > 0 ? units[0] : '';

            setFormData({
                ...formData,
                [name]: value,
                unit: defaultUnit,
                referenceRange: getDefaultReferenceRange(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({
            ...formData,
            date: date || new Date(),
        });

        // Clear error for date field
        if (errors.date) {
            setErrors({
                ...errors,
                date: '',
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.biomarkerType) {
            newErrors.biomarkerType = 'Biomarker type is required';
        }

        if (!formData.value) {
            newErrors.value = 'Value is required';
        } else if (isNaN(Number(formData.value))) {
            newErrors.value = 'Value must be a number';
        }

        if (!formData.unit) {
            newErrors.unit = 'Unit is required';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Mock API call - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            setSnackbar({
                open: true,
                message: 'Lab result added successfully',
                severity: 'success',
            });

            // Close modal after a short delay
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error adding lab result:', error);
            setSnackbar({
                open: true,
                message: 'Failed to add lab result. Please try again.',
                severity: 'error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    return (
        <>
            <StyledDialog
                open={open}
                onClose={!isSubmitting ? onClose : undefined}
                fullWidth
            >
                <StyledDialogTitle>
                    Add Lab Result
                    {!isSubmitting && (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                    )}
                </StyledDialogTitle>

                <StyledDialogContent>
                    <Box sx={{ mb: 3 }}>
                        <FormControl fullWidth error={!!errors.biomarkerType} sx={{ mb: 2 }}>
                            <InputLabel id="biomarker-type-label">Biomarker Type</InputLabel>
                            <Select
                                labelId="biomarker-type-label"
                                id="biomarker-type"
                                name="biomarkerType"
                                value={formData.biomarkerType}
                                label="Biomarker Type"
                                onChange={handleSelectChange as any}
                                disabled={isSubmitting || !!biomarker?.type}
                            >
                                {biomarkerTypes.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.biomarkerType && (
                                <FormHelperText>{errors.biomarkerType}</FormHelperText>
                            )}
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <FormControl fullWidth error={!!errors.value}>
                                <TextField
                                    id="value"
                                    name="value"
                                    label="Value"
                                    type="number"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    error={!!errors.value}
                                    helperText={errors.value}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        inputProps: { step: 'any' }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth error={!!errors.unit}>
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    id="unit"
                                    name="unit"
                                    value={formData.unit}
                                    label="Unit"
                                    onChange={handleSelectChange as any}
                                    disabled={isSubmitting}
                                >
                                    {getUnitOptions(formData.biomarkerType).map((unit) => (
                                        <MenuItem key={unit} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.unit && (
                                    <FormHelperText>{errors.unit}</FormHelperText>
                                )}
                            </FormControl>
                        </Box>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ mb: 2 }}>
                                <DatePicker
                                    label="Test Date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.date,
                                            helperText: errors.date,
                                        },
                                    }}
                                    disabled={isSubmitting}
                                />
                            </Box>
                        </LocalizationProvider>

                        <TextField
                            id="referenceRange"
                            name="referenceRange"
                            label="Reference Range"
                            fullWidth
                            value={formData.referenceRange}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                            disabled={isSubmitting}
                        />

                        <TextField
                            id="notes"
                            name="notes"
                            label="Notes"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.notes}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                        />
                    </Box>
                </StyledDialogContent>

                <StyledDialogActions>
                    <ActionButton
                        onClick={onClose}
                        disabled={isSubmitting}
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                        }}
                    >
                        Cancel
                    </ActionButton>
                    <ActionButton
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: '#21647D',
                            color: '#FFFFFF',
                            '&:hover': {
                                backgroundColor: '#1A5369',
                            },
                        }}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Result'}
                    </ActionButton>
                </StyledDialogActions>
            </StyledDialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddLabResultModal; 