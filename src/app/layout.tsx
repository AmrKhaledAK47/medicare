import './globals.css';
import './no-autofill.css';
import RootProvider from '@/providers/RootProvider';
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
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
