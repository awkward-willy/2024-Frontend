import NextAuth from "next-auth";
import { authConfig } from "@lib/auth.config";
import { PUBLIC_ROUTES, ROOT, AUTH_REDIRECT } from "@lib/routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated) {
    return Response.redirect(new URL(AUTH_REDIRECT, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
