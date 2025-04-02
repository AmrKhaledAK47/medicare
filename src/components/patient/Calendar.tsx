'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Grid } from '@mui/material';
import { useThemeContext } from './Sidebar';

// Define the days of the week
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Define props interface
interface CalendarProps {
    mobileView?: boolean;
}

// Define event interface for proper typing
interface CalendarEvent {
    title: string;
    type: string;
    time?: string;
}

// Function to get today's date in YYYY-MM-DD format for events
const getTodayString = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

// Sample data for events with proper type definition
const SAMPLE_EVENTS: Record<string, CalendarEvent[]> = {
    [getTodayString()]: [
        { title: 'Doctor Appointment', type: 'appointment', time: '10:30 AM' },
        { title: 'Blood Test', type: 'test', time: '2:15 PM' }
    ],
    '2023-10-15': [{ title: 'Check-up', type: 'appointment' }],
    '2023-10-18': [{ title: 'Blood Test', type: 'test' }],
    '2023-10-22': [{ title: 'Follow-up', type: 'appointment' }],
};

const Calendar: React.FC<CalendarProps> = ({ mobileView = false }) => {
    const { mode } = useThemeContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);
    const [isHoveringButton, setIsHoveringButton] = useState(false);

    // Initialize selected date to today
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    // Generate calendar days for the current month
    useEffect(() => {
        const days = generateCalendarDays(currentDate);
        setCalendarDays(days);
    }, [currentDate]);

    // Function to generate days for the calendar
    const generateCalendarDays = (date: Date): Array<Date | null> => {
        const year = date.getFullYear();
        const month = date.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const calendarDays: Array<Date | null> = [];

        // Add empty spaces for days before the first day of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            calendarDays.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(new Date(year, month, i));
        }

        // Add empty spaces to complete the grid (if needed)
        const remainingDays = 7 - (calendarDays.length % 7);
        if (remainingDays < 7) {
            for (let i = 0; i < remainingDays; i++) {
                calendarDays.push(null);
            }
        }

        return calendarDays;
    };

    // Function to handle month change
    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    // Format date to YYYY-MM-DD for event lookup
    const formatDateKey = (date: Date): string => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    // Check if a date has an event
    const hasEvent = (date: Date | null): boolean => {
        if (!date) return false;
        const dateKey = formatDateKey(date);
        return !!SAMPLE_EVENTS[dateKey]?.length;
    };

    // Get events for a specific date
    const getEvents = (date: Date | null): CalendarEvent[] => {
        if (!date) return [];
        const dateKey = formatDateKey(date);
        return SAMPLE_EVENTS[dateKey] || [];
    };

    // Count events for a date
    const countEvents = (date: Date | null): number => {
        if (!date) return 0;
        const dateKey = formatDateKey(date);
        return SAMPLE_EVENTS[dateKey]?.length || 0;
    };

    // Get month name and year
    const getMonthAndYear = (): string => {
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    // Check if a date is today
    const isToday = (date: Date | null): boolean => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Check if a date is the selected date
    const isSelected = (date: Date | null): boolean => {
        if (!date || !selectedDate) return false;
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
    };

    return (
        <Box sx={{ 
            mb: { xs: 3, sm: 3.5, md: 4 },
            ...(mobileView && {
                backgroundColor: mode === 'light' ? '#ffffff' : '#2B2B2B',
                borderRadius: '12px',
                p: { xs: 1.5, sm: 2 },
                boxShadow: mode === 'light' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
            })
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: { xs: 2, sm: 2.5, md: 3 },
                flexDirection: { xs: mobileView ? 'column' : 'row', sm: 'row' },
                gap: { xs: mobileView ? 1.5 : 0, sm: 0 }
            }}>
                    <Typography
                        variant="h6"
                        sx={{
                        position: 'relative',
                        fontFamily: 'poppins',
                        color: mode === 'light' ? '#000000' : '#FFFFFF',
                            fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                            pb: 0.5,
                        width: mobileView ? { xs: '100%', sm: 'auto' } : 'auto',
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
                        Calendar
                    </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#E16A8A',
                        borderRadius: '8px',
                        textTransform: 'none',
                        boxShadow: isHoveringButton ? '0 4px 12px rgba(225, 106, 138, 0.3)' : '0 2px 6px rgba(225, 106, 138, 0.2)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: '#d45679',
                            boxShadow: '0 4px 12px rgba(225, 106, 138, 0.3)',
                        },
                        padding: { xs: '4px 12px', sm: '5px 14px', md: '6px 16px' },
                        height: { xs: '38px', sm: '40px', md: '45px' },
                        minWidth: mobileView ? { xs: '100%', sm: 'auto' } : 'auto',
                        fontFamily: 'poppins',
                        fontWeight: 500,
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                    }}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                >
                    + New Health Activity
                </Button>
            </Box>

            {/* Calendar Header with Month/Year and Navigation */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                    backgroundColor: mode === 'light' ? '#F0F8FB' : '#2B2B2B',
                    borderRadius: '12px',
                    p: { xs: 0.3, sm: 0.4, md: 0.5 },
                }}
            >
                        <IconButton
                    onClick={() => changeMonth(-1)}
                            sx={{
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                        p: { xs: 0.7, sm: 1 },
                                '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                },
                            }}
                        >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'poppins',
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                    }}
                >
                    {getMonthAndYear()}
                </Typography>

                        <IconButton
                    onClick={() => changeMonth(1)}
                            sx={{
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
                        p: { xs: 0.7, sm: 1 },
                                '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(184, 199, 204, 0.08)',
                                },
                            }}
                        >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
            </Box>

            {/* Days of the Week */}
            <Grid container spacing={0.5} sx={{ mb: 1 }}>
                {DAYS_OF_WEEK.map((day) => (
                    <Grid item xs={12 / 7} key={day}>
                            <Typography
                            align="center"
                                sx={{
                                fontFamily: 'poppins',
                                fontWeight: 500,
                                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                                color: mode === 'light' ? '#6C7A89' : '#888',
                                textTransform: 'uppercase',
                                }}
                            >
                                {day}
                            </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Calendar Grid */}
            <Grid
                container
                spacing={0.4}
                sx={{
                    backgroundColor: mode === 'light' ? '#fff' : '#2B2B2B',
                    p: { xs: 1, sm: 1.25, md: 1.5 },
                    borderRadius: '12px',
                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                    boxShadow: mode === 'light' ? '0 2px 4px rgba(0,0,0,0.02)' : 'none',
                }}
            >
                {calendarDays.map((date, index) => (
                    <Grid item xs={12 / 7} key={index}>
                        <Box
                            onClick={() => date && setSelectedDate(date)}
                            sx={{
                                height: { xs: '30px', sm: '35px', md: '40px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                borderRadius: '8px',
                                cursor: date ? 'pointer' : 'default',
                                backgroundColor: isSelected(date)
                                    ? '#E16A8A'
                                        : isToday(date)
                                        ? mode === 'light' ? 'rgba(225, 106, 138, 0.1)' : 'rgba(225, 106, 138, 0.15)'
                                    : 'transparent',
                                color: isSelected(date)
                                    ? '#fff'
                                    : mode === 'light'
                                        ? (date ? '#21647D' : '#ccc')
                                        : (date ? '#B8C7CC' : '#555'),
                                fontWeight: isToday(date) || isSelected(date) ? 600 : 400,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: date && !isSelected(date)
                                        ? mode === 'light'
                                            ? 'rgba(225, 106, 138, 0.08)'
                                            : 'rgba(225, 106, 138, 0.1)'
                                        : undefined,
                                    transform: date ? 'scale(1.05)' : undefined,
                                },
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontFamily: 'poppins',
                                    fontWeight: isToday(date) || isSelected(date) ? 600 : 400,
                                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                                }}
                            >
                                {date?.getDate()}
                            </Typography>

                            {/* Event Indicator - Updated to show multiple dots for multiple events */}
                            {hasEvent(date) && !isSelected(date) && (
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    display: 'flex',
                                    gap: '3px',
                                    justifyContent: 'center'
                                }}>
                                    {[...Array(Math.min(countEvents(date), 2))].map((_, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                width: { xs: '3px', sm: '3.5px', md: '4px' },
                                                height: { xs: '3px', sm: '3.5px', md: '4px' },
                                                borderRadius: '50%',
                                                backgroundColor: '#E16A8A',
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
                </Grid>

            {/* Selected Day Information */}
            {selectedDate && (
                <Box
                    sx={{
                        mt: 2,
                        p: { xs: 1.5, sm: 1.75, md: 2 },
                        borderRadius: '12px',
                        backgroundColor: mode === 'light' ? '#F0F8FB' : '#333',
                        border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #444',
                    }}
                >
                    <Typography
                sx={{
                            fontFamily: 'poppins',
                            fontWeight: 600,
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                            color: mode === 'light' ? '#21647D' : '#B8C7CC',
                            mb: 1,
                        }}
                    >
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </Typography>

                    {hasEvent(selectedDate) ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {getEvents(selectedDate).map((event, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        p: { xs: 1, sm: 1.25, md: 1.5 },
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 6, sm: 7, md: 8 },
                                            height: { xs: 6, sm: 7, md: 8 },
                                            borderRadius: '50%',
                                            backgroundColor: '#E16A8A',
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: 'poppins',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                                                color: mode === 'light' ? '#21647D' : '#B8C7CC',
                                            }}
                                        >
                                            {event.title}
                                        </Typography>
                                        {event.time && (
                                            <Typography
                                                sx={{
                                                    fontFamily: 'poppins',
                                                    fontWeight: 400,
                                                    fontSize: { xs: '0.7rem', sm: '0.725rem', md: '0.75rem' },
                                                    color: mode === 'light' ? '#6C7A89' : '#999',
                                                }}
                                            >
                                                {event.time}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: 'poppins',
                                fontWeight: 400,
                                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                                color: mode === 'light' ? '#6C7A89' : '#888',
                                fontStyle: 'italic',
                            }}
                        >
                            No events scheduled for this day
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Calendar; 