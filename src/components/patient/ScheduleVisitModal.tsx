'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    Grid,
    Avatar,
    Chip,
    Fade,
    Zoom,
    CircularProgress,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import Calendar from '../common/Calendar';

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
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(43, 43, 43, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25)',
        border: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
        overflow: 'hidden',
        animation: `${fadeIn} 0.3s ease-out`,
        maxWidth: '1000px',
        width: '90%',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.8)' : 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(10px)',
    },
    '& .MuiDialog-container': {
        zIndex: 9999,
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    borderBottom: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
    padding: '20px 24px',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '24px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.2)' : 'rgba(184, 199, 204, 0.2)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.4)' : 'rgba(184, 199, 204, 0.4)',
    },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    borderTop: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
    padding: '16px 24px',
    justifyContent: 'space-between',
}));

const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: '24px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.7)' : 'rgba(26, 26, 26, 0.7)',
        backdropFilter: 'blur(4px)',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(240, 245, 247, 0.8)' : 'rgba(37, 37, 37, 0.8)',
        },
        transition: 'all 0.2s ease',
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
    '& .MuiOutlinedInput-input': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.7)' : 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(4px)',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(240, 245, 247, 0.8)' : 'rgba(37, 37, 37, 0.8)',
    },
    '& .MuiSelect-select': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
    transition: 'all 0.2s ease',
}));

const AnimatedFormControl = styled(FormControl)(({ theme }) => ({
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
}));

const ReasonChip = styled(Chip)<{ selected?: boolean }>(({ theme, selected }) => ({
    borderRadius: '8px',
    backgroundColor: selected
        ? theme.palette.mode === 'light'
            ? 'rgba(33, 100, 125, 0.1)'
            : 'rgba(33, 100, 125, 0.2)'
        : theme.palette.mode === 'light'
            ? 'rgba(245, 249, 250, 0.7)'
            : 'rgba(26, 26, 26, 0.7)',
    color: selected
        ? '#267997'
        : theme.palette.mode === 'light'
            ? '#6C7A89'
            : '#B8C7CC',
    border: selected ? '1px solid #267997' : 'none',
    '&:hover': {
        backgroundColor: selected
            ? theme.palette.mode === 'light'
                ? 'rgba(33, 100, 125, 0.15)'
                : 'rgba(33, 100, 125, 0.25)'
            : theme.palette.mode === 'light'
                ? 'rgba(240, 245, 247, 0.8)'
                : 'rgba(37, 37, 37, 0.8)',
    },
    transition: 'all 0.2s ease',
    height: '36px',
    margin: '4px',
}));

const DoctorCard = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: selected
        ? theme.palette.mode === 'light'
            ? 'rgba(33, 100, 125, 0.1)'
            : 'rgba(33, 100, 125, 0.2)'
        : theme.palette.mode === 'light'
            ? 'rgba(245, 249, 250, 0.7)'
            : 'rgba(26, 26, 26, 0.7)',
    border: selected ? '1px solid #267997' : `1px solid ${theme.palette.mode === 'light' ? 'rgba(238, 241, 244, 0.7)' : 'rgba(51, 51, 51, 0.7)'}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(33, 100, 125, 0.05)'
            : 'rgba(33, 100, 125, 0.1)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.1s',
    opacity: 0,
}));

const TimeSlotButton = styled(Button)<{ selected?: boolean }>(({ theme, selected }) => ({
    borderRadius: '8px',
    backgroundColor: selected
        ? '#267997'
        : theme.palette.mode === 'light'
            ? 'rgba(245, 249, 250, 0.7)'
            : 'rgba(26, 26, 26, 0.7)',
    color: selected
        ? '#FFFFFF'
        : theme.palette.mode === 'light'
            ? '#6C7A89'
            : '#B8C7CC',
    border: selected ? 'none' : `1px solid ${theme.palette.mode === 'light' ? 'rgba(238, 241, 244, 0.7)' : 'rgba(51, 51, 51, 0.7)'}`,
    padding: '8px 16px',
    minWidth: '90px',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: selected
            ? '#21647D'
            : theme.palette.mode === 'light'
                ? 'rgba(240, 245, 247, 0.8)'
                : 'rgba(37, 37, 37, 0.8)',
        transform: 'translateY(-2px)',
    },
}));

interface ScheduleVisitModalProps {
    open: boolean;
    onClose: () => void;
    selectedDate?: Date;
    onSchedule: (appointmentData: any) => void;
}

const DOCTORS = [
    { id: 1, name: 'Dr. Michael Williams', specialty: 'Cardiologist', avatar: '/avatars/doctor1.png', availability: 'High' },
    { id: 2, name: 'Dr. Linda Carter', specialty: 'Neurologist', avatar: '/avatars/doctor2.png', availability: 'Medium' },
    { id: 3, name: 'Dr. John Smith', specialty: 'General Physician', avatar: '/avatars/doctor3.png', availability: 'High' },
    { id: 4, name: 'Dr. Sarah Reynolds', specialty: 'Dermatologist', avatar: '/avatars/doctor4.png', availability: 'Low' },
    { id: 5, name: 'Dr. James Wilson', specialty: 'Orthopedic', avatar: '/avatars/doctor5.png', availability: 'Medium' },
];

const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
];

const COMMON_REASONS = [
    'Regular checkup', 'Follow-up', 'Consultation', 'Emergency',
    'Vaccination', 'Prescription refill', 'Lab results review'
];

const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
    open,
    onClose,
    selectedDate,
    onSchedule,
}) => {
    const { mode } = useThemeContext();
    const [formData, setFormData] = useState({
        doctor: '',
        date: selectedDate || new Date(),
        time: '',
        reason: '',
        notes: '',
        type: 'appointment',
        duration: 30,
        priority: 'medium',
        location: '',
    });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [preselectedReason, setPreselectedReason] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (open) {
            setStep(1);
            setFormData({
                doctor: '',
                date: selectedDate || new Date(),
                time: '',
                reason: '',
                notes: '',
                type: 'appointment',
                duration: 30,
                priority: 'medium',
                location: '',
            });
            setPreselectedReason('');
        }
    }, [open, selectedDate]);

    const handleChange = (field: string) => (event: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleDateSelect = (date: Date) => {
        setFormData(prev => ({
            ...prev,
            date,
        }));
    };

    const handleDoctorSelect = (doctorId: number) => {
        setFormData(prev => ({
            ...prev,
            doctor: doctorId,
        }));
    };

    const handleTimeSelect = (time: string) => {
        setFormData(prev => ({
            ...prev,
            time,
        }));
    };

    const handleReasonSelect = (reason: string) => {
        setPreselectedReason(reason);
        setFormData(prev => ({
            ...prev,
            reason,
        }));
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1));
    };

    const handleSubmit = () => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            onSchedule(formData);
            setLoading(false);
            onClose();
        }, 1000);
    };

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case 'High':
                return '#4CAF50';
            case 'Medium':
                return '#FF9800';
            case 'Low':
                return '#F44336';
            default:
                return '#4CAF50';
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Box>
                        <Typography sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mb: 2,
                            animation: `${fadeIn} 0.4s ease-out`,
                        }}>
                            Select a Doctor
                        </Typography>
                        <Box sx={{ maxHeight: '300px', overflowY: 'auto', pr: 1 }}>
                            {DOCTORS.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    selected={formData.doctor === doctor.id}
                                    onClick={() => handleDoctorSelect(doctor.id)}
                                >
                                    <Avatar
                                        src={doctor.avatar}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            border: `2px solid ${formData.doctor === doctor.id ? '#267997' : 'transparent'}`
                                        }}
                                    />
                                    <Box>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            {doctor.specialty}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: getAvailabilityColor(doctor.availability),
                                                    mr: 1
                                                }}
                                            />
                                            <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                {doctor.availability} Availability
                                            </Typography>
                                        </Box>
                                    </Box>
                                </DoctorCard>
                            ))}
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mb: 2,
                            animation: `${fadeIn} 0.4s ease-out`,
                        }}>
                            Select Date & Time
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Box sx={{
                                    animation: `${slideUp} 0.4s ease-out forwards`,
                                    animationDelay: '0.1s',
                                    opacity: 0,
                                }}>
                                    <Calendar
                                        currentDate={formData.date}
                                        selectedDate={formData.date}
                                        onDateSelect={handleDateSelect}
                                        showNavigation={true}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Typography sx={{
                                    fontWeight: 500,
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    mb: 1.5,
                                    fontSize: '0.9rem',
                                    animation: `${fadeIn} 0.4s ease-out`,
                                    animationDelay: '0.2s',
                                }}>
                                    Available Time Slots
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    animation: `${slideUp} 0.4s ease-out forwards`,
                                    animationDelay: '0.3s',
                                    opacity: 0,
                                }}>
                                    {TIME_SLOTS.map((time) => (
                                        <TimeSlotButton
                                            key={time}
                                            selected={formData.time === time}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            {time}
                                        </TimeSlotButton>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 3:
                return (
                    <Box>
                        <Typography sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mb: 2,
                            animation: `${fadeIn} 0.4s ease-out`,
                        }}>
                            Reason for Visit
                        </Typography>

                        <Typography sx={{
                            fontWeight: 500,
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            mb: 1.5,
                            fontSize: '0.9rem',
                            animation: `${fadeIn} 0.4s ease-out`,
                            animationDelay: '0.1s',
                        }}>
                            Common Reasons
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            mb: 3,
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.2s',
                            opacity: 0,
                        }}>
                            {COMMON_REASONS.map((reason) => (
                                <ReasonChip
                                    key={reason}
                                    label={reason}
                                    selected={preselectedReason === reason}
                                    onClick={() => handleReasonSelect(reason)}
                                />
                            ))}
                        </Box>

                        <AnimatedFormControl fullWidth sx={{ mb: 3 }}>
                            <StyledTextField
                                fullWidth
                                label="Reason for Visit"
                                value={formData.reason}
                                onChange={handleChange('reason')}
                                multiline
                                rows={2}
                                sx={{ animationDelay: '0.3s' }}
                            />
                        </AnimatedFormControl>

                        <AnimatedFormControl fullWidth>
                            <StyledTextField
                                fullWidth
                                label="Additional Notes"
                                value={formData.notes}
                                onChange={handleChange('notes')}
                                multiline
                                rows={3}
                                sx={{ animationDelay: '0.4s' }}
                            />
                        </AnimatedFormControl>
                    </Box>
                );
            case 4:
                return (
                    <Box>
                        <Typography sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mb: 3,
                            animation: `${fadeIn} 0.4s ease-out`,
                        }}>
                            Confirm Appointment Details
                        </Typography>

                        <Box sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: mode === 'light' ? 'rgba(245, 249, 250, 0.7)' : 'rgba(26, 26, 26, 0.7)',
                            backdropFilter: 'blur(4px)',
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.1s',
                            opacity: 0,
                        }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '0.875rem' }}>
                                        Doctor
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Avatar
                                            src={DOCTORS.find(d => d.id === formData.doctor)?.avatar}
                                            sx={{ width: 32, height: 32, mr: 1 }}
                                        />
                                        <Typography sx={{ fontWeight: 500 }}>
                                            {DOCTORS.find(d => d.id === formData.doctor)?.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '0.875rem' }}>
                                        Date & Time
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, mt: 1 }}>
                                        {formData.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                        {formData.time && `, ${formData.time}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '0.875rem', mt: 1 }}>
                                        Reason for Visit
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, mt: 1 }}>
                                        {formData.reason || 'Not specified'}
                                    </Typography>
                                </Grid>
                                {formData.notes && (
                                    <Grid item xs={12}>
                                        <Typography sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', fontSize: '0.875rem', mt: 1 }}>
                                            Additional Notes
                                        </Typography>
                                        <Typography sx={{ fontWeight: 400, mt: 1, fontSize: '0.9rem' }}>
                                            {formData.notes}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>

                            <Box sx={{
                                mt: 3,
                                p: 2,
                                borderRadius: '8px',
                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.1)' : 'rgba(33, 100, 125, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 16V12" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8H12.01" stroke="#267997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <Typography sx={{ color: '#267997', fontSize: '0.875rem' }}>
                                    You will receive a confirmation email after scheduling the appointment.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            default:
                return null;
        }
    };

    const isNextDisabled = () => {
        switch (step) {
            case 1:
                return !formData.doctor;
            case 2:
                return !formData.time;
            case 3:
                return !formData.reason;
            default:
                return false;
        }
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            TransitionComponent={Zoom}
            transitionDuration={300}
        >
            <StyledDialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Schedule a Visit
                    <Chip
                        label={`Step ${step} of 4`}
                        size="small"
                        sx={{
                            ml: 2,
                            backgroundColor: '#267997',
                            color: '#fff',
                            fontWeight: 500,
                            height: '24px',
                        }}
                    />
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                {renderStep()}
            </StyledDialogContent>
            <StyledDialogActions>
                <Button
                    onClick={step === 1 ? onClose : handleBack}
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
                    {step === 1 ? 'Cancel' : 'Back'}
                </Button>
                <Button
                    onClick={step < 4 ? handleNext : handleSubmit}
                    variant="contained"
                    disabled={isNextDisabled() || loading}
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
                        step < 4 ? 'Continue' : 'Schedule Visit'
                    )}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default ScheduleVisitModal;
