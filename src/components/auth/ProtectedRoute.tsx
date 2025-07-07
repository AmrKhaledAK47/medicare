'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const LoadingContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #21647D 0%, #3CB6E3 100%)',
});

const LoadingText = styled(Typography)({
    marginTop: '20px',
    color: '#FFFFFF',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '18px',
});

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = ['admin', 'patient', 'practitioner']
}) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Skip auth check for public routes
        if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password' || pathname === '/verify-code') {
            return;
        }

        if (!isLoading && !isAuthenticated) {
            setIsRedirecting(true);
            router.push('/login');
            return;
        }

        // Check role-based access
        if (!isLoading && isAuthenticated && user && allowedRoles.length > 0) {
            if (!allowedRoles.includes(user.role)) {
                setIsRedirecting(true);

                // Redirect to appropriate dashboard based on role
                if (user.role === 'admin') {
                    router.push('/dashboard/admin');
                } else if (user.role === 'practitioner') {
                    router.push('/dashboard/practitioner');
                } else {
                    router.push('/dashboard/patient');
                }
            }
        }
    }, [isLoading, isAuthenticated, user, router, pathname, allowedRoles]);

    if (isLoading || isRedirecting) {
        return (
            <LoadingContainer>
                <CircularProgress size={60} thickness={4} sx={{ color: '#FFFFFF' }} />
                <LoadingText>
                    {isRedirecting ? 'Redirecting...' : 'Loading...'}
                </LoadingText>
            </LoadingContainer>
        );
    }

    // For public routes or authenticated users with correct role
    return <>{children}</>;
};

export default ProtectedRoute; 