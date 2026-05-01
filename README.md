# CoupleFlow

A mobile-first couple lifestyle app built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Recharts, and Supabase.

## Features

- Shared Todos
- Chore PK (competition)
- Expense Tracking
- Wishlist & Rewards
- Profile Management

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts
- **Backend:** Supabase

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - Reusable UI components
- `lib/` - Utility functions and Supabase client
- `components/ui/` - shadcn/ui components

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
