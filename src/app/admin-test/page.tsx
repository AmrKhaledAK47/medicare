'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container, Alert, CircularProgress } from '@mui/material';
import { createPatientWithAccessCode, getAvailableAccessCodes } from '@/utils/adminUtils';

const AdminTestPage: React.FC = () => {
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ accessCode: string; patientId: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [accessCodes, setAccessCodes] = useState<string[]>([]);
    const [loadingCodes, setLoadingCodes] = useState(false);

    const handleCreatePatient = async () => {
        if (!patientName || !patientEmail) {
            setError('Please enter patient name and email');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const adminCredentials = {
                email: 'admin@test.com',
                password: 'Admin123'
            };

            const patientData = {
                name: patientName,
                email: patientEmail
            };

            const response = await createPatientWithAccessCode(adminCredentials, patientData);

            if (response) {
                setResult(response);
            } else {
                setError('Failed to create patient with access code');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleGetAccessCodes = async () => {
        setLoadingCodes(true);
        setError(null);

        try {
            const adminCredentials = {
                email: 'admin@test.com',
                password: 'Admin123'
            };

            const codes = await getAvailableAccessCodes(adminCredentials);
            setAccessCodes(codes);

            if (codes.length === 0) {
                setError('No access codes found');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoadingCodes(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Test - Create Patient with Access Code
                </Typography>

                <Typography variant="body1" paragraph>
                    This page simulates an admin creating a patient resource and generating an access code.
                    The access code can then be used to register a new patient account.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {result && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        <Typography variant="body1">
                            <strong>Patient created successfully!</strong>
                        </Typography>
                        <Typography variant="body2">
                            Patient ID: {result.patientId}
                        </Typography>
                        <Typography variant="body2">
                            Access Code: <strong>{result.accessCode}</strong> (Use this code to register)
                        </Typography>
                    </Alert>
                )}

                <Box component="form" noValidate sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Patient Name"
                        margin="normal"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Patient Email"
                        margin="normal"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        disabled={loading}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreatePatient}
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Create Patient & Generate Access Code'}
                    </Button>
                </Box>

                <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Available Access Codes
                    </Typography>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleGetAccessCodes}
                        disabled={loadingCodes}
                        sx={{ mb: 2 }}
                    >
                        {loadingCodes ? <CircularProgress size={24} /> : 'Get Available Access Codes'}
                    </Button>

                    {accessCodes.length > 0 && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Available codes:
                            </Typography>
                            <ul>
                                {accessCodes.map((code, index) => (
                                    <li key={index}>
                                        <Typography variant="body2">
                                            {code}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminTestPage; 