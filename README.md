# Unihack 2025 Project

This repository contains the frontend and backend components our UNIHACK 2025 project.

## Overview
Our project aims to provide users with a convenient and efficient way to find clothing products. We leverage the power of Next.js for the frontend and Go for the backend, ensuring a seamless and responsive user experience.

## Project Structure

```
├── frontend/     # Next.js frontend application
└── backend/      # Go backend API server
```

## Quick Start with Docker 

### Prerequisites
- Docker or Docker Desktop installed

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unihack-2025.git
   cd unihack-2025
   ```

2. Create .env files in the root directory: `frontend.env` and `backend.env` containing the respective environment variables (or empty).

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

**After changing the environment files, you need to restart the application with `docker-compose down` and then `docker-compose up`**

## Accessing docker containers
You can access the containers by going to Docker Desktop and clicking on the container name. You can then access the terminal and run commands.

This can be used for updating / installing packagse.

## API Endpoints

### Backend

- `GET /fetch` - Fetch MongoDB for random brands and clothing products
- `GET /search?q=yourquery` - Look up images on Google of a clothing product
