'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress, Alert, TextField, InputAdornment, Chip, Card, CardContent, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import usePractitionerDashboard from '@/hooks/usePractitionerDashboard';
import { FaSearch, FaPills, FaPlus } from 'react-icons/fa';

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(3),
}));

const FilterChip = styled(Chip)<{ selected?: boolean }>(({ selected, theme }) => ({
    borderRadius: 16,
    fontWeight: 500,
    backgroundColor: selected ? '#21647D' : theme.palette.mode === 'light' ? '#F5F5F5' : '#333',
    color: selected ? '#FFF' : theme.palette.mode === 'light' ? '#555' : '#CCC',
    '&:hover': {
        backgroundColor: selected ? '#21647D' : theme.palette.mode === 'light' ? '#EEEEEE' : '#444',
    },
    margin: theme.spacing(0, 0.5, 1, 0),
}));

const MedicationCard = styled(Card)(({ theme }) => ({
    borderRadius: 12,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    },
}));

export default function MedicationsPage() {
    const { mode } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const {
        loading,
        error,
        medications,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusFilterChange = (status: string) => {
        setSelectedStatus(status === selectedStatus ? null : status);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Filter medications based on search and status filter
    const filteredMedications = medications ? medications.filter(medication => {
        const matchesSearch = medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medication.patient.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus ? medication.status === selectedStatus : true;

        return matchesSearch && matchesStatus;
    }) : [];

    // Get unique medication statuses for filters
    const medicationStatuses = medications ? [...new Set(medications.map(medication => medication.status))] : [];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={60} sx={{ color: '#21647D' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={refreshDashboard}
                    sx={{
                        backgroundColor: '#21647D',
                        '&:hover': { backgroundColor: '#184C5F' }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                    Medications
                </SectionTitle>
                <Button
                    variant="contained"
                    startIcon={<FaPlus />}
                    sx={{
                        backgroundColor: '#21647D',
                        '&:hover': { backgroundColor: '#184C5F' },
                        borderRadius: 8,
                        textTransform: 'none',
                        px: 3,
                    }}
                >
                    Prescribe New
                </Button>
            </Box>

            {/* Search and filters */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search medications by name or patient"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaSearch color={mode === 'light' ? '#666' : '#CCC'} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 2,
                            backgroundColor: mode === 'light' ? '#F5F5F5' : '#2B2B2B',
                            '& fieldset': { border: 'none' },
                        }
                    }}
                    sx={{ mb: 2 }}
                />

                {/* Status filters */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: mode === 'light' ? '#555' : '#CCC',
                            mb: 1,
                        }}
                    >
                        Filter by status:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {medicationStatuses.map(status => (
                            <FilterChip
                                key={status}
                                label={status.charAt(0).toUpperCase() + status.slice(1)}
                                clickable
                                selected={selectedStatus === status}
                                onClick={() => handleStatusFilterChange(status)}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Medications grid */}
            {filteredMedications.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredMedications.map((medication) => (
                        <Grid item xs={12} sm={6} md={4} key={medication.id}>
                            <MedicationCard
                                elevation={0}
                                sx={{
                                    backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                                    border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    mr: 1.5,
                                                    backgroundColor: 'rgba(33, 100, 125, 0.1)',
                                                    color: '#21647D',
                                                }}
                                            >
                                                <FaPills />
                                            </Avatar>
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
                                                    {medication.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: mode === 'light' ? '#666' : '#CCC',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {medication.dosage}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                                            size="small"
                                            sx={{
                                                backgroundColor: medication.status === 'active'
                                                    ? '#E8F5E9'
                                                    : medication.status === 'discontinued'
                                                        ? '#FFEBEE'
                                                        : '#E3F2FD',
                                                color: medication.status === 'active'
                                                    ? '#388E3C'
                                                    : medication.status === 'discontinued'
                                                        ? '#D32F2F'
                                                        : '#1976D2',
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                height: 24,
                                            }}
                                        />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

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
                                            Patient
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#666' : '#CCC',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            {medication.patient.name}
                                        </Typography>
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
                                            Prescribed Date
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#666' : '#CCC',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            {formatDate(medication.datePrescribed)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderRadius: 8,
                                                textTransform: 'none',
                                                borderColor: '#21647D',
                                                color: '#21647D',
                                                '&:hover': {
                                                    borderColor: '#21647D',
                                                    backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                                },
                                                flex: 1,
                                                mr: 1,
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderRadius: 8,
                                                textTransform: 'none',
                                                borderColor: '#21647D',
                                                color: '#21647D',
                                                '&:hover': {
                                                    borderColor: '#21647D',
                                                    backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                                },
                                                flex: 1,
                                            }}
                                        >
                                            Renew
                                        </Button>
                                    </Box>
                                </CardContent>
                            </MedicationCard>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                        border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                        borderRadius: 2,
                    }}
                >
                    <Typography sx={{ color: mode === 'light' ? '#666' : '#CCC', mb: 2 }}>
                        No medications match your search criteria
                    </Typography>
                    {(searchQuery || selectedStatus) && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedStatus(null);
                            }}
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
                            Clear Filters
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );
} 