import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    (token &&
      (url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/signup") ||
        url.pathname.startsWith("/verify-code"))) ||
    url.pathname.startsWith("/home")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/",
    "/verify-code/:path*",
    "/dashboard/:path*",
  ],
};
