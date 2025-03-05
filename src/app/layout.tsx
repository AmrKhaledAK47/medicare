'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import './globals.css';
import './no-autofill.css';
import { AnimationProvider } from '@/context/AnimationContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
