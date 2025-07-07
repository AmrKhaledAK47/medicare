import { AuthResponse, BrainTumorResultResponse, BrainTumorUploadResponse } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Authenticates with the Brain Tumor Classification API
 */
export const authenticate = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store token for future requests
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('userRole', data.data.user.role);
            localStorage.setItem('userId', data.data.user.id);
            localStorage.setItem('fhirResourceId', data.data.user.fhirResourceId);
            return data;
        } else {
            throw new Error(data.error?.message || 'Authentication failed');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};

/**
 * Gets the authentication token
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

/**
 * Gets the user role
 */
export const getUserRole = (): 'patient' | 'practitioner' | 'admin' | null => {
    const role = localStorage.getItem('userRole');
    if (role === 'patient' || role === 'practitioner' || role === 'admin') {
        return role;
    }
    return null;
};

/**
 * Gets the FHIR resource ID
 */
export const getFhirResourceId = (): string | null => {
    return localStorage.getItem('fhirResourceId');
};

/**
 * Uploads a brain MRI scan for analysis
 */
export const uploadBrainScan = async (file: File, patientId?: string): Promise<BrainTumorUploadResponse> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication required');
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = patientId
        ? `${API_BASE_URL}/brain-tumor/upload?patientId=${patientId}`
        : `${API_BASE_URL}/brain-tumor/upload`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            throw new Error(data.error?.message || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

/**
 * Gets a brain scan result by ID
 */
export const getBrainScanById = async (scanId: string): Promise<BrainTumorResultResponse> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication required');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/brain-tumor/${scanId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            throw new Error(data.error?.message || 'Failed to fetch results');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

/**
 * Gets all brain scans for a patient
 */
export const getPatientBrainScans = async (patientId: string): Promise<BrainTumorResultResponse[]> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication required');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/brain-tumor/patient/${patientId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.error?.message || 'Failed to fetch patient scans');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

/**
 * Deletes a brain scan
 */
export const deleteBrainScan = async (scanId: string): Promise<{ success: boolean }> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication required');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/brain-tumor/${scanId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        return { success: data.success };
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};

/**
 * Poll for brain scan results
 */
export const pollBrainScanResults = async (
    scanId: string,
    onComplete: (result: BrainTumorResultResponse) => void,
    onError: (error: Error) => void,
    maxAttempts = 20,
    delay = 3000
): Promise<void> => {
    let attempts = 0;

    const poll = async () => {
        if (attempts >= maxAttempts) {
            onError(new Error(`Polling timed out after ${maxAttempts} attempts`));
            return;
        }

        attempts++;

        try {
            const result = await getBrainScanById(scanId);

            if (result.data.status === 'completed' || result.data.status === 'failed') {
                onComplete(result);
            } else {
                setTimeout(poll, delay);
            }
        } catch (error) {
            if (error instanceof Error) {
                onError(error);
            } else {
                onError(new Error('Unknown error during polling'));
            }
        }
    };

    poll();
}; 