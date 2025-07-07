'use client';

import React from 'react';
import { AnimationProvider } from '@/context/AnimationContext';
import { AuthProvider } from '@/context/AuthContext';
import { ConditionalThemeProvider } from './ConditionalThemeProvider';
import AuthGuard from '@/components/auth/AuthGuard';
import GlobalErrorHandler from '@/components/common/GlobalErrorHandler';

interface RootProviderProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    allowedRoles?: string[];
}

export const RootProvider: React.FC<RootProviderProps> = ({
    children,
    requireAuth = false,
    allowedRoles = ['admin', 'patient', 'practitioner']
}) => {
    return (
        <ConditionalThemeProvider>
            <AnimationProvider>
                <AuthProvider>
                    <GlobalErrorHandler />
                    {requireAuth ? (
                        <AuthGuard allowedRoles={allowedRoles}>
                            {children}
                        </AuthGuard>
                    ) : (
                        children
                    )}
                </AuthProvider>
            </AnimationProvider>
        </ConditionalThemeProvider>
    );
};

export default RootProvider; 