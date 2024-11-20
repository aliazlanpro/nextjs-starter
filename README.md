# Next.js Starter Template

This starter template is designed to quickly bootstrap Next.js projects with a robust set of features and tools.

Developed by [Ali Azlan](https://aliazlan.me)

## Features

- 🌓 Dark Mode with toggle button
- 🚀 Loading Global Progress Bar
- 🔄 Hono + Tanstack React Query for efficient data fetching and mutation
- 🔐 Better-auth with Google OAuth and Logout functionality
- 🎨 Shadcn UI for beautiful, customizable components
- 🗃️ Drizzle ORM for type-safe database operations
- 🔧 Environment variable handling with @t3-oss/env-nextjs
- 🐘 PostgreSQL support via 'pg' package

## Tech Stack

- ⚛️ Next.js - React framework for production
- 🎨 Tailwind CSS - Utility-first CSS framework
- 🔒 Better-auth - Authentication for Next.js
- 🗄️ Drizzle ORM - TypeScript ORM for SQL databases
- 🧰 Shadcn UI - Re-usable components built with Radix UI and Tailwind CSS

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. A sample `.env.example` file is provided in the repository:

- `POSTGRES_URL`: Your PostgreSQL database URL
- `PG_SSL`: PostgreSQL SSL Certificate (if required)
- `BETTER_AUTH_SECRET`: Better-auth secret key
- `BETTER_AUTH_URL`: Better-auth URL (e.g., http://localhost:3000)
- `AUTH_GOOGLE_ID`: Google OAuth Client ID
- `AUTH_GOOGLE_SECRET`: Google OAuth Client Secret
- `NEXT_PUBLIC_AUTH_GOOGLE_ID`: Google OAuth Client ID (for Google One Tap)
- `NEXT_PUBLIC_APP_URL`: Public URL of your app (e.g., http://localhost:3000)

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your environment variables:
   - Copy the `.env.example` file to `.env`
   - Fill in the required environment variables in the `.env` file
4. Run the development server with `npm run dev`

Visit [http://localhost:3000](http://localhost:3000) to see your application in action.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).