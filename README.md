# Unihack 2025 Project

This repository contains the frontend and backend components for the Unihack 2025 project.

## Project Structure

```
├── frontend/     # Next.js frontend application
└── backend/      # Go backend API server
```

## Prerequisites

- Docker and Docker Compose

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unihack-2025.git
   cd unihack-2025
   ```

2. Create .env files in the root directory: `frontend.env` and `backend.env` containing the respective environment variables

3. Start the application:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Environment files
Environment files for backend and frontend can be put into `backend.env` and `frontend.env` respectively. The skeleton for the environment files should be provided in `backend.env.sample`.

**(IMPORTANT)** The frontend should use NEXT_PUBLIC_API_URL for accessing the API (done in the Dockerfile)

## API Endpoints

### Backend

- `GET /hello` - Test endpoint that returns a welcome message
