import { NextRequest, NextResponse } from 'next/server';
import { getLink, deleteLink, initDatabase } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await initDatabase();
        const link = await getLink(params.code);

        if (!link) {
            return NextResponse.json(
                { success: false, error: 'Link not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: link });
    } catch (error) {
        console.error('Error fetching link:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await initDatabase();
        const deleted = await deleteLink(params.code);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Link not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting link:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}