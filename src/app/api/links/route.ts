import { NextRequest, NextResponse } from 'next/server';
import { createLink, getAllLinks, initDatabase } from '@/lib/db';
import { isValidUrl, isValidCode, generateRandomCode } from '@/lib/utils';
import { CreateLinkRequest } from '@/types';

export async function POST(request: NextRequest) {
    try {
        await initDatabase();

        const body: CreateLinkRequest = await request.json();
        const { url, customCode } = body;

        if (!url || !isValidUrl(url)) {
            return NextResponse.json(
                { success: false, error: 'Invalid URL' },
                { status: 400 }
            );
        }

        let code = customCode;
        if (code) {
            if (!isValidCode(code)) {
                return NextResponse.json(
                    { success: false, error: 'Custom code must be 6-8 alphanumeric characters' },
                    { status: 400 }
                );
            }
        } else {
            code = generateRandomCode();
        }

        try {
            const link = await createLink(code, url);
            return NextResponse.json({ success: true, data: link });
        } catch (error: any) {
            if (error.message?.includes('duplicate key')) {
                return NextResponse.json(
                    { success: false, error: 'Code already exists' },
                    { status: 409 }
                );
            }
            throw error;
        }
    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await initDatabase();
        const links = await getAllLinks();
        return NextResponse.json({ success: true, data: links });
    } catch (error) {
        console.error('Error fetching links:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}