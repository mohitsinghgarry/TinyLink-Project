import { NextRequest, NextResponse } from 'next/server';
import { getLink, incrementClicks, initDatabase } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    console.log(`Redirect request for code: ${params.code}`);

    try {
        await initDatabase();
        const link = await getLink(params.code);

        if (!link) {
            console.log(`Link not found for code: ${params.code}`);
            return new NextResponse('Not Found', { status: 404 });
        }

        console.log(`Found link for ${params.code}: ${link.target_url}, current clicks: ${link.clicks}`);

        // Increment click count BEFORE redirect
        try {
            await incrementClicks(params.code);
            console.log(`Successfully incremented clicks for code: ${params.code}`);
        } catch (incrementError) {
            console.error(`Failed to increment clicks for ${params.code}:`, incrementError);
            // Continue with redirect even if increment fails
        }

        // Create redirect response with no-cache headers
        const response = NextResponse.redirect(link.target_url, 302);

        // Prevent caching of redirects
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Vary', '*');

        return response;
    } catch (error) {
        console.error('Error handling redirect:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}