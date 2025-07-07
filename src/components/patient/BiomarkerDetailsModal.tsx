'use client';

import React, { useState, useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    Chip,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';
import Image from 'next/image';

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
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
        border: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
        overflow: 'hidden',
        animation: `${fadeIn} 0.3s ease-out`,
        maxWidth: '800px',
        width: '90%',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(245, 249, 250, 0.8)' : 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(5px)',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: '24px',
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: '1.75rem',
    borderBottom: theme.palette.mode === 'light' ? '1px solid rgba(238, 241, 244, 0.7)' : '1px solid rgba(51, 51, 51, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? 'rgba(108, 122, 137, 0.2)' : 'rgba(184, 199, 204, 0.2)',
        borderRadius: '4px',
    },
}));

const InfoCard = styled(Box)(({ theme }) => ({
    padding: '20px',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    marginBottom: '24px',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.15s',
    opacity: 0,
}));

const ChartContainer = styled(Box)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    marginBottom: '24px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: `${slideUp} 0.4s ease-out forwards`,
    animationDelay: '0.2s',
    opacity: 0,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: '24px',
    '& .MuiTabs-indicator': {
        backgroundColor: '#21647D',
    },
    '& .MuiTab-root': {
        textTransform: 'none',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
        '&.Mui-selected': {
            color: '#21647D',
            fontWeight: 600,
        },
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    fontFamily: 'poppins',
    textTransform: 'none',
    padding: '10px 20px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
}));

const RangeIndicator = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#444',
    marginTop: '8px',
    marginBottom: '24px',
    width: '100%',
}));

const RangeMarker = styled(Box)<{ position: number, isValue?: boolean }>(({ theme, position, isValue }) => ({
    position: 'absolute',
    top: isValue ? '-6px' : '0',
    left: `${position}%`,
    transform: 'translateX(-50%)',
    width: isValue ? '20px' : '3px',
    height: isValue ? '20px' : '8px',
    borderRadius: isValue ? '50%' : '1px',
    backgroundColor: isValue ? '#21647D' : '#FFD700',
    zIndex: isValue ? 2 : 1,
    border: isValue ? `2px solid ${theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B'}` : 'none',
}));

interface BiomarkerDetailsModalProps {
    open: boolean;
    onClose: () => void;
    biomarker?: {
        id?: string;
        name?: string;
        type?: string;
        icon?: string;
        color?: string;
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
        relatedBiomarkers?: Array<{
            id?: string;
            name?: string;
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
        }>;
    } | null;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`biomarker-tabpanel-${index}`}
            aria-labelledby={`biomarker-tab-${index}`}
            {...other}
            style={{ animationDelay: '0.2s' }}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const BiomarkerDetailsModal: React.FC<BiomarkerDetailsModalProps> = ({ open, onClose, biomarker }) => {
    const { mode } = useThemeContext();
    const [tabValue, setTabValue] = useState(0);
    const [selectedBiomarkerDetail, setSelectedBiomarkerDetail] = useState<any>(null);
    const [iconError, setIconError] = useState(false);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Reset icon error state when modal opens or biomarker changes
    React.useEffect(() => {
        if (open) {
            setIconError(false);
        }
    }, [open, biomarker]);

    // Get the most recent biomarker detail from the related biomarkers
    const latestBiomarkerDetail = useMemo(() => {
        if (!biomarker?.relatedBiomarkers || biomarker.relatedBiomarkers.length === 0) {
            return biomarker; // Use the main biomarker if no related ones
        }

        return biomarker.relatedBiomarkers.reduce((latest, current) => {
            if (!latest) return current;
            if (!current.date) return latest;
            if (!latest.date) return current;

            return new Date(current.date) > new Date(latest.date) ? current : latest;
        }, null);
    }, [biomarker]);

    // Use the selected biomarker detail or the latest one
    const activeBiomarkerDetail = selectedBiomarkerDetail || latestBiomarkerDetail || biomarker;

    // Format date for display
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';

        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    // Get status color
    const getStatusColor = (status?: string) => {
        if (!status) return '#6C7A89';

        switch (status.toLowerCase()) {
            case 'normal':
                return '#4CAF50';
            case 'elevated':
            case 'high':
                return '#FF9800';
            case 'critical':
                return '#F44336';
            case 'low':
                return '#2196F3';
            default:
                return '#6C7A89';
        }
    };

    // Parse reference range to get min and max values
    const parseReferenceRange = (range?: string) => {
        if (!range) return { min: 0, max: 100 };

        // Try to extract numeric values from the range string
        const numbers = range.match(/\d+(\.\d+)?/g);
        if (numbers && numbers.length >= 2) {
            return {
                min: parseFloat(numbers[0]),
                max: parseFloat(numbers[1])
            };
        }

        return { min: 0, max: 100 };
    };

    // Calculate position percentage for the current value in the range
    const calculateValuePosition = (value?: string, range?: string) => {
        if (!value || !range) return 50;

        const numValue = parseFloat(value);
        const { min, max } = parseReferenceRange(range);

        if (isNaN(numValue)) return 50;

        // Calculate percentage position
        let position = ((numValue - min) / (max - min)) * 100;

        // Clamp between 0 and 100
        position = Math.max(0, Math.min(100, position));

        return position;
    };

    // Get default icon based on biomarker type
    const getDefaultIcon = (biomarkerType?: string) => {
        if (!biomarkerType) return '/icons/biomarker.svg';

        const type = biomarkerType.toLowerCase();

        if (type.includes('cholesterol') || type.includes('hdl') || type.includes('ldl') ||
            type.includes('triglycerides') || type.includes('blood-pressure')) {
            return '/icons/heart.svg';
        }

        if (type.includes('creatinine') || type.includes('bun') || type.includes('egfr') ||
            type.includes('urine-albumin')) {
            return '/icons/kidney.svg';
        }

        if (type.includes('alt') || type.includes('ast') || type.includes('alp') ||
            type.includes('bilirubin')) {
            return '/icons/liver.svg';
        }

        if (type.includes('glucose') || type.includes('a1c') || type.includes('insulin')) {
            return '/images/sugar-icon.png';
        }

        if (type.includes('hemoglobin') || type.includes('hematocrit') || type.includes('platelets') ||
            type.includes('wbc') || type.includes('rbc')) {
            return '/icons/blood.svg';
        }

        if (type.includes('tsh') || type.includes('t3') || type.includes('t4')) {
            return '/icons/thyroid.svg';
        }

        if (type.includes('calcium') || type.includes('vitamin-d') || type.includes('phosphorus')) {
            return '/icons/bone.svg';
        }

        return '/icons/biomarker.svg';
    };

    // Get biomarker color based on type or status
    const getBiomarkerColor = () => {
        if (biomarker?.color) return biomarker.color;

        if (activeBiomarkerDetail?.status) {
            return getStatusColor(activeBiomarkerDetail.status);
        }

        return '#21647D'; // Default color
    };

    if (!biomarker) return null;

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <StyledDialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        position: 'relative',
                        width: 36,
                        height: 36,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: iconError ? (mode === 'light' ? '#F5F9FA' : '#262626') : 'transparent',
                        borderRadius: '50%',
                    }}>
                        {!iconError ? (
                            <Image
                                src={biomarker.icon || getDefaultIcon(biomarker.type)}
                                alt={biomarker.name || biomarker.type || 'Biomarker'}
                                width={36}
                                height={36}
                                onError={() => setIconError(true)}
                                style={{
                                    filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </Box>
                    {biomarker.name || biomarker.type || 'Biomarker'} Details
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </IconButton>
            </StyledDialogTitle>

            <StyledDialogContent>
                <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="biomarker tabs">
                    <Tab label="Overview" id="biomarker-tab-0" aria-controls="biomarker-tabpanel-0" />
                    <Tab label="History" id="biomarker-tab-1" aria-controls="biomarker-tabpanel-1" />
                    <Tab label="Reference" id="biomarker-tab-2" aria-controls="biomarker-tabpanel-2" />
                </StyledTabs>

                <TabPanel value={tabValue} index={0}>
                    {activeBiomarkerDetail ? (
                        <InfoCard>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        mb: 1,
                                    }}>
                                        {activeBiomarkerDetail.name || activeBiomarkerDetail.type || 'Latest Result'}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    }}>
                                        {formatDate(activeBiomarkerDetail.date)}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h4" sx={{
                                        fontWeight: 700,
                                        color: getBiomarkerColor(),
                                        mb: 0.5,
                                        fontFamily: 'poppins',
                                    }}>
                                        {activeBiomarkerDetail.value || 'N/A'}
                                        <Typography component="span" sx={{
                                            fontSize: '1rem',
                                            ml: 0.5,
                                            fontWeight: 400,
                                        }}>
                                            {activeBiomarkerDetail.unit || ''}
                                        </Typography>
                                    </Typography>
                                    <Chip
                                        label={activeBiomarkerDetail.status || 'Unknown'}
                                        size="small"
                                        sx={{
                                            backgroundColor: `${getStatusColor(activeBiomarkerDetail.status)}22`,
                                            color: getStatusColor(activeBiomarkerDetail.status),
                                            fontWeight: 500,
                                        }}
                                    />
                                </Box>
                            </Box>

                            {activeBiomarkerDetail.referenceRange && (
                                <>
                                    <Divider sx={{ my: 2 }} />

                                    <Typography variant="subtitle2" sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    }}>
                                        Reference Range: {activeBiomarkerDetail.referenceRange}
                                    </Typography>

                                    <RangeIndicator>
                                        <RangeMarker position={35} />
                                        <RangeMarker position={75} />
                                        <RangeMarker
                                            position={calculateValuePosition(
                                                activeBiomarkerDetail.value,
                                                activeBiomarkerDetail.referenceRange
                                            )}
                                            isValue
                                        />

                                        <LinearProgress
                                            variant="determinate"
                                            value={35}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                height: '8px',
                                                borderRadius: '4px',
                                                backgroundColor: 'transparent',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: getBiomarkerColor(),
                                                }
                                            }}
                                        />
                                    </RangeIndicator>
                                </>
                            )}

                            {activeBiomarkerDetail.trend && (
                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{
                                        fontWeight: 500,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        mr: 1,
                                    }}>
                                        Trend:
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: activeBiomarkerDetail.trend.direction === 'up'
                                            ? '#F44336'
                                            : activeBiomarkerDetail.trend.direction === 'down'
                                                ? '#4CAF50'
                                                : '#FFC107'
                                    }}>
                                        {activeBiomarkerDetail.trend.direction === 'up' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {activeBiomarkerDetail.trend.direction === 'down' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {activeBiomarkerDetail.trend.direction === 'stable' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                                            {activeBiomarkerDetail.trend.percentage
                                                ? `${activeBiomarkerDetail.trend.percentage}%`
                                                : activeBiomarkerDetail.trend.direction}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </InfoCard>
                    ) : (
                        <InfoCard>
                            <Typography variant="body1" sx={{ textAlign: 'center', color: '#6C7A89' }}>
                                No biomarker data available
                            </Typography>
                        </InfoCard>
                    )}

                    <ChartContainer>
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                fontStyle: 'italic'
                            }}
                        >
                            Trend chart visualization would be displayed here
                        </Typography>
                    </ChartContainer>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        animation: `${slideUp} 0.4s ease-out forwards`,
                        animationDelay: '0.25s',
                        opacity: 0,
                    }}>
                        <ActionButton
                            variant="outlined"
                            sx={{
                                borderColor: '#21647D',
                                color: '#21647D',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                    borderColor: '#21647D',
                                },
                            }}
                            onClick={() => setTabValue(1)}
                        >
                            View History
                        </ActionButton>

                        <ActionButton
                            variant="contained"
                            sx={{
                                backgroundColor: '#21647D',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1A5369',
                                },
                            }}
                        >
                            Add Result
                        </ActionButton>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                            backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.15s',
                            opacity: 0,
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="biomarker history table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    }}>
                                        Type
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    }}>
                                        Date
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    }}>
                                        Value
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    }}>
                                        Unit
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 600,
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                        borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                    }}>
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {biomarker.relatedBiomarkers && biomarker.relatedBiomarkers.length > 0 ? (
                                    biomarker.relatedBiomarkers.map((biomarkerDetail, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                backgroundColor: index % 2 === 0
                                                    ? (mode === 'light' ? '#F8FBFC' : '#262626')
                                                    : 'transparent',
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: mode === 'light' ? '#EEF6FA' : '#1E2A30',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                            onClick={() => setSelectedBiomarkerDetail(biomarkerDetail)}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                }}
                                            >
                                                {biomarkerDetail.type || biomarkerDetail.name || 'Unknown'}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                }}
                                            >
                                                {formatDate(biomarkerDetail.date)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontWeight: 600,
                                                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                    color: getBiomarkerColor(),
                                                }}
                                            >
                                                {biomarkerDetail.value || 'N/A'}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                }}
                                            >
                                                {biomarkerDetail.unit || '-'}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                }}
                                            >
                                                <Chip
                                                    label={biomarkerDetail.status || 'Unknown'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: `${getStatusColor(biomarkerDetail.status)}22`,
                                                        color: getStatusColor(biomarkerDetail.status),
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ color: '#6C7A89' }}>
                                                No history data available
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.25s',
                            opacity: 0,
                        }}
                    >
                        <ActionButton
                            variant="contained"
                            sx={{
                                backgroundColor: '#21647D',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1A5369',
                                },
                            }}
                        >
                            Add Result
                        </ActionButton>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <InfoCard>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mb: 2,
                        }}>
                            About This Biomarker
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 2, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            This biomarker provides important information about your {biomarker.name?.toLowerCase() || biomarker.type?.toLowerCase()} health and function. Regular monitoring helps detect early signs of potential health issues.
                        </Typography>

                        {latestBiomarkerDetail?.referenceRange && (
                            <>
                                <Typography variant="subtitle2" sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    mt: 3,
                                }}>
                                    Reference Ranges
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                            Reference Range:
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            {latestBiomarkerDetail.referenceRange}
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                        )}

                        <Typography variant="subtitle2" sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                            mt: 3,
                        }}>
                            When to Contact Your Healthcare Provider
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            Consult your healthcare provider if:
                        </Typography>

                        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                            <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                Your values are consistently outside the normal range
                            </Typography>
                            <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                You experience unexplained symptoms related to {biomarker.name?.toLowerCase() || biomarker.type?.toLowerCase()} function
                            </Typography>
                            <Typography component="li" variant="body2" sx={{ mb: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                Your values show a sudden or significant change
                            </Typography>
                        </Box>
                    </InfoCard>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            animation: `${slideUp} 0.4s ease-out forwards`,
                            animationDelay: '0.25s',
                            opacity: 0,
                        }}
                    >
                        <ActionButton
                            variant="outlined"
                            sx={{
                                borderColor: '#21647D',
                                color: '#21647D',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.04)',
                                    borderColor: '#21647D',
                                },
                            }}
                            onClick={() => setTabValue(0)}
                        >
                            Back to Overview
                        </ActionButton>
                    </Box>
                </TabPanel>
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default BiomarkerDetailsModal; 