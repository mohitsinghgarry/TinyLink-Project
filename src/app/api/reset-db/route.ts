import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST() {
    try {
        console.log('Resetting database...');

        // Drop and recreate the table
        await sql`DROP TABLE IF EXISTS links`;

        await sql`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_clicked_at TIMESTAMP
      )
    `;

        console.log('Database reset successfully');

        return NextResponse.json({
            success: true,
            message: 'Database reset successfully'
        });

    } catch (error) {
        console.error('Database reset failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}