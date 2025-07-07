'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Image from 'next/image';
import { useThemeContext } from './Sidebar';
import Link from 'next/link';

export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    link?: string;
    url?: string;
    type?: string;
}

interface QuickActionsProps {
    actions?: QuickAction[];
}

// Default quick actions if none provided
const defaultActions: QuickAction[] = [
    {
        id: '1',
        title: 'Schedule Appointment',
        description: 'Book a new appointment with your doctor',
        icon: '/icons/calendar-plus.svg',
        link: '/dashboard/patient/appointments/schedule'
    },
    {
        id: '2',
        title: 'Request Prescription',
        description: 'Request a refill for your medications',
        icon: '/icons/prescription.svg',
        link: '/dashboard/patient/prescriptions/request'
    },
    {
        id: '3',
        title: 'Upload Medical Records',
        description: 'Add new documents to your profile',
        icon: '/icons/upload-document.svg',
        link: '/dashboard/patient/records/upload'
    }
];

// Reliable icon mapping based on action type or keywords in title/description
const getIconFallback = (action: QuickAction): string => {
    // First check if we have a type to match
    if (action.type) {
        const type = action.type.toLowerCase();

        // Map common action types to reliable icon paths
        switch (type) {
            case 'consultation':
            case 'appointment':
            case 'schedule':
                return '/icons/calendar-plus.svg';

            case 'location':
            case 'hospital':
            case 'facility':
                return '/icons/hospital-building.svg';

            case 'emergency':
            case 'urgent':
                return '/icons/ambulance.svg';

            case 'prescription':
            case 'medication':
            case 'drug':
                return '/icons/prescription.svg';

            case 'document':
            case 'record':
            case 'upload':
                return '/icons/upload-document.svg';

            case 'message':
            case 'chat':
            case 'contact':
                return '/icons/message-circle.svg';
        }
    }

    // If no type match, try matching keywords in title and description
    const text = `${action.title} ${action.description}`.toLowerCase();

    if (text.includes('appointment') || text.includes('schedule') || text.includes('book') || text.includes('consult')) {
        return '/icons/calendar-plus.svg';
    }

    if (text.includes('prescription') || text.includes('medication') || text.includes('drug') || text.includes('refill')) {
        return '/icons/prescription.svg';
    }

    if (text.includes('record') || text.includes('document') || text.includes('upload') || text.includes('file')) {
        return '/icons/upload-document.svg';
    }

    if (text.includes('hospital') || text.includes('location') || text.includes('find') || text.includes('facility') || text.includes('center')) {
        return '/icons/hospital-building.svg';
    }

    if (text.includes('emergency') || text.includes('urgent') || text.includes('call') || text.includes('help')) {
        return '/icons/ambulance.svg';
    }

    if (text.includes('message') || text.includes('chat') || text.includes('contact') || text.includes('communicate')) {
        return '/icons/message-circle.svg';
    }

    // Default icon as last resort
    return '/icons/circle-info.svg';
};

// Generate an SVG icon as data URL based on the action title
const generateSvgIcon = (title: string): string => {
    // Get first letter of each word, up to 2 letters
    const initials = title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    // Generate a deterministic color based on the title
    const hash = title.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hue = Math.abs(hash % 360);
    const color = `hsl(${hue}, 65%, 55%)`;
    const bgColor = `hsl(${hue}, 65%, 95%)`;

    // Create SVG with initials
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="${bgColor}" />
        <text x="12" y="14" font-family="Arial" font-size="10" font-weight="bold" fill="${color}" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
    const { mode } = useThemeContext();
    const [iconErrors, setIconErrors] = useState<Record<string, boolean>>({});

    // Use provided actions or fall back to defaults
    const quickActions = actions || defaultActions;

    // Handle image error
    const handleImageError = (actionId: string) => {
        setIconErrors(prev => ({ ...prev, [actionId]: true }));
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    position: 'relative',
                    fontFamily: 'poppins',
                    color: mode === 'light' ? '#000000' : '#FFFFFF',
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                    pb: 0.5,
                    mb: { xs: 2, sm: 2.5 },
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100px',
                        height: '3px',
                        backgroundColor: '#217C99',
                        borderRadius: '5px 5px 0 0'
                    }
                }}
            >
                Quick Actions
            </Typography>

            <List sx={{ p: 0 }}>
                {quickActions.map((action) => (
                    <ListItem
                        key={action.id}
                        component={Link}
                        href={action.link || action.url || '#'}
                sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 1.5, sm: 2 },
                            mb: 2,
                            backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                                '&:hover': {
                                backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            },
                            textDecoration: 'none'
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#21647D',
                                    backgroundColor: iconErrors[action.id] ? 'rgba(33, 100, 125, 0.08)' : 'transparent',
                                    borderRadius: '50%'
                                }}
                            >
                                {iconErrors[action.id] ? (
                                    // Try the fallback icon first
                                    <Image
                                        src={getIconFallback(action)}
                                        alt={action.title}
                                        width={24}
                                        height={24}
                                        onError={() => {
                                            // If even the fallback fails, use the generated SVG
                                            const svgUrl = generateSvgIcon(action.title);
                                            const img = document.getElementById(`action-icon-${action.id}`) as HTMLImageElement;
                                            if (img) {
                                                img.src = svgUrl;
                                                // Remove the error handler to prevent infinite loops
                                                img.onerror = null;
                                            }
                                        }}
                                        id={`action-icon-${action.id}`}
                                    />
                                ) : (
                                    <Image
                                        src={action.icon}
                                        alt={action.title}
                                        width={24}
                                        height={24}
                                        onError={() => handleImageError(action.id)}
                                    />
                                )}
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        color: mode === 'light' ? '#000000' : '#FFFFFF',
                                        fontFamily: 'poppins',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {action.title}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: mode === 'light' ? '#9A9A9A' : '#B8C7CC',
                                        fontFamily: 'poppins',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {action.description}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default QuickActions;