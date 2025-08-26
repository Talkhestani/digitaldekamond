import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    const authCookie = req.cookies.get("auth");
    const isAuth = authCookie?.value === "true";

    const isLoginPage = req.nextUrl.pathname.startsWith("/login");

    if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuth && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login"],
};
