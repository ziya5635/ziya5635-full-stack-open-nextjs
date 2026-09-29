// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes that require authentication
let PROTECTED = ["/me", "/blogs/new"];

// Routes that should redirect AWAY if already logged in (optional)
let AUTH_ROUTES = ["/login", "/register"];

export default auth((req) => {
    let { pathname, search } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    const isProtected = PROTECTED.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
    );
    const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

    // Block unauthenticated users from protected routes
    if (isProtected && !isLoggedIn) {
        const url = new URL("/login", req.nextUrl);
        url.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(url);
    }

    // Bounce logged-in users away from /login and /register
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
});

// Only run middleware on these paths (keeps it fast)
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - /api/* (API routes & NextAuth handlers)
         * - /_next/static, /_next/image (build assets)
         * - /favicon.ico, sitemap, robots, and static files
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
    ],
};