'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import usePractitionerDashboard from '@/hooks/usePractitionerDashboard';
import { FaCalendarAlt } from 'react-icons/fa';

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 40,
    marginBottom: theme.spacing(3),
    '& .MuiTab-root': {
        textTransform: 'none',
        minHeight: 40,
        fontWeight: 500,
        fontSize: '0.9rem',
        color: theme.palette.mode === 'light' ? '#555' : '#CCC',
        '&.Mui-selected': {
            color: '#21647D',
            fontWeight: 600,
        },
    },
    '& .MuiTabs-indicator': {
        backgroundColor: '#21647D',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minHeight: 40,
    fontWeight: 500,
    fontSize: '0.9rem',
}));

const TimeSlot = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function SchedulePage() {
    const { mode } = useThemeContext();
    const [currentView, setCurrentView] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const {
        loading,
        error,
        schedule,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleViewChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentView(newValue);
    };

    // Get current week dates
    const getCurrentWeekDates = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust when day is sunday (0)

        const monday = new Date(today);
        monday.setDate(today.getDate() - diff);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    };

    const weekDates = getCurrentWeekDates();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Check if a time slot is booked
    const isSlotBooked = (day: number, time: string) => {
        if (!schedule || !schedule.slots) return false;

        const date = weekDates[day];
        const dateStr = date.toISOString().split('T')[0];
        const timeHour = parseInt(time.split(':')[0]);

        return schedule.slots.some(slot => {
            const slotDate = new Date(slot.start);
            return slotDate.toISOString().split('T')[0] === dateStr &&
                slotDate.getHours() === timeHour &&
                slot.status === 'busy';
        });
    };

    // Get patient name for a booked slot
    const getPatientName = (day: number, time: string) => {
        if (!schedule || !schedule.slots) return '';

        const date = weekDates[day];
        const dateStr = date.toISOString().split('T')[0];
        const timeHour = parseInt(time.split(':')[0]);

        const slot = schedule.slots.find(slot => {
            const slotDate = new Date(slot.start);
            return slotDate.toISOString().split('T')[0] === dateStr &&
                slotDate.getHours() === timeHour &&
                slot.status === 'busy';
        });

        return slot?.patient?.name || '';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={60} sx={{ color: '#21647D' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={refreshDashboard}
                    sx={{
                        backgroundColor: '#21647D',
                        '&:hover': { backgroundColor: '#184C5F' }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header section */}
            <Box sx={{ mb: 4 }}>
                <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                    Schedule
                </SectionTitle>
            </Box>

            {/* View tabs */}
            <StyledTabs value={currentView} onChange={handleViewChange}>
                <StyledTab label="Week View" />
                <StyledTab label="Day View" />
                <StyledTab label="Month View" />
            </StyledTabs>

            {/* Week view schedule */}
            {currentView === 0 && (
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={2}></Grid>
                        {days.map((day, index) => (
                            <Grid item xs={true} key={day}>
                                <Box sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    p: 1,
                                    backgroundColor: mode === 'light' ? '#F5F5F5' : '#333',
                                    borderRadius: 1,
                                    color: mode === 'light' ? '#333' : '#FFF'
                                }}>
                                    {day}
                                    <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
                                        {formatDate(weekDates[index])}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {timeSlots.map((time, timeIndex) => (
                        <Grid container spacing={2} sx={{ mb: 2 }} key={time}>
                            <Grid item xs={2}>
                                <Box sx={{
                                    textAlign: 'right',
                                    pr: 2,
                                    pt: 1,
                                    color: mode === 'light' ? '#666' : '#CCC',
                                    fontWeight: 500
                                }}>
                                    {time}
                                </Box>
                            </Grid>
                            {days.map((day, dayIndex) => (
                                <Grid item xs={true} key={`${day}-${time}`}>
                                    <TimeSlot
                                        elevation={0}
                                        sx={{
                                            backgroundColor: isSlotBooked(dayIndex, time)
                                                ? 'rgba(33, 100, 125, 0.1)'
                                                : mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                                            border: `1px solid ${isSlotBooked(dayIndex, time)
                                                ? '#21647D'
                                                : mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                                        }}
                                    >
                                        {isSlotBooked(dayIndex, time) ? (
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: '#21647D'
                                                    }}
                                                >
                                                    {getPatientName(dayIndex, time)}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: mode === 'light' ? '#666' : '#CCC' }}>
                                                    Appointment
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: mode === 'light' ? '#AAA' : '#666',
                                                    textAlign: 'center',
                                                    fontStyle: 'italic'
                                                }}
                                            >
                                                Available
                                            </Typography>
                                        )}
                                    </TimeSlot>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>
            )}

            {/* Day view placeholder */}
            {currentView === 1 && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 5
                }}>
                    <FaCalendarAlt size={60} color={mode === 'light' ? '#21647D' : '#B8C7CC'} />
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 2,
                            color: mode === 'light' ? '#666' : '#CCC',
                            textAlign: 'center'
                        }}
                    >
                        Day view is coming soon
                    </Typography>
                </Box>
            )}

            {/* Month view placeholder */}
            {currentView === 2 && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 5
                }}>
                    <FaCalendarAlt size={60} color={mode === 'light' ? '#21647D' : '#B8C7CC'} />
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 2,
                            color: mode === 'light' ? '#666' : '#CCC',
                            textAlign: 'center'
                        }}
                    >
                        Month view is coming soon
                    </Typography>
                </Box>
            )}
        </Box>
    );
} 