import { NextResponse } from 'next/server';

// Handle Chrome DevTools requests to prevent 404 errors in the terminal
export async function GET() {
    // Return an empty JSON object with 200 status
    return NextResponse.json({}, { status: 200 });
} 