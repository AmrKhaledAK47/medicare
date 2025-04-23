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
    useMediaQuery
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
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
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
        date: 'Mar 3, YYYY',
        uploaded: '21 hours 51 minutes ago'
    }
];

const FilesPage = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const pathname = usePathname();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [skipStep, setSkipStep] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Effect to handle initial sidebar state
    useEffect(() => {
        // Reset UI state on pathname change if needed
        setShowChecklist(false);
    }, [pathname]);

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
            setUploadedFiles(prev => [...prev, ...newFiles]);
            // Here you would typically upload the files to your backend
            console.log('Files dropped:', newFiles);
        }
    }, []);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...newFiles]);
            // Here you would typically upload the files to your backend
            console.log('Files selected:', newFiles);
        }
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

                    {/* File Upload Area */}
                    <UploadArea
                        onClick={handleFileSelect}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        sx={{
                            borderColor: isDragging ? '#267997' : undefined,
                            backgroundColor: isDragging
                                ? mode === 'light' ? '#F0F5F7' : '#2D2D2D'
                                : undefined
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
                                Select a file to upload
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                }}
                            >
                                Or drag and drop your files here
                            </Typography>
                        </Box>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </UploadArea>

                    {/* Supported Types Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                mb: 2
                            }}
                        >
                            Supported Types:
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
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
                        <SubSectionTitle>Recent Documents</SubSectionTitle>
                        <StyledTableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Uploaded</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentDocuments.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Image
                                                        src="/icons/imaging.svg"
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
                                            <TableCell>{doc.date}</TableCell>
                                            <TableCell>{doc.uploaded}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
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
                                }}
                            >
                                Our system extracts key data from your uploaded documents, making it easily accessible and searchable within your medical records.
                            </Typography>
                        </Box>
                    </InfoSection>
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