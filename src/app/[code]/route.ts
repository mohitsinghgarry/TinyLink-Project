import { NextRequest, NextResponse } from 'next/server';
import { getLink, incrementClicks, initDatabase } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await initDatabase();
        const link = await getLink(params.code);

        if (!link) {
            return new NextResponse('Not Found', { status: 404 });
        }

        // Increment click count
        await incrementClicks(params.code);

        // Redirect to target URL
        return NextResponse.redirect(link.target_url, 302);
    } catch (error) {
        console.error('Error handling redirect:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}