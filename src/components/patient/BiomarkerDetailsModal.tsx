'use client';

import React, { useState } from 'react';
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
        name: string;
        icon: string;
        color: string;
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

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Sample data for history tab
    const historyData = [
        { date: '2023-09-15', value: '120', unit: 'mg/dL', status: 'Normal' },
        { date: '2023-06-21', value: '132', unit: 'mg/dL', status: 'Elevated' },
        { date: '2023-03-05', value: '125', unit: 'mg/dL', status: 'Normal' },
        { date: '2022-12-18', value: '142', unit: 'mg/dL', status: 'Elevated' },
        { date: '2022-09-27', value: '118', unit: 'mg/dL', status: 'Normal' },
    ];

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'normal':
                return '#4CAF50';
            case 'elevated':
                return '#FF9800';
            case 'high':
                return '#F44336';
            case 'low':
                return '#2196F3';
            default:
                return '#6C7A89';
        }
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
                    }}>
                        <Image
                            src={biomarker.icon}
                            alt={biomarker.name}
                            width={36}
                            height={36}
                            style={{
                                filter: mode === 'dark' ? 'brightness(0.8) invert(0.8)' : 'none',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                    {biomarker.name} Biomarkers
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
                    <InfoCard>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="h6" sx={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    mb: 1,
                                }}>
                                    Latest Result
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}>
                                    September 15, 2023
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h4" sx={{
                                    fontWeight: 700,
                                    color: biomarker.color,
                                    mb: 0.5,
                                    fontFamily: 'poppins',
                                }}>
                                    120
                                    <Typography component="span" sx={{
                                        fontSize: '1rem',
                                        ml: 0.5,
                                        fontWeight: 400,
                                    }}>
                                        mg/dL
                                    </Typography>
                                </Typography>
                                <Chip
                                    label="Normal"
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                        color: '#4CAF50',
                                        fontWeight: 500,
                                    }}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                        }}>
                            Reference Range
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                Low: &lt;100 mg/dL
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                Normal: 100-140 mg/dL
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                High: &gt;140 mg/dL
                            </Typography>
                        </Box>

                        <RangeIndicator>
                            <RangeMarker position={35} />
                            <RangeMarker position={75} />
                            <RangeMarker position={50} isValue />

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
                                        backgroundColor: '#21647D',
                                    }
                                }}
                            />
                        </RangeIndicator>
                    </InfoCard>

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
                                {historyData.map((row, index) => (
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
                                            },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                            }}
                                        >
                                            {new Date(row.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                fontWeight: 600,
                                                borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                color: biomarker.color,
                                            }}
                                        >
                                            {row.value}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                            }}
                                        >
                                            {row.unit}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                borderBottom: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                            }}
                                        >
                                            <Chip
                                                label={row.status}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${getStatusColor(row.status)}22`,
                                                    color: getStatusColor(row.status),
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                            This biomarker provides important information about your {biomarker.name.toLowerCase()} health and function. Regular monitoring helps detect early signs of potential health issues.
                        </Typography>

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
                                    Normal Range:
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    100-140 mg/dL
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    Low Range:
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    &lt;100 mg/dL
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                    High Range:
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    &gt;140 mg/dL
                                </Typography>
                            </Box>
                        </Box>

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
                                You experience unexplained symptoms related to {biomarker.name.toLowerCase()} function
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