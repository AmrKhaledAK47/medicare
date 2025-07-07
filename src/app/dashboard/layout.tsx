'use client';

import React from 'react';
import RootProvider from '@/providers/RootProvider';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RootProvider requireAuth={true}>
            {children}
        </RootProvider>
    );
} 