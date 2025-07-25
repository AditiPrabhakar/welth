/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    './node_modules/@shadcn/ui/**/*.{ts,tsx}' ,
  ],
  theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      "primary-foreground": "hsl(var(--primary-foreground))",
      secondary: "hsl(var(--secondary))",
      "secondary-foreground": "hsl(var(--secondary-foreground))",
      destructive: "hsl(var(--destructive))",
      "destructive-foreground": "hsl(var(--destructive-foreground))",
      muted: "hsl(var(--muted))",
      "muted-foreground": "hsl(var(--muted-foreground))",
      accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))",
      popover: "hsl(var(--popover))",
      "popover-foreground": "hsl(var(--popover-foreground))",
      card: "hsl(var(--card))",
      "card-foreground": "hsl(var(--card-foreground))",
    },
  },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
