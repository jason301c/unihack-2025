# Unihack 2025 Project

This repository contains the frontend and backend components for the Unihack 2025 project.

## Project Structure

```
├── frontend/     # Next.js frontend application
└── backend/      # Go backend API server
```

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Go 1.21+ (for local development)

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unihack-2025.git
   cd unihack-2025
   ```

2. Start the application:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Local Development

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Run the server:
   ```bash
   go run main.go
   ```

The backend server will start at http://localhost:8080

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at http://localhost:3000

## API Endpoints

### Backend

- `GET /hello` - Test endpoint that returns a welcome message
