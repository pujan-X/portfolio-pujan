<div align="center">

# Pujan Suthar | Developer Portfolio

**A full-stack portfolio with a Next.js frontend and a Spring Boot REST API.**
Dark, fast, animated, and built the way I build real projects: API first, containerized, and deployable.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

</div>

<!--
After you deploy, add your links here:
**Live site:** https://YOUR-SITE.vercel.app  |  **API docs:** https://YOUR-API.onrender.com/swagger-ui

After you take screenshots, save them in docs/screenshots/ and add:
![Hero](docs/screenshots/hero.png)
-->

---

## About this project

This is my personal portfolio. It presents my projects, skills, education and experience, shows live GitHub activity, and has a contact form that sends real email through a Spring Boot backend.

I built it as a full-stack project on purpose. The content is served by a REST API, not hard-coded, so the site shows how I design APIs, structure a backend and ship containers, as well as how I build interfaces.

## Features

- **Animated, developer-themed UI:** a code-editor hero panel, scrolling tech-stack marquee, live Mumbai (IST) clock, custom cursor, section indicator and scroll-driven reveals, built with Framer Motion.
- **Command palette (`⌘K` / `Ctrl+K`)** for quick navigation.
- **Project showcase** with live-demo and GitHub links for each featured project.
- **Skills, experience and certifications** rendered from structured data.
- **Live GitHub activity** (repos, languages, recent activity), served through the backend and cached, so the browser never sees the GitHub token.
- **Contact form** that validates input, stores the message and sends an email notification over SMTP.
- **Documented REST API** with Swagger UI.
- **Runs anywhere:** a single `docker compose up --build`, or each service on its own.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend | Spring Boot 3, Spring Web, Spring Data JPA, Bean Validation, Spring Mail |
| API docs | springdoc-openapi (Swagger UI) |
| Database | H2 (local development), MySQL (production) |
| DevOps | Docker, Docker Compose, Maven |
| Hosting (planned) | Vercel (frontend), Render or Railway (backend) |

## Architecture

```
┌────────────────────┐   HTTP/JSON    ┌─────────────────────────┐
│  Next.js frontend  │ ─────────────► │   Spring Boot REST API  │
│  (port 3000)       │                │   (port 8080)           │
└────────────────────┘                └──────┬───────────┬──────┘
                                             │           │
                                  ┌──────────▼──┐   ┌────▼──────────────┐
                                  │ H2 / MySQL  │   │ GitHub REST API   │
                                  │ (JPA)       │   │ SMTP (contact)    │
                                  └─────────────┘   └───────────────────┘
```

## Project structure

```
portfolio-pujan/
├── frontend/              Next.js app (UI, animations, content config)
│   ├── src/config/site.ts     Content shown on the site (edit this)
│   └── public/resume.pdf      Resume used by the Resume button
├── backend/               Spring Boot REST API
│   └── src/main/java/com/portfolio/backend/config/DataSeeder.java
│                              Seed data loaded on startup
├── docker-compose.yml     Runs frontend and backend together
├── .env.example           Template for environment variables
└── README.md
```

## Getting started

### Prerequisites

- **Docker** with Docker Compose (the easiest route), or
- **Node.js 18.18+** (20 LTS recommended) and **JDK 21** (check `backend/pom.xml`) to run the services yourself

### Option 1: Docker (recommended)

```bash
git clone https://github.com/pujan-X/portfolio-pujan.git
cd portfolio-pujan

cp .env.example .env        # then fill in your values (see below)
docker compose up --build
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui |

### Option 2: Run each service separately

**Backend**

```bash
cd backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

**Frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local` with the API address:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Environment variables

Copy `.env.example` to `.env` and fill it in. Never commit the real `.env`.

| Variable | Used by | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Frontend | Base URL of the backend API (for example `http://localhost:8080`). |
| `SMTP_HOST` | Backend | SMTP server (default in the template: `smtp.gmail.com`). |
| `SMTP_PORT` | Backend | SMTP port (default: `587`). |
| `SMTP_USER` | Backend | Account that sends the contact-form emails. |
| `SMTP_PASS` | Backend | Password for that account. For Gmail, use an **App Password** (requires 2-step verification), not your normal password. |
| `GITHUB_TOKEN` | Backend | Optional. A GitHub personal access token that raises the GitHub API rate limit for the activity section. A read-only token with no extra scopes is enough. |
| `SPRING_PROFILES_ACTIVE` | Backend | `dev` uses the H2 in-memory database. `prod` uses MySQL. |

When running the backend outside Docker, set these as real environment variables or in your IDE run configuration, since Spring Boot does not read `.env` files on its own.

## API overview

The backend serves the portfolio content and handles the contact form. Swagger UI at `/swagger-ui` is the source of truth for the exact routes and schemas.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/profile` | Name, tagline, bio and social links |
| `GET` | `/api/projects` | Project list |
| `GET` | `/api/skills` | Skills grouped by category |
| `GET` | `/api/experience` | Experience and education timeline |
| `GET` | `/api/certifications` | Certifications |
| `GET` | `/api/github/stats` | Cached GitHub statistics |
| `POST` | `/api/contact` | Validate, store and email a contact message |
| `GET` | `/actuator/health` | Health check |

## Editing the content

Personal content lives in two places, and they should match:

1. **Frontend:** `frontend/src/config/site.ts`
2. **Backend seed data:** `backend/src/main/java/com/portfolio/backend/config/DataSeeder.java`

Replace the resume by dropping a new file at `frontend/public/resume.pdf`.

| Variable | Description |
| -------- | ----------- |
| `NEXT_PUBLIC_API_URL` | The backend API URL for the frontend |
| `SMTP_HOST` | SMTP server host for contact form |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username/email |
| `SMTP_PASS` | SMTP password/app password |
| `MAIL_FROM` | Email address to send the contact forms from (defaults to SMTP_USER) |
| `CONTACT_RECIPIENT` | Email address that receives the contact forms |
| `GITHUB_TOKEN` | GitHub Personal Access Token for stats |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASS` | Database password |

## Deployment

**Backend (Render or Railway)**

1. Create a new web service from this repo with `backend/` as the root, using the provided `Dockerfile`.
2. Set `SPRING_PROFILES_ACTIVE=prod`, the MySQL connection settings from the `prod` profile in `backend/src/main/resources`, and the SMTP variables.
3. Note the public URL once it is live.

**Frontend (Vercel)**

1. Import the repo into Vercel and set the root directory to `frontend/`.
2. Add `NEXT_PUBLIC_API_URL` and point it at the deployed backend URL.
3. Redeploy whenever you change that variable. Next.js reads `NEXT_PUBLIC_*` values at build time.

Remember to allow the deployed frontend origin in the backend's CORS settings.

## Troubleshooting

- **Contact form says it failed or no email arrives:** check the SMTP variables, and for Gmail make sure you used an App Password. Check the backend logs for the mail error.
- **GitHub section is empty or rate-limited:** set `GITHUB_TOKEN` and restart the backend.
- **Frontend cannot reach the API (CORS or network error):** confirm the backend is running, `NEXT_PUBLIC_API_URL` is correct, and the frontend origin is allowed in the backend's CORS configuration.
- **Changed `NEXT_PUBLIC_API_URL` but nothing happened:** rebuild or restart the frontend. The value is baked in at build time.
- **Port already in use:** stop whatever is using `3000` or `8080`, or change the port mapping in `docker-compose.yml`.

## Roadmap

- [ ] Deploy frontend and backend and add live links above
- [ ] Add screenshots to this README
- [ ] Add a project detail page for each featured project
- [ ] Add automated tests to a CI workflow (GitHub Actions)

## License and usage

The source code is public so you can read it and learn from it. The personal content in it (text, photo, resume and project descriptions) belongs to Pujan Suthar and is not licensed for reuse. If you want to build your own portfolio from this, please replace all content with your own.

## Author

**Pujan Suthar**: B.Sc. Computer Science student, Mumbai, India. Backend and full-stack developer working with Java, Spring Boot and MySQL.

- GitHub: [@pujan-X](https://github.com/pujan-X)
- Email: [pujansuthar345@gmail.com](mailto:pujansuthar345@gmail.com)

<div align="center">

Built with Next.js and Spring Boot.

</div>
