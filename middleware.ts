import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('tchedes_auth_token')?.value;
    const { pathname } = request.nextUrl;

    // 1. Protected routes (require token)
    const protectedRoutes = ['/overview', '/sessions', '/review-queue', '/developer'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        // Redirect to login if a protected route is accessed without a token
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Auth routes (redirect to dashboard if already logged in)
    const authRoutes = ['/login', '/register', '/forgot-password'];
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    if (isAuthRoute && token) {
        // Redirect to overview if trying to access auth pages while logged in
        const overviewUrl = new URL('/overview', request.url);
        return NextResponse.redirect(overviewUrl);
    }

    return NextResponse.next();
}

// Optionally, don't run middleware on static files, api routes, or images
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
