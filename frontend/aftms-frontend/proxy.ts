import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/welcome",
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  // Allow static files
  const isStaticFile =
    pathname.startsWith("/video") ||
    pathname.startsWith("/image") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".");

  if (isStaticFile) {
    return NextResponse.next();
  }

  // Allow public pages
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(route + "/")),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protect dashboard/private pages
  if (!token) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
