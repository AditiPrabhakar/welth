import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: 'LIVE', // DRY_RUN for testing
    }),
    detectBot({
      mode: 'LIVE', // DRY_RUN for testing
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
        "CATEGORY:MOBILE" // If supported by Arcjet
      ]
    })
  ]
});

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export default createMiddleware(
  async (req, evt) => {
    if (isProtectedRoute(req)) {
      return aj(req, evt);
    }
    // Always return something for public routes
    return NextResponse.next();
  },
  clerk
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
