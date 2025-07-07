// Imaging Types
export interface ImagingImage {
    thumbnail: string;
    fullSize: string;
    dicom?: string;
}

export interface Imaging {
    id: string;
    name: string;
    modality: 'MRI' | 'CT' | 'X-Ray' | 'Ultrasound' | 'PET' | 'Angiography';
    bodyPart: string;
    date: string;
    physician: string;
    facility: string;
    status: 'Completed' | 'Pending' | 'Scheduled';
    findings?: string;
    impression?: string;
    images: ImagingImage[];
    notes?: string;
    urgency?: 'Routine' | 'Urgent' | 'STAT';
    followUpRequired?: boolean;
    followUpDate?: string;
    // New properties for brain tumor detection
    tumorDetected?: boolean;
    tumorType?: 'glioma' | 'meningioma' | 'pituitary' | 'no_tumor';
    confidence?: number;
    tumorBoundingBox?: { x: number; y: number }[];
    fhirObservationId?: string;
    fhirDiagnosticReportId?: string;
    detectedAt?: string;
}

// Brain Tumor API types
export interface BrainTumorUploadResponse {
    success: boolean;
    data: {
        _id: string;
        patientId: string;
        scanImagePath: string;
        thumbnailPath: string;
        status: 'pending' | 'completed' | 'failed';
        tumorDetected: boolean;
        tumorBoundingBox: { x: number; y: number }[];
        createdAt: string;
        updatedAt: string;
    };
}

export interface BrainTumorResultResponse {
    success: boolean;
    data: {
        _id: string;
        patientId: string;
        scanImagePath: string;
        thumbnailPath: string;
        status: 'pending' | 'completed' | 'failed';
        tumorDetected: boolean;
        tumorType?: 'glioma' | 'meningioma' | 'pituitary' | 'no_tumor';
        confidence?: number;
        tumorBoundingBox: { x: number; y: number }[];
        detectedAt?: string;
        createdAt: string;
        updatedAt: string;
        fhirObservationId?: string;
        fhirDiagnosticReportId?: string;
        errorMessage?: string;
    };
}

export interface AuthResponse {
    success: boolean;
    data: {
        accessToken: string;
        user: {
            id: string;
            role: 'patient' | 'practitioner' | 'admin';
            fhirResourceId: string;
        }
    }
} 