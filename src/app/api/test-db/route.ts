import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { initDatabase } from '@/lib/db';

export async function GET() {
    try {
        console.log('Testing database connection...');

        // Test basic connection
        const testResult = await sql`SELECT NOW() as current_time`;
        console.log('Database connection successful:', testResult.rows[0]);

        // Initialize database
        await initDatabase();

        // Test if links table exists and get count
        const countResult = await sql`
      SELECT COUNT(*) as total_links FROM links
    `;

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            currentTime: testResult.rows[0].current_time,
            totalLinks: countResult.rows[0].total_links,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Database test failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}