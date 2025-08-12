import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
]);

// Arcjet config – now only for protected routes
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: 'LIVE', // You can set DRY_RUN for testing
    }),
    detectBot({
      mode: 'LIVE', // Change to DRY_RUN if needed
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
        // Try adding mobile allowance if Arcjet docs list it
        "CATEGORY:MOBILE"
      ]
    })
  ]
});

// Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

// Combine them so Arcjet only runs on protected routes
export default createMiddleware(
  async (req, evt) => {
    if (isProtectedRoute(req)) {
      return aj(req, evt);
    }
    return; // Skip Arcjet for public routes
  },
  clerk
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
