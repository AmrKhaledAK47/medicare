import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import { Imaging } from './types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ImagingCardProps {
    imaging: Imaging;
    onClick: (imaging: Imaging) => void;
}

const StyledCard = styled(Box)(({ theme }) => ({
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2B2B2B',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
}));

const CardImageContainer = styled(Box)({
    height: 180,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
});

const CardImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const CardInfo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '16px',
    color: theme.palette.mode === 'light' ? '#333333' : '#FFFFFF',
    marginBottom: theme.spacing(1),
}));

const CardDetail = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    marginBottom: theme.spacing(0.5),
}));

const StatusBadge = styled(Box)<{ status: 'Completed' | 'Pending' | 'Scheduled' }>(({ theme, status }) => {
    let backgroundColor = '';
    let textColor = '';

    if (status === 'Completed') {
        backgroundColor = theme.palette.mode === 'light' ? '#E6F4EA' : '#0F3D1F';
        textColor = theme.palette.mode === 'light' ? '#1D8649' : '#81C995';
    } else if (status === 'Pending') {
        backgroundColor = theme.palette.mode === 'light' ? '#FFF7E6' : '#4D3A14';
        textColor = theme.palette.mode === 'light' ? '#F29D38' : '#FDBE60';
    } else if (status === 'Scheduled') {
        backgroundColor = theme.palette.mode === 'light' ? '#E3F2FD' : '#0D3B66';
        textColor = theme.palette.mode === 'light' ? '#1A73E8' : '#90CAF9';
    }

    return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor,
        color: textColor,
        position: 'absolute',
        top: '10px',
        right: '10px',
    };
});

const TumorBadge = styled(Box)<{ detected: boolean }>(({ theme, detected }) => {
    const backgroundColor = detected
        ? theme.palette.mode === 'light' ? '#FFEBEE' : '#4F1B1B'
        : theme.palette.mode === 'light' ? '#E6F4EA' : '#0F3D1F';

    const textColor = detected
        ? theme.palette.mode === 'light' ? '#D32F2F' : '#F88078'
        : theme.palette.mode === 'light' ? '#1D8649' : '#81C995';

    return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor,
        color: textColor,
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    };
});

const ImagingCard: React.FC<ImagingCardProps> = ({ imaging, onClick }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <StyledCard onClick={() => onClick(imaging)}>
            <CardImageContainer>
                {imaging.images && imaging.images.length > 0 && (
                    <CardImage src={imaging.images[0].thumbnail} alt={imaging.name} />
                )}
                <StatusBadge status={imaging.status}>{imaging.status}</StatusBadge>

                {/* Show tumor badge only for brain MRIs with detection results */}
                {imaging.modality === 'MRI' && imaging.bodyPart.toLowerCase().includes('brain') && imaging.tumorDetected !== undefined && (
                    <TumorBadge detected={imaging.tumorDetected}>
                        {imaging.tumorDetected
                            ? `Tumor: ${imaging.tumorType || 'Detected'}`
                            : 'No Tumor'}
                    </TumorBadge>
                )}
            </CardImageContainer>

            <CardInfo>
                <CardTitle>{imaging.name}</CardTitle>
                <CardDetail><strong>Date:</strong> {imaging.date}</CardDetail>
                <CardDetail><strong>Modality:</strong> {imaging.modality}</CardDetail>
                <CardDetail><strong>Body Part:</strong> {imaging.bodyPart}</CardDetail>
                <CardDetail><strong>Physician:</strong> {imaging.physician}</CardDetail>

                {/* Show confidence for detected tumors */}
                {imaging.tumorDetected && imaging.confidence !== undefined && (
                    <CardDetail>
                        <strong>Confidence:</strong> {(imaging.confidence * 100).toFixed(1)}%
                    </CardDetail>
                )}
            </CardInfo>
        </StyledCard>
    );
};

interface ImagingListProps {
    imagingStudies: Imaging[];
    searchQuery: string;
    modalityFilter: string | null;
    onImagingClick: (imaging: Imaging) => void;
}

const ImagingList: React.FC<ImagingListProps> = ({
    imagingStudies,
    searchQuery,
    modalityFilter,
    onImagingClick
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const filteredStudies = imagingStudies.filter(imaging => {
        const matchesSearch =
            imaging.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            imaging.modality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            imaging.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
            imaging.physician.toLowerCase().includes(searchQuery.toLowerCase());

        if (modalityFilter === null) {
            return matchesSearch;
        }

        return matchesSearch && imaging.modality === modalityFilter;
    });

    return (
        <Grid container spacing={3}>
            {filteredStudies.map((imaging) => (
                <Grid item xs={12} sm={6} md={4} key={imaging.id}>
                    <ImagingCard imaging={imaging} onClick={onImagingClick} />
                </Grid>
            ))}

            {filteredStudies.length === 0 && (
                <Grid item xs={12}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 6,
                            backgroundColor: theme.palette.mode === 'light' ? '#F8FBFC' : 'rgba(43, 43, 43, 0.5)',
                            borderRadius: '12px',
                            border: `1px dashed ${theme.palette.mode === 'light' ? '#D6E4EC' : '#444'}`,
                        }}
                    >
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC' }}>
                            No imaging studies found matching the current filters.
                        </Typography>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

export default ImagingList; 