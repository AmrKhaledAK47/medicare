'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function PractitionerDashboard() {
    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#21647D' }}>
                Practitioner Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                This is the practitioner dashboard placeholder. It will be developed in a future phase.
            </Typography>
            <Button variant="contained" href="/dashboard/patient">
                Go to Patient Dashboard
            </Button>
        </Box>
    );
} 