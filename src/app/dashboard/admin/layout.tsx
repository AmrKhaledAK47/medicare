'use client';

import React from 'react';
import RootProvider from '@/providers/RootProvider';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RootProvider requireAuth={true} allowedRoles={['admin']}>
            {children}
        </RootProvider>
    );
} 