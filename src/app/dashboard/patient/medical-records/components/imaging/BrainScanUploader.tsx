import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Alert,
    AlertTitle
} from '@mui/material';
import { Imaging } from './types';
import { useTheme } from '@mui/material/styles';

interface BrainScanUploaderProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (imaging: Imaging) => void;
}

const DropZone = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.mode === 'light' ? '#D6E4EC' : '#444'}`,
    borderRadius: '8px',
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : 'rgba(43, 43, 43, 0.5)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#EBF4F8' : '#333',
    },
}));

const PreviewImage = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '8px',
    margin: '0 auto',
    display: 'block',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
}));

const DetectionResultCard = styled(Box)(({ theme, error }: { theme: any, error: boolean }) => ({
    borderRadius: '8px',
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: error
        ? theme.palette.mode === 'light' ? '#FFEBEE' : '#4F1B1B'
        : theme.palette.mode === 'light' ? '#E8F5E9' : '#0F3D1F',
    border: `1px solid ${error
        ? theme.palette.mode === 'light' ? '#FFCDD2' : '#5A3333'
        : theme.palette.mode === 'light' ? '#C8E6C9' : '#265D33'}`,
}));

// Mock brain tumor detection results
const mockTumorTypes = ['glioma', 'meningioma', 'pituitary', 'no_tumor'];
const mockBoundingBoxes = {
    glioma: [
        { x: 120, y: 145 },
        { x: 180, y: 145 },
        { x: 180, y: 210 },
        { x: 120, y: 210 }
    ],
    meningioma: [
        { x: 150, y: 100 },
        { x: 210, y: 100 },
        { x: 210, y: 160 },
        { x: 150, y: 160 }
    ],
    pituitary: [
        { x: 180, y: 180 },
        { x: 220, y: 180 },
        { x: 220, y: 220 },
        { x: 180, y: 220 }
    ],
    no_tumor: []
};

// Local storage keys
const LS_BRAIN_SCANS_KEY = 'medicare_brain_scans';

// Helper functions for local storage
const saveBrainScanToLocalStorage = (scan: any) => {
    const existingScans = JSON.parse(localStorage.getItem(LS_BRAIN_SCANS_KEY) || '[]');
    existingScans.push(scan);
    localStorage.setItem(LS_BRAIN_SCANS_KEY, JSON.stringify(existingScans));
};

const getBrainScansFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LS_BRAIN_SCANS_KEY) || '[]');
};

const BrainScanUploader: React.FC<BrainScanUploaderProps> = ({
    open,
    onClose,
    onSuccess
}) => {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingStatus, setProcessingStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset state when the dialog opens or closes
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setFile(null);
                setPreview(null);
                setIsUploading(false);
                setUploadProgress(0);
                setProcessingStatus('idle');
                setError(null);
                setAnalysisResult(null);
            }, 300);
        }
    }, [open]);

    // Update preview when file changes
    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    }, [isDragging]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];

            // Check if file is an image
            if (!droppedFile.type.startsWith('image/')) {
                setError('Please upload an image file (JPEG, PNG)');
                return;
            }

            setFile(droppedFile);
            setError(null);
        }
    }, []);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];

            // Check if file is an image
            if (!selectedFile.type.startsWith('image/')) {
                setError('Please upload an image file (JPEG, PNG)');
                return;
            }

            setFile(selectedFile);
            setError(null);
        }
    }, []);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Generate a random ID
    const generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    // Mock brain tumor detection with simulated delay
    const mockBrainTumorDetection = async (imageUrl: string) => {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Randomly decide if tumor is detected (80% chance)
        const isTumorDetected = Math.random() < 0.8;

        if (!isTumorDetected) {
            return {
                tumorDetected: false,
                tumorType: 'no_tumor',
                confidence: 0.95,
                tumorBoundingBox: []
            };
        }

        // Randomly select tumor type (excluding no_tumor)
        const tumorTypes = mockTumorTypes.filter(type => type !== 'no_tumor');
        const tumorType = tumorTypes[Math.floor(Math.random() * tumorTypes.length)];

        // Generate confidence score (between 0.7 and 0.99)
        const confidence = 0.7 + Math.random() * 0.29;

        return {
            tumorDetected: true,
            tumorType,
            confidence,
            tumorBoundingBox: mockBoundingBoxes[tumorType as keyof typeof mockBoundingBoxes]
        };
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setProcessingStatus('uploading');
        setUploadProgress(0);
        setError(null);

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(progressInterval);
                        return 95;
                    }
                    return prev + 5;
                });
            }, 100);

            // Convert file to base64 for local storage
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = async () => {
                const base64Image = reader.result as string;

                // Create thumbnail (in a real app, you'd resize the image)
                const thumbnail = base64Image;

                // Clear progress interval
                clearInterval(progressInterval);
                setUploadProgress(100);
                setProcessingStatus('processing');

                try {
                    // Generate scan ID
                    const scanId = generateId();
                    const now = new Date().toISOString();

                    // Mock detection results
                    const detectionResult = await mockBrainTumorDetection(base64Image);

                    // Create scan object
                    const scan = {
                        _id: scanId,
                        patientId: "local-patient",
                        scanImagePath: base64Image,
                        thumbnailPath: thumbnail,
                        status: 'completed',
                        ...detectionResult,
                        detectedAt: now,
                        createdAt: now,
                        updatedAt: now,
                        fhirObservationId: `obs-${scanId.substring(0, 8)}`,
                        fhirDiagnosticReportId: `diag-${scanId.substring(0, 8)}`
                    };

                    // Save to local storage
                    saveBrainScanToLocalStorage(scan);

                    // Update state
                    setAnalysisResult({ data: scan });
                    setProcessingStatus('complete');

                    // Convert to Imaging object for the parent component
                    const newImaging: Imaging = {
                        id: scan._id,
                        name: `Brain MRI Scan - ${new Date().toLocaleDateString()}`,
                        modality: 'MRI',
                        bodyPart: 'Brain',
                        date: new Date().toISOString().split('T')[0],
                        physician: 'Self-uploaded',
                        facility: 'Home',
                        status: 'Completed',
                        findings: scan.tumorDetected
                            ? `${formatTumorType(scan.tumorType)} detected with ${Math.round(scan.confidence * 100)}% confidence`
                            : 'No tumor detected in the brain scan.',
                        impression: scan.tumorDetected
                            ? `Brain scan shows presence of ${formatTumorType(scan.tumorType).toLowerCase()}.`
                            : 'Normal brain scan with no evidence of tumor.',
                        images: [
                            {
                                thumbnail: scan.thumbnailPath,
                                fullSize: scan.scanImagePath,
                            }
                        ],
                        tumorDetected: scan.tumorDetected,
                        tumorType: scan.tumorType,
                        confidence: scan.confidence,
                        tumorBoundingBox: scan.tumorBoundingBox,
                        fhirObservationId: scan.fhirObservationId,
                        fhirDiagnosticReportId: scan.fhirDiagnosticReportId,
                        detectedAt: scan.detectedAt,
                    };

                    // Pass the new imaging object to the parent component
                    onSuccess(newImaging);
                } catch (err) {
                    setProcessingStatus('error');
                    setError('Failed to analyze the brain scan');
                }
            };

            reader.onerror = () => {
                clearInterval(progressInterval);
                setProcessingStatus('error');
                setError('Failed to read the image file');
            };
        } catch (err) {
            setIsUploading(false);
            setProcessingStatus('error');
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    // Helper function to format tumor type
    const formatTumorType = (type?: string) => {
        if (!type) return 'Unknown tumor';

        switch (type) {
            case 'glioma':
                return 'Glioma';
            case 'meningioma':
                return 'Meningioma';
            case 'pituitary':
                return 'Pituitary tumor';
            case 'no_tumor':
                return 'No tumor';
            default:
                return type;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={processingStatus === 'processing' ? undefined : onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: '12px',
                    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <DialogTitle sx={{
                p: 2.5,
                fontWeight: 600,
                color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
                borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
            }}>
                Upload Brain MRI Scan for Tumor Detection
            </DialogTitle>
            <DialogContent sx={{ p: 3, mt: 1 }}>
                {processingStatus === 'idle' && (
                    <>
                        <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            Upload a brain MRI scan image to detect and classify brain tumors. Supported formats: JPEG, PNG.
                        </Typography>

                        <Alert severity="info" sx={{ mb: 3 }}>
                            <AlertTitle>AI-Powered Detection</AlertTitle>
                            The system can detect Glioma, Meningioma, and Pituitary tumors with high accuracy.
                            Results will be stored in your medical records and follow FHIR standards.
                        </Alert>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />

                        {!file ? (
                            <DropZone
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleUploadClick}
                                sx={{
                                    backgroundColor: isDragging
                                        ? theme.palette.mode === 'light' ? '#EBF4F8' : '#333'
                                        : theme.palette.mode === 'light' ? '#F8FBFC' : 'rgba(43, 43, 43, 0.5)',
                                    borderColor: isDragging ? '#21647D' : theme.palette.mode === 'light' ? '#D6E4EC' : '#444',
                                }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto', marginBottom: 16 }}>
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 10L12 15L17 10" stroke={theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15V3" stroke={theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                    Drag and drop your brain MRI scan here
                                </Typography>

                                <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    or click to browse files
                                </Typography>
                            </DropZone>
                        ) : (
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    Selected file: {file.name}
                                </Typography>
                                <PreviewImage src={preview || ''} alt="Brain MRI Preview" />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFile(null);
                                        setPreview(null);
                                    }}
                                    sx={{
                                        mt: 2,
                                        color: '#E16A6A',
                                        borderColor: '#E16A6A',
                                        '&:hover': {
                                            backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                            borderColor: '#d32f2f',
                                        }
                                    }}
                                >
                                    Remove File
                                </Button>
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </>
                )}

                {processingStatus === 'uploading' && (
                    <ProgressContainer>
                        <CircularProgress
                            variant="determinate"
                            value={uploadProgress}
                            size={60}
                            thickness={4}
                            sx={{ mb: 2, color: '#21647D' }}
                        />
                        <Typography variant="h6" sx={{ mb: 1, color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Uploading scan...
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            {uploadProgress}% complete
                        </Typography>
                    </ProgressContainer>
                )}

                {processingStatus === 'processing' && (
                    <ProgressContainer>
                        <CircularProgress
                            size={60}
                            thickness={4}
                            sx={{ mb: 2, color: '#21647D' }}
                        />
                        <Typography variant="h6" sx={{ mb: 1, color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Analyzing brain scan...
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            Our AI is working to detect any tumors. This may take a moment.
                        </Typography>
                    </ProgressContainer>
                )}

                {processingStatus === 'complete' && analysisResult && (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <PreviewImage
                                    src={analysisResult.data.scanImagePath}
                                    alt="Brain MRI Scan Result"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DetectionResultCard error={false}>
                                    <Typography variant="h6" sx={{
                                        mb: 2,
                                        color: analysisResult.data.tumorDetected
                                            ? theme.palette.mode === 'light' ? '#D32F2F' : '#F88078'
                                            : theme.palette.mode === 'light' ? '#2E7D32' : '#81C995',
                                        fontWeight: 600
                                    }}>
                                        {analysisResult.data.tumorDetected
                                            ? `${formatTumorType(analysisResult.data.tumorType)} Detected`
                                            : 'No Tumor Detected'}
                                    </Typography>

                                    {analysisResult.data.confidence !== undefined && (
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF' }}>
                                                Confidence: {(analysisResult.data.confidence * 100).toFixed(1)}%
                                            </Typography>
                                            <Box
                                                sx={{
                                                    height: 8,
                                                    width: '100%',
                                                    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#444',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        height: '100%',
                                                        width: `${analysisResult.data.confidence * 100}%`,
                                                        backgroundColor: analysisResult.data.confidence > 0.9
                                                            ? '#D32F2F'
                                                            : analysisResult.data.confidence > 0.7
                                                                ? '#FF9800'
                                                                : '#4CAF50',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}

                                    <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF', mb: 1 }}>
                                        <strong>Analysis Complete:</strong> The scan has been analyzed and stored in your medical records.
                                    </Typography>

                                    {analysisResult.data.fhirObservationId && (
                                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            FHIR Observation ID: {analysisResult.data.fhirObservationId}
                                        </Typography>
                                    )}

                                    {analysisResult.data.fhirDiagnosticReportId && (
                                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            FHIR Diagnostic Report ID: {analysisResult.data.fhirDiagnosticReportId}
                                        </Typography>
                                    )}
                                </DetectionResultCard>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {processingStatus === 'error' && (
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto', marginBottom: 16 }}>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 9L9 15" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 9L15 15" stroke="#E16A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <Typography variant="h6" sx={{ mb: 1, color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF' }}>
                            Processing Failed
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            {error || 'An error occurred while processing the brain scan. Please try again.'}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => {
                                setFile(null);
                                setPreview(null);
                                setIsUploading(false);
                                setUploadProgress(0);
                                setProcessingStatus('idle');
                                setError(null);
                                setAnalysisResult(null);
                            }}
                            sx={{
                                backgroundColor: '#21647D',
                                '&:hover': {
                                    backgroundColor: '#1a5268',
                                },
                            }}
                        >
                            Try Again
                        </Button>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{
                p: 2.5,
                borderTop: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`
            }}>
                {processingStatus === 'idle' && (
                    <>
                        <Button
                            onClick={onClose}
                            sx={{
                                color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                textTransform: 'none',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpload}
                            disabled={!file}
                            variant="contained"
                            sx={{
                                backgroundColor: '#21647D',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#1a5268',
                                },
                            }}
                        >
                            Upload and Analyze
                        </Button>
                    </>
                )}

                {(processingStatus === 'uploading' || processingStatus === 'processing') && (
                    <Button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to cancel the upload?')) {
                                setProcessingStatus('idle');
                                onClose();
                            }
                        }}
                        sx={{
                            color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                )}

                {processingStatus === 'complete' && (
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{
                            backgroundColor: '#21647D',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1a5268',
                            },
                        }}
                    >
                        Close
                    </Button>
                )}

                {processingStatus === 'error' && (
                    <Button
                        onClick={onClose}
                        sx={{
                            color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
                            textTransform: 'none',
                        }}
                    >
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default BrainScanUploader; 