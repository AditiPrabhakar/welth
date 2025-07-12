1. ## Set up steps: 
    (Run following in the terminal to get started):
    - npx create-next-app@latest .  
    - npx shadcn@latest add button badge calendar card checkbox drawer dropdown-menu input popover progress select switch table tooltip                         (for components/ui)
    - npm install @clerk/nextjs --legacy-peer-deps          (for auth)

2. ### Protect routes in the middleware
    use createRouteMatcher to protect all routes e.g. /dashboard(.*)

    ***clerkMiddleware()*** is a function provided by Clerk, a user authentication and management service, that integrates with Next.js middleware to handle user authentication and authorization. It's a key part of securing Next.js applications using Clerk. When added to a Next.js project, it automatically checks for a user's session token (JWT) in cookies and headers, and if found, it attaches the user's authentication data to the request object. 
    **Core Functionality:**
    *Authentication Check:*
    clerkMiddleware() verifies the user's session token (JWT) to determine if they are authenticated. 
    *Session Data:*
    If a valid session is found, it attaches the user's authentication information (an Auth object) to the request object under the auth key. This allows you to access user data and authorization information within your routes and components. 
    *Route Protection:*
    By default, clerkMiddleware() makes all routes public. You need to configure it to protect specific routes. This is typically done using the createRouteMatcher helper to specify which routes require authentication. 

* Whatever folders are in app/ folder, nextjs consider them as a route, to avoid this we use parentheses e.g. (auth) ---> but the folders inside of (auth) will still be considers as routes, we can navigate to the page.
* A Catch-All route is created by creating [[...sign-in]] folder inside of app folder -> just a convention, allows us to append routes. (for example catching all routes with /sign-in/../....././.).
* We can wrap all the folders(routes) in app by creating a layout.js file inside the (auth) folder.

Design UI for authentication, navbar.

3. ## Connect to SupaBase
Just copy the environmental variables from ORMs after creating the project then paste them to .env file adding the password.

4. ## Add Arcject key in .env 
([Arcject Key](https://arcjet.com/))

5. ## Set up Inngest Cloud
([Inngest Cloud](https://app.inngest.com/env/production/onboarding/create-app))
    npx inngest-cli@latest dev

* "use client" pages(client component) in components are dyanamic and pages.jsx(server component) using them are static.