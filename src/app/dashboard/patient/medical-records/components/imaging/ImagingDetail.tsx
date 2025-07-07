import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    styled,
    Chip,
    Tabs,
    Tab,
    LinearProgress,
    Tooltip,
    IconButton,
    Paper,
    Divider,
} from '@mui/material';
import { Imaging } from './types';
import { useTheme } from '@mui/material/styles';

const InfoCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    marginBottom: theme.spacing(3),
    boxShadow: theme.palette.mode === 'light'
        ? '0px 2px 8px rgba(0, 0, 0, 0.05)'
        : '0px 2px 8px rgba(0, 0, 0, 0.2)',
}));

const InfoCardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const InfoItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1.5),
    display: 'flex',
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 500,
    width: '150px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const ImagingStatusBadge = styled(Chip)(({ theme }) => ({
    borderRadius: '16px',
    height: '24px',
    fontSize: '12px',
    fontWeight: 500,
}));

const ImageThumbnail = styled('img')(({ theme }) => ({
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    cursor: 'pointer',
    border: `2px solid transparent`,
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '&.selected': {
        border: `2px solid ${theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3'}`,
    },
}));

const TumorTypeChip = styled(Chip)<{ tumortype: string }>(({ theme, tumortype }) => {
    let color = '';
    let backgroundColor = '';

    switch (tumortype) {
        case 'glioma':
            backgroundColor = theme.palette.mode === 'light' ? '#FFEBEE' : '#4F1B1B';
            color = theme.palette.mode === 'light' ? '#D32F2F' : '#F48FB1';
            break;
        case 'meningioma':
            backgroundColor = theme.palette.mode === 'light' ? '#FFF3E0' : '#4D3A14';
            color = theme.palette.mode === 'light' ? '#EF6C00' : '#FFCC80';
            break;
        case 'pituitary':
            backgroundColor = theme.palette.mode === 'light' ? '#E8F5E9' : '#0F3D1F';
            color = theme.palette.mode === 'light' ? '#2E7D32' : '#81C995';
            break;
        default:
            backgroundColor = theme.palette.mode === 'light' ? '#E3F2FD' : '#0D3B66';
            color = theme.palette.mode === 'light' ? '#1976D2' : '#90CAF9';
    }

    return {
        backgroundColor,
        color,
        fontWeight: 600,
        borderRadius: '16px',
        padding: '0 12px',
    };
});

const ConfidenceBar = styled(Box)(({ theme }) => ({
    height: '8px',
    width: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#444',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
}));

const ConfidenceIndicator = styled(Box)<{ value: number }>(({ theme, value }) => {
    let color = '#4CAF50'; // Default green for low confidence

    if (value > 0.9) {
        color = '#D32F2F'; // Red for high confidence
    } else if (value > 0.7) {
        color = '#FF9800'; // Orange for medium confidence
    }

    return {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${value * 100}%`,
        backgroundColor: color,
    };
});

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    '&.Mui-selected': {
        color: theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3',
        fontWeight: 600,
    },
}));

interface ImagingDetailProps {
    imaging: Imaging;
    onDelete: () => void;
    onEdit: () => void;
    onBackClick: () => void;
}

const ImagingDetail: React.FC<ImagingDetailProps> = ({
    imaging,
    onDelete,
    onEdit,
    onBackClick
}) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showBoundingBox, setShowBoundingBox] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [tabValue, setTabValue] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Draw the tumor bounding box on the image
    useEffect(() => {
        if (!canvasRef.current || !imaging.tumorBoundingBox || !showBoundingBox) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = imaging.images[selectedImageIndex]?.fullSize || '';

        img.onload = () => {
            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Draw the bounding box if tumor detected
            if (imaging.tumorDetected && imaging.tumorBoundingBox && imaging.tumorBoundingBox.length >= 4) {
                ctx.strokeStyle = '#D32F2F';
                ctx.lineWidth = 3;
                ctx.beginPath();

                // Create a path from the points
                ctx.moveTo(imaging.tumorBoundingBox[0].x, imaging.tumorBoundingBox[0].y);
                for (let i = 1; i < imaging.tumorBoundingBox.length; i++) {
                    ctx.lineTo(imaging.tumorBoundingBox[i].x, imaging.tumorBoundingBox[i].y);
                }
                ctx.closePath();
                ctx.stroke();

                // Add semi-transparent fill
                ctx.fillStyle = 'rgba(211, 47, 47, 0.2)';
                ctx.fill();
            }
        };
    }, [imaging, selectedImageIndex, showBoundingBox]);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleToggleBoundingBox = () => {
        setShowBoundingBox(!showBoundingBox);
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleDownloadDicom = () => {
        if (imaging.images[selectedImageIndex]?.dicom) {
            // Logic to download DICOM file
            console.log('Download DICOM', imaging.images[selectedImageIndex].dicom);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Helper function to format tumor type
    const formatTumorType = (type?: string) => {
        if (!type) return 'Unknown';

        switch (type) {
            case 'glioma':
                return 'Glioma';
            case 'meningioma':
                return 'Meningioma';
            case 'pituitary':
                return 'Pituitary Tumor';
            case 'no_tumor':
                return 'No Tumor';
            default:
                return type;
        }
    };

    return (
        <Box>
            {/* Main content */}
            <Grid container spacing={3}>
                {/* Left column - Image viewer */}
                <Grid item xs={12} md={8}>
                    <InfoCard>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <InfoCardTitle>Image Viewer</InfoCardTitle>
                            <Box>
                                {imaging.tumorDetected !== undefined && (
                                    <Button
                                        size="small"
                                        onClick={handleToggleBoundingBox}
                                        sx={{
                                            textTransform: 'none',
                                            color: mode === 'light' ? '#21647D' : '#3CB6E3',
                                            mr: 1
                                        }}
                                    >
                                        {showBoundingBox ? 'Hide Tumor Marker' : 'Show Tumor Marker'}
                                    </Button>
                                )}
                            </Box>
                        </Box>

                        {/* Image viewer */}
                        <Box sx={{
                            width: '100%',
                            height: 400,
                            backgroundColor: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            {imaging.images && imaging.images.length > 0 ? (
                                imaging.tumorDetected !== undefined ? (
                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transform: `scale(${zoom})`,
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        <canvas
                                            ref={canvasRef}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <img
                                        src={imaging.images[selectedImageIndex].fullSize}
                                        alt={imaging.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            transform: `scale(${zoom})`,
                                            transition: 'transform 0.3s ease'
                                        }}
                                    />
                                )
                            ) : (
                                <Typography color="white">No images available</Typography>
                            )}

                            {/* Image controls */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                padding: '8px 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'white' }}
                                        onClick={handleZoomIn}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 11H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'white' }}
                                        onClick={handleZoomOut}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 11H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </IconButton>
                                </Box>

                                <Typography variant="caption" sx={{ color: 'white' }}>
                                    Zoom: {Math.round(zoom * 100)}%
                                </Typography>
                            </Box>
                        </Box>

                        {/* Thumbnails */}
                        {imaging.images && imaging.images.length > 1 && (
                            <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', pb: 1 }}>
                                {imaging.images.map((image, index) => (
                                    <ImageThumbnail
                                        key={index}
                                        src={image.thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={selectedImageIndex === index ? 'selected' : ''}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </Box>
                        )}
                    </InfoCard>

                    {/* Tumor detection results */}
                    {imaging.tumorDetected !== undefined && (
                        <InfoCard sx={{
                            borderColor: imaging.tumorDetected
                                ? mode === 'light' ? '#FFCDD2' : '#5A3333'
                                : mode === 'light' ? '#C8E6C9' : '#265D33',
                            backgroundColor: imaging.tumorDetected
                                ? mode === 'light' ? '#FFEBEE' : '#4F1B1B'
                                : mode === 'light' ? '#E8F5E9' : '#0F3D1F',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <InfoCardTitle>Brain Tumor Detection Results</InfoCardTitle>
                                {imaging.detectedAt && (
                                    <Typography variant="caption" sx={{
                                        color: mode === 'light'
                                            ? imaging.tumorDetected ? '#D32F2F' : '#2E7D32'
                                            : imaging.tumorDetected ? '#F48FB1' : '#81C995'
                                    }}>
                                        Analyzed on {new Date(imaging.detectedAt).toLocaleDateString()}
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 2,
                                borderRadius: '8px',
                                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.3)',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 600,
                                        color: imaging.tumorDetected
                                            ? mode === 'light' ? '#D32F2F' : '#F48FB1'
                                            : mode === 'light' ? '#2E7D32' : '#81C995',
                                        mr: 2
                                    }}>
                                        {imaging.tumorDetected ? 'Tumor Detected' : 'No Tumor Detected'}
                                    </Typography>

                                    {imaging.tumorType && imaging.tumorType !== 'no_tumor' && (
                                        <TumorTypeChip
                                            label={formatTumorType(imaging.tumorType)}
                                            tumortype={imaging.tumorType}
                                        />
                                    )}
                                </Box>

                                {imaging.confidence !== undefined && (
                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" sx={{
                                                fontWeight: 500,
                                                color: mode === 'light' ? '#454747' : '#FFFFFF'
                                            }}>
                                                Confidence Score
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                fontWeight: 600,
                                                color: imaging.confidence > 0.9
                                                    ? '#D32F2F'
                                                    : imaging.confidence > 0.7
                                                        ? '#FF9800'
                                                        : '#4CAF50'
                                            }}>
                                                {Math.round(imaging.confidence * 100)}%
                                            </Typography>
                                        </Box>
                                        <ConfidenceBar>
                                            <ConfidenceIndicator value={imaging.confidence} />
                                        </ConfidenceBar>
                                    </Box>
                                )}

                                {imaging.fhirObservationId && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            FHIR Observation ID: {imaging.fhirObservationId}
                                        </Typography>
                                    </Box>
                                )}

                                {imaging.fhirDiagnosticReportId && (
                                    <Box>
                                        <Typography variant="caption" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                            FHIR Diagnostic Report ID: {imaging.fhirDiagnosticReportId}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </InfoCard>
                    )}
                </Grid>

                {/* Right column - Study details */}
                <Grid item xs={12} md={4}>
                    <InfoCard>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <InfoCardTitle>Study Details</InfoCardTitle>
                            <ImagingStatusBadge
                                label={imaging.status}
                                color={
                                    imaging.status === 'Completed' ? 'success' :
                                        imaging.status === 'Pending' ? 'warning' : 'info'
                                }
                                size="small"
                            />
                        </Box>

                        <InfoItem>
                            <InfoLabel>Study Name:</InfoLabel>
                            <InfoValue>{imaging.name}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Modality:</InfoLabel>
                            <InfoValue>{imaging.modality}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Body Part:</InfoLabel>
                            <InfoValue>{imaging.bodyPart}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Date Performed:</InfoLabel>
                            <InfoValue>{imaging.date}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Physician:</InfoLabel>
                            <InfoValue>{imaging.physician}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Facility:</InfoLabel>
                            <InfoValue>{imaging.facility}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Urgency:</InfoLabel>
                            <InfoValue>{imaging.urgency || 'Not specified'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Follow-up Required:</InfoLabel>
                            <InfoValue>{imaging.followUpRequired ? 'Yes' : 'No'}</InfoValue>
                        </InfoItem>
                        {imaging.followUpRequired && imaging.followUpDate && (
                            <InfoItem>
                                <InfoLabel>Follow-up Date:</InfoLabel>
                                <InfoValue>{imaging.followUpDate}</InfoValue>
                            </InfoItem>
                        )}
                    </InfoCard>

                    {/* Findings and Impression */}
                    <InfoCard>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="imaging tabs">
                                <StyledTab label="Findings" />
                                <StyledTab label="Impression" />
                                <StyledTab label="Notes" />
                            </Tabs>
                        </Box>

                        {tabValue === 0 && (
                            <Typography sx={{
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontSize: '14px',
                                lineHeight: 1.6
                            }}>
                                {imaging.findings || 'No findings recorded.'}
                            </Typography>
                        )}

                        {tabValue === 1 && (
                            <Typography sx={{
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontSize: '14px',
                                lineHeight: 1.6
                            }}>
                                {imaging.impression || 'No impression recorded.'}
                            </Typography>
                        )}

                        {tabValue === 2 && (
                            <Typography sx={{
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontSize: '14px',
                                lineHeight: 1.6
                            }}>
                                {imaging.notes || 'No notes available.'}
                            </Typography>
                        )}
                    </InfoCard>

                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={onBackClick}
                            sx={{
                                color: mode === 'light' ? '#6C7A89' : '#B8C7CC',
                                borderColor: mode === 'light' ? '#D6E4EC' : '#444',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: mode === 'light' ? '#21647D' : '#3CB6E3',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            Back to List
                        </Button>
                        <Box>
                            <Button
                                variant="outlined"
                                onClick={onDelete}
                                sx={{
                                    color: '#E16A6A',
                                    borderColor: '#E16A6A',
                                    textTransform: 'none',
                                    mr: 1,
                                    '&:hover': {
                                        borderColor: '#d32f2f',
                                        backgroundColor: 'rgba(225, 106, 106, 0.08)',
                                    },
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onEdit}
                                sx={{
                                    backgroundColor: '#21647D',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#1a5268',
                                    },
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ImagingDetail; 