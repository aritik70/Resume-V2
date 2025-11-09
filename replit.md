# Resume Builder

## Overview

A React-based resume builder application that guides users through a multi-step wizard to create professional resumes with live preview and PDF export functionality. The application features a comprehensive form system, multiple professional templates, and a modern component-based architecture built on React and TypeScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18 with TypeScript** for type safety and modern React features including hooks and functional components
- **Multi-step wizard pattern** using centralized state management in the main `ResumeBuilder` component to guide users through seven distinct steps: Personal Details → Experience → Education → Skills → Custom Sections → Template Selection → Preview/Download
- **Form handling** with React Hook Form for robust form state management and Zod validation schemas for type-safe data validation
- **Component library** built on Radix UI primitives with shadcn/ui styling system for consistent, accessible components
- **Client-side routing** using Wouter for lightweight navigation between pages
- **State management** combining React Query for server state caching and local React state for form data persistence

### UI/UX Design System
- **Utility-first CSS** approach using Tailwind CSS with custom design tokens and CSS variables for theming
- **Professional color palette** featuring primary blue (#2563EB), success green (#10B981), and accent orange (#F59E0B) with comprehensive dark/light mode support
- **Typography hierarchy** using Inter (interface), Source Serif Pro (resume content), and Poppins (headings) fonts with consistent scaling
- **Responsive layout system** with mobile-first approach, breakpoint-specific designs, and adaptive split-screen layout (40% form, 60% preview on desktop)
- **Accessibility-focused** components with ARIA labels, keyboard navigation, and semantic HTML structure

### Form and Data Architecture
- **Progressive data collection** through a seven-step wizard with form validation at each step using Zod schemas
- **Dynamic form fields** supporting add/remove functionality for arrays (work experiences, education entries, skills lists)
- **Real-time validation** with immediate user feedback and comprehensive error handling
- **Data persistence** across wizard steps with form state management and local storage capabilities
- **Type-safe data models** with TypeScript interfaces for all form data structures

### Template and Preview System
- **Live preview engine** with real-time updates reflecting form changes instantly
- **Multiple template categories** including Traditional, Modern, Creative, Executive, and ATS-optimized designs
- **Template customization** supporting different color schemes, font families, and layout variations
- **PDF generation** using jsPDF and html2canvas for client-side document export
- **Responsive preview** adapting to different screen sizes and maintaining professional formatting

### Build and Development System
- **Vite** for fast development server with Hot Module Replacement and optimized production builds
- **Express.js backend** with TypeScript support for API endpoints and server-side functionality
- **PostCSS processing** with Tailwind CSS compilation and autoprefixer for cross-browser compatibility
- **ESBuild** for efficient server-side bundling with ES modules support
- **Path aliases** for clean imports (@/, @shared/, @assets/) improving code organization

### Development Tooling
- **Strict TypeScript configuration** with comprehensive type checking and modern ES features
- **In-memory storage** for lightweight, database-free operation
- **Component examples** in dedicated examples directory for development testing and documentation
- **Hot reloading** in development environment with error overlay for debugging

## Replit Environment Setup

### Configuration Status
- **Development Server**: Running on port 5000 (required for Replit)
- **Workflow**: Configured to run `npm run dev` with webview output
- **Host Configuration**: Server binds to 0.0.0.0 and allows all hosts for proxy compatibility
- **TypeScript**: All type checking passes without errors
- **Build Process**: Production build tested and working
- **Deployment**: Configured for autoscale deployment with build and start scripts

### Key Files
- `server/index.ts` - Express server configured for port 5000 with host 0.0.0.0
- `server/vite.ts` - Vite dev server with `allowedHosts: true` for Replit proxy support
- `vite.config.ts` - Build configuration with proper aliases and plugin setup
- `package.json` - All dependencies installed and scripts working

### Running the Application
- Development: Workflow "Start application" runs automatically
- Build: `npm run build` compiles both frontend and backend
- Production: `npm run start` serves the built application
- Type Check: `npm run check` validates TypeScript types

### Recent Changes

#### Nov 2, 2025 - Database and Analytics Removal for Standalone Deployment
- **Removed all database dependencies**: Eliminated PostgreSQL and database requirements to make the application fully standalone
  - Removed Drizzle ORM, Neon database client, and all database-related packages
  - Deleted `server/db.ts` and `drizzle.config.ts`
  - Removed database schemas from `shared/schema.ts`
  - Simplified storage layer to in-memory only (data resets on restart)
- **Removed analytics features**: Deleted analytics dashboard and all tracking functionality
  - Removed `/analytics` page and route
  - Deleted all analytics API endpoints (downloads tracking, access logs)
  - Removed access logging middleware from server
- **Cleaned up unused dependencies**: Removed authentication packages (passport, express-session) that were not being used
- **Updated Docker deployment**: Confirmed Dockerfile works for fully standalone deployment on local PC
- **Application status**: Resume builder now runs entirely client-side with in-memory storage, no external services required
- **Benefits**: Simpler deployment, no database setup needed, works anywhere with just Docker

#### Oct 12, 2025 - New Resume Templates and PDF Export Enhancement
- **Added three new professional templates**:
  - **Minimal Sidebar**: Clean minimalist design with left sidebar layout featuring contact details, skills, education, and languages in sidebar with main content area for profile and work history
  - **Professional Blue**: Traditional professional design with photo placement in top-right corner and blue accent colors, ideal for corporate and financial roles
  - **Green Sidebar**: Creative template with dark green left sidebar (40% width) containing photo, contact details, skills, and languages, with white main content area (60% width) for profile and work experience
- **Enhanced PDF export functionality**: Added comprehensive CSS rules to preserve text alignment and layout integrity during PDF generation
  - Fixed gap spacing utilities to maintain proper Tailwind spacing values (gap-1 through gap-8) in PDF export mode
  - Added explicit preservation of flex and grid layouts including alignment properties (items-start, items-center, justify-between, etc.)
  - Ensured sidebar layouts (w-1/3, w-2/5, flex-1) maintain proper width ratios in PDF exports
  - Preserved text alignment utilities (text-left, text-center, text-right, text-justify) for consistent formatting
- **Template system expansion**: Total of 13 professional templates now available across Traditional, Modern, Creative, Executive, and ATS-optimized categories
- **Code quality**: All TypeScript type checking passes without errors, no LSP diagnostics found

#### Oct 12, 2025 - AI Features Removal and Docker Optimization
- **Removed OpenAI/AI features**: Completely removed all AI-powered functionality to eliminate OpenAI API key dependency and related errors
  - Deleted `server/resumeParser.ts` (OpenAI integration)
  - Removed `/api/parse-resume` endpoint from `server/routes.ts`
  - Deleted `client/src/components/ResumeImporter.tsx` component
  - Removed import button from Header component
  - Cleaned up all related imports and state management code
- **Uninstalled AI dependencies**: Removed openai, multer, @types/multer, pdf-parse, @types/pdf-parse packages
- **Docker optimization**: Updated Dockerfile for standalone deployment
  - Switched to Node.js 20 Alpine base image for smaller footprint
  - Implemented proper multi-stage build (builder + production)
  - Added non-root user for enhanced security
  - Configured health check for container monitoring
  - Created `.dockerignore` for optimized build context
- **Documentation added**: Created `DOCKER_INSTRUCTIONS.md` with complete Docker deployment guide
- **Build verification**: Successfully tested production build process - all assets compile correctly
- **Application status**: Resume builder now operates entirely client-side with manual data entry, maintaining all core features: template selection, live preview, ATS scoring, and PDF export

#### Oct 2, 2025 - GitHub Import and Environment Setup
- **GitHub import completed**: Successfully imported resume builder project into Replit environment
- **Dependencies installed**: All 517 npm packages installed and verified
- **OpenAI integration fixed**: Modified `server/resumeParser.ts` to use lazy initialization of OpenAI client, preventing app crash when API key is not configured. The app now runs without the key and gracefully handles the missing key only when the resume parsing feature is used.
- **Workflow configured**: Set up "Start application" workflow to run `npm run dev` on port 5000 with webview output
- **Server verified**: Express server running on 0.0.0.0:5000 with Vite dev server properly configured
- **Host configuration confirmed**: Vite config has `allowedHosts: true` for Replit proxy compatibility
- **Application tested**: Homepage displaying correctly with "NewHire" branding and full functionality
- **Deployment configured**: Set up autoscale deployment with build and start scripts
- **PDF import feature**: Changed resume import functionality to accept only PDF files (instead of JPG, PNG, TXT). Added pdf-parse library to extract text from PDFs, which is then parsed by OpenAI to populate the resume builder with editable fields.

#### Oct 1, 2025 - Previous Development
- Successfully imported project from GitHub into Replit environment
- Installed all npm dependencies (505 packages)
- Configured workflow "Start application" to run on port 5000 with webview output
- Verified TypeScript type checking passes without errors
- Tested production build process - successfully builds frontend and backend
- Confirmed server configuration: binds to 0.0.0.0:5000 with allowedHosts: true
- Application running successfully with "NewHire" resume builder landing page
- **Added informational pages**: Created FAQ, Privacy Policy, Disclaimer, and Contact Us pages with proper routing and footer navigation
- **Updated branding**: Replaced old logo image with modern gradient briefcase icon from lucide-react across all components (Header, HomePage)
- **Fixed PDF export**: Implemented comprehensive CSS rules (.pdf-export-mode) to remove borders, shadows, rounded corners, and background grids during PDF capture using html2canvas. Added page-break rules to prevent content clipping.
- **Contact information**: Added owner "Ritik Arora" with email "aritik70@gmail.com" on Contact Us page

## External Dependencies

### UI and Styling
- **Radix UI** (@radix-ui/*) - Headless, accessible component primitives for complex UI elements like dialogs, dropdowns, and form controls
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development with design system consistency
- **shadcn/ui** - Pre-built component library providing styled Radix components with professional design
- **class-variance-authority** - Utility for creating component variants and conditional styling
- **Lucide React** - Modern icon library with consistent iconography throughout the application

### Form Management and Validation
- **React Hook Form** - Performant form library with minimal re-renders and comprehensive validation support
- **Zod** - TypeScript-first schema validation for form data and API responses
- **@hookform/resolvers** - Integration between React Hook Form and validation libraries

### State Management and Data Fetching
- **TanStack React Query** (@tanstack/react-query) - Server state management with caching, synchronization, and error handling
- **Wouter** - Lightweight client-side router for single-page application navigation

### PDF Generation and Export
- **jsPDF** - Client-side PDF generation library for resume export functionality
- **html2canvas** - HTML to canvas conversion for high-quality PDF rendering

### Database and Backend (Configured for Future Use)
- **Drizzle ORM** - Type-safe SQL query builder with PostgreSQL dialect support
- **@neondatabase/serverless** - Serverless PostgreSQL driver for database connectivity
- **Express.js** - Web framework for API endpoints and server-side functionality

### Development and Build Tools
- **Vite** - Next-generation frontend build tool with fast HMR and optimized bundling
- **TypeScript** - Static type checking for enhanced developer experience and code reliability
- **ESBuild** - Fast JavaScript bundler for server-side code compilation