'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Button, Paper, Grid, Card, Avatar, LinearProgress, IconButton, useMediaQuery, useTheme, Alert } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import SetupMedicare from '../../../components/patient/SetupMedicare';
import Biomarkers, { Biomarker } from '../../../components/patient/Biomarkers';
import Calendar, { CalendarEvent } from '../../../components/patient/Calendar';
import QuickActions, { QuickAction } from '../../../components/patient/QuickActions';
import UpcomingAppointments, { Appointment } from '../../../components/patient/UpcomingAppointments';
import { useThemeContext } from '../../../components/patient/Sidebar';
import useDashboard from '../../../hooks/useDashboard';
import DashboardSkeleton from '../../../components/patient/DashboardSkeleton';

const Dashboard = () => {
    const { mode } = useThemeContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const {
        loading,
        error,
        profile: userProfile,
        biomarkers: apiBiomarkers,
        appointments: apiAppointments,
        calendar: apiCalendarEvents,
        quickActions: apiQuickActions,
        componentErrors,
        refreshDashboard,
        updateAvatar
    } = useDashboard();

    // Map API biomarkers to component format
    const mappedBiomarkers = useMemo(() => {
        if (!apiBiomarkers || apiBiomarkers.length === 0) return undefined;

        // Define biomarker categories and their mapping to API types
        const categories = {
            heart: {
                name: 'Heart',
                icon: '/icons/heart.svg',
                types: ['cholesterol', 'hdl', 'ldl', 'triglycerides', 'blood-pressure'],
                color: '#FF5252'
            },
            kidney: {
                name: 'Kidney',
                icon: '/icons/kidney.svg',
                types: ['creatinine', 'bun', 'egfr', 'urine-albumin'],
                color: '#FFA726'
            },
            liver: {
                name: 'Liver',
                icon: '/icons/liver.svg',
                types: ['alt', 'ast', 'alp', 'bilirubin'],
                color: '#E91E63'
            },
            sugar: {
                name: 'Sugar',
                icon: '/images/sugar-icon.png',
                types: ['glucose', 'a1c', 'insulin'],
                color: '#FF9800'
            },
            blood: {
                name: 'Blood',
                icon: '/icons/blood.svg',
                types: ['hemoglobin', 'hematocrit', 'platelets', 'wbc', 'rbc'],
                color: '#F44336'
            },
            thyroid: {
                name: 'Thyroid',
                icon: '/icons/thyroid.svg',
                types: ['tsh', 't3', 't4', 'free-t4'],
                color: '#9C27B0'
            },
            bone: {
                name: 'Bone',
                icon: '/icons/bone.svg',
                types: ['calcium', 'vitamin-d', 'phosphorus'],
                color: '#607D8B'
            }
        };

        // Count biomarkers in each category
        const categoryCounts: Record<string, number> = {};
        apiBiomarkers.forEach(biomarker => {
            for (const [key, category] of Object.entries(categories)) {
                if (category.types.some(type => biomarker.type?.toLowerCase().includes(type))) {
                    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
                    break;
                }
            }
        });

        // Check for updates in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Create the mapped biomarkers array
        return Object.entries(categories).map(([key, category]) => {
            const categoryBiomarkers = apiBiomarkers.filter(biomarker =>
                category.types.some(type => biomarker.type?.toLowerCase().includes(type))
            );

            const hasRecentUpdate = categoryBiomarkers.some(biomarker => {
                if (!biomarker.date) return false;
                const biomarkerDate = new Date(biomarker.date);
                return biomarkerDate >= sevenDaysAgo;
            });

            // Create indicators array (5 dots max)
            const count = categoryCounts[key] || 0;
            const indicators = Array(5).fill(0).map((_, i) => i < count ? 1 : 0);

            return {
                id: key,
                name: category.name,
                icon: category.icon,
                indicators,
                color: category.color,
                hasUpdate: hasRecentUpdate,
                // Store the related biomarkers for details view
                relatedBiomarkers: categoryBiomarkers
            };
        });
    }, [apiBiomarkers]);

    const appointments = useMemo<Appointment[]>(() => {
        return apiAppointments?.map(apt => {
            // Format date and time for display
            const formattedDate = new Date(apt.start).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const formattedTime = `${new Date(apt.start).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })} - ${new Date(apt.end).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })}`;

            // Create doctor object from practitioner data
            const doctorName = apt.practitioner?.name || 'Doctor';
            const doctorSpecialty = apt.practitioner?.speciality || 'Healthcare Provider';
            const doctorAvatar = apt.practitioner?.imageUrl || '/avatars/doctor.png';

            return {
                id: apt.id,
                date: formattedDate,
                time: formattedTime,
                type: apt.appointmentType || 'Appointment',
                doctor: {
                    name: doctorName,
                    specialty: doctorSpecialty,
                    avatar: doctorAvatar,
                },
                // Keep original fields
                start: apt.start,
                end: apt.end,
                description: apt.description,
                status: apt.status,
                practitioner: apt.practitioner,
                location: apt.location,
                appointmentType: apt.appointmentType,
            };
        }) || [];
    }, [apiAppointments]);

    const calendarEvents = useMemo<CalendarEvent[]>(() => {
        if (!apiCalendarEvents) return [];

        // Flatten the calendar events
        const events: CalendarEvent[] = [];
        apiCalendarEvents.forEach(day => {
            day.events.forEach(event => {
                events.push({
                    id: event.id,
                    title: event.title,
                    type: event.type,
                    time: event.time,
                    date: day.date,
                });
            });
        });
        return events;
    }, [apiCalendarEvents]);

    const quickActions = useMemo<QuickAction[]>(() => {
        return apiQuickActions?.map(action => {
            // Generate icon path based on type if icon is missing
            let iconPath = '/icons/default-action.svg'; // Default icon

            if (action.icon) {
                iconPath = `/icons/${action.icon}.svg`;
            } else if (action.type) {
                // Use type as fallback for icon name
                switch (action.type.toLowerCase()) {
                    case 'consultation':
                    case 'appointment':
                        iconPath = '/icons/calendar-plus.svg';
                        break;
                    case 'location':
                    case 'hospital':
                        iconPath = '/icons/map-marker.svg';
                        break;
                    case 'emergency':
                        iconPath = '/icons/phone-emergency.svg';
                        break;
                    case 'prescription':
                    case 'medication':
                        iconPath = '/icons/prescription.svg';
                        break;
                    case 'records':
                    case 'document':
                        iconPath = '/icons/upload-document.svg';
                        break;
                    default:
                        iconPath = '/icons/default-action.svg';
                }
            }

            return {
                id: action.id,
                title: action.title,
                description: action.description,
                icon: iconPath,
                link: action.url || '#',
                type: action.type,
            };
        }) || [];
    }, [apiQuickActions]);

    // Helper function to get color based on status
    function getColorForStatus(status?: string): string {
        switch (status) {
            case 'high':
                return '#FF5252';
            case 'low':
                return '#FFA726';
            case 'critical':
                return '#F44336';
            case 'normal':
                return '#4CAF50';
            default:
                return '#607D8B';
        }
    }

    // Show loading state while data is being fetched
    if (loading) {
        return <DashboardSkeleton />;
    }

    // Handle general error state
    if (error) {
        return (
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
                <Alert
                    severity="error"
                    sx={{ mb: 2, width: '100%', maxWidth: 600 }}
                >
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={refreshDashboard}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            height: { xs: 'auto', md: 'calc(100vh - 64px)' },
            backgroundColor: mode === 'light' ? '#ffffff' : '#1A1A1A'
        }}>
            {/* Left scrollable section */}
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    p: { xs: 2, sm: 3 },
                    order: { xs: 2, md: 1 },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'light' ? '#ffffff' : '#1A1A1A',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'light' ? '#ffffff' : '#1A1A1A',
                        borderRadius: '4px',
                    },
                }}
            >
                <Box sx={{ maxWidth: { xs: '100%', lg: '1000px' }, mx: 'auto' }}>
                    {/* Welcome header */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: mode === 'light' ? '#454747' : '#FFFFFF',
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                            }}
                        >
                            Welcome {userProfile?.name || 'Patient'} !
                        </Typography>
                        <Typography
                            variant="body2"
                            fontSize={{ xs: 14, sm: 16 }}
                            sx={{
                                color: mode === 'light' ? '#A3A0A0' : '#B8C7CC',
                                fontFamily: "poppins",
                                marginTop: -1,
                                fontWeight: 300
                            }}
                        >
                            Send Doctors, schools and loved ones secure access to important records
                        </Typography>
                    </Box>

                    {/* Setup Medicare section */}
                    <SetupMedicare />

                    {/* Biomarkers section */}
                    {componentErrors.biomarkers ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {componentErrors.biomarkers}
                        </Alert>
                    ) : (
                        <Biomarkers biomarkerData={mappedBiomarkers} />
                    )}

                    {/* Mobile view: Insert Calendar and QuickActions here */}
                    {isTablet && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
                            {componentErrors.calendar ? (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {componentErrors.calendar}
                                </Alert>
                            ) : (
                                <Calendar events={calendarEvents} mobileView={true} />
                            )}

                            <Box sx={{ mt: 3 }}>
                                {componentErrors.quickActions ? (
                                    <Alert severity="error">
                                        {componentErrors.quickActions}
                                    </Alert>
                                ) : (
                                    <QuickActions actions={quickActions} />
                                )}
                            </Box>
                        </Box>
                    )}

                    {/* Upcoming Appointments section */}
                    {componentErrors.appointments ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {componentErrors.appointments}
                        </Alert>
                    ) : (
                        <UpcomingAppointments appointments={appointments} />
                    )}
                </Box>
            </Box>

            {/* Right fixed section - only visible on desktop/larger tablets */}
            {!isTablet && (
                <Box
                    sx={{
                        width: { md: '350px', lg: '460px' },
                        p: 3,
                        backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                        borderLeft: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                        display: 'flex',
                        flexDirection: 'column',
                        order: { xs: 1, md: 2 },
                        height: '100%',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: mode === 'light' ? '#ffffff' : '#2B2B2B',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: mode === 'light' ? '#E0E0E0' : '#444',
                            borderRadius: '4px',
                        },
                    }}
                >
                    {/* Calendar */}
                    {componentErrors.calendar ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {componentErrors.calendar}
                        </Alert>
                    ) : (
                        <Calendar events={calendarEvents} />
                    )}

                    {/* Quick Actions */}
                    <Box sx={{ mt: 3 }}>
                        {componentErrors.quickActions ? (
                            <Alert severity="error">
                                {componentErrors.quickActions}
                            </Alert>
                        ) : (
                            <QuickActions actions={quickActions} />
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard; 