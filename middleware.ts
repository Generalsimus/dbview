import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: '/api/:function/',
}

export function middleware(request: NextRequest) {

    try {
        const response = NextResponse.next();
        return response;
    } catch (e: any) {
        return Response.json(
            { success: false, message: e.message ?? 'error' },
            { status: e.status ?? 500 }
        )
    }
}