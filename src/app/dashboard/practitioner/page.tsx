'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import StatisticsCard from '@/components/practitioner/StatisticsCard';
import AppointmentCard from '@/components/practitioner/AppointmentCard';
import PatientCard from '@/components/practitioner/PatientCard';
import usePractitionerDashboard, { Appointment, Patient } from '@/hooks/usePractitionerDashboard';
import { FaHospitalUser } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { GiMicroscope } from 'react-icons/gi';

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  color: '#21647D',
  '&:hover': {
    backgroundColor: 'rgba(33, 100, 125, 0.08)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 40,
  marginBottom: theme.spacing(2),
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

export default function PractitionerDashboard() {
  const { mode } = useThemeContext();
  const [appointmentTab, setAppointmentTab] = useState(0);

  const {
    loading,
    error,
    profile,
    patients,
    appointments,
    statistics,
    refreshDashboard
  } = usePractitionerDashboard();

  const handleAppointmentTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setAppointmentTab(newValue);
  };

  const handleViewAppointmentDetails = (appointment: Appointment) => {
    // Navigate to appointment details page
    console.log('View appointment details:', appointment.id);
  };

  const handleViewPatientDetails = (patient: Patient) => {
    // Navigate to patient details page
    console.log('View patient details:', patient.id);
  };

  // Filter appointments based on the selected tab
  const filterAppointments = () => {
    if (!appointments) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    switch (appointmentTab) {
      case 0: // Today
        return appointments.filter(apt => {
          const aptDate = new Date(apt.start);
          return aptDate >= today && aptDate < tomorrow;
        });
      case 1: // Tomorrow
        return appointments.filter(apt => {
          const aptDate = new Date(apt.start);
          return aptDate >= tomorrow && aptDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
        });
      case 2: // This Week
        return appointments.filter(apt => {
          const aptDate = new Date(apt.start);
          return aptDate >= today && aptDate < nextWeek;
        });
      default:
        return appointments;
    }
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
      {/* Welcome section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: mode === 'light' ? '#333' : '#FFF',
            mb: 1,
          }}
        >
          Welcome back, {'Doctor sarah'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: mode === 'light' ? '#666' : '#CCC',
          }}
        >
          Here's what's happening with your patients today
        </Typography>
      </Box>

      {/* Statistics section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Total Patients"
            value={statistics?.totalPatients || 0}
            icon={<FaHospitalUser />}
            color="#2196F3"
            change={{ value: 8, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Today's Appointments"
            value={statistics?.todayAppointments || 0}
            icon={<BsCalendarCheck />}
            color="#4CAF50"
            subtitle="From a total of 18 appointments"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="New Patients"
            value={statistics?.newPatients || 0}
            icon={<FaUserPlus />}
            color="#FF9800"
            change={{ value: 12, isPositive: true }}
            subtitle="This month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Pending Lab Results"
            value={statistics?.pendingLabResults || 0}
            icon={<GiMicroscope />}
            color="#F44336"
            change={{ value: 3, isPositive: false }}
          />
        </Grid>
      </Grid>

      {/* Appointments section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
            Upcoming Appointments
          </SectionTitle>
          <Link href="/dashboard/practitioner/appointments" passHref>
            <ViewAllButton>
              View All
            </ViewAllButton>
          </Link>
        </Box>

        <StyledTabs value={appointmentTab} onChange={handleAppointmentTabChange}>
          <StyledTab label="Today" />
          <StyledTab label="Tomorrow" />
          <StyledTab label="This Week" />
        </StyledTabs>

        <Grid container spacing={3}>
          {filterAppointments().length > 0 ? (
            filterAppointments().slice(0, 3).map((appointment) => (
              <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  onViewDetails={handleViewAppointmentDetails}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                  border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ color: mode === 'light' ? '#666' : '#CCC' }}>
                  No appointments scheduled for this period
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Recent Patients section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
            Recent Patients
          </SectionTitle>
          <Link href="/dashboard/practitioner/patients" passHref>
            <ViewAllButton>
              View All
            </ViewAllButton>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {patients && patients.length > 0 ? (
            patients.slice(0, 3).map((patient) => (
              <Grid item xs={12} sm={6} md={4} key={patient.id}>
                <PatientCard
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                  border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ color: mode === 'light' ? '#666' : '#CCC' }}>
                  No recent patients to display
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
} 