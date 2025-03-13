'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        // This would typically check user role from auth context and redirect accordingly
        // For now, we'll redirect to patient dashboard by default
        router.push('/dashboard/patient');
    }, [router]);

    return null;
} 