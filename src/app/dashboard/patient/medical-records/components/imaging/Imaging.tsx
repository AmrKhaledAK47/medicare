import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    styled,
    Card,
    CardContent,
    Divider,
    Chip,
    Alert
} from '@mui/material';
import ImagingList from './ImagingList';
import ImagingDetail from './ImagingDetail';
import BrainScanUploader from './BrainScanUploader';
import { Imaging as ImagingType } from './types';
import { useTheme } from '@mui/material/styles';

// Icons
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FilterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ImagingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 10H23" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 1V4" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 1V4" stroke="#21647D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BrainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8C11.1667 8 10.3333 8.33333 9.5 9C8.66667 9.66667 8.16667 10.3333 8 11C7.83333 11.6667 8 12.3333 8.5 13C9 13.6667 9.33333 14 9.5 14C9.66667 14 10 13.6667 10.5 13C11 12.3333 11.3333 12 11.5 12C11.6667 12 12 12.3333 12.5 13C13 13.6667 13.3333 14 13.5 14C13.6667 14 14 13.6667 14.5 13C15 12.3333 15.3333 12 15.5 12C15.6667 12 16 12.3333 16.5 13C17 13.6667 17.3333 14 17.5 14C17.6667 14 18 13.6667 18.5 13C19 12.3333 19.1667 11.6667 19 11C18.8333 10.3333 18.3333 9.66667 17.5 9C16.6667 8.33333 15.8333 8 15 8" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Styled components
const BackButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3',
    textTransform: 'none',
    fontWeight: 500,
    padding: '6px 12px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(60, 182, 227, 0.08)',
    },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: theme.palette.mode === 'light' ? '#F5F9FA' : 'rgba(43, 43, 43, 0.8)',
        '& fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#E5E8EB' : '#444',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#D6E4EC' : '#555',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#21647D' : '#3CB6E3',
        },
    },
}));

const FilterButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 400,
    padding: '6px 12px',
    borderRadius: '20px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(60, 182, 227, 0.08)',
    },
}));

const AddButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    backgroundColor: '#21647D',
    textTransform: 'none',
    fontWeight: 500,
    padding: '6px 16px',
    borderRadius: '20px',
    '&:hover': {
        backgroundColor: '#1a5268',
    },
}));

const BrainScanButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    backgroundColor: '#D32F2F',
    textTransform: 'none',
    fontWeight: 500,
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '16px',
    boxShadow: '0px 4px 10px rgba(211, 47, 47, 0.3)',
    '&:hover': {
        backgroundColor: '#B71C1C',
        boxShadow: '0px 6px 15px rgba(211, 47, 47, 0.4)',
    },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: theme.palette.mode === 'light'
        ? '0px 4px 20px rgba(0, 0, 0, 0.08)'
        : '0px 4px 20px rgba(0, 0, 0, 0.3)',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'light'
            ? '0px 8px 30px rgba(0, 0, 0, 0.12)'
            : '0px 8px 30px rgba(0, 0, 0, 0.5)',
    },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    marginBottom: theme.spacing(1),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginBottom: theme.spacing(2),
}));

const HighlightChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#FCE4EC' : '#4A1A2C',
    color: theme.palette.mode === 'light' ? '#D32F2F' : '#F48FB1',
    fontWeight: 500,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

interface ImagingProps {
    initialImaging?: ImagingType[];
    onBackClick: () => void;
}

const ImagingComponent: React.FC<ImagingProps> = ({
    initialImaging = [],
    onBackClick
}) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [imagingStudies, setImagingStudies] = useState<ImagingType[]>(initialImaging);
    const [selectedImaging, setSelectedImaging] = useState<ImagingType | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalityFilter, setModalityFilter] = useState<ImagingType['modality'] | null>(null);
    const [openBrainScanUploader, setOpenBrainScanUploader] = useState(false);
    const [openAddImagingDialog, setOpenAddImagingDialog] = useState(false);
    const [showFeatures, setShowFeatures] = useState(true);

    const handleImagingClick = (imaging: ImagingType) => {
        setSelectedImaging(imaging);
        setShowFeatures(false);
    };

    const handleBackToImaging = () => {
        setSelectedImaging(null);
        setShowFeatures(true);
    };

    const handleFilterModalityClick = (modality: ImagingType['modality'] | null) => {
        setModalityFilter(prevModality => prevModality === modality ? null : modality);
    };

    const handleAddImaging = () => {
        setOpenAddImagingDialog(true);
    };

    const handleDeleteImaging = () => {
        if (!selectedImaging) return;

        // In a real app, you would call an API here
        setImagingStudies(prevStudies => prevStudies.filter(study => study.id !== selectedImaging.id));
        setSelectedImaging(null);
        setShowFeatures(true);
    };

    const handleEditImaging = () => {
        // In a real app, you would open an edit dialog here
        console.log('Edit imaging:', selectedImaging);
    };

    const handleOpenBrainScanUploader = () => {
        setOpenBrainScanUploader(true);
    };

    const handleCloseBrainScanUploader = () => {
        setOpenBrainScanUploader(false);
    };

    const handleBrainScanSuccess = (newImaging: ImagingType) => {
        setImagingStudies(prevStudies => [newImaging, ...prevStudies]);
        setOpenBrainScanUploader(false);
        // Automatically select the new imaging study
        setSelectedImaging(newImaging);
        setShowFeatures(false);
    };

    // Filter brain tumor scans
    const brainTumorScans = imagingStudies.filter(
        study => study.modality === 'MRI' &&
            study.bodyPart.toLowerCase().includes('brain') &&
            study.tumorDetected !== undefined
    );

    return (
        <Box sx={{ mb: 3 }}>
            {/* Header with back button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BackButton onClick={onBackClick} startIcon={<BackIcon />}>
                        Medical Records
                    </BackButton>
                </Box>
                {!selectedImaging && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <SearchInput
                            placeholder="Search imaging studies..."
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <Box sx={{ mr: 1, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                ),
                            }}
                        />
                        <FilterButton
                            startIcon={<FilterIcon />}
                            onClick={() => handleFilterModalityClick('MRI')}
                            sx={{
                                backgroundColor: modalityFilter === 'MRI' ? '#E3F2FD' : 'transparent',
                            }}
                        >
                            MRI
                        </FilterButton>
                        <FilterButton
                            startIcon={<FilterIcon />}
                            onClick={() => handleFilterModalityClick('CT')}
                            sx={{
                                backgroundColor: modalityFilter === 'CT' ? '#E3F2FD' : 'transparent',
                            }}
                        >
                            CT
                        </FilterButton>
                        <BrainScanButton
                            startIcon={<BrainIcon />}
                            onClick={handleOpenBrainScanUploader}
                            sx={{
                                ml: 'auto',
                            }}
                        >
                            Brain Tumor Detection
                        </BrainScanButton>
                    </Box>
                )}
            </Box>

            {/* Brain Tumor Detection Feature */}
            {!selectedImaging && showFeatures && (
                <Box sx={{ mb: 4 }}>
                    <FeatureCard>
                        <Box sx={{
                            p: 0,
                            position: 'relative',
                            height: '180px',
                            background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: 'url("https://images.unsplash.com/photo-1559757175-7b21e7afdd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.2
                            }} />
                            <Typography variant="h4" sx={{
                                color: '#FFFFFF',
                                fontWeight: 700,
                                textAlign: 'center',
                                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                                zIndex: 1
                            }}>
                                Brain Tumor Detection
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: mode === 'light' ? '#333333' : '#FFFFFF' }}>
                                Advanced AI-Powered Detection
                            </Typography>
                            <Typography sx={{ mb: 2, color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                Our state-of-the-art AI system can detect and classify brain tumors from MRI scans with high accuracy.
                                The system can identify Glioma, Meningioma, and Pituitary tumors, providing confidence scores and
                                visual indicators of tumor locations.
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <HighlightChip label="Glioma" />
                                <HighlightChip label="Meningioma" />
                                <HighlightChip label="Pituitary" />
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                                    {brainTumorScans.length > 0 ?
                                        `${brainTumorScans.length} brain scan${brainTumorScans.length > 1 ? 's' : ''} in your records` :
                                        'No brain scans in your records yet'}
                                </Typography>
                                <BrainScanButton
                                    startIcon={<BrainIcon />}
                                    onClick={handleOpenBrainScanUploader}
                                >
                                    Upload Brain MRI
                                </BrainScanButton>
                            </Box>
                        </CardContent>
                    </FeatureCard>

                    {brainTumorScans.length > 0 && (
                        <Alert
                            severity={brainTumorScans.some(scan => scan.tumorDetected) ? "warning" : "success"}
                            sx={{ mt: 2, borderRadius: '8px' }}
                        >
                            {brainTumorScans.some(scan => scan.tumorDetected)
                                ? "You have brain scans with detected tumors. Please consult with your healthcare provider."
                                : "Your previous brain scans show no tumor detections."}
                        </Alert>
                    )}
                </Box>
            )}

            {/* Imaging Studies Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ImagingIcon />
                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1.5, color: mode === 'light' ? '#454747' : '#FFFFFF' }}>
                    {selectedImaging ? selectedImaging.name : 'Imaging Studies'}
                </Typography>
            </Box>

            {selectedImaging ? (
                <ImagingDetail
                    imaging={selectedImaging}
                    onDelete={handleDeleteImaging}
                    onEdit={handleEditImaging}
                    onBackClick={handleBackToImaging}
                />
            ) : (
                <ImagingList
                    imagingStudies={imagingStudies}
                    searchQuery={searchQuery}
                    modalityFilter={modalityFilter}
                    onImagingClick={handleImagingClick}
                />
            )}

            {/* Brain Scan Uploader Dialog */}
            <BrainScanUploader
                open={openBrainScanUploader}
                onClose={handleCloseBrainScanUploader}
                onSuccess={handleBrainScanSuccess}
            />
        </Box>
    );
};

export default ImagingComponent; 