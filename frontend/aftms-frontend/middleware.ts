import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/tournaments",
  "/fixtures",
  "/results",
  "/announcements",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(route + "/")),
  );

  // ✅ IMPORTANT: allow static files (video/images/etc)
  const isStaticFile =
    pathname.startsWith("/video") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".");

  if (isStaticFile) {
    return NextResponse.next();
  }

  // ✅ allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ❌ protect private routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
