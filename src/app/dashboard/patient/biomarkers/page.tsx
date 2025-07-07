'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, IconButton, Button, Paper, Tabs, Tab, TextField, Alert, CircularProgress, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import AddLabResultModal from '../../../../components/patient/AddLabResultModal';
import useDashboard from '@/hooks/useDashboard';

// Define BiomarkerDto interface based on the API documentation
interface BiomarkerDto {
    id?: string;
    type: string;
    name: string;
    value: string;
    unit: string;
    referenceRange?: string;
    status: 'normal' | 'high' | 'low' | 'critical' | 'unknown';
    date: string;
    trend?: {
        direction: 'up' | 'down' | 'stable';
        percentage?: number;
    };
    performer?: string;
}

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: '1200px',
    margin: '0 auto',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
}));

const HeaderTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const HeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#E7F6FC' : 'rgba(33, 124, 153, 0.15)',
    borderRadius: '24px',
    minHeight: '48px',
    padding: '4px',
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    '& .MuiTab-root': {
        borderRadius: '20px',
        minHeight: '40px',
        padding: '8px 20px',
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'none',
        '&.Mui-selected': {
            backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
            color: theme.palette.mode === 'light' ? '#21647D' : '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
    },
}));

const CategoryChip = styled(Chip)<{ selected?: boolean }>(({ theme, selected }) => ({
    backgroundColor: selected
        ? '#21647D'
        : theme.palette.mode === 'light'
            ? '#F8FBFC'
            : '#262626',
    color: selected
        ? '#FFFFFF'
        : theme.palette.mode === 'light'
            ? '#454747'
            : '#B8C7CC',
    border: `1px solid ${selected
        ? '#21647D'
        : theme.palette.mode === 'light'
            ? '#EEF1F4'
            : '#444444'}`,
    fontWeight: 500,
    padding: '8px 12px',
    '&:hover': {
        backgroundColor: selected
            ? '#21647D'
            : theme.palette.mode === 'light'
                ? '#EEF1F4'
                : '#333333',
        boxShadow: theme.palette.mode === 'light'
            ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
            : '0px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
}));

const BiomarkerCard = styled(Box)(({ theme }) => ({
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    boxShadow: theme.palette.mode === 'light'
        ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
        : '0px 2px 4px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333333'}`,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'light'
            ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
            : '0px 4px 8px rgba(0, 0, 0, 0.3)',
    }
}));

const StatusChip = styled(Chip)<{ status?: string }>(({ theme, status }) => {
    let backgroundColor = '#9E9E9E'; // Default gray
    let textColor = '#FFFFFF';
    let borderColor = 'transparent';

    switch (status?.toLowerCase()) {
        case 'normal':
            backgroundColor = theme.palette.mode === 'light' ? '#E8F5E9' : '#1B5E20';
            textColor = theme.palette.mode === 'light' ? '#2E7D32' : '#FFFFFF';
            borderColor = theme.palette.mode === 'light' ? '#81C784' : 'transparent';
            break;
        case 'high':
        case 'elevated':
            backgroundColor = theme.palette.mode === 'light' ? '#FFF3E0' : '#E65100';
            textColor = theme.palette.mode === 'light' ? '#EF6C00' : '#FFFFFF';
            borderColor = theme.palette.mode === 'light' ? '#FFB74D' : 'transparent';
            break;
        case 'low':
            backgroundColor = theme.palette.mode === 'light' ? '#E3F2FD' : '#0D47A1';
            textColor = theme.palette.mode === 'light' ? '#1565C0' : '#FFFFFF';
            borderColor = theme.palette.mode === 'light' ? '#64B5F6' : 'transparent';
            break;
        case 'critical':
            backgroundColor = theme.palette.mode === 'light' ? '#FFEBEE' : '#B71C1C';
            textColor = theme.palette.mode === 'light' ? '#C62828' : '#FFFFFF';
            borderColor = theme.palette.mode === 'light' ? '#E57373' : 'transparent';
            break;
    }

    return {
        backgroundColor,
        color: textColor,
        fontWeight: 600,
        fontSize: '0.7rem',
        height: '22px',
        border: `1px solid ${borderColor}`,
        '& .MuiChip-label': {
            padding: '0 8px',
        },
    };
});

// Enhance biomarker categories with more metadata
const biomarkerCategories = [
    {
        id: 'all',
        name: 'All',
        icon: '/icons/biomarker.svg',
        description: 'All biomarkers'
    },
    {
        id: 'heart',
        name: 'Heart',
        icon: '/icons/heart.svg',
        description: 'Cholesterol, blood pressure, and heart health',
        types: ['cholesterol', 'hdl', 'ldl', 'triglycerides', 'blood-pressure']
    },
    {
        id: 'kidney',
        name: 'Kidney',
        icon: '/icons/kidney.svg',
        description: 'Kidney function and health',
        types: ['creatinine', 'bun', 'egfr', 'urine-albumin']
    },
    {
        id: 'liver',
        name: 'Liver',
        icon: '/icons/liver.svg',
        description: 'Liver function and enzymes',
        types: ['alt', 'ast', 'alp', 'bilirubin']
    },
    {
        id: 'sugar',
        name: 'Sugar',
        icon: '/images/sugar-icon.png',
        description: 'Blood glucose and diabetes markers',
        types: ['glucose', 'a1c', 'insulin']
    },
    {
        id: 'blood',
        name: 'Blood',
        icon: '/icons/blood.svg',
        description: 'Blood cell counts and composition',
        types: ['hemoglobin', 'hematocrit', 'platelets', 'wbc', 'rbc']
    },
    {
        id: 'thyroid',
        name: 'Thyroid',
        icon: '/icons/thyroid.svg',
        description: 'Thyroid function and hormones',
        types: ['tsh', 't3', 't4', 'free-t4']
    },
    {
        id: 'bone',
        name: 'Bone',
        icon: '/icons/bone.svg',
        description: 'Bone health and minerals',
        types: ['calcium', 'vitamin-d', 'phosphorus']
    },
];

// Helper function to map biomarker types to categories
const mapBiomarkerTypeToCategory = (biomarkerType: string): string => {
    const type = biomarkerType.toLowerCase();
    const name = biomarkerType.toLowerCase();

    // Check both type and name for better categorization

    // Heart category
    if (['cholesterol', 'hdl', 'ldl', 'triglycerides', 'blood-pressure', 'total-cholesterol', 'bp', 'heart'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'heart';
    }

    // Kidney category
    if (['creatinine', 'bun', 'egfr', 'urine-albumin', 'urine-protein', 'uric-acid', 'kidney', 'renal'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'kidney';
    }

    // Liver category
    if (['alt', 'ast', 'alp', 'bilirubin', 'albumin', 'ggt', 'liver-enzymes', 'liver', 'hepatic', 'aminotransferase'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'liver';
    }

    // Sugar category
    if (['glucose', 'a1c', 'insulin', 'blood-glucose', 'fasting-glucose', 'hba1c', 'sugar', 'diabetes'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'sugar';
    }

    // Blood category
    if (['hemoglobin', 'hematocrit', 'platelets', 'wbc', 'rbc', 'mch', 'mchc', 'mcv', 'iron', 'blood', 'cbc'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'blood';
    }

    // Thyroid category
    if (['tsh', 't3', 't4', 'free-t4', 'free-t3', 'thyroid', 'thyroxine', 'triiodothyronine'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'thyroid';
    }

    // Bone category
    if (['calcium', 'vitamin-d', 'phosphorus', 'bone-density', 'vitamin-d3', 'magnesium', 'bone'].some(term =>
        type.includes(term) || name.includes(term))) {
        return 'bone';
    }

    // Default to 'all' if no match found
    return 'all';
};

// Format date for display
const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    } catch (error) {
        return dateString;
    }
};

// Helper function to format biomarker names to be more user-friendly
const formatBiomarkerName = (biomarker: BiomarkerDto): string => {
    // If the name contains brackets, extract just the main part
    if (biomarker.name.includes('[')) {
        // Extract the analyte name (the part before the first bracket)
        const analyteName = biomarker.name.split('[')[0].trim();
        return analyteName;
    }

    // Handle common biomarker names
    const commonNames: Record<string, string> = {
        'Glucose [Mass/volume] in Serum or Plasma': 'Glucose',
        'Creatinine [Mass/volume] in Serum or Plasma': 'Creatinine',
        'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma': 'AST',
        'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma': 'ALT',
        'Cholesterol [Mass/volume] in Serum or Plasma': 'Total Cholesterol',
        'Cholesterol in HDL [Mass/volume] in Serum or Plasma': 'HDL Cholesterol',
        'Cholesterol in LDL [Mass/volume] in Serum or Plasma': 'LDL Cholesterol',
        'Triglyceride [Mass/volume] in Serum or Plasma': 'Triglycerides',
        'Hemoglobin [Mass/volume] in Blood': 'Hemoglobin',
        'Hematocrit [Volume Fraction] of Blood': 'Hematocrit',
        'Platelets [#/volume] in Blood': 'Platelets',
        'Leukocytes [#/volume] in Blood': 'White Blood Cells',
        'Erythrocytes [#/volume] in Blood': 'Red Blood Cells',
        'Thyroid stimulating hormone [Units/volume] in Serum or Plasma': 'TSH',
        'Thyroxine (T4) free [Mass/volume] in Serum or Plasma': 'Free T4',
        'Triiodothyronine (T3) [Mass/volume] in Serum or Plasma': 'T3'
    };

    // Check if we have a mapping for this biomarker
    if (commonNames[biomarker.name]) {
        return commonNames[biomarker.name];
    }

    // If type is available and name is too complex, use type as fallback
    if (biomarker.type && biomarker.name.length > 30) {
        // Capitalize the first letter of each word in the type
        return biomarker.type
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return biomarker.name || biomarker.type;
};

// Helper function to format reference ranges for better display
const formatReferenceRange = (referenceRange?: string): string => {
    if (!referenceRange) return '';

    // If the reference range already looks good, return it as is
    if (referenceRange.includes('-') || referenceRange.includes('to')) {
        return referenceRange;
    }

    // Try to extract numbers from the reference range
    const numbers = referenceRange.match(/\d+(\.\d+)?/g);
    if (!numbers || numbers.length < 1) return referenceRange;

    // Format based on the pattern
    if (referenceRange.toLowerCase().includes('<')) {
        return `< ${numbers[0]} ${referenceRange.replace(/[<>0-9\s.]/g, '').trim()}`;
    } else if (referenceRange.toLowerCase().includes('>')) {
        return `> ${numbers[0]} ${referenceRange.replace(/[<>0-9\s.]/g, '').trim()}`;
    } else if (numbers.length >= 2) {
        return `${numbers[0]} - ${numbers[1]} ${referenceRange.replace(/[<>0-9\s.]/g, '').trim()}`;
    }

    return referenceRange;
};

const BiomarkersPage = () => {
    const { mode } = useThemeContext();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBiomarker, setSelectedBiomarker] = useState<BiomarkerDto | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [detailBiomarker, setDetailBiomarker] = useState<BiomarkerDto | null>(null);

    // Get biomarker data from the dashboard hook
    const {
        biomarkers,
        loading,
        error,
        componentErrors,
        refreshDashboard
    } = useDashboard();

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleAddResult = (biomarker: BiomarkerDto) => {
        setSelectedBiomarker(biomarker);
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleOpenDetail = (biomarker: BiomarkerDto) => {
        setDetailBiomarker(biomarker);
    };

    const handleCloseDetail = () => {
        setDetailBiomarker(null);
    };

    // Count biomarkers in each category
    const categoryCounts = React.useMemo(() => {
        const counts: Record<string, number> = {};

        if (biomarkers) {
            biomarkers.forEach((biomarker) => {
                const category = mapBiomarkerTypeToCategory(biomarker.type);
                counts[category] = (counts[category] || 0) + 1;
            });
        }

        return counts;
    }, [biomarkers]);

    // Filter biomarkers based on category and search term
    const filteredBiomarkers = biomarkers?.filter((biomarker) => {
        const biomarkerCategory = mapBiomarkerTypeToCategory(biomarker.type || '');
        const matchesCategory = selectedCategory === 'all' || biomarkerCategory === selectedCategory;

        const matchesSearch = searchTerm === '' ||
            (biomarker.name || biomarker.type || '').toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress size={60} thickness={4} sx={{ color: '#21647D' }} />
                <Typography variant="h6" sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }}>
                    Loading biomarkers data...
                </Typography>
            </Box>
        );
    }

    if (error || componentErrors?.biomarkers) {
        return (
            <PageContainer>
                <HeaderContainer>
                    <HeaderTitle>
                        <IconButton
                            component={Link}
                            href="/dashboard/patient"
                            sx={{
                                mr: 2,
                                color: mode === 'light' ? '#21647D' : '#B8C7CC',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: mode === 'light' ? '#21647D' : '#FFFFFF',
                            }}
                        >
                            Biomarkers
                        </Typography>
                    </HeaderTitle>
                </HeaderContainer>

                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={refreshDashboard}
                        >
                            Retry
                        </Button>
                    }
                >
                    {error || componentErrors?.biomarkers || 'Failed to load biomarkers data'}
                </Alert>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <HeaderContainer>
                <HeaderTitle>
                    <IconButton
                        component={Link}
                        href="/dashboard/patient"
                        sx={{
                            mr: 2,
                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#21647D' : '#FFFFFF',
                        }}
                    >
                        Biomarkers
                    </Typography>
                </HeaderTitle>
                <HeaderActions>
                    <IconButton
                        sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }}
                        onClick={() => setShowAddModal(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                    <IconButton
                        sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }}
                        onClick={refreshDashboard}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.51 9.00001C4.01717 7.56682 4.87913 6.2989 6.01547 5.33301C7.1518 4.36711 8.52547 3.73173 9.99871 3.48735C11.4719 3.24297 12.9755 3.40072 14.3695 3.94358C15.7635 4.48645 16.9994 5.39344 17.94 6.56001L23 12M1 12L6.06 17.44C7.00063 18.6066 8.23655 19.5136 9.63054 20.0564C11.0245 20.5993 12.5281 20.757 14.0013 20.5127C15.4745 20.2683 16.8482 19.6329 17.9845 18.667C19.1209 17.7011 19.9828 16.4332 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                </HeaderActions>
            </HeaderContainer>

            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                    }}
                >
                    Body Function
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    {biomarkerCategories.map((category) => (
                        <Box
                            key={category.id}
                            sx={{ position: 'relative' }}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <CategoryChip
                                label={category.name}
                                selected={selectedCategory === category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                avatar={
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: 24,
                                            height: 24,
                                            mb: 0.5,
                                        }}
                                    >
                                        <Image
                                            src={category.icon}
                                            alt={category.name}
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                filter: selectedCategory === category.id || mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                                                marginLeft: "-4px"
                                            }}
                                        />
                                    </Box>
                                }
                            />
                            {categoryCounts[category.id] > 0 && category.id !== 'all' && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        backgroundColor: '#21647D',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        border: '2px solid white',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {categoryCounts[category.id]}
                                </Box>
                            )}
                            {hoveredCategory === category.id && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        mt: 1,
                                        p: 1,
                                        backgroundColor: mode === 'light' ? 'white' : '#2B2B2B',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        zIndex: 10,
                                        width: 'max-content',
                                        maxWidth: '200px',
                                        border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                                        {category.description}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        placeholder="Search biomarkers..."
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Box
                                    sx={{
                                        mr: 1,
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Box>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
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
                        }}
                    />
                </Box>
            </Box>

            {/* Biomarker List with enhanced display */}
            <Box>
                {filteredBiomarkers && filteredBiomarkers.length > 0 ? (
                    <>
                        {selectedCategory !== 'all' && (
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image
                                        src={biomarkerCategories.find(cat => cat.id === selectedCategory)?.icon || '/icons/biomarker.svg'}
                                        alt={selectedCategory}
                                        width={24}
                                        height={24}
                                        style={{
                                            filter: mode === 'dark' ? 'brightness(0) invert(1)' : 'none'
                                        }}
                                    />
                                </Box>
                                {biomarkerCategories.find(cat => cat.id === selectedCategory)?.name || 'Biomarkers'} Results
                            </Typography>
                        )}
                        {filteredBiomarkers.map(biomarker => (
                            <BiomarkerCard
                                key={`${biomarker.name}-${biomarker.value}-${biomarker.date}`}
                                onClick={() => handleOpenDetail(biomarker)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Tooltip title={biomarker.name} arrow placement="top">
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                    }}
                                                >
                                                    {formatBiomarkerName(biomarker)}
                                                </Typography>
                                            </Tooltip>
                                            {biomarker.status && (
                                                <StatusChip
                                                    label={biomarker.status}
                                                    status={biomarker.status}
                                                    size="small"
                                                />
                                            )}
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                fontSize: '0.8rem',
                                                fontStyle: 'italic',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: { xs: '100%', sm: '400px', md: '500px' }
                                            }}
                                        >
                                            {biomarker.name}
                                        </Typography>
                                        {biomarker.date && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                Last updated: {formatDate(biomarker.date)}
                                                {biomarker.performer && (
                                                    <> • Performed by: {biomarker.performer}</>
                                                )}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {biomarker.value !== undefined ? (
                                                <>
                                                    {biomarker.value}
                                                    <Typography component="span" sx={{ fontSize: '0.8rem', ml: 0.5, fontWeight: 400 }}>
                                                        {biomarker.unit}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    no result
                                                </Typography>
                                            )}
                                        </Typography>
                                        {biomarker.referenceRange && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                Reference: {formatReferenceRange(biomarker.referenceRange)}
                                            </Typography>
                                        )}
                                        <Button
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddResult(biomarker);
                                            }}
                                            sx={{
                                                color: '#21647D',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            Add Result
                                        </Button>
                                    </Box>
                                </Box>

                                {biomarker.trend && (
                                    <Box sx={{
                                        mt: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: biomarker.trend.direction === 'up'
                                            ? '#F44336'
                                            : biomarker.trend.direction === 'down'
                                                ? '#4CAF50'
                                                : '#FFC107'
                                    }}>
                                        {biomarker.trend.direction === 'up' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {biomarker.trend.direction === 'down' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {biomarker.trend.direction === 'stable' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                                            {biomarker.trend.percentage
                                                ? `${biomarker.trend.percentage}%`
                                                : biomarker.trend.direction}
                                        </Typography>
                                        <Typography variant="body2" sx={{ ml: 0.5, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            since last measurement
                                        </Typography>
                                    </Box>
                                )}

                                {/* Add a simple progress bar for visual representation */}
                                {biomarker.value && biomarker.referenceRange && (
                                    <Box sx={{ mt: 2, position: 'relative', height: '6px', borderRadius: '3px', backgroundColor: mode === 'light' ? '#EEF1F4' : '#333', overflow: 'hidden' }}>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                height: '100%',
                                                width: `${calculateValuePercentage(biomarker.value, biomarker.referenceRange)}%`,
                                                backgroundColor: getColorForStatus(biomarker.status),
                                                borderRadius: '3px',
                                            }}
                                        />
                                    </Box>
                                )}
                            </BiomarkerCard>
                        ))}
                    </>
                ) : (
                    <Box sx={{
                        textAlign: 'center',
                        py: 5,
                        backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                        borderRadius: '12px',
                        border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                    }}>
                        <Box sx={{ mb: 2 }}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v4"></path>
                                <path d="M12 16h.01"></path>
                            </svg>
                        </Box>
                        <Typography variant="h6" sx={{ color: '#777777', mb: 1 }}>
                            No biomarkers found
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#999999', mb: 3, maxWidth: '400px', mx: 'auto' }}>
                            {searchTerm ?
                                `No biomarkers match your search "${searchTerm}". Try a different search term or category.` :
                                selectedCategory !== 'all' ?
                                    `No biomarkers found in the ${selectedCategory} category. Try a different category.` :
                                    'No biomarker data is available. Add your first biomarker result to get started.'}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setShowAddModal(true)}
                            startIcon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                            sx={{
                                borderColor: '#21647D',
                                color: '#21647D',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontFamily: 'poppins',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                    borderColor: '#21647D',
                                },
                            }}
                        >
                            Add Biomarker Result
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Add Lab Result Modal */}
            <AddLabResultModal
                open={showAddModal}
                onClose={handleCloseAddModal}
                biomarker={selectedBiomarker ? {
                    name: selectedBiomarker.name || selectedBiomarker.type,
                    type: selectedBiomarker.type,
                    defaultUnit: selectedBiomarker.unit,
                } : null}
            />

            {/* Biomarker Detail Dialog */}
            <Dialog
                open={detailBiomarker !== null}
                onClose={handleCloseDetail}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
                        boxShadow: mode === 'light'
                            ? '0px 4px 20px rgba(0, 0, 0, 0.1)'
                            : '0px 4px 20px rgba(0, 0, 0, 0.5)',
                    }
                }}
            >
                {detailBiomarker && (
                    <>
                        <DialogTitle sx={{
                            borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333333'}`,
                            px: 3,
                            py: 2
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                                    {formatBiomarkerName(detailBiomarker)}
                                </Typography>
                                {detailBiomarker.status && (
                                    <StatusChip
                                        label={detailBiomarker.status}
                                        status={detailBiomarker.status}
                                        size="small"
                                    />
                                )}
                            </Box>
                            <Typography variant="body2" sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                mt: 0.5
                            }}>
                                {detailBiomarker.name}
                            </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ px: 3, py: 3 }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                        Current Value
                                    </Typography>
                                    <Typography variant="h4" sx={{
                                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'baseline'
                                    }}>
                                        {detailBiomarker.value}
                                        <Typography component="span" sx={{ fontSize: '1rem', ml: 0.5, fontWeight: 400 }}>
                                            {detailBiomarker.unit}
                                        </Typography>
                                    </Typography>

                                    {detailBiomarker.referenceRange && (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                                Reference Range
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formatReferenceRange(detailBiomarker.referenceRange)}
                                            </Typography>
                                        </Box>
                                    )}

                                    {detailBiomarker.trend && (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                                Trend
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: detailBiomarker.trend.direction === 'up'
                                                    ? '#F44336'
                                                    : detailBiomarker.trend.direction === 'down'
                                                        ? '#4CAF50'
                                                        : '#FFC107'
                                            }}>
                                                {detailBiomarker.trend.direction === 'up' && (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                {detailBiomarker.trend.direction === 'down' && (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                {detailBiomarker.trend.direction === 'stable' && (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
                                                    {detailBiomarker.trend.percentage
                                                        ? `${detailBiomarker.trend.percentage}%`
                                                        : detailBiomarker.trend.direction}
                                                </Typography>
                                                <Typography variant="body1" sx={{ ml: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    since last measurement
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                        Information
                                    </Typography>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 2,
                                        '& .label': {
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            fontWeight: 400,
                                            fontSize: '0.875rem'
                                        },
                                        '& .value': {
                                            fontWeight: 500,
                                            fontSize: '0.875rem'
                                        }
                                    }}>
                                        <Typography className="label">Category:</Typography>
                                        <Typography className="value" sx={{ textTransform: 'capitalize' }}>
                                            {mapBiomarkerTypeToCategory(detailBiomarker.type)}
                                        </Typography>

                                        <Typography className="label">Type:</Typography>
                                        <Typography className="value" sx={{ textTransform: 'capitalize' }}>
                                            {detailBiomarker.type.replace(/-/g, ' ')}
                                        </Typography>

                                        <Typography className="label">Date:</Typography>
                                        <Typography className="value">
                                            {formatDate(detailBiomarker.date)}
                                        </Typography>

                                        {detailBiomarker.performer && (
                                            <>
                                                <Typography className="label">Performed by:</Typography>
                                                <Typography className="value">{detailBiomarker.performer}</Typography>
                                            </>
                                        )}
                                    </Box>

                                    {/* Visual representation of the value */}
                                    {detailBiomarker.value && detailBiomarker.referenceRange && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', mb: 1 }}>
                                                Visual Representation
                                            </Typography>
                                            <Box sx={{
                                                position: 'relative',
                                                height: '12px',
                                                borderRadius: '6px',
                                                backgroundColor: mode === 'light' ? '#EEF1F4' : '#333',
                                                overflow: 'hidden',
                                                mb: 1
                                            }}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        height: '100%',
                                                        width: `${calculateValuePercentage(detailBiomarker.value, detailBiomarker.referenceRange)}%`,
                                                        backgroundColor: getColorForStatus(detailBiomarker.status),
                                                        borderRadius: '6px',
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '0.75rem',
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC'
                                            }}>
                                                <Typography variant="caption">Low</Typography>
                                                <Typography variant="caption">Normal Range</Typography>
                                                <Typography variant="caption">High</Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{
                            borderTop: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333333'}`,
                            px: 3,
                            py: 2,
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                onClick={handleCloseDetail}
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    textTransform: 'none',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleAddResult(detailBiomarker);
                                    handleCloseDetail();
                                }}
                                sx={{
                                    backgroundColor: '#21647D',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#1A5369',
                                    },
                                }}
                            >
                                Add New Result
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </PageContainer>
    );
};

// Helper function to calculate value percentage for the progress bar - improved version
const calculateValuePercentage = (value: string, referenceRange: string): number => {
    try {
        const numValue = parseFloat(value);

        // Extract min and max from reference range
        const numbers = referenceRange.match(/\d+(\.\d+)?/g);
        if (!numbers || numbers.length < 1) return 50;

        let min = 0;
        let max = 100;
        let range = max - min;

        if (numbers.length >= 2) {
            min = parseFloat(numbers[0]);
            max = parseFloat(numbers[1]);
            range = max - min;

            // Add padding to the range to avoid values being at the extreme ends
            const padding = range * 0.2; // 20% padding
            min = min - padding;
            max = max + padding;
        } else if (referenceRange.toLowerCase().includes('<')) {
            // For ranges like "< 200 mg/dL"
            max = parseFloat(numbers[0]);
            min = 0;

            // If the value is above the max, extend the scale
            if (numValue > max) {
                const excess = numValue - max;
                max = numValue + (excess * 0.1); // Add 10% padding
            }
        } else if (referenceRange.toLowerCase().includes('>')) {
            // For ranges like "> 40 mg/dL"
            min = parseFloat(numbers[0]);
            max = min * 2; // Use a reasonable maximum

            // If the value is below the min, extend the scale
            if (numValue < min) {
                const deficit = min - numValue;
                min = numValue - (deficit * 0.1); // Add 10% padding
            }
        }

        // Calculate percentage position
        let percentage = ((numValue - min) / (max - min)) * 100;

        // Clamp between 5 and 95 to always show some bar
        percentage = Math.max(5, Math.min(95, percentage));

        return percentage;
    } catch (error) {
        return 50; // Default to middle if parsing fails
    }
};

// Helper function to get color based on status
const getColorForStatus = (status?: string): string => {
    switch (status?.toLowerCase()) {
        case 'normal':
            return '#4CAF50'; // Green
        case 'high':
        case 'elevated':
            return '#FF9800'; // Orange
        case 'low':
            return '#2196F3'; // Blue
        case 'critical':
            return '#F44336'; // Red
        case 'unknown':
            return '#9E9E9E'; // Grey
        default:
            return '#9E9E9E'; // Grey
    }
};

export default BiomarkersPage; 