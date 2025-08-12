import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes are protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Arcjet setup
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
      ]
    })
  ]
});

// Clerk setup
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});

// Combine middleware — Clerk first, then Arcjet
export default createMiddleware(clerk, aj);

// Only run middleware for protected routes and API
export const config = {
  matcher: [
    '/dashboard(.*)',
    '/account(.*)',
    '/transaction(.*)',
    '/(api|trpc)(.*)',
  ],
};
