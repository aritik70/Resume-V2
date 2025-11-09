# NextHire Resume Builder - Local Setup Instructions

Follow these steps to run the NextHire Resume Builder application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder-name>
```

### 2. Install Dependencies

Install all required dependencies for both the client and server:

```bash
npm install
```

### 3. Install Client Dependencies

Navigate to the client directory and install frontend dependencies:

```bash
cd client
npm install
cd ..
```

### 4. Environment Setup

The application should work with default settings. If you need to configure environment variables:

1. Create a `.env` file in the root directory
2. Add any necessary environment variables (currently none required for basic functionality)

## Running the Application

### Option 1: Run Both Client and Server (Recommended)

From the root directory, run:

```bash
npm run dev
```

This command will start both:
- **Backend server** on `http://localhost:5000`
- **Frontend development server** with hot reload

### Option 2: Run Components Separately

If you prefer to run the client and server separately:

#### Start the Backend Server

```bash
npm run server
```

The server will start on port 5000.

#### Start the Frontend Development Server

In a new terminal window:

```bash
cd client
npm run dev
```

## Accessing the Application

Once the application is running:

1. Open your web browser
2. Navigate to `http://localhost:5000`
3. You should see the NextHire homepage

## Application Features

The application includes:

- **Homepage** - Introduction and navigation
- **Resume Builder** - Interactive resume creation tool
- **About Page** - Information about NextHire
- **Privacy Policy** - Privacy and data protection information

## Project Structure

```
project-root/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components (Home, About, Privacy, etc.)
│   │   ├── lib/           # Utility libraries
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Backend server
│   ├── index.ts          # Express server setup
│   └── package.json      # Backend dependencies
├── attached_assets/       # Shared assets (logos, images)
└── package.json          # Root package.json with scripts
```

## Available Scripts

From the root directory:

- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start only the backend server
- `npm run build` - Build the application for production

From the client directory:

- `npm run dev` - Start the frontend development server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   - Stop any other applications using port 5000
   - Or modify the port in `server/index.ts`

2. **Dependencies not installing**
   - Try deleting `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Images not loading**
   - Ensure all assets are in the `attached_assets` folder
   - Check that the import paths in components are correct

4. **Hot reload not working**
   - Restart the development server
   - Clear your browser cache

### Getting Help

If you encounter issues:

1. Check the console for error messages
2. Ensure all dependencies are properly installed
3. Verify that all required files are present
4. Check that you're using a compatible Node.js version

## Development Notes

- The application uses **React** with **TypeScript** for the frontend
- **Express.js** powers the backend server
- **Tailwind CSS** is used for styling
- **Wouter** handles client-side routing
- **Vite** is used as the build tool for fast development

## Production Deployment

For production deployment:

1. Build the application: `npm run build`
2. The built files will be in the `client/dist` directory
3. Configure your web server to serve these files
4. Ensure the backend server is running and accessible

---

**Note**: This application is designed to run locally for development. For production use, additional configuration for hosting, security, and performance optimization may be required.