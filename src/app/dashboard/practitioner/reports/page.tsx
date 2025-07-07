'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress, Alert, TextField, InputAdornment, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import usePractitionerDashboard from '@/hooks/usePractitionerDashboard';
import Image from 'next/image';
import { FaFileMedical, FaSearch } from 'react-icons/fa';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#F0F0F0' : '#333'}`,
    padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.04)' : 'rgba(184, 199, 204, 0.04)',
    },
}));

export default function ReportsPage() {
    const { mode } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const {
        loading,
        error,
        reports,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (type: string) => {
        setSelectedType(type === selectedType ? null : type);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (status: string) => {
        setSelectedStatus(status === selectedStatus ? null : status);
        setCurrentPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Filter reports based on search and filters
    const filteredReports = reports ? reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.patient.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? report.type === selectedType : true;
        const matchesStatus = selectedStatus ? report.status === selectedStatus : true;

        return matchesSearch && matchesType && matchesStatus;
    }) : [];

    // Pagination
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
    const displayedReports = filteredReports.slice(
        (currentPage - 1) * reportsPerPage,
        currentPage * reportsPerPage
    );

    // Get unique report types and statuses for filters
    const reportTypes = reports ? [...new Set(reports.map(report => report.type))] : [];
    const reportStatuses = reports ? [...new Set(reports.map(report => report.status))] : [];

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
                    Reports
                </SectionTitle>
            </Box>

            {/* Search and filters */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search reports by title or patient name"
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

                {/* Type filters */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: mode === 'light' ? '#555' : '#CCC',
                            mb: 1,
                        }}
                    >
                        Filter by type:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {reportTypes.map(type => (
                            <FilterChip
                                key={type}
                                label={type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                clickable
                                selected={selectedType === type}
                                onClick={() => handleTypeFilterChange(type)}
                            />
                        ))}
                    </Box>
                </Box>

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
                        {reportStatuses.map(status => (
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

            {/* Reports table */}
            {displayedReports.length > 0 ? (
                <Box sx={{ mb: 4 }}>
                    <TableContainer component={Paper} sx={{
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                        border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                        borderRadius: 2,
                        boxShadow: 'none',
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Report Title</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Patient</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Type</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Date</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Status</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 600, color: mode === 'light' ? '#333' : '#FFF' }}>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedReports.map((report) => (
                                    <StyledTableRow key={report.id}>
                                        <StyledTableCell sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <FaFileMedical color="#21647D" style={{ marginRight: 8 }} />
                                                {report.title}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>{report.patient.name}</StyledTableCell>
                                        <StyledTableCell sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                                            {report.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>{formatDate(report.date)}</StyledTableCell>
                                        <StyledTableCell>
                                            <Chip
                                                label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: report.status === 'final'
                                                        ? '#E8F5E9'
                                                        : report.status === 'preliminary'
                                                            ? '#FFF3E0'
                                                            : '#E3F2FD',
                                                    color: report.status === 'final'
                                                        ? '#388E3C'
                                                        : report.status === 'preliminary'
                                                            ? '#E64A19'
                                                            : '#1976D2',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
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
                                                }}
                                            >
                                                View
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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
                </Box>
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
                        No reports match your search criteria
                    </Typography>
                    {(searchQuery || selectedType || selectedStatus) && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedType(null);
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