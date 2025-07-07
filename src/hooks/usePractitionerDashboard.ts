import { useState, useEffect } from 'react';
import axios from 'axios';

// Define types based on API documentation
export interface PractitionerProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    specialty?: string[];
    qualification?: {
        code: string;
        display: string;
    }[];
    gender?: string;
    profileImageUrl?: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    profileImageUrl?: string;
    nextAppointment?: string;
    activeConditions?: string[];
    vitalsStatus?: 'normal' | 'abnormal' | 'critical' | 'unknown';
}

export interface Appointment {
    id: string;
    start: string;
    end?: string;
    description: string;
    status: string;
    patient: {
        id: string;
        name: string;
        profileImageUrl?: string;
    };
    location?: {
        id: string;
        name: string;
        address?: string;
    };
    appointmentType: string;
}

export interface Schedule {
    id: string;
    date: string;
    slots: {
        id: string;
        start: string;
        end: string;
        status: 'free' | 'busy';
        appointmentId?: string;
        patient?: {
            id: string;
            name: string;
        };
    }[];
    workingHours: {
        start: string;
        end: string;
    };
}

export interface Report {
    id: string;
    title: string;
    date: string;
    patient: {
        id: string;
        name: string;
    };
    type: string;
    status: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    patient: {
        id: string;
        name: string;
    };
    status: string;
    datePrescribed: string;
}

export interface LabResult {
    id: string;
    name: string;
    value: string;
    unit?: string;
    referenceRange?: string;
    status: 'normal' | 'high' | 'low' | 'critical' | 'unknown';
    patient: {
        id: string;
        name: string;
    };
    date: string;
}

export interface Statistics {
    totalPatients: number;
    newPatients: number;
    totalAppointments: number;
    upcomingAppointments: number;
    todayAppointments: number;
    pendingLabResults: number;
}

export interface Error {
    component: string;
    message: string;
}

export interface DashboardData {
    profile: PractitionerProfile | null;
    patients: Patient[] | null;
    appointments: Appointment[] | null;
    schedule: Schedule | null;
    reports: Report[] | null;
    medications: Medication[] | null;
    labResults: LabResult[] | null;
    statistics: Statistics | null;
    timestamp: string | null;
    errors: Error[] | null;
}

// Mock data for development
const mockDashboardData: DashboardData = {
    profile: {
        id: "practitioner-123",
        name: "Dr. Jane Smith",
        email: "doctor@med.com",
        phone: "+1-555-123-4567",
        specialty: ["Neurology", "Oncology"],
        qualification: [
            {
                code: "MD",
                display: "Doctor of Medicine"
            }
        ],
        gender: "female",
        profileImageUrl: "/avatars/doctor.png"
    },
    patients: [
        {
            id: "patient-1",
            name: "Alice Smith",
            age: 45,
            gender: "female",
            profileImageUrl: "https://example.com/profiles/alice-smith.jpg",
            nextAppointment: "2023-06-15T14:30:00Z",
            activeConditions: ["Hypertension", "Type 2 Diabetes"],
            vitalsStatus: "normal"
        },
        {
            id: "patient-2",
            name: "Bob Johnson",
            age: 62,
            gender: "male",
            profileImageUrl: "https://example.com/profiles/bob-johnson.jpg",
            nextAppointment: "2023-06-16T10:00:00Z",
            activeConditions: ["Osteoarthritis"],
            vitalsStatus: "abnormal"
        }
    ],
    appointments: [
        {
            id: "appointment-1",
            start: "2023-06-15T14:30:00Z",
            end: "2023-06-15T15:00:00Z",
            description: "Follow-up consultation",
            status: "booked",
            patient: {
                id: "patient-1",
                name: "Alice Smith",
                profileImageUrl: "https://example.com/profiles/alice-smith.jpg"
            },
            location: {
                id: "location-1",
                name: "Main Clinic",
                address: "123 Medical Drive"
            },
            appointmentType: "follow-up"
        },
        {
            id: "appointment-2",
            start: "2023-06-16T10:00:00Z",
            end: "2023-06-16T10:30:00Z",
            description: "Initial consultation",
            status: "booked",
            patient: {
                id: "patient-2",
                name: "Bob Johnson",
                profileImageUrl: "https://example.com/profiles/bob-johnson.jpg"
            },
            location: {
                id: "location-1",
                name: "Main Clinic",
                address: "123 Medical Drive"
            },
            appointmentType: "initial"
        }
    ],
    schedule: {
        id: "schedule-1",
        date: "2023-06-15",
        slots: [
            {
                id: "slot-1",
                start: "2023-06-15T09:00:00Z",
                end: "2023-06-15T09:30:00Z",
                status: "free"
            },
            {
                id: "slot-2",
                start: "2023-06-15T09:30:00Z",
                end: "2023-06-15T10:00:00Z",
                status: "busy",
                appointmentId: "appointment-3",
                patient: {
                    id: "patient-3",
                    name: "Carol Williams"
                }
            },
            {
                id: "slot-3",
                start: "2023-06-15T10:00:00Z",
                end: "2023-06-15T10:30:00Z",
                status: "busy",
                appointmentId: "appointment-4",
                patient: {
                    id: "patient-4",
                    name: "David Brown"
                }
            }
        ],
        workingHours: {
            start: "09:00",
            end: "17:00"
        }
    },
    reports: [
        {
            id: "report-1",
            title: "MRI Brain Scan Results",
            date: "2023-06-10T14:30:00Z",
            patient: {
                id: "patient-1",
                name: "Alice Smith"
            },
            type: "diagnostic-imaging",
            status: "final"
        },
        {
            id: "report-2",
            title: "Blood Test Results",
            date: "2023-06-12T09:15:00Z",
            patient: {
                id: "patient-2",
                name: "Bob Johnson"
            },
            type: "laboratory",
            status: "preliminary"
        }
    ],
    medications: [
        {
            id: "medication-1",
            name: "Lisinopril",
            dosage: "10mg once daily",
            patient: {
                id: "patient-1",
                name: "Alice Smith"
            },
            status: "active",
            datePrescribed: "2023-06-01T14:30:00Z"
        },
        {
            id: "medication-2",
            name: "Metformin",
            dosage: "500mg twice daily",
            patient: {
                id: "patient-1",
                name: "Alice Smith"
            },
            status: "active",
            datePrescribed: "2023-06-01T14:30:00Z"
        }
    ],
    labResults: [
        {
            id: "lab-result-1",
            name: "Hemoglobin A1c",
            value: "7.2",
            unit: "%",
            referenceRange: "4.0-5.6",
            status: "high",
            patient: {
                id: "patient-1",
                name: "Alice Smith"
            },
            date: "2023-06-10T14:30:00Z"
        },
        {
            id: "lab-result-2",
            name: "Blood Pressure",
            value: "130/85",
            unit: "mmHg",
            referenceRange: "<120/80",
            status: "high",
            patient: {
                id: "patient-1",
                name: "Alice Smith"
            },
            date: "2023-06-10T14:30:00Z"
        }
    ],
    statistics: {
        totalPatients: 42,
        newPatients: 5,
        totalAppointments: 18,
        upcomingAppointments: 7,
        todayAppointments: 3,
        pendingLabResults: 4
    },
    timestamp: "2023-06-15T14:30:45.123Z",
    errors: []
};

const usePractitionerDashboard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        profile: null,
        patients: null,
        appointments: null,
        schedule: null,
        reports: null,
        medications: null,
        labResults: null,
        statistics: null,
        timestamp: null,
        errors: null
    });
    const [componentErrors, setComponentErrors] = useState<Record<string, string>>({});

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            // In a production environment, we would fetch from the actual API
            // const response = await axios.get('/api/practitioner-dashboard', {
            //   headers: {
            //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            //   },
            // });
            // const data = response.data.data;

            // For development, use mock data
            const data = mockDashboardData;

            // Update state with the fetched data
            setDashboardData({
                profile: data.profile || null,
                patients: data.patients || null,
                appointments: data.appointments || null,
                schedule: data.schedule || null,
                reports: data.reports || null,
                medications: data.medications || null,
                labResults: data.labResults || null,
                statistics: data.statistics || null,
                timestamp: data.timestamp || null,
                errors: data.errors || null
            });

            // Process any component errors
            const errors: Record<string, string> = {};
            if (data.errors && data.errors.length > 0) {
                data.errors.forEach(err => {
                    errors[err.component] = err.message;
                });
            }
            setComponentErrors(errors);

        } catch (err: any) {
            console.error('Error fetching practitioner dashboard data:', err);
            setError(err.response?.data?.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return {
        loading,
        error,
        componentErrors,
        ...dashboardData,
        refreshDashboard: fetchDashboardData
    };
};

export default usePractitionerDashboard; 