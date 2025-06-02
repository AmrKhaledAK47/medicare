'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
    useMediaQuery,
    Divider
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../../../components/patient/Sidebar';
import DeviceStatusSidebar from '../../../../components/patient/DeviceStatusSidebar';
import DeviceChecklist from '../../../../components/patient/DeviceChecklist';
import { usePathname } from 'next/navigation';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    overflow: 'hidden',
    height: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
}));

const MainContent = styled(Box)(({ theme }) => ({
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: theme.spacing(3),
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#ffffff' : '#1A1A1A',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#A3A0A035' : '#333',
        borderRadius: '4px',
    },
}));

const FilesContainer = styled(Paper)(({ theme }) => ({
    maxWidth: '1300px',
    margin: '0 auto',
    padding: theme.spacing(3),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
}));

const SetupSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
}));

const ChecklistButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.mode === 'light' ? '#267997' : '#4d94ac',
    border: `1px solid ${theme.palette.mode === 'light' ? '#267997' : '#4d94ac'}`,
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '14px',
    padding: '6px 16px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(38, 121, 151, 0.08)' : 'rgba(38, 121, 151, 0.15)',
    },
    marginLeft: theme.spacing(2),
}));

const UploadArea = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    borderRadius: '12px',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: theme.spacing(4),
    '&:hover': {
        borderColor: '#267997',
        backgroundColor: theme.palette.mode === 'light' ? '#F0F5F7' : '#2D2D2D',
    },
}));

const FileTypeBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const FileTypeLabel = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderRadius: '8px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
        fontWeight: 600,
    },
    '& .MuiTableCell-body': {
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    },
}));

const ImageSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const InfoSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : '#262626',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
}));

const InfoIcon = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#267997' : '#1A3A4A',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    flexShrink: 0,
}));

// Mock data for recent documents
const recentDocuments = [
    {
        id: '1',
        name: 'BRAIN',
        type: 'imaging',
        date: 'Mar 3, 2023',
        uploaded: '21 hours 51 minutes ago',
        category: 'Imaging'
    },
    {
        id: '2',
        name: 'Blood Test Results',
        type: 'pdf',
        date: 'Feb 15, 2023',
        uploaded: '2 weeks ago',
        category: 'Lab Results'
    },
    {
        id: '3',
        name: 'Medical History',
        type: 'document',
        date: 'Jan 10, 2023',
        uploaded: '3 weeks ago',
        category: 'Records'
    },
    {
        id: '4',
        name: 'X-Ray Chest',
        type: 'imaging',
        date: 'Dec 20, 2022',
        uploaded: '2 months ago',
        category: 'Imaging'
    }
];

// Add these new components
const ProgressContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(2),
    maxWidth: '350px',
}));

const ProgressBar = styled(Box)<{ value: number }>(({ theme, value }) => ({
    height: '4px',
    width: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#333',
    borderRadius: '2px',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${value}%`,
        backgroundColor: '#267997',
        borderRadius: '2px',
        transition: 'width 0.3s ease',
    },
}));

const FilePreviewContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    maxWidth: '450px',
    justifyContent: 'center',
}));

const FilePreview = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '80px',
    height: '80px',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
}));

const RemoveFileButton = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(45,45,45,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,1)' : 'rgba(60,60,60,1)',
    },
}));

// Add styled components for the filter UI
const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const SearchInput = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : '#1A1A1A',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#333'}`,
    borderRadius: '8px',
    padding: '8px 12px',
    width: '100%',
    maxWidth: '300px',
}));

const ViewToggle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const CategoryChip = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: active
        ? theme.palette.mode === 'light' ? 'rgba(38, 121, 151, 0.1)' : 'rgba(38, 121, 151, 0.2)'
        : theme.palette.mode === 'light' ? '#F5F9FA' : '#1A1A1A',
    color: active ? '#267997' : theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    cursor: 'pointer',
    border: `1px solid ${active ? '#267997' : 'transparent'}`,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: active
            ? theme.palette.mode === 'light' ? 'rgba(38, 121, 151, 0.15)' : 'rgba(38, 121, 151, 0.25)'
            : theme.palette.mode === 'light' ? '#EEF1F4' : '#222',
    },
}));

const FilesPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const pathname = usePathname();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [skipStep, setSkipStep] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
    const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
    const [isUploading, setIsUploading] = useState(false);

    // Add the previously removed state variables here
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Effect to handle initial sidebar state
    useEffect(() => {
        // Reset UI state on pathname change if needed
        setShowChecklist(false);
    }, [pathname]);

    // Add the previously removed functions here
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryFilter = (category: string | null) => {
        setSelectedCategory(prevCategory =>
            prevCategory === category ? null : category
        );
    };

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
    };

    const getFilteredDocuments = () => {
        return recentDocuments.filter(doc => {
            // Apply search filter
            const matchesSearch = searchQuery === '' ||
                doc.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Apply category filter
            const matchesCategory = selectedCategory === null ||
                doc.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    };

    // Define accepted file types
    const acceptedFileTypes = {
        'application/pdf': true,
        'image/jpeg': true,
        'image/png': true,
        'image/gif': true,
        'application/dicom': true,
        'application/msword': true,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
        'text/plain': true
    };

    // Handle drag events
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            handleFiles(newFiles);
        }
    }, []);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            handleFiles(newFiles);
        }
    };

    const validateFile = (file: File): string => {
        // Check file type
        if (!acceptedFileTypes[file.type as keyof typeof acceptedFileTypes]) {
            return 'Unsupported file type';
        }

        // Check file size (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
            return 'File size exceeds 20MB limit';
        }

        return '';
    };

    const handleFiles = (files: File[]) => {
        const validFiles: File[] = [];
        const newErrors: { [key: string]: string } = {};
        const newProgress: { [key: string]: number } = {};

        // Validate files
        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                newErrors[file.name] = error;
            } else {
                validFiles.push(file);
                newProgress[file.name] = 0;
                generatePreview(file);
            }
        });

        if (validFiles.length > 0) {
            setUploadedFiles(prev => [...prev, ...validFiles]);
            setUploadProgress(prev => ({ ...prev, ...newProgress }));
            setFileErrors(prev => ({ ...prev, ...newErrors }));
            simulateUpload(validFiles);
        }
    };

    const generatePreview = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    setPreviewUrls(prev => ({ ...prev, [file.name]: e.target!.result as string }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const simulateUpload = (files: File[]) => {
        setIsUploading(true);

        files.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);

                    // Check if all files are uploaded
                    setUploadProgress(prev => {
                        const newProgress = { ...prev, [file.name]: progress };
                        const allCompleted = Object.values(newProgress).every(p => p === 100);

                        if (allCompleted) {
                            setTimeout(() => {
                                setIsUploading(false);
                            }, 500);
                        }

                        return newProgress;
                    });
                } else {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                }
            }, 200);
        });
    };

    const handleRemoveFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
        setPreviewUrls(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[fileName];
            return newPreviews;
        });
        setFileErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fileName];
            return newErrors;
        });
    };

    const getFileTypeIcon = (file: File) => {
        if (file.type.startsWith('image/')) {
            return '/icons/photos-icon.svg';
        } else if (file.type === 'application/pdf') {
            return '/icons/pdf-icon.svg';
        } else if (file.type === 'application/dicom') {
            return '/icons/imaging.svg';
        } else {
            return '/icons/documents.svg';
        }
    };

    // Render the file preview component
    const renderFilePreview = () => {
        if (uploadedFiles.length === 0) return null;

        return (
            <FilePreviewContainer>
                {uploadedFiles.map((file, index) => (
                    <FilePreview key={`${file.name}-${index}`}>
                        <RemoveFileButton onClick={() => handleRemoveFile(file.name)}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="#6C7A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="#6C7A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </RemoveFileButton>

                        {previewUrls[file.name] ? (
                            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                                <Image
                                    src={previewUrls[file.name]}
                                    alt={file.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        ) : (
                            <Image
                                src={getFileTypeIcon(file)}
                                alt={file.type}
                                width={30}
                                height={30}
                            />
                        )}

                        {uploadProgress[file.name] < 100 && (
                            <Box sx={{
                                position: 'absolute',
                                bottom: '5px',
                                width: '80%',
                                height: '3px',
                                backgroundColor: mode === 'light' ? '#EEF1F4' : '#333',
                                borderRadius: '1.5px',
                            }}>
                                <Box sx={{
                                    height: '100%',
                                    width: `${uploadProgress[file.name]}%`,
                                    backgroundColor: '#267997',
                                    borderRadius: '1.5px',
                                    transition: 'width 0.3s ease',
                                }} />
                            </Box>
                        )}
                    </FilePreview>
                ))}
            </FilePreviewContainer>
        );
    };

    return (
        <PageContainer>
            <MainContent>
                <FilesContainer>
                    <SectionTitle>Upload Files</SectionTitle>

                    <SetupSection>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                }}
                            >
                                Set Up Medicare
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}
                            >
                                Upload your medical documents
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={skipStep}
                                            onChange={() => setSkipStep(!skipStep)}
                                            sx={{
                                                color: mode === 'light' ? '#267997' : '#4d94ac',
                                                '&.Mui-checked': {
                                                    color: '#267997',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                            }}
                                        >
                                            Skip Step
                                        </Typography>
                                    }
                                />
                            </FormGroup>
                            <ChecklistButton
                                onClick={() => setShowChecklist(!showChecklist)}
                                startIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            >
                                Checklist
                            </ChecklistButton>
                        </Box>
                    </SetupSection>

                    {/* Show checklist if the button is clicked */}
                    {showChecklist && (
                        <DeviceChecklist connectedDevices={0} />
                    )}

                    {/* File Upload Area - Enhanced version */}
                    <UploadArea
                        onClick={handleFileSelect}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        sx={{
                            borderColor: isDragging ? '#267997' : undefined,
                            backgroundColor: isDragging
                                ? mode === 'light' ? '#F0F5F7' : '#2D2D2D'
                                : undefined,
                            padding: uploadedFiles.length > 0 ? theme.spacing(3) : theme.spacing(4)
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <Image
                                src="/icons/file-upload.svg"
                                alt="Upload File"
                                width={50}
                                height={50}
                                style={{ marginBottom: '16px' }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    mb: 1
                                }}
                            >
                                {isUploading ? 'Uploading...' : 'Select a file to upload'}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}
                            >
                                {isUploading
                                    ? 'Please wait while your files are being processed'
                                    : 'Or drag and drop your files here'}
                            </Typography>
                        </Box>

                        {/* File preview area */}
                        {renderFilePreview()}

                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept=".pdf,.jpg,.jpeg,.png,.gif,.docx,.doc,.txt,.dcm"
                        />
                    </UploadArea>

                    {/* Supported Types Section */}
                    <Box sx={{ mb: 4 }}>
                        <SubSectionTitle>Supported Types:</SubSectionTitle>
                        <Grid container spacing={0} justifyContent="center">
                            <Grid item xs={6} sm={3}>
                                <FileTypeBox>
                                    <Image src="/icons/pdf-icon.svg" alt="PDFs" width={30} height={40} />
                                    <FileTypeLabel>PDFs</FileTypeLabel>
                                </FileTypeBox>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FileTypeBox>
                                    <Image src="/icons/photos-icon.svg" alt="Photos" width={30} height={40} />
                                    <FileTypeLabel>Photos</FileTypeLabel>
                                </FileTypeBox>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FileTypeBox>
                                    <Image src="/icons/documents.svg" alt="Documents" width={30} height={40} />
                                    <FileTypeLabel>Documents</FileTypeLabel>
                                </FileTypeBox>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FileTypeBox>
                                    <Image src="/icons/imaging.svg" alt="DICOM Imaging" width={30} height={40} />
                                    <FileTypeLabel>DICOM Imaging</FileTypeLabel>
                                </FileTypeBox>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Recent Documents Section */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <SubSectionTitle>Recent Documents</SubSectionTitle>
                            <ViewToggle>
                                <Box
                                    onClick={() => setViewMode('grid')}
                                    sx={{
                                        cursor: 'pointer',
                                        opacity: viewMode === 'grid' ? 1 : 0.6,
                                    }}
                                >
                                    <Image
                                        src={viewMode === 'grid' ? '/icons/grid-active.svg' : '/icons/grid.svg'}
                                        alt="Grid View"
                                        width={24}
                                        height={24}
                                    />
                                </Box>
                                <Box
                                    onClick={() => setViewMode('list')}
                                    sx={{
                                        cursor: 'pointer',
                                        opacity: viewMode === 'list' ? 1 : 0.6,
                                    }}
                                >
                                    <Image
                                        src={viewMode === 'list' ? '/icons/list-active.svg' : '/icons/list.svg'}
                                        alt="List View"
                                        width={24}
                                        height={24}
                                    />
                                </Box>
                            </ViewToggle>
                        </Box>

                        <SearchContainer>
                            <SearchInput>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke={mode === 'light' ? '#6C7A89' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 21L16.65 16.65" stroke={mode === 'light' ? '#6C7A89' : '#B8C7CC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search documents"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        outline: 'none',
                                        width: '100%',
                                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                                    }}
                                />
                            </SearchInput>
                        </SearchContainer>

                        <Box sx={{ mb: 2 }}>
                            <CategoryChip
                                active={selectedCategory === 'Imaging'}
                                onClick={() => handleCategoryFilter('Imaging')}
                            >
                                Imaging
                            </CategoryChip>
                            <CategoryChip
                                active={selectedCategory === 'Lab Results'}
                                onClick={() => handleCategoryFilter('Lab Results')}
                            >
                                Lab Results
                            </CategoryChip>
                            <CategoryChip
                                active={selectedCategory === 'Records'}
                                onClick={() => handleCategoryFilter('Records')}
                            >
                                Records
                            </CategoryChip>
                        </Box>

                        {viewMode === 'list' ? (
                            <StyledTableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Uploaded</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getFilteredDocuments().map((doc) => (
                                            <TableRow key={doc.id}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Image
                                                            src={doc.type === 'imaging' ? '/icons/imaging.svg' :
                                                                doc.type === 'pdf' ? '/icons/pdf-icon.svg' :
                                                                    '/icons/documents.svg'}
                                                            alt="Document"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                            }}
                                                        >
                                                            {doc.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{doc.category}</TableCell>
                                                <TableCell>{doc.date}</TableCell>
                                                <TableCell>{doc.uploaded}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        ) : (
                            <Grid container spacing={2}>
                                {getFilteredDocuments().map((doc) => (
                                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                borderRadius: '8px',
                                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: mode === 'light'
                                                        ? '0 4px 8px rgba(0, 0, 0, 0.05)'
                                                        : '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Image
                                                        src={doc.type === 'imaging' ? '/icons/imaging.svg' :
                                                            doc.type === 'pdf' ? '/icons/pdf-icon.svg' :
                                                                '/icons/documents.svg'}
                                                        alt="Document"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 500,
                                                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                        }}
                                                    >
                                                        {doc.name}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                    }}
                                                >
                                                    {doc.category}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ height: '1px', width: '100%', backgroundColor: mode === 'light' ? '#EEF1F4' : '#333' }} />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    {doc.date}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    {doc.uploaded}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>

                    {/* Image Section */}
                    <ImageSection>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '700px', height: '280px' }}>
                            <Image
                                src="/images/document-upload.png"
                                alt="Document Upload"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </ImageSection>

                    {/* Info Section */}
                    <Box sx={{ mt: 4, mb: 3 }}>
                        <Divider sx={{ mb: 3 }} />
                        <SubSectionTitle>About Document Processing</SubSectionTitle>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InfoSection>
                                    <InfoIcon>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </InfoIcon>
                                    <Box>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                                mb: 0.5
                                            }}
                                        >
                                            Medicare automatically digitizes your lab reports and documents
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                                mb: 1.5
                                            }}
                                        >
                                            Our system extracts key data from your uploaded documents, making it easily accessible and searchable within your medical records.
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderColor: '#267997',
                                                    color: '#267997',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        borderColor: '#21647D',
                                                        backgroundColor: 'rgba(38, 121, 151, 0.05)',
                                                    }
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#267997',
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#21647D',
                                                    }
                                                }}
                                            >
                                                Upload Now
                                            </Button>
                                        </Box>
                                    </Box>
                                </InfoSection>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        backgroundColor: mode === 'light' ? '#F8FBFC' : '#262626',
                                        border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#333'}`,
                                        borderRadius: '8px',
                                        padding: theme.spacing(2),
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: mode === 'light' ? '#454747' : '#FFFFFF',
                                            mb: 1.5
                                        }}
                                    >
                                        Benefits of Digital Documents
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>1</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '15px' }}>
                                                    Easy Access
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    Access your medical records anytime, anywhere
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>2</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '15px' }}>
                                                    Better Organization
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    Keep all your medical documents in one secure place
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: mode === 'light' ? '#E3F2FD' : '#1A3A4A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Typography sx={{ fontWeight: 600, color: '#267997' }}>3</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: mode === 'light' ? '#454747' : '#FFFFFF', fontSize: '15px' }}>
                                                    Easy Sharing
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                                    Share with healthcare providers with just a few clicks
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '12px',
                                    fontStyle: 'italic',
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}
                            >
                                Your privacy is important to us. Medicare stores your documents securely and they are only accessible to you and healthcare providers you explicitly authorize.
                            </Typography>
                        </Box>
                    </Box>
                </FilesContainer>
            </MainContent>

            {/* Status Sidebar - only visible on desktop/larger tablets */}
            {!isTablet && (
                <DeviceStatusSidebar
                    connectedDevices={0}
                    uploadedFiles={uploadedFiles.length + recentDocuments.length}
                    connectedSystems={0}
                />
            )}
        </PageContainer>
    );
};

export default FilesPage; 