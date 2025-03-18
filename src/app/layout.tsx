import './globals.css';
import './no-autofill.css';
import { AnimationProvider } from '@/context/AnimationContext';
import { ConditionalThemeProvider } from '../providers/ConditionalThemeProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MediCare - Your Health Dashboard',
  description: 'A comprehensive healthcare management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConditionalThemeProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ConditionalThemeProvider>
      </body>
    </html>
  );
}
