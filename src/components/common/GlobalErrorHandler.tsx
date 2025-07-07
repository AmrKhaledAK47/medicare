'use client';

import { useEffect } from 'react';
import { AuthError } from '@/services/api.service';

// List of error patterns to silence
const ERROR_PATTERNS = [
    'Invalid credentials',
    'Authentication failed',
    'Auth error',
    'Login failed',
    'Account not found',
    'Network error',
    'Failed to fetch',
    'ChunkLoadError',
    'Loading chunk',
    'Hydration',
    'Warning:',
    'API Service:',
    'POST http://localhost:3000/api/auth/login',
    'POST http://localhost:3001/api/auth/login',
    '401 (Unauthorized)',
    'dispatchXhrRequest',
    'Axios',
    'xhr.js',
    'dispatchRequest',
    'api/auth',
    'api.service.ts',
];

// Check if an error should be silenced based on its message
const shouldSilenceError = (message: string): boolean => {
    if (!message) return false;
    return ERROR_PATTERNS.some(pattern =>
        message.toLowerCase().includes(pattern.toLowerCase())
    );
};

const GlobalErrorHandler: React.FC = () => {
    useEffect(() => {
        // Save original console methods
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleLog = console.log;

        // Handler for unhandled promise rejections
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            // Check if it's an auth error or matches our patterns
            if (
                event.reason instanceof AuthError ||
                (event.reason && event.reason.message && shouldSilenceError(event.reason.message)) ||
                (event.reason && typeof event.reason === 'object' && 'config' in event.reason &&
                    'url' in (event.reason as any).config &&
                    ((event.reason as any).config.url as string).includes('auth/login'))
            ) {
                // Prevent the error from being logged to console
                event.preventDefault();
                event.stopPropagation();
            }
        };

        // Handler for uncaught errors
        const handleError = (event: ErrorEvent) => {
            // Check if it's an error we want to silence
            if (
                event.error instanceof AuthError ||
                shouldSilenceError(event.message) ||
                (event.filename && event.filename.includes('api.service')) ||
                (event.error && event.error.stack && event.error.stack.includes('auth/login'))
            ) {
                // Prevent the error from being logged to console
                event.preventDefault();
                event.stopPropagation();
            }
        };

        // Override console.error to prevent specific errors from showing
        console.error = (...args) => {
            const errorString = args.join(' ');

            // If it's a pattern we want to silence, don't log it
            if (shouldSilenceError(errorString) ||
                (args[0] && typeof args[0] === 'string' && args[0].includes('http://localhost')) ||
                (args[0] && typeof args[0] === 'object' && args[0] instanceof Error)) {
                return;
            }

            // Otherwise, pass through to the original console.error
            originalConsoleError(...args);
        };

        // Override console.warn to prevent specific warnings from showing
        console.warn = (...args) => {
            const warnString = args.join(' ');

            // If it's a pattern we want to silence, don't log it
            if (shouldSilenceError(warnString)) {
                return;
            }

            // Otherwise, pass through to the original console.warn
            originalConsoleWarn(...args);
        };

        // Override console.log to prevent specific logs from showing
        console.log = (...args) => {
            const logString = args.join(' ');

            // If it's a pattern we want to silence, don't log it
            if (shouldSilenceError(logString) ||
                (args[0] && typeof args[0] === 'string' &&
                    (args[0].includes('Login') || args[0].includes('login') || args[0].includes('email')))) {
                return;
            }

            // Otherwise, pass through to the original console.log
            originalConsoleLog(...args);
        };

        // Intercept XMLHttpRequest to prevent network errors from being logged
        const originalXhrOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (...args) {
            const url = args[1];
            if (typeof url === 'string' && url.includes('auth/login')) {
                // For login requests, intercept errors
                this.addEventListener('error', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
            return originalXhrOpen.apply(this, args);
        };

        // Add event listeners
        window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
        window.addEventListener('error', handleError, true);

        // Clean up
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            window.removeEventListener('error', handleError);
            console.error = originalConsoleError;
            console.warn = originalConsoleWarn;
            console.log = originalConsoleLog;
            XMLHttpRequest.prototype.open = originalXhrOpen;
        };
    }, []);

    return null; // This component doesn't render anything
};

export default GlobalErrorHandler; 