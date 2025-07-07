'use client';

import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    InputAdornment,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import PatientCard from '@/components/practitioner/PatientCard';
import usePractitionerDashboard, { Patient } from '@/hooks/usePractitionerDashboard';

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

export default function PatientsPage() {
    const { mode } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVitalsFilter, setSelectedVitalsFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 9;

    const {
        loading,
        error,
        patients,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleVitalsFilterChange = (filter: string | null) => {
        setSelectedVitalsFilter(filter === selectedVitalsFilter ? null : filter);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleViewPatientDetails = (patient: Patient) => {
        // Navigate to patient details page
        console.log('View patient details:', patient.id);
    };

    // Filter and sort patients
    const filteredPatients = useMemo(() => {
        if (!patients) return [];

        return patients
            .filter(patient => {
                // Apply search filter
                const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());

                // Apply vitals filter
                const matchesVitals = selectedVitalsFilter
                    ? patient.vitalsStatus === selectedVitalsFilter
                    : true;

                return matchesSearch && matchesVitals;
            })
            .sort((a, b) => {
                // Apply sorting
                switch (sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    case 'age':
                        return a.age - b.age;
                    case 'age-desc':
                        return b.age - a.age;
                    default:
                        return 0;
                }
            });
    }, [patients, searchQuery, selectedVitalsFilter, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
    const displayedPatients = filteredPatients.slice(
        (currentPage - 1) * patientsPerPage,
        currentPage * patientsPerPage
    );

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
            <Box sx={{ mb: 4 }}>
                <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                    Patients
                </SectionTitle>
            </Box>

            {/* Filters and search section */}
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search patients by name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{ position: 'relative', width: 20, height: 20 }}>
                                            <Image
                                                src="/icons/search.svg"
                                                alt="Search"
                                                fill
                                                style={{
                                                    objectFit: 'contain',
                                                    filter: mode === 'dark' ? 'invert(0.8)' : 'none'
                                                }}
                                            />
                                        </Box>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 2,
                                    backgroundColor: mode === 'light' ? '#F5F5F5' : '#2B2B2B',
                                    '& fieldset': { border: 'none' },
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <FormControl
                                variant="outlined"
                                size="small"
                                sx={{
                                    width: 200,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: mode === 'light' ? '#F5F5F5' : '#2B2B2B',
                                        '& fieldset': { border: 'none' },
                                    }
                                }}
                            >
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    label="Sort By"
                                >
                                    <MenuItem value="name">Name (A-Z)</MenuItem>
                                    <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                                    <MenuItem value="age">Age (Low-High)</MenuItem>
                                    <MenuItem value="age-desc">Age (High-Low)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                {/* Vitals filters */}
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: mode === 'light' ? '#555' : '#CCC',
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Filter by:
                    </Typography>
                    <FilterChip
                        label="Normal"
                        clickable
                        selected={selectedVitalsFilter === 'normal'}
                        onClick={() => handleVitalsFilterChange('normal')}
                    />
                    <FilterChip
                        label="Abnormal"
                        clickable
                        selected={selectedVitalsFilter === 'abnormal'}
                        onClick={() => handleVitalsFilterChange('abnormal')}
                    />
                    <FilterChip
                        label="Critical"
                        clickable
                        selected={selectedVitalsFilter === 'critical'}
                        onClick={() => handleVitalsFilterChange('critical')}
                    />
                </Box>
            </Box>

            {/* Patients grid */}
            <Box sx={{ mb: 4 }}>
                {displayedPatients.length > 0 ? (
                    <>
                        <Grid container spacing={3}>
                            {displayedPatients.map((patient) => (
                                <Grid item xs={12} sm={6} md={4} key={patient.id}>
                                    <PatientCard
                                        patient={patient}
                                        onViewDetails={handleViewPatientDetails}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: mode === 'light' ? '#555' : '#CCC',
                                        },
                                        '& .Mui-selected': {
                                            backgroundColor: '#21647D !important',
                                            color: '#FFF',
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </>
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
                            No patients match your search criteria
                        </Typography>
                        {(searchQuery || selectedVitalsFilter) && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedVitalsFilter(null);
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
        </Box>
    );
} 