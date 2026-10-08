# Pujan Suthar | Developer Portfolio

A production-quality developer portfolio built with Next.js 15, Spring Boot 3, and MySQL/H2.

## Structure
- `/frontend`: Next.js App Router, Tailwind CSS v4, Framer Motion.
- `/backend`: Spring Boot 3 REST API.

## Editing Content
All personal content can be edited in:
- **Frontend**: `frontend/src/config/site.ts`
- **Backend (Initial Data)**: `backend/src/main/java/com/portfolio/backend/config/DataSeeder.java`
- **Resume**: Drop your resume at `frontend/public/resume.pdf`.

## Local Development
You can run the full stack using Docker:
```bash
docker-compose up --build
```
This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:8080 (Swagger UI at /swagger-ui)

### Running Separately
**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
**Frontend:**
```bash
cd frontend
npm run dev
```

## Environment Variables
See `.env.example`. Create a `.env` in the root (for docker) and inside `/frontend` and `/backend` if running separately.

## Deployment
- **Frontend**: Deploy `frontend` directory to Vercel. Set `NEXT_PUBLIC_API_URL` to the backend URL.
- **Backend**: Deploy `backend` to Render or Railway using the provided `Dockerfile`. Set `SPRING_PROFILES_ACTIVE=prod` and configure MySQL properties via environment variables.

## Author
Pujan Suthar
