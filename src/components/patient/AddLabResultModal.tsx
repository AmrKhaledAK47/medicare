'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Grid,
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

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
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
        maxWidth: '600px',
        width: '95%',
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

const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: '24px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
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

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#D0D5DD' : '#555',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#21647D',
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        '&.Mui-focused': {
            color: '#21647D',
        },
    },
    '& .MuiInputBase-input': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
        borderRadius: '8px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'light' ? '#D0D5DD' : '#555',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#21647D',
    },
    '& .MuiInputBase-input': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
}));

interface AddLabResultModalProps {
    open: boolean;
    onClose: () => void;
    biomarker?: {
        name: string;
        defaultUnit?: string;
    } | null;
}

const AddLabResultModal: React.FC<AddLabResultModalProps> = ({ open, onClose, biomarker }) => {
    const { mode } = useThemeContext();
    const [formData, setFormData] = useState({
        value: '',
        unit: biomarker?.defaultUnit || 'mg/dL',
        date: new Date(),
        provider: '',
        notes: '',
    });

    const [formErrors, setFormErrors] = useState({
        value: false,
        provider: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData(prev => ({ ...prev, date }));
        }
    };

    const handleSubmit = () => {
        // Basic validation
        const errors = {
            value: !formData.value,
            provider: !formData.provider,
        };

        setFormErrors(errors);

        // If no errors, submit the form
        if (!errors.value && !errors.provider) {
            // Here you would typically send the data to your API
            console.log('Form submitted:', formData);
            onClose();
        }
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <StyledDialogTitle>
                Add {biomarker?.name || 'Lab'} Result
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
            </StyledDialogTitle>

            <StyledDialogContent>
                <FormSection>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Value"
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                fullWidth
                                type="number"
                                error={formErrors.value}
                                helperText={formErrors.value ? "Value is required" : ""}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={false}>
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <StyledSelect
                                    labelId="unit-label"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleSelectChange}
                                    label="Unit"
                                >
                                    <MenuItem value="mg/dL">mg/dL</MenuItem>
                                    <MenuItem value="mmol/L">mmol/L</MenuItem>
                                    <MenuItem value="g/L">g/L</MenuItem>
                                    <MenuItem value="%">%</MenuItem>
                                </StyledSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Test Date"
                            value={formData.date}
                            onChange={handleDateChange}
                            sx={{
                                width: '100%',
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: mode === 'light' ? '#EEF1F4' : '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: mode === 'light' ? '#D0D5DD' : '#555',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#21647D',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    '&.Mui-focused': {
                                        color: '#21647D',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <StyledTextField
                        label="Healthcare Provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleInputChange}
                        fullWidth
                        error={formErrors.provider}
                        helperText={formErrors.provider ? "Provider is required" : ""}
                    />
                </FormSection>

                <FormSection>
                    <StyledTextField
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </FormSection>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    animation: `${slideUp} 0.4s ease-out forwards`,
                    animationDelay: '0.2s',
                    opacity: 0,
                    mt: 2,
                }}>
                    <ActionButton
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            borderColor: mode === 'light' ? '#D0D5DD' : '#444',
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? 'rgba(108, 122, 137, 0.04)' : 'rgba(184, 199, 204, 0.04)',
                                borderColor: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            },
                        }}
                    >
                        Cancel
                    </ActionButton>
                    <ActionButton
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#21647D',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1A5369',
                            },
                        }}
                    >
                        Save Result
                    </ActionButton>
                </Box>
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default AddLabResultModal; 