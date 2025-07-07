'use client';

import React from 'react';
import { Box, Typography, Paper, Avatar, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import { Patient } from '@/hooks/usePractitionerDashboard';

interface PatientCardProps {
    patient: Patient;
    onViewDetails?: (patient: Patient) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    },
}));

const VitalsChip = styled(Chip)<{ status: string }>(({ status, theme }) => {
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'normal':
                return { bg: '#E8F5E9', text: '#388E3C' };
            case 'abnormal':
                return { bg: '#FFF3E0', text: '#E64A19' };
            case 'critical':
                return { bg: '#FFEBEE', text: '#D32F2F' };
            default:
                return { bg: '#F5F5F5', text: '#757575' };
        }
    };

    const { bg, text } = getStatusColor();

    return {
        backgroundColor: bg,
        color: text,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
    };
});

const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewDetails }) => {
    const { mode } = useThemeContext();

    // Format next appointment date if available
    const formatNextAppointment = (dateString?: string) => {
        if (!dateString) return 'No upcoming appointment';

        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Check if it's today
        if (date.toDateString() === today.toDateString()) {
            return `Today, ${date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })}`;
        }

        // Check if it's tomorrow
        if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })}`;
        }

        // Otherwise, show full date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <StyledPaper
            elevation={0}
            sx={{
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src={patient.profileImageUrl || '/avatars/default-patient.png'}
                        alt={patient.name}
                        sx={{ width: 48, height: 48, mr: 1.5 }}
                    />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                color: mode === 'light' ? '#333' : '#FFF',
                                lineHeight: 1.2,
                            }}
                        >
                            {patient.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: mode === 'light' ? '#666' : '#CCC',
                                fontSize: '0.75rem',
                            }}
                        >
                            {patient.age} years • {patient.gender}
                        </Typography>
                    </Box>
                </Box>
                {patient.vitalsStatus && (
                    <VitalsChip
                        label={patient.vitalsStatus.charAt(0).toUpperCase() + patient.vitalsStatus.slice(1)}
                        size="small"
                        status={patient.vitalsStatus}
                    />
                )}
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        color: mode === 'light' ? '#555' : '#DDD',
                        mb: 0.5,
                    }}
                >
                    Next Appointment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        position: 'relative',
                        width: 16,
                        height: 16,
                        mr: 1,
                        opacity: 0.7,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V6" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 2V6" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H21" stroke={mode === 'light' ? '#666' : '#CCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: mode === 'light' ? '#666' : '#CCC',
                            fontSize: '0.85rem',
                        }}
                    >
                        {formatNextAppointment(patient.nextAppointment)}
                    </Typography>
                </Box>
            </Box>

            {patient.activeConditions && patient.activeConditions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            color: mode === 'light' ? '#555' : '#DDD',
                            mb: 0.5,
                        }}
                    >
                        Active Conditions
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {patient.activeConditions.slice(0, 3).map((condition, index) => (
                            <Chip
                                key={index}
                                label={condition}
                                size="small"
                                sx={{
                                    backgroundColor: mode === 'light' ? '#F5F5F5' : '#3D3D3D',
                                    color: mode === 'light' ? '#555' : '#DDD',
                                    fontSize: '0.75rem',
                                    height: 22,
                                }}
                            />
                        ))}
                        {patient.activeConditions.length > 3 && (
                            <Chip
                                label={`+${patient.activeConditions.length - 3} more`}
                                size="small"
                                sx={{
                                    backgroundColor: mode === 'light' ? '#F0F0F0' : '#333',
                                    color: mode === 'light' ? '#666' : '#AAA',
                                    fontSize: '0.75rem',
                                    height: 22,
                                }}
                            />
                        )}
                    </Box>
                </Box>
            )}

            <Box sx={{ mt: 'auto' }}>
                <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={() => onViewDetails && onViewDetails(patient)}
                    sx={{
                        borderRadius: 8,
                        textTransform: 'none',
                        borderColor: '#21647D',
                        color: '#21647D',
                        '&:hover': {
                            borderColor: '#21647D',
                            backgroundColor: 'rgba(33, 100, 125, 0.08)',
                        },
                    }}
                >
                    View Patient
                </Button>
            </Box>
        </StyledPaper>
    );
};

export default PatientCard; 