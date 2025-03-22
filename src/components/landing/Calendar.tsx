'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useThemeContext } from '../patient/Sidebar';

// Styled components
const CalendarContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2B2B2B',
    border: theme.palette.mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
}));

const CalendarDay = styled(Box)<{ isToday?: boolean; isSelected?: boolean; isCurrentMonth?: boolean }>(
    ({ theme, isToday, isSelected, isCurrentMonth }) => ({
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '8px',
        cursor: 'pointer',
        maxWidth: '120px',
        backgroundColor: isToday
            ? '#E16A8A'
            : isSelected
                ? theme.palette.mode === 'light'
                    ? 'rgba(33, 100, 125, 0.1)'
                    : 'rgba(33, 100, 125, 0.2)'
                : 'transparent',
        color: isToday
            ? '#fff'
            : !isCurrentMonth
                ? theme.palette.mode === 'light' ? '#CCD6DD' : '#555'
                : theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
        fontWeight: isToday || isSelected ? 600 : 400,
        transition: 'all 0.2s ease',
        opacity: isCurrentMonth ? 1 : 0.5,
        '&:hover': {
            backgroundColor: !isToday && !isSelected
                ? theme.palette.mode === 'light'
                    ? 'rgba(225, 106, 138, 0.08)'
                    : 'rgba(225, 106, 138, 0.1)'
                : undefined,
            transform: 'scale(1.05)',
        },
    })
);

// Define the days of the week
const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNSDAY', 'THURSDAY', 'FRIDAY', 'SATRDAY', 'SUNDAY'];

// Sample appointments for the landing page
const SAMPLE_APPOINTMENTS = [
    { date: new Date(2023, 5, 20), status: 'upcoming' },
    { date: new Date(2023, 5, 22), status: 'upcoming' },
    { date: new Date(2023, 5, 25), status: 'upcoming' },
    { date: new Date(2023, 5, 28), status: 'upcoming' },
];

const LandingCalendar = () => {
    const { mode } = useThemeContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);

    // Generate calendar days
    const generateCalendarDays = (date: Date): Array<Date | null> => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const lastDayPrevMonth = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        let startDayOfWeek = firstDay.getDay();
        startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

        const calendarDays: Array<Date | null> = [];

        // Add days from previous month
        for (let i = 0; i < startDayOfWeek; i++) {
            const day = lastDayPrevMonth - startDayOfWeek + i + 1;
            calendarDays.push(new Date(year, month - 1, day));
        }

        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(new Date(year, month, i));
        }

        // Add days from next month to complete the grid
        const remainingDays = 42 - calendarDays.length;
        for (let i = 1; i <= remainingDays; i++) {
            calendarDays.push(new Date(year, month + 1, i));
        }

        return calendarDays;
    };

    // Update calendar days when current date changes
    React.useEffect(() => {
        setCalendarDays(generateCalendarDays(currentDate));
    }, [currentDate]);

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    const isToday = (date: Date | null): boolean => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isCurrentMonth = (date: Date | null): boolean => {
        if (!date) return false;
        return date.getMonth() === currentDate.getMonth();
    };

    const hasAppointment = (date: Date | null): boolean => {
        if (!date) return false;
        return SAMPLE_APPOINTMENTS.some(apt =>
            apt.date.getDate() === date.getDate() &&
            apt.date.getMonth() === date.getMonth() &&
            apt.date.getFullYear() === date.getFullYear()
        );
    };

    return (
        <CalendarContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton
                    onClick={() => changeMonth(-1)}
                    sx={{
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
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
                        mx: 2,
                        fontWeight: 600,
                        color: mode === 'light' ? '#454747' : '#FFFFFF',
                        fontFamily: '"Poppins", sans-serif',
                    }}
                >
                    {currentDate.toLocaleDateString('en-US', { month: 'long' })}
                </Typography>

                <IconButton
                    onClick={() => changeMonth(1)}
                    sx={{
                        color: mode === 'light' ? '#21647D' : '#B8C7CC',
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
            <Grid container spacing={1} sx={{ mb: 1 }}>
                {DAYS_OF_WEEK.map((day) => (
                    <Grid item xs={12 / 7} key={day}>
                        <Typography
                            align="center"
                            sx={{
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                color: mode === 'light' ? '#6C7A89' : '#888',
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
                spacing={0.6}
                sx={{
                    backgroundColor: 'transparent',
                    px: 1,
                    py: 2,
                    borderRadius: '12px',
                    border: mode === 'light' ? '1px solid #EEF1F4' : '1px solid #333',
                }}
            >
                {calendarDays.map((date, index) => (
                    <Grid item xs={12 / 7} key={index}>
                        <CalendarDay
                            isToday={isToday(date)}
                            isSelected={selectedDate && date &&
                                date.getDate() === selectedDate.getDate() &&
                                date.getMonth() === selectedDate.getMonth() &&
                                date.getFullYear() === selectedDate.getFullYear()}
                            isCurrentMonth={isCurrentMonth(date)}
                            onClick={() => date && setSelectedDate(date)}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: '"Poppins", sans-serif',
                                    fontWeight: isToday(date) || (selectedDate && date &&
                                        date.getDate() === selectedDate.getDate() &&
                                        date.getMonth() === selectedDate.getMonth() &&
                                        date.getFullYear() === selectedDate.getFullYear()) ? 600 : 400,
                                    fontSize: '1rem',
                                }}
                            >
                                {date?.getDate()}
                            </Typography>

                            {/* Appointment indicator */}
                            {date && hasAppointment(date) && (
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    display: 'flex',
                                    gap: '3px',
                                    justifyContent: 'center'
                                }}>
                                    <Box
                                        sx={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            backgroundColor: '#E16A8A',
                                        }}
                                    />
                                </Box>
                            )}
                        </CalendarDay>
                    </Grid>
                ))}
            </Grid>

            {/* Schedule Visit Button */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link href="/dashboard/patient/schedule" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#267997',
                            color: '#ffffff',
                            fontFamily: '"Poppins", sans-serif',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#21647D',
                            },
                        }}
                    >
                        Schedule a Visit
                    </Button>
                </Link>
            </Box>
        </CalendarContainer>
    );
};

export default LandingCalendar; 