import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const PUBLIC_ROUTES = ["/signup", "/signin"];

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token:", token);

  const isAccessingPublicPage = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );


  if (isAccessingPublicPage) {
    if (token) {
     
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }


  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"], // runs on all routes except API and static files
};
