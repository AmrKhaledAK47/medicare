'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/context/AuthContext';
import LoadingRedirect from '../common/LoadingRedirect';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const LoadingContainer = styled(Box)({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #21647D 0%, #3CB6E3 100%)',
});

const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    allowedRoles = ['admin', 'patient', 'practitioner']
}) => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading) {
            // If not authenticated, redirect to login
            if (!isAuthenticated) {
                router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
                return;
            }

            // Check if user has required role
            if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                // Redirect based on actual role
                switch (user.role) {
                    case 'admin':
                        router.push('/dashboard/admin');
                        break;
                    case 'practitioner':
                        router.push('/dashboard/practitioner');
                        break;
                    case 'patient':
                        router.push('/dashboard/patient');
                        break;
                    default:
                        router.push('/dashboard');
                }
            }
        }
    }, [isLoading, isAuthenticated, user, router, pathname, allowedRoles]);

    // Show loading while checking authentication
    if (isLoading) {
        return <LoadingRedirect message="Checking authentication..." />;
    }

    // Show loading if not authenticated or not authorized
    if (!isAuthenticated || (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        return <LoadingRedirect message="Redirecting to appropriate page..." />;
    }

    // Render children if authenticated and authorized
    return <>{children}</>;
};

export default AuthGuard; 