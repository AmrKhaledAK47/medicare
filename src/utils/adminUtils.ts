'use client';

import axios from 'axios';

interface AdminCredentials {
    email: string;
    password: string;
}

interface PatientData {
    name: string;
    email: string;
    gender?: string;
    birthDate?: string;
}

interface AccessCodeResponse {
    success: boolean;
    data?: {
        resource: any;
        accessCode: string;
    };
    message?: string;
}

/**
 * Utility function to create a patient resource and generate an access code as an admin
 * This is for demonstration purposes to simulate the admin workflow
 */
export const createPatientWithAccessCode = async (
    adminCredentials: AdminCredentials,
    patientData: PatientData
): Promise<{ accessCode: string; patientId: string } | null> => {
    try {
        // Step 1: Login as admin
        const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: adminCredentials.email,
            password: adminCredentials.password
        });

        if (!loginResponse.data.success || !loginResponse.data.data?.accessToken) {
            console.error('Admin login failed:', loginResponse.data.message);
            return null;
        }

        const adminToken = loginResponse.data.data.accessToken;

        // Step 2: Create patient resource with access code
        const patientResponse = await axios.post(
            `http://localhost:3000/api/fhir/Patient/with-access-code?email=${patientData.email}`,
            {
                resourceType: 'Patient',
                active: true,
                name: [
                    {
                        use: 'official',
                        family: patientData.name.split(' ').pop() || '',
                        given: [patientData.name.split(' ').shift() || '']
                    }
                ],
                gender: patientData.gender || 'unknown',
                birthDate: patientData.birthDate || new Date().toISOString().split('T')[0]
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!patientResponse.data.success) {
            console.error('Failed to create patient:', patientResponse.data.message);
            return null;
        }

        const { accessCode, resource } = patientResponse.data.data;
        return {
            accessCode,
            patientId: resource.id
        };
    } catch (error: any) {
        console.error('Error creating patient with access code:', error.response?.data || error.message);
        return null;
    }
};

/**
 * Utility function to get all available access codes (admin only)
 */
export const getAvailableAccessCodes = async (adminCredentials: AdminCredentials): Promise<string[]> => {
    try {
        // Step 1: Login as admin
        const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: adminCredentials.email,
            password: adminCredentials.password
        });

        if (!loginResponse.data.success || !loginResponse.data.data?.accessToken) {
            console.error('Admin login failed:', loginResponse.data.message);
            return [];
        }

        const adminToken = loginResponse.data.data.accessToken;

        // Step 2: Get available access codes
        const accessCodesResponse = await axios.get(
            'http://localhost:3000/api/access-codes',
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!accessCodesResponse.data.success) {
            console.error('Failed to get access codes:', accessCodesResponse.data.message);
            return [];
        }

        return accessCodesResponse.data.data.map((code: any) => code.code);
    } catch (error: any) {
        console.error('Error getting access codes:', error.response?.data || error.message);
        return [];
    }
}; 