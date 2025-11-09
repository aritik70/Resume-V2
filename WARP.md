# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project name: rest-express (React + TypeScript client, Express server)

Commands
- Install dependencies
  - npm ci
- Development server
  - POSIX (macOS/Linux): npm run dev
  - Windows PowerShell: $env:NODE_ENV="development"; npx tsx server/index.ts
    - Note: package.json uses NODE_ENV=... syntax which is not portable on Windows. The above command is equivalent.
- Type check
  - npm run check
- Production build (client via Vite, server via esbuild)
  - npm run build
- Start built app
  - npm start
- Linting
  - Not configured (no ESLint/Prettier scripts present)
- Tests
  - No test runner configured. If tests are added later, document how to run a single test here.
- Docker (optional)
  - Build: docker build -t resume-builder .
  - Run: docker run -p 5000:5000 resume-builder

Architecture and structure
- Top-level tooling
  - Vite drives the client build/dev server (vite.config.ts). Output goes to dist/public.
  - esbuild bundles the server entry server/index.ts to dist/index.js for production.
  - TypeScript configuration (tsconfig.json) includes three logical areas: client/src, server, shared.
  - Path aliases (used by both Vite and TS):
    - @ -> client/src
    - @shared -> shared
    - @assets -> attached_assets
- Server (server/)
  - Express app (server/index.ts) creates an HTTP server and registers routes via registerRoutes (server/routes.ts). There are currently no API routes; the server primarily hosts the client.
  - Development: setupVite (server/vite.ts) mounts Vite middleware with HMR and serves client index.html dynamically.
  - Production: serveStatic (server/vite.ts) serves prebuilt assets from dist/public and falls back to index.html for client routing.
  - Port and host: listens on 0.0.0.0:${PORT||5000}. Logs basic /api traffic when present.
- Client (client/src/)
  - React 18 + TypeScript SPA with Wouter for routing (client/src/App.tsx, main.tsx).
  - UI composed from shadcn-style components (client/src/components/ui/*), Tailwind CSS (client/src/index.css), and Radix primitives.
  - Core feature: a multi-step resume builder (client/src/components/ResumeBuilder.tsx) with:
    - Template selection UI and live preview (ResumePreview.tsx)
    - Form-driven data entry (ResumeForm.tsx) with rich text editor fields
    - Client-side PDF export using html2canvas + jsPDF
    - ATS score panel (ATSScore.tsx)
  - Routing: / (landing), /builder (resume builder), plus static pages (FAQ, Privacy, Disclaimer, Contact) under client/src/pages/.
- Styling and theming
  - Tailwind with custom CSS variables and utilities in client/src/index.css.
  - Special .pdf-export-mode styles ensure clean PDF capture of the preview.
- Data and persistence
  - No database or authentication; app operates client-side with in-memory state. A POST to /api/downloads is attempted for tracking but is safe to ignore if unimplemented.

Key files
- package.json: scripts (dev/build/start/check) and dependencies for client, server, and build tools.
- vite.config.ts: client root (client/), dist path (dist/public), aliases (@, @shared, @assets), dev plugins.
- server/index.ts, server/vite.ts, server/routes.ts: server entry, Vite dev integration, and minimal routing.
- client/src/App.tsx, client/src/components/ResumeBuilder.tsx, client/src/components/ResumeForm.tsx, client/src/components/ResumePreview.tsx: primary application flow.
- DOCKER_INSTRUCTIONS.md and Dockerfile: containerized build/run flow.

Notes for future automation in this repo
- Use the defined path aliases when generating imports (e.g., import { Button } from "@/components/ui/button").
- When running dev on Windows, prefer the explicit PowerShell form noted above to set NODE_ENV, or add a cross-platform helper like cross-env before relying on npm run dev.
- Client builds must precede production server starts; npm run build produces both client and server artifacts consumed by npm start.
