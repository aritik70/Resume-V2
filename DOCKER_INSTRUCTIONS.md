# Docker Deployment Instructions

This guide explains how to run the Resume Builder application using Docker.

## Prerequisites

- Docker installed on your machine ([Download Docker](https://www.docker.com/get-started))
- Basic knowledge of terminal/command line

## Building the Docker Image

1. Navigate to the project directory:
```bash
cd /path/to/resume-builder
```

2. Build the Docker image:
```bash
docker build -t resume-builder .
```

This command:
- Builds the image using the Dockerfile
- Tags it as `resume-builder`
- Uses multi-stage build for optimized image size

## Running the Container

Run the container with:
```bash
docker run -p 5000:5000 resume-builder
```

The application will be available at: **http://localhost:5000**

### Running in Detached Mode

To run the container in the background:
```bash
docker run -d -p 5000:5000 --name resume-builder-app resume-builder
```

### Stopping the Container

```bash
docker stop resume-builder-app
```

### Viewing Logs

```bash
docker logs resume-builder-app
```

### Removing the Container

```bash
docker rm resume-builder-app
```

## Docker Image Details

- **Base Image**: Node.js 20 Alpine (lightweight)
- **Port**: 5000
- **Security**: Runs as non-root user
- **Health Check**: Configured for monitoring
- **Size**: Optimized multi-stage build

## Environment Configuration

The application runs in production mode by default (`NODE_ENV=production`).

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, map to a different port:
```bash
docker run -p 8080:5000 resume-builder
```
Then access at: http://localhost:8080

### Build Fails
Ensure you have the latest package-lock.json:
```bash
npm install
docker build -t resume-builder .
```

### Container Health Check Fails
View container logs to diagnose:
```bash
docker logs <container-id>
```

## Production Deployment

For production deployment:
1. Build the image on your production server
2. Use Docker Compose or Kubernetes for orchestration
3. Configure reverse proxy (nginx/Apache) for SSL/HTTPS
4. Set up proper logging and monitoring

## What's Included

- Full-featured resume builder with multiple templates
- PDF export functionality
- ATS score analysis
- Responsive design
- Fully standalone - no database or external services required
- In-memory storage (data resets on restart)
