'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Tooltip, Badge } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import Link from 'next/link';
import BiomarkerDetailsModal from './BiomarkerDetailsModal';
import AddLabResultModal from './AddLabResultModal';
import { styled, keyframes } from '@mui/material/styles';

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

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
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components
const BiomarkersContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    animation: `${fadeIn} 0.5s ease-out`,
}));

const BiomarkersHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.mode === 'light' ? '#E7F6FC' : 'rgba(33, 124, 153, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const HeaderTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const BiomarkersGrid = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    border: theme.palette.mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
    borderTop: 'none',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
}));

const BiomarkerItem = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(231, 246, 252, 0.7)' : 'rgba(33, 124, 153, 0.1)',
        transform: 'translateY(-2px)',
    },
    '&:active': {
        transform: 'translateY(1px)',
    },
}));

const BiomarkerContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

const BiomarkerIcon = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 26,
    height: 26,
    marginRight: theme.spacing(2),
    transition: 'all 0.2s ease',
    [theme.breakpoints.down('sm')]: {
        width: 22,
        height: 22,
    },
}));

const BiomarkerName = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '1.3rem',
    fontFamily: 'poppins',
    color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}));

const IndicatorDot = styled(Box)(({ theme, active }: { theme?: any, active: boolean }) => ({
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: active ? '#21647D' : '#E0E0E0',
    opacity: active ? 1 : 0.7,
    transition: 'all 0.2s ease',
    [theme.breakpoints.down('sm')]: {
        width: 7,
        height: 7,
    },
}));

const SeeAllButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(2.5),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(231, 246, 252, 0.3)' : 'rgba(33, 124, 153, 0.05)',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(231, 246, 252, 0.7)' : 'rgba(33, 124, 153, 0.15)',
    },
}));

const SeeAllText = styled(Typography)(({ theme }) => ({
    fontSize: '1.3rem',
    fontWeight: 600,
    fontFamily: 'poppins',
    color: '#21647D',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}));

const AddResultButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    borderColor: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    color: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
    backgroundColor: 'transparent',
    padding: '10px 24px',
    fontSize: '0.95rem',
    fontFamily: 'poppins',
    fontWeight: 500,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
        borderColor: theme.palette.mode === 'light' ? '#21647D' : '#B8C7CC',
        transform: 'translateY(-2px)',
    },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#FF5252',
        color: 'white',
        fontSize: '10px',
        height: '18px',
        minWidth: '18px',
        padding: '0 4px',
    },
}));

// Define the biomarker interface
export interface Biomarker {
    id?: string;
    name: string;
    icon?: string;
    indicators?: number[];
    color?: string;
    hasUpdate?: boolean;
    // Fields from BiomarkerDto
    type?: string;
    value?: string;
    unit?: string;
    referenceRange?: string;
    status?: 'normal' | 'high' | 'low' | 'critical' | 'unknown';
    date?: string;
    trend?: {
        direction: 'up' | 'down' | 'stable';
        percentage?: number;
    };
    performer?: string;
}

interface BiomarkersProps {
    biomarkerData?: Biomarker[];
}

const defaultBiomarkers = [
    {
        id: 'heart',
        name: 'Heart',
        icon: '/icons/heart.svg',
        indicators: [1, 2, 3, 4, 5], // Indicators shown as dots
        color: '#FF5252',
        hasUpdate: true,
    },
    {
        id: 'kidney',
        name: 'Kidney',
        icon: '/icons/kidney.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#FFA726',
        hasUpdate: false,
    },
    {
        id: 'liver',
        name: 'Liver',
        icon: '/icons/liver.svg',
        indicators: [1, 2, 3, 4],
        color: '#E91E63',
        hasUpdate: false,
    },
    {
        id: 'sugar',
        name: 'Sugar',
        icon: '/images/sugar-icon.png',
        indicators: [1, 2, 3],
        color: '#FF9800',
        hasUpdate: true,
    },
    {
        id: 'blood',
        name: 'Blood',
        icon: '/icons/blood.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#F44336',
        hasUpdate: false,
    },
    {
        id: 'thyroid',
        name: 'Thyroid',
        icon: '/icons/thyroid.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#9C27B0',
        hasUpdate: false,
    },
    {
        id: 'bone',
        name: 'Bone',
        icon: '/icons/bone.svg',
        indicators: [1, 2, 3, 4, 5],
        color: '#607D8B',
        hasUpdate: false,
    },
];

const Biomarkers: React.FC<BiomarkersProps> = ({ biomarkerData }) => {
    const { mode } = useThemeContext();
    const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddResultModal, setShowAddResultModal] = useState(false);
    const [hoveredBiomarker, setHoveredBiomarker] = useState<string | null>(null);

    // Use provided biomarker data or fall back to default data
    const biomarkers = biomarkerData || defaultBiomarkers;

    const handleBiomarkerClick = (biomarker: Biomarker) => {
        setSelectedBiomarker(biomarker);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    const handleAddResultClick = () => {
        setShowAddResultModal(true);
    };

    const handleCloseAddResultModal = () => {
        setShowAddResultModal(false);
    };

    return (
        <>
            <BiomarkersContainer>
                {/* Header */}
                <BiomarkersHeader>
                    <HeaderTitle>
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xs: 28, sm: 32, md: 35 },
                                height: { xs: 28, sm: 32, md: 35 },
                                mr: { xs: 1.5, sm: 2 },
                            }}
                        >
                            <Image
                                src="/icons/biomarker.svg"
                                alt="Biomarkers"
                                fill
                                style={{
                                    filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontWeight: 500,
                                color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                fontFamily: 'poppins',
                                fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
                            }}
                        >
                            Biomarkers
                        </Typography>
                    </HeaderTitle>

                    {/* Add header actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="View all biomarkers">
                            <Box
                                component={Link}
                                href="/dashboard/patient/biomarkers"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#21647D',
                                    textDecoration: 'none',
                                    mr: 2,
                                    '&:hover': {
                                        opacity: 0.85,
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                        fontWeight: 600,
                                        fontFamily: 'poppins',
                                        mr: 0.5,
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    View All
                                </Typography>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Box>
                        </Tooltip>
                    </Box>
                </BiomarkersHeader>

                {/* Biomarker Grid */}
                <BiomarkersGrid>
                    {biomarkers.map((category, index) => (
                        <BiomarkerItem
                            key={category.name}
                            onClick={() => handleBiomarkerClick(category)}
                            onMouseEnter={() => setHoveredBiomarker(category.name)}
                            onMouseLeave={() => setHoveredBiomarker(null)}
                            sx={{
                                width: { xs: '50%', sm: '33.33%', md: '25%' },
                                borderRight: {
                                    xs: (index % 2 === 0) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                    sm: (index % 3 !== 2) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                    md: (index % 4 !== 3) ? (mode === 'light' ? '1px solid #eaeaea' : '1px solid #333') : 'none',
                                },
                                borderBottom: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                            }}
                        >
                            <BiomarkerContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
                                    <BiomarkerIcon
                                        sx={{
                                            animation: hoveredBiomarker === category.name ? `${pulse} 1s infinite ease-in-out` : 'none',
                                        }}
                                    >
                                        <Image
                                            src={category.icon}
                                            alt={category.name}
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none'
                                            }}
                                        />
                                    </BiomarkerIcon>
                                    <BiomarkerName>
                                        {category.name}
                                    </BiomarkerName>

                                    {/* Notification badge */}
                                    {category.hasUpdate && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: '#FF5252',
                                            }}
                                        />
                                    )}
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    gap: { xs: 0.75, sm: 1 },
                                    mt: { xs: 1.5, sm: 2 },
                                    pl: 0.5,
                                    animation: hoveredBiomarker === category.name ? `${slideUp} 0.5s ease-out` : 'none',
                                }}>
                                    {category.indicators?.map((_, i) => (
                                        <IndicatorDot
                                            key={i}
                                            active={i < 3} // First 3 indicators are active
                                        />
                                    ))}
                                </Box>
                            </BiomarkerContent>
                        </BiomarkerItem>
                    ))}

                    {/* See All Link */}
                    <SeeAllButton
                        component={Link}
                        href="/dashboard/patient/biomarkers"
                        sx={{
                            width: { xs: '50%', sm: '33.33%', md: '25%' },
                            borderBottom: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(33, 100, 125, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 1,
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 5L19 12L12 19" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Box>
                            <SeeAllText>
                                See All
                            </SeeAllText>
                        </Box>
                    </SeeAllButton>
                </BiomarkersGrid>

                {/* Add Result Button */}
                <Box sx={{
                    p: { xs: 1.75, sm: 2, md: 2.5 },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                    borderLeft: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                    borderRight: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                    borderBottom: mode === 'light' ? '1px solid #eaeaea' : '1px solid #333',
                }}>
                    <AddResultButton
                        variant="outlined"
                        onClick={handleAddResultClick}
                        startIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    >
                        Add Result
                    </AddResultButton>

                    <Typography
                        variant="body2"
                        sx={{
                            color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            fontStyle: 'italic',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        Last updated: 2 days ago
                    </Typography>
                </Box>
            </BiomarkersContainer>

            {/* Biomarker Details Modal */}
            <BiomarkerDetailsModal
                open={showDetailsModal}
                onClose={handleCloseDetailsModal}
                biomarker={selectedBiomarker}
            />

            {/* Add Lab Result Modal */}
            <AddLabResultModal
                open={showAddResultModal}
                onClose={handleCloseAddResultModal}
                biomarker={selectedBiomarker}
            />
        </>
    );
};

export default Biomarkers; 