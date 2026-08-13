# Nimesh Rai — Portfolio

Cinematic Spider-Man–themed full-stack developer portfolio.

## Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Framer Motion
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL (default) with SQLite fallback for local demo

## Project structure

```
nimesh-rai-portfolio/
├── backend/          # Django API + admin
├── frontend/         # Next.js cinematic portfolio
├── README.md
└── .gitignore
```

## Quick start (Windows PowerShell)

### 1. Backend

```powershell
cd C:\Users\nimes\Projects\nimesh-rai-portfolio\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser  # optional, for admin
python manage.py runserver
```

API: http://127.0.0.1:8000/api/  
Admin: http://127.0.0.1:8000/admin/

### 2. Frontend

```powershell
cd C:\Users\nimes\Projects\nimesh-rai-portfolio\frontend
copy .env.example .env.local
npm install
npm run dev
```

Site: http://localhost:3000  
Optional admin UI: http://localhost:3000/admin

### Database

By default the backend uses **SQLite** when `DATABASE_URL` is unset (easiest local demo).

For PostgreSQL, set in `backend/.env`:

```
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/nimesh_portfolio
```

Or set individual `POSTGRES_*` vars (see `.env.example`).

### Environment

- `backend/.env.example` — Django secrets, DB, CORS, media
- `frontend/.env.example` — `NEXT_PUBLIC_API_URL`

Never commit real secrets.

## Features

- Modular cinematic character system (swap-ready for 3D later)
- All portfolio content managed via Django admin / API
- Hero intro, About, Skills HUD + Spider-Sense, Coding scene, Projects, Experience, Education, Achievements, Resume, Contact
- Contact form persists to database
- SEO, a11y, reduced-motion, mobile fallbacks

## Seed data

`python manage.py seed_portfolio` loads Nimesh Rai profile, skills, sample projects, education, social links, and site settings.
