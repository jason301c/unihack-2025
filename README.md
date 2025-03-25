# Weave (UNIHACK 2025 3rd Place Overall)

Weave is a mobile-focused web-app that provides users with a convenient and efficient way to find and **try on** clothing products.
This repository contains the full codebase for our UNIHACK 2025 project.

This project is no longer maintained, and but a simplified version is continuously deployed on [unihack.jasondev.me](https://unihack.jasondev.me). The code for this version is available in the `post-hackathon-deployment` branch.

## Team Members
- [Jason](https://github.com/jason301c)
- [Oliver](https://github.com/oliverhuangcode)
- [Brian](https://github.com/Brian-w-m)
- [Zahir](https://github.com/zhasMU)
- [John](https://github.com/JohnBanh)
- [Adi](https://github.com/AdityaZDesai)

## Project Overview
Our project aims to provide users with a convenient and efficient way to find and try on clothing products. We leverage the power of Next.js for the frontend and Go for the backend, ensuring a seamless and responsive user experience.


## Project Structure

```
├── frontend/     # Next.js frontend application
└── backend/      # Go backend API server
└── lambda-processing-cdk # AWS lambda files
```

## Quick Start with Docker 

### Prerequisites
- Docker or Docker Desktop installed

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unihack-2025.git
   cd unihack-2025
   ```

2. Create an .env file in the root directory, it should contain these fields:
   * `GOOGLE_API_KEY`: API key for Google services.
   * `GOOGLE_SEARCH_ENGINE_ID`: Custom Search Engine ID for Google searches.
   * `MONGODB_URI`: URI for connecting to the MongoDB database.
   * `MONGODB_DATABASE`: Name of the MongoDB database.
   * `AWS_ACCESS_KEY_ID`: AWS access key ID.
   * `AWS_SECRET_ACCESS_KEY`: AWS secret access key.
   * `AWS_DEFAULT_REGION`: AWS default region.
   * `AUTH0_DOMAIN`: Auth0 domain for authentication.
   * `AUTH0_AUDIENCE`: Auth0 API audience.
   * `AUTH0_SECRET`: Auth0 client secret.
   * `APP_BASE_URL`: Base URL of the application.
   * `AUTH0_DOMAIN_FRONTEND`: Auth0 domain for frontend authentication.
   * `AUTH0_CLIENT_ID`: Auth0 client ID.
   * `AUTH0_CLIENT_SECRET`: Auth0 client secret.
   * `NEXT_PUBLIC_API_URL`: URL of the backend API.
   * `FASHN_API_KEY`: API key for Fashn API.

3. Start the application:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Environment files
You can modify which container accesses which environment files in docker-compose.yml.

**The frontend should use NEXT_PUBLIC_API_URL for accessing the API**

**After changing the environment files, you need to restart the application with `docker-compose down` and then `docker-compose up`**

## Accessing docker containers
You can access the containers by going to Docker Desktop and clicking on the container name. You can then access the terminal and run commands.

This can be used for updating / installing packagse.