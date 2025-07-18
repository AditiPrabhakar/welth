1. ## Set up steps: 
    (Run following in the terminal to get started):
    - `npx create-next-app@latest .`  
    - `npx shadcn@latest add button badge calendar card checkbox drawer dropdown-menu input popover progress select switch table tooltip` (for components/ui)
    - `npm install @clerk/nextjs --legacy-peer-deps` (for auth)

2. ### Protect routes in the middleware
    use createRouteMatcher to protect all routes e.g. /dashboard(.*)

    **clerkMiddleware()** is a function provided by Clerk, a user authentication and management service, that integrates with Next.js middleware to handle user authentication and authorization. It's a key part of securing Next.js applications using Clerk. When added to a Next.js project, it automatically checks for a user's session token (JWT) in cookies and headers, and if found, it attaches the user's authentication data to the request object. 
    
    ***Core Functionality:***
    - *Authentication Check:*
      `clerkMiddleware()` verifies the user's session token (JWT) to determine if they are authenticated. 

    - *Session Data:*
      If a valid session is found, it attaches the user's authentication information (an Auth object) to the request object under the auth key. This allows you to access user data and authorization information within your routes and components. 

    - *Route Protection:*
      By default, `clerkMiddleware()` makes all routes public. You need to configure it to protect specific routes. This is typically done using the createRouteMatcher helper to specify which routes require authentication. 

* Whatever folders are in app/ folder, nextjs consider them as a route, to avoid this we use parentheses e.g. (auth) ---> but the folders inside of (auth) will still be considers as routes, we can navigate to the page.
* A Catch-All route is created by creating [[...sign-in]] folder inside of app folder -> just a convention, allows us to append routes. (for example catching all routes with /sign-in/../....././.).
* We can wrap all the folders(routes) in app by creating a layout.js file inside the (auth) folder.
* when you start a folder with an underscore inside of `app/`, nextjs completely ignores that folder and every folder inside of it, it will not consider it as a route or everything inside of it as a route. For example,`app/dashboard/_components/`

Design UI for authentication, navbar.

3. ## Connect to SupaBase
Just copy the environmental variables from ORMs after creating the project then paste them to .env file adding the password.

4. ## Add Arcject key in .env 
([Arcject Key](https://arcjet.com/))

5. ## Set up Inngest Cloud
([Inngest Cloud](https://app.inngest.com/env/production/onboarding/create-app))
    npx inngest-cli@latest dev

* "use client" pages(client component) in components are dyanamic and pages.jsx(server component) using them are static.

6. DataBase Integeration (Prisma)
> npm i -D prisma --legacy-peer-deps
> npx prisma init

This will create a prisma.schema file. In this file, we have to put our env variables for direct_url & database_url. Then have to create models. model name-of-table then we list all the attributes

- we list another table-name when we have to create a relation, for example,  for relation `Account`
`user             User              @relation(fields: [userId], references: [id], onDelete: Cascade)`
Here, `onDelete: Cascade` means that it will delete all the accounts of the user if the user is deleted in the User table.

- a choice is represented by creating an enum field, as:
    ```enum AccountType {
    CURRENT
    SAVINGS
    }```

- for accounts table, if we want to access acounts of a particular user, indexing makes it much more easier. `@@index([userId])`

- ? represents an optional field.

* `npx prisma migrate dev --name create-models` syncs our SupaBase database with Prisma. This also creates a **migration** folder inside of prisma/ folder which converts into all raw SQL code.

7. Create new file inside lib called prisma.js
    globalThis.prisma: This global variable ensures that the Prisma client instance is reused across hot reloads during development. Without this, each time your application reloads, a new instance of the Prisma client would be created, potentially leading to connection issues.

* We can learn next.js at [nextjs.org](https://nextjs.org/)

8. Main
  Create a `(main)` folder inside of app folder, for now we need two routes -> dashboard & account (dynamic).
  for **dashboard**, simply create -> `app/dashboard/page.jsx`
  for **account**, create -> `app/dashboard/[id]/page.jsx`  --> [id] is for the dynamic route. (as id is not same everytime)

9. Create a not-found page
  To create a 404 page, we have to create a file inside of app/ named exactly as `not-found.jsx`.

## Suspense
`<Suspense>` tag is used to show loading in a better way. For this, we add `fallback` property and installed `npm i react-spinners --legacy-peer-deps` for it which has a lot of loaders. We used `<BarLoader/>` for this one.

10. actions folder
Here lies the backend of the pages. 

* for `actions/dashboard.js` next.js does not support decimals so we have to convert back to the number. That's why we made `serializedTransaction()`. We use `revalidatePath("/dashboard")` to re-fetch the values of a page before returning.

11. create-account-drawer.jsx
We created an component "use client" to implement it in our dashboard when we have to create an account.

* DashboardPage is going to have 3 parts/sections:
    - Budget Progress
    - Overview
    - Accounts Grid

  Installed `npm i react-hook-form zod @hookform/resolvers --legacy-peer-deps` to create a form in `create-account-drawer.jsx`.
    - `react-hook-form` is to manage our forms.
    - `zod` is a validation library that handles all the errors and validations in the form.
    - ` @hookform/resolvers` helps us to connect the above together.

  for creating form for account-drawer we create a folder in `app/lib/` to create schema in `app/lib/schema.js`

    # In create-account-drawer.jsx
    - We are using `useForm` to connect the schema (in `app/lib/schema`) and the form to connect together by using `zodResolver` from `@hookform/resolvers/zod`.
    - The hook `useForm` returns a few things:
        - `Register` -> important, as it connects our form to react hook form.
        - `handleSubmit` -> will help us in submitting the form.
        -  `formState` -> gives a lot of different values as disabled, isSubmitted etc but we are concerned with **errors** for now. If any error occurs it will occur inside of `errors` object which we can use it to display to the user.
        - `setValue` -> enables us to dynamically set value of form fields.
        - `watch` -> to monitor any single field.
        - `reset` -> to reset the form after we submit it.

    - Created a `hooks/use-fetch.jsx` file to create a hook named `useFetch` that can help us with the api calls. This returns 4 `values`, `data`, `loading`, `error` and a `fn` function.
    - `Toaster` and `toast` in `sonner` is used to show error / success messages at bottom right side.

12. Creating Dummy Transactions:
  - Add seed.js in `actions/`
  - run `npm i date-fns --legacy-peer-deps`.
  - This is just a file with dummy data.
  - Create `app/api/seed/route.js`.
  - Go to `http://localhost:3000/api/seed` on your browser to complete the dummy transactions.
  - The following message will be shown:
    ```{
      "success": true,
      "message": "Created 185 transactions"
      }

13. Creating `app/(main)/account/_components/transaction-table.jsx` for `account[id] page`

