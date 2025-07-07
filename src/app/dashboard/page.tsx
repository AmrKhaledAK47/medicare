'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingRedirect from '@/components/common/LoadingRedirect';

export default function Dashboard() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [message, setMessage] = useState('Redirecting you to your dashboard');
    const [countDown, setCountDown] = useState(3);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                // Not authenticated, redirect to login
                router.push('/login');
                return;
            }

            if (user) {
                // Set a custom message based on user role
                const roleMessages = {
                    admin: 'Redirecting you to the admin dashboard',
                    practitioner: 'Redirecting you to the practitioner dashboard',
                    patient: 'Redirecting you to your patient dashboard'
                };

                setMessage(roleMessages[user.role as keyof typeof roleMessages] || 'Redirecting you to your dashboard');

                // Create a countdown for better UX
                const interval = setInterval(() => {
                    setCountDown((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            // Redirect based on user role
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
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(interval);
            }
        }
    }, [router, user, isAuthenticated, isLoading]);

    // Show loading screen while authentication is being checked
    if (isLoading) {
        return <LoadingRedirect message="Checking your authentication" />;
    }

    // Show loading redirect with user's name
    return <LoadingRedirect message={message} userName={user?.name} />;
} 