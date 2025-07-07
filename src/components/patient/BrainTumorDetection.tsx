import React, { useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Paper,
    Alert,
    Snackbar,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';

// Interface for brain tumor detection result
interface BrainTumorDetectionResult {
    hasTumor: boolean;
    confidence: number;
    processedImageUrl?: string;
    tumorRegion?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    processingTime?: number;
}

// Styled components
const BrainScanUploadBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.mode === 'light' ? '#21647D' : '#64B5F6'}`,
    borderRadius: '12px',
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.05)' : 'rgba(100, 181, 246, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.1)' : 'rgba(100, 181, 246, 0.1)',
        borderColor: theme.palette.mode === 'light' ? '#1a5268' : '#90CAF9',
    },
}));

const ResultCard = styled(Box)(({ theme }) => ({
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
}));

interface ResultHeaderProps {
    hasTumor: boolean;
    theme?: any;
}

const ResultHeader = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasTumor'
})<ResultHeaderProps>(({ theme, hasTumor }) => ({
    padding: theme.spacing(2),
    backgroundColor: hasTumor
        ? theme.palette.mode === 'light' ? '#FFEBEE' : '#4A2F32'
        : theme.palette.mode === 'light' ? '#E8F5E9' : '#1E3B2F',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
}));

const ResultContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

interface ConfidenceBarProps {
    value: number;
    color: string;
    theme?: any;
}

const ConfidenceBar = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'value' && prop !== 'color'
})<ConfidenceBarProps>(({ theme, value, color }) => ({
    height: '8px',
    width: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#EEF1F4' : '#444',
    borderRadius: '4px',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${value}%`,
        backgroundColor: color,
        borderRadius: '4px',
    },
}));

interface BrainTumorDetectionProps {
    mode: 'light' | 'dark';
}

const BrainTumorDetection: React.FC<BrainTumorDetectionProps> = ({ mode }) => {
    // State variables
    const [brainScanFile, setBrainScanFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectionResult, setDetectionResult] = useState<BrainTumorDetectionResult | null>(null);
    const [detectionError, setDetectionError] = useState<string | null>(null);
    const [showResultSnackbar, setShowResultSnackbar] = useState(false);

    // Handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type.startsWith('image/')) {
                setBrainScanFile(file);
                setDetectionResult(null);
                setDetectionError(null);

                // Create preview URL
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);

                return () => URL.revokeObjectURL(objectUrl);
            } else {
                setDetectionError("Please upload a valid image file (JPG, PNG)");
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxFiles: 1
    });

    // Handle tumor detection
    const handleDetectTumor = async () => {
        if (!brainScanFile) {
            setDetectionError("Please upload a brain MRI image first");
            return;
        }

        setIsDetecting(true);
        setDetectionError(null);

        try {
            const formData = new FormData();
            formData.append('image', brainScanFile);

            // For demo purposes, simulate an API call with a timeout
            // In production, replace with actual API call
            setTimeout(() => {
                // Mock response data
                const mockResult: BrainTumorDetectionResult = {
                    hasTumor: Math.random() > 0.5, // Random result for demo
                    confidence: 0.75 + Math.random() * 0.2,
                    processedImageUrl: previewUrl,
                    processingTime: 1.2 + Math.random()
                };

                if (mockResult.hasTumor) {
                    mockResult.tumorRegion = {
                        x: 120 + Math.random() * 50,
                        y: 100 + Math.random() * 50,
                        width: 30 + Math.random() * 20,
                        height: 30 + Math.random() * 20
                    };
                }

                setDetectionResult(mockResult);
                setShowResultSnackbar(true);
                setIsDetecting(false);
            }, 2000);

            // In production, use this code instead:
            /*
            const response = await fetch('http://localhost:3002/api/brain-tumor-detection', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            setDetectionResult(result);
            setShowResultSnackbar(true);
            */
        } catch (error) {
            console.error('Error detecting brain tumor:', error);
            setDetectionError(error instanceof Error ? error.message : 'An unknown error occurred');
            setIsDetecting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setShowResultSnackbar(false);
    };

    const resetDetection = () => {
        setBrainScanFile(null);
        setPreviewUrl(null);
        setDetectionResult(null);
        setDetectionError(null);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{
                fontWeight: 600,
                color: mode === 'light' ? '#454747' : '#FFFFFF',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 17V17.01" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91895 12.4272 7.03872C13.1255 7.15849 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Brain Tumor Detection
            </Typography>

            <Paper elevation={0} sx={{
                p: 3,
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                borderRadius: '12px',
            }}>
                <Typography variant="body1" sx={{ mb: 2, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                    Upload a brain MRI image to detect potential tumors using our AI-powered detection system.
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <BrainScanUploadBox {...getRootProps()}>
                            <input {...getInputProps()} />
                            {previewUrl ? (
                                <Box sx={{ position: 'relative' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Brain MRI preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '300px',
                                            borderRadius: '8px',
                                            display: 'block',
                                            margin: '0 auto'
                                        }}
                                    />
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            resetDetection();
                                        }}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(43,43,43,0.8)',
                                        }}
                                    >
                                        Change Image
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 9H9.01" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 9H15.01" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <Typography sx={{
                                        fontWeight: 500,
                                        color: mode === 'light' ? '#21647D' : '#64B5F6',
                                        mb: 1
                                    }}>
                                        {isDragActive
                                            ? 'Drop your brain MRI image here'
                                            : 'Drag & Drop Brain MRI Image Here'}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                    }}>
                                        or click to browse your files
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                        mt: 1
                                    }}>
                                        Supports JPG/JPEG images only
                                    </Typography>
                                </Box>
                            )}
                        </BrainScanUploadBox>

                        {detectionError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {detectionError}
                            </Alert>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                disabled={!brainScanFile || isDetecting}
                                onClick={handleDetectTumor}
                                sx={{
                                    backgroundColor: '#21647D',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    px: 4,
                                    py: 1,
                                    '&:hover': {
                                        backgroundColor: '#1a5268',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: mode === 'light' ? '#E0E0E0' : '#555',
                                        color: mode === 'light' ? '#A0A0A0' : '#888',
                                    }
                                }}
                                startIcon={isDetecting ? <CircularProgress size={20} color="inherit" /> : undefined}
                            >
                                {isDetecting ? 'Analyzing Image...' : 'Detect Tumor'}
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {detectionResult ? (
                            <ResultCard>
                                <ResultHeader hasTumor={detectionResult.hasTumor}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {detectionResult.hasTumor ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={mode === 'light' ? '#F44336' : '#FF8A80'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={mode === 'light' ? '#4CAF50' : '#81C784'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {detectionResult.hasTumor
                                                ? 'Potential Tumor Detected'
                                                : 'No Tumor Detected'}
                                        </Typography>
                                    </Box>
                                </ResultHeader>

                                <ResultContent>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {detectionResult.hasTumor
                                            ? 'Our AI system has detected potential signs of a brain tumor in the uploaded MRI image. Please consult with a healthcare professional for proper diagnosis.'
                                            : 'Our AI system did not detect any signs of a brain tumor in the uploaded MRI image.'}
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Confidence Level:</Typography>
                                            <Typography variant="body2" fontWeight={500}>
                                                {Math.round(detectionResult.confidence * 100)}%
                                            </Typography>
                                        </Box>
                                        <ConfidenceBar
                                            value={detectionResult.confidence * 100}
                                            color={detectionResult.hasTumor
                                                ? mode === 'light' ? '#F44336' : '#FF8A80'
                                                : mode === 'light' ? '#4CAF50' : '#81C784'}
                                        />
                                    </Box>

                                    {detectionResult.processedImageUrl && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                Processed Image:
                                            </Typography>
                                            <Box sx={{
                                                border: `1px solid ${mode === 'light' ? '#EEF1F4' : '#444'}`,
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
                                                <img
                                                    src={detectionResult.processedImageUrl}
                                                    alt="Processed brain MRI"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        display: 'block'
                                                    }}
                                                />
                                                {detectionResult.hasTumor && detectionResult.tumorRegion && (
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        border: '2px solid #F44336',
                                                        borderRadius: '4px',
                                                        left: `${detectionResult.tumorRegion.x}px`,
                                                        top: `${detectionResult.tumorRegion.y}px`,
                                                        width: `${detectionResult.tumorRegion.width}px`,
                                                        height: `${detectionResult.tumorRegion.height}px`,
                                                        boxShadow: '0 0 0 2px rgba(244, 67, 54, 0.3)',
                                                        pointerEvents: 'none'
                                                    }} />
                                                )}
                                            </Box>
                                        </Box>
                                    )}

                                    {detectionResult.processingTime && (
                                        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            Processing time: {detectionResult.processingTime.toFixed(2)} seconds
                                        </Typography>
                                    )}

                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button
                                            variant="outlined"
                                            onClick={resetDetection}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Try Another Image
                                        </Button>

                                        {detectionResult.hasTumor && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    textTransform: 'none',
                                                    backgroundColor: '#21647D',
                                                    '&:hover': {
                                                        backgroundColor: '#1a5268',
                                                    },
                                                }}
                                                onClick={() => {
                                                    // Here you could implement functionality to schedule an appointment
                                                    console.log('Schedule appointment clicked');
                                                }}
                                            >
                                                Schedule Consultation
                                            </Button>
                                        )}
                                    </Box>
                                </ResultContent>
                            </ResultCard>
                        ) : (
                            <Box sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: mode === 'light' ? '#F8FBFC' : 'rgba(43, 43, 43, 0.5)',
                                borderRadius: '12px',
                                p: 3
                            }}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
                                    <path d="M12 17V17.01" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
                                    <path d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91895 12.4272 7.03872C13.1255 7.15849 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke={mode === 'light' ? '#21647D' : '#64B5F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
                                </svg>
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, textAlign: 'center' }}>
                                    Upload a Brain MRI Image
                                </Typography>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC', textAlign: 'center' }}>
                                    Our AI-powered system will analyze the image and detect potential brain tumors
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                        Important Information
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        This tool is for educational purposes only and should not replace professional medical advice or diagnosis.
                    </Alert>
                    <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                        Brain tumor detection using AI is a supplementary tool that can help identify potential areas of concern in MRI scans.
                        The results should always be verified by qualified healthcare professionals. If you have any concerns about your health,
                        please consult with your doctor immediately.
                    </Typography>
                </Box>
            </Paper>

            <Snackbar
                open={showResultSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={detectionResult?.hasTumor ? "warning" : "success"}
                    sx={{ width: '100%' }}
                >
                    {detectionResult?.hasTumor
                        ? "Potential tumor detected. Please consult with a healthcare professional."
                        : "No tumor detected in the uploaded image."}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BrainTumorDetection; 