'use client';

import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Button, Paper, Tabs, Tab, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import AddLabResultModal from '../../../../components/patient/AddLabResultModal';

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

const CategoryChip = styled(Chip)(({ theme, selected }: { theme?: any, selected: boolean }) => ({
    borderRadius: '50%',
    height: '64px',
    width: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4px',
    backgroundColor: selected
        ? theme.palette.mode === 'light' ? '#21647D' : '#21647D'
        : theme.palette.mode === 'light' ? '#F5F9FA' : '#262626',
    border: selected
        ? 'none'
        : `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    boxShadow: selected ? '0 4px 8px rgba(0, 0, 0, 0.15)' : 'none',
    '& .MuiChip-label': {
        padding: 0,
        fontSize: '10px',
        color: selected
            ? '#FFFFFF'
            : theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
    '&:hover': {
        backgroundColor: selected
            ? theme.palette.mode === 'light' ? '#1A5369' : '#1A5369'
            : theme.palette.mode === 'light' ? '#EEF6FA' : '#1E2A30',
    },
}));

const BiomarkerCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    marginBottom: theme.spacing(2),
}));

const biomarkerCategories = [
    {
        id: 'all',
        name: 'All',
        icon: '/icons/biomarker.svg',
    },
    {
        id: 'heart',
        name: 'Heart',
        icon: '/icons/heart.svg',
    },
    {
        id: 'kidney',
        name: 'Kidney',
        icon: '/icons/kidney.svg',
    },
    {
        id: 'liver',
        name: 'Liver',
        icon: '/icons/liver.svg',
    },
    {
        id: 'sugar',
        name: 'Sugar',
        icon: '/images/sugar-icon.png',
    },
    {
        id: 'blood',
        name: 'Blood',
        icon: '/icons/blood.svg',
    },
    {
        id: 'thyroid',
        name: 'Thyroid',
        icon: '/icons/thyroid.svg',
    },
    {
        id: 'bone',
        name: 'Bone',
        icon: '/icons/bone.svg',
    },
];

// Sample biomarker data
const biomarkerData = [
    {
        name: 'Total Cholesterol',
        category: 'heart',
        value: null,
        unit: 'mg/dL',
        description: '"good" Cholesterol',
    },
    {
        name: 'HDL Cholesterol',
        category: 'heart',
        value: null,
        unit: 'mg/dL',
        description: '"good" Cholesterol',
    },
    {
        name: 'LDL Cholesterol',
        category: 'heart',
        value: null,
        unit: 'mg/dL',
        description: '"bad" Cholesterol',
    },
    {
        name: 'Blood Pressure',
        category: 'heart',
        value: null,
        unit: 'mmHg',
    },
    {
        name: 'Creatinine',
        category: 'kidney',
        value: null,
        unit: 'mg/dL',
    },
    {
        name: 'Blood Urea Nitrogen',
        category: 'kidney',
        value: null,
        unit: 'mg/dL',
    },
    {
        name: 'Glucose',
        category: 'sugar',
        value: null,
        unit: 'mg/dL',
    },
    {
        name: 'HbA1c',
        category: 'sugar',
        value: null,
        unit: '%',
    },
    {
        name: 'ALT',
        category: 'liver',
        value: null,
        unit: 'U/L',
    },
    {
        name: 'AST',
        category: 'liver',
        value: null,
        unit: 'U/L',
    },
    {
        name: 'Hemoglobin',
        category: 'blood',
        value: null,
        unit: 'g/dL',
    },
    {
        name: 'TSH',
        category: 'thyroid',
        value: null,
        unit: 'mIU/L',
    },
    {
        name: 'Vitamin D',
        category: 'bone',
        value: null,
        unit: 'ng/mL',
    },
];

const BiomarkersPage = () => {
    const { mode } = useThemeContext();
    const [tabValue, setTabValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBiomarker, setSelectedBiomarker] = useState<any>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleAddResult = (biomarker: any) => {
        setSelectedBiomarker(biomarker);
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const filteredBiomarkers = biomarkerData.filter(biomarker => {
        const matchesCategory = selectedCategory === 'all' || biomarker.category === selectedCategory;
        const matchesSearch = searchTerm === '' ||
            biomarker.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                    <IconButton sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                    <IconButton sx={{ color: mode === 'light' ? '#21647D' : '#B8C7CC' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        <CategoryChip
                            key={category.id}
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
                                        }}
                                    />
                                </Box>
                            }
                        />
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

                <StyledTabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    aria-label="biomarker view options"
                >
                    <Tab label="Heart Health" />
                    <Tab label="All Biomarkers" />
                </StyledTabs>
            </Box>

            {/* Biomarker List */}
            <Box>
                {filteredBiomarkers.map((biomarker) => (
                    <BiomarkerCard key={biomarker.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    }}
                                >
                                    {biomarker.name}
                                </Typography>
                                {biomarker.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        }}
                                    >
                                        {biomarker.description}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {biomarker.value !== null ? `${biomarker.value} ${biomarker.unit}` : 'no result'}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => handleAddResult(biomarker)}
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
                    </BiomarkerCard>
                ))}
            </Box>

            {/* Add Lab Result Modal */}
            <AddLabResultModal
                open={showAddModal}
                onClose={handleCloseAddModal}
                biomarker={selectedBiomarker ? {
                    name: selectedBiomarker.name,
                    defaultUnit: selectedBiomarker.unit,
                } : null}
            />
        </PageContainer>
    );
};

export default BiomarkersPage; 