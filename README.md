<h1 align="center">Job Portal</h1>

<p align="center">
  Best way to find your dream job - A modern job portal with AI-powered features
</p>

<p align="center">
  <a href="#project-overview"><strong>Project Overview</strong></a> ·
  <a href="#tech-stack-used"><strong>Tech Stack</strong></a> ·
  <a href="#how-to-run-locally"><strong>Run Locally</strong></a> ·
  <a href="#features"><strong>Features</strong></a>
</p>
<br/>

## Project Overview

**Job Portal** is a comprehensive web application that connects job seekers with employers. The platform provides a seamless experience for both candidates and administrators, featuring modern UI/UX design and innovative features.

### Key Capabilities:
- **For Candidates**: Browse job listings, submit resumes with profile photos, and track application status
- **For Admins**: Post job openings, manage listings, view candidate applications, and track recruitment metrics
- **Authentication**: Secure role-based access control with email-based authentication via Supabase

## Tech Stack Used

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router and Server Components
- **[React 19](https://react.dev)** - Latest React with enhanced hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com)** - Unstyled, accessible UI primitives

### Backend & Database
- **[Supabase](https://supabase.com)** - Backend-as-a-Service (PostgreSQL database, authentication, storage)
- **[@supabase/ssr](https://github.com/supabase/auth-helpers)** - Cookie-based authentication for Next.js

### Computer Vision
- **[react-webcam](https://www.npmjs.com/package/react-webcam)** - Webcam integration

### Validation & Forms
- **[Zod](https://zod.dev)** - TypeScript-first schema validation
- **React Server Actions** - Form handling and server-side mutations

### UI Components & Icons
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[React Icons](https://react-icons.github.io/react-icons)** - Additional icon sets
- **[date-fns](https://date-fns.org)** - Modern date utility library
- **[react-day-picker](https://react-day-picker.js.org)** - Date picker component

### Development Tools
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for Next.js development
- **[ESLint](https://eslint.org)** - Code linting and quality checks
- **[PostCSS](https://postcss.org)** - CSS processing

## How to Run Locally

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- A Supabase account (free tier available)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd job-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
   - Go to Project Settings → API
   - Copy your project URL and anon/public key

4. **Configure environment variables**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Update `.env.local` with your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
     NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```

5. **Set up the database schema**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the SQL schema migrations to create necessary tables (jobs, candidates, users, etc.)
   - Set up proper Row Level Security (RLS) policies for data protection

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app should now be running with hot-reload enabled

### Build for Production
```bash
npm run build
npm start
```

## Features

### Authentication & Authorization
- ✅ Email-based authentication with Supabase
- ✅ Role-based access control (Admin/User roles)
- ✅ Cookie-based session management across the entire Next.js stack
- ✅ Secure authentication flow with protected routes

### For Job Seekers
- 📋 Browse comprehensive job listings with search and filters
- 📄 Submit detailed resumes with personal information
- 🖼️ Upload or capture profile photos with webcam
- 📱 Responsive design for mobile and desktop
- ✉️ Email confirmation after successful submission

### For Administrators
- 📝 Create and manage job openings
- 👥 View candidate applications and resumes
- 📊 Track application metrics and recruitment progress
- 🔍 Search and filter through candidates
- 🏷️ Tag and categorize job listings

### Technical Features
- ⚡ Next.js App Router with Server Components
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🔐 Type-safe development with TypeScript
- 📱 Fully responsive design
- ♿ Accessible components with Radix UI
- 🚀 Optimized performance with Turbopack
- 🤖 MediaPipe hand gesture detection
- 🎥 Real-time webcam integration
- ✨ Smooth animations and transitions

## Project Structure

```
job-portal/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Protected dashboard routes
│   ├── actions/             # Server actions
│   └── resume/              # Resume submission
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── admin/               # Admin-specific components
│   ├── candidate/           # Candidate-specific components
│   └── icons/               # Custom icons
├── contexts/                # React contexts
├── data-access-layer/       # Database queries
├── lib/                     # Utilities and helpers
│   ├── supabase/           # Supabase client configuration
│   └── validation/         # Zod schemas
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your application URL | Yes |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
