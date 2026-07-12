# EcoSphere

EcoSphere is a polished ESG management experience built with React, Vite, Tailwind CSS, and Supabase auth.

## Prerequisites

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.

## Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Environment

Create a local `.env` file with:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Notes

- Authentication uses Supabase when the environment variables are present.
- If the environment is not configured, the app falls back to a local demo auth mode.
