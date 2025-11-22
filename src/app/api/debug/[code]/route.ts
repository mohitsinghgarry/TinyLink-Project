import { NextRequest, NextResponse } from 'next/server';
import { getLink, incrementClicks, initDatabase } from '@/lib/db';

export async function POST(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await initDatabase();

        console.log(`Debug: Testing click increment for code: ${params.code}`);

        // Get current state
        const linkBefore = await getLink(params.code);
        if (!linkBefore) {
            return NextResponse.json({
                success: false,
                error: 'Link not found'
            }, { status: 404 });
        }

        console.log(`Before increment: ${linkBefore.clicks} clicks`);

        // Increment clicks
        await incrementClicks(params.code);

        // Get updated state
        const linkAfter = await getLink(params.code);

        console.log(`After increment: ${linkAfter?.clicks} clicks`);

        return NextResponse.json({
            success: true,
            before: linkBefore,
            after: linkAfter,
            incremented: (linkAfter?.clicks || 0) > linkBefore.clicks,
            clicksDifference: (linkAfter?.clicks || 0) - linkBefore.clicks
        });

    } catch (error) {
        console.error('Debug increment failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}