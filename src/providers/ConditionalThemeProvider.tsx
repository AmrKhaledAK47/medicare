'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider, useThemeContext } from '../components/patient/Sidebar';
import theme from '../styles/theme';
import { lightTheme, darkTheme } from './themes';

// Dashboard theme provider that has light/dark switching capability
const DashboardThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { mode } = useThemeContext();
    const currentTheme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <MuiThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

// Simple theme provider for landing page
const LandingThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

// Main ConditionalThemeProvider that decides which theme to use
export function ConditionalThemeProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.includes('/dashboard');

    // For dashboard routes, use the dashboard theme with context
    if (isDashboard) {
        return (
            <ThemeContextProvider>
                <DashboardThemeProvider>
                    {children}
                </DashboardThemeProvider>
            </ThemeContextProvider>
        );
    }

    // For all other routes (including landing page), use the simple theme
    return (
        <LandingThemeProvider>
            {children}
        </LandingThemeProvider>
    );
} 