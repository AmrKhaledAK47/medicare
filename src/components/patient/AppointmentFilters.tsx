'use client';

import React from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Chip,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';

// Styled components
const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#1A1A1A',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F0F5F7' : '#252525',
    },
    '& .MuiSelect-select': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#1A1A1A',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#F0F5F7' : '#252525',
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
    '& .MuiOutlinedInput-input': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
}));

const FilterChip = styled(Chip)<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active
        ? theme.palette.mode === 'light'
            ? 'rgba(33, 100, 125, 0.1)'
            : 'rgba(33, 100, 125, 0.2)'
        : theme.palette.mode === 'light'
            ? '#F5F9FA'
            : '#1A1A1A',
    color: active
        ? '#267997'
        : theme.palette.mode === 'light'
            ? '#6C7A89'
            : '#B8C7CC',
    '&:hover': {
        backgroundColor: active
            ? theme.palette.mode === 'light'
                ? 'rgba(33, 100, 125, 0.15)'
                : 'rgba(33, 100, 125, 0.25)'
            : theme.palette.mode === 'light'
                ? '#F0F5F7'
                : '#252525',
    },
}));

interface AppointmentFiltersProps {
    filters: {
        status: string;
        doctor: string;
        dateRange: string;
        search: string;
    };
    onFilterChange: (filters: any) => void;
}

const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
    filters,
    onFilterChange,
}) => {
    const { mode } = useThemeContext();

    const handleChange = (field: string) => (event: any) => {
        onFilterChange({
            ...filters,
            [field]: event.target.value,
        });
    };

    const handleStatusFilter = (status: string) => {
        onFilterChange({
            ...filters,
            status: filters.status === status ? '' : status,
        });
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                variant="subtitle1"
                sx={{
                    mb: 2,
                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                }}
            >
                Filters
            </Typography>

            {/* Status filters */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <FilterChip
                    label="Upcoming"
                    active={filters.status === 'upcoming'}
                    onClick={() => handleStatusFilter('upcoming')}
                />
                <FilterChip
                    label="Completed"
                    active={filters.status === 'completed'}
                    onClick={() => handleStatusFilter('completed')}
                />
                <FilterChip
                    label="Cancelled"
                    active={filters.status === 'cancelled'}
                    onClick={() => handleStatusFilter('cancelled')}
                />
            </Stack>

            {/* Search and other filters */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <StyledTextField
                    label="Search appointments"
                    value={filters.search}
                    onChange={handleChange('search')}
                    size="small"
                    sx={{ minWidth: '200px' }}
                />

                <FormControl size="small" sx={{ minWidth: '150px' }}>
                    <InputLabel sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                        Doctor
                    </InputLabel>
                    <StyledSelect
                value={filters.doctor}
                onChange={handleChange('doctor')}
                        label="Doctor"
            >
                        <MenuItem value="">All Doctors</MenuItem>
                        <MenuItem value="1">Dr. Michael Williams</MenuItem>
                        <MenuItem value="2">Dr. Linda Carter</MenuItem>
                        <MenuItem value="3">Dr. John Smith</MenuItem>
                        <MenuItem value="4">Dr. Sarah Reynolds</MenuItem>
                        <MenuItem value="5">Dr. James Wilson</MenuItem>
                    </StyledSelect>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: '150px' }}>
                    <InputLabel sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                        Date Range
                    </InputLabel>
                    <StyledSelect
                value={filters.dateRange}
                onChange={handleChange('dateRange')}
                        label="Date Range"
            >
                <MenuItem value="">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
                    </StyledSelect>
                </FormControl>
            </Box>
        </Box>
    );
};

export default AppointmentFilters;


