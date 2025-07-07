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
    SelectChangeEvent,
    Tab,
    Tabs
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import AppointmentCard from '@/components/practitioner/AppointmentCard';
import usePractitionerDashboard, { Appointment } from '@/hooks/usePractitionerDashboard';

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

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 40,
    marginBottom: theme.spacing(3),
    '& .MuiTab-root': {
        textTransform: 'none',
        minHeight: 40,
        fontWeight: 500,
        fontSize: '0.9rem',
        color: theme.palette.mode === 'light' ? '#555' : '#CCC',
        '&.Mui-selected': {
            color: '#21647D',
            fontWeight: 600,
        },
    },
    '& .MuiTabs-indicator': {
        backgroundColor: '#21647D',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minHeight: 40,
    fontWeight: 500,
    fontSize: '0.9rem',
}));

export default function AppointmentsPage() {
    const { mode } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const [timeFilter, setTimeFilter] = useState(0); // 0: All, 1: Today, 2: This Week, 3: This Month
    const appointmentsPerPage = 9;

    const {
        loading,
        error,
        appointments,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleStatusFilterChange = (filter: string | null) => {
        setSelectedStatusFilter(filter === selectedStatusFilter ? null : filter);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleTimeFilterChange = (event: React.SyntheticEvent, newValue: number) => {
        setTimeFilter(newValue);
        setCurrentPage(1); // Reset to first page on time filter change
    };

    const handleViewAppointmentDetails = (appointment: Appointment) => {
        // Navigate to appointment details page
        console.log('View appointment details:', appointment.id);
    };

    // Filter and sort appointments
    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        return appointments
            .filter(appointment => {
                // Apply search filter
                const matchesSearch =
                    appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    appointment.description.toLowerCase().includes(searchQuery.toLowerCase());

                // Apply status filter
                const matchesStatus = selectedStatusFilter
                    ? appointment.status === selectedStatusFilter
                    : true;

                // Apply time filter
                const appointmentDate = new Date(appointment.start);
                let matchesTimeFilter = true;

                switch (timeFilter) {
                    case 1: // Today
                        matchesTimeFilter = appointmentDate >= today && appointmentDate <= endOfToday;
                        break;
                    case 2: // This Week
                        matchesTimeFilter = appointmentDate >= today && appointmentDate <= endOfWeek;
                        break;
                    case 3: // This Month
                        matchesTimeFilter = appointmentDate >= today && appointmentDate <= endOfMonth;
                        break;
                    default: // All
                        matchesTimeFilter = true;
                }

                return matchesSearch && matchesStatus && matchesTimeFilter;
            })
            .sort((a, b) => {
                // Apply sorting
                switch (sortBy) {
                    case 'date':
                        return new Date(a.start).getTime() - new Date(b.start).getTime();
                    case 'date-desc':
                        return new Date(b.start).getTime() - new Date(a.start).getTime();
                    case 'patient':
                        return a.patient.name.localeCompare(b.patient.name);
                    case 'patient-desc':
                        return b.patient.name.localeCompare(a.patient.name);
                    default:
                        return 0;
                }
            });
    }, [appointments, searchQuery, selectedStatusFilter, sortBy, timeFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
    const displayedAppointments = filteredAppointments.slice(
        (currentPage - 1) * appointmentsPerPage,
        currentPage * appointmentsPerPage
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
                    Appointments
                </SectionTitle>
            </Box>

            {/* Time filter tabs */}
            <StyledTabs value={timeFilter} onChange={handleTimeFilterChange}>
                <StyledTab label="All Appointments" />
                <StyledTab label="Today" />
                <StyledTab label="This Week" />
                <StyledTab label="This Month" />
            </StyledTabs>

            {/* Filters and search section */}
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by patient name or description"
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
                                    <MenuItem value="date">Date (Earliest First)</MenuItem>
                                    <MenuItem value="date-desc">Date (Latest First)</MenuItem>
                                    <MenuItem value="patient">Patient Name (A-Z)</MenuItem>
                                    <MenuItem value="patient-desc">Patient Name (Z-A)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                {/* Status filters */}
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
                        Filter by status:
                    </Typography>
                    <FilterChip
                        label="Booked"
                        clickable
                        selected={selectedStatusFilter === 'booked'}
                        onClick={() => handleStatusFilterChange('booked')}
                    />
                    <FilterChip
                        label="Confirmed"
                        clickable
                        selected={selectedStatusFilter === 'confirmed'}
                        onClick={() => handleStatusFilterChange('confirmed')}
                    />
                    <FilterChip
                        label="Completed"
                        clickable
                        selected={selectedStatusFilter === 'completed'}
                        onClick={() => handleStatusFilterChange('completed')}
                    />
                    <FilterChip
                        label="Cancelled"
                        clickable
                        selected={selectedStatusFilter === 'cancelled'}
                        onClick={() => handleStatusFilterChange('cancelled')}
                    />
                    <FilterChip
                        label="No-Show"
                        clickable
                        selected={selectedStatusFilter === 'no-show'}
                        onClick={() => handleStatusFilterChange('no-show')}
                    />
                </Box>
            </Box>

            {/* Appointments grid */}
            <Box sx={{ mb: 4 }}>
                {displayedAppointments.length > 0 ? (
                    <>
                        <Grid container spacing={3}>
                            {displayedAppointments.map((appointment) => (
                                <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                    <AppointmentCard
                                        appointment={appointment}
                                        onViewDetails={handleViewAppointmentDetails}
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
                            No appointments match your search criteria
                        </Typography>
                        {(searchQuery || selectedStatusFilter || timeFilter !== 0) && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedStatusFilter(null);
                                    setTimeFilter(0);
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