'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 20)); // June 20, 2025
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 20));

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const renderHeader = () => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: '1.25rem',
                            mb: 0.5,
                            borderBottom: '2px solid #21647D',
                            display: 'inline-block',
                            pb: 0.5,
                        }}
                    >
                        Calendar
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', color: '#6C7A89', fontSize: '0.875rem' }}>
                        <IconButton
                            size="small"
                            onClick={prevMonth}
                            sx={{
                                p: 0.5,
                                mr: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                },
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </IconButton>
                        {format(currentMonth, 'MMM yyyy')}
                        <IconButton
                            size="small"
                            onClick={nextMonth}
                            sx={{
                                p: 0.5,
                                ml: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 100, 125, 0.08)',
                                },
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </IconButton>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5, color: '#555' }}>
                        Date
                    </Typography>
                    <Typography sx={{ color: '#6C7A89', fontSize: '0.875rem' }}>
                        {format(selectedDate, "dd.'June' yyyy")}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const renderDays = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return (
            <Grid container spacing={0} sx={{ mb: 1 }}>
                {days.map((day) => (
                    <Grid item key={day} xs>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 500,
                                    color: '#6C7A89',
                                    fontSize: '0.7rem',
                                }}
                            >
                                {day}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });

        // Fill in the days of the month
        const rows = [];
        let days = [];

        // Create a dummy array for the calendar grid (6 rows x 7 columns)
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const dayIndex = i * 7 + j;
                const date = dayIndex < dateRange.length ? dateRange[dayIndex] : null;

                days.push(
                    <Grid item xs key={`cell-${i}-${j}`}>
                        <Box
                            sx={{
                                height: 25,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: date ? 'pointer' : 'default',
                                borderRadius: '4px',
                                backgroundColor: date && isSameDay(date, selectedDate) ? '#EB445A' : 'transparent',
                                color: date
                                    ? isSameDay(date, selectedDate)
                                        ? 'white'
                                        : isToday(date)
                                            ? '#21647D'
                                            : '#555'
                                    : 'transparent',
                                '&:hover': {
                                    backgroundColor: date && !isSameDay(date, selectedDate) ? 'rgba(33, 100, 125, 0.08)' : undefined,
                                },
                            }}
                            onClick={() => date && setSelectedDate(date)}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: date && (isToday(date) || isSameDay(date, selectedDate)) ? 600 : 400,
                                    fontSize: '0.8rem',
                                }}
                            >
                                {date ? date.getDate() : ''}
                            </Typography>
                        </Box>
                    </Grid>
                );
            }
        }

        // Group days in rows
        for (let i = 0; i < 6; i++) {
            rows.push(
                <Grid container spacing={0} key={`row-${i}`}>
                    {days.slice(i * 7, (i + 1) * 7)}
                </Grid>
            );
        }

        return rows;
    };

    return (
        <Box sx={{ mb: 4 }}>
            {renderHeader()}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: '15px',
                    border: '1px solid #EEF1F4',
                }}
            >
                {renderDays()}
                {renderCells()}
            </Paper>
        </Box>
    );
};

export default Calendar; 