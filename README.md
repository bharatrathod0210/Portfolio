# Bharat Rathod — Premium 3D Portfolio

A fully dynamic, animated MERN portfolio with a built-in admin panel.

---

## Project Structure

```
E:\Portfolio\
├── client/          ← React + Vite frontend (portfolio + admin panel)
└── server/          ← Node.js + Express + MongoDB backend
```

---

## Quick Start

### Step 1 — Configure the backend

Edit `server/.env` and fill in your real credentials:

```env
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@bharatrathod.dev
ADMIN_PASSWORD=Admin@123
```

### Step 2 — Start the backend

Open a terminal:
```bash
cd server
npm run dev
```
Server runs at → http://localhost:5000

### Step 3 — Start the frontend

Open another terminal:
```bash
cd client
npm run dev
```
Portfolio runs at → http://localhost:5173

---

## URLs

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Portfolio (public) |
| http://localhost:5173/admin | Admin panel |
| http://localhost:5173/admin/login | Admin login |
| http://localhost:5000/api/health | API health check |

---

## Admin Login

Use the credentials from your `server/.env`:
- **Email:** `admin@bharatrathod.dev`
- **Password:** `Admin@123`

The admin account is auto-created on first login if it doesn't exist in MongoDB.

---

## Admin Features

| Section | What you can do |
|---------|----------------|
| **Dashboard** | Overview of projects, experience, messages |
| **Projects** | Add / Edit / Delete projects with images, tech stack, links |
| **Experience** | Add / Edit / Delete work experience entries |
| **Messages** | View contact form submissions, mark read/starred, reply |

---

## API Endpoints

### Public
- `GET /api/projects` — All projects
- `GET /api/projects/:id` — Single project
- `GET /api/experience` — All experience entries
- `POST /api/contact` — Submit contact form

### Protected (requires JWT)
- `POST /api/auth/login` — Admin login
- `GET /api/auth/me` — Current admin
- `POST /api/projects` — Create project
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project
- `POST /api/experience` — Create experience
- `PUT /api/experience/:id` — Update experience
- `DELETE /api/experience/:id` — Delete experience
- `GET /api/contact` — All messages
- `PATCH /api/contact/:id/read` — Mark read
- `PATCH /api/contact/:id/star` — Toggle star
- `DELETE /api/contact/:id` — Delete message
- `POST /api/upload` — Upload images to Cloudinary
- `DELETE /api/upload/:publicId` — Delete from Cloudinary

---

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Three.js / React Three Fiber, Lenis smooth scroll

**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT, Cloudinary, Nodemailer

---

## How the dynamic data works

- The **Projects** and **Experience** sections on the portfolio fetch from the API on load
- If the API is unavailable, they fall back to the static data in `client/src/data/portfolio.js`
- Once you add real data via the admin panel, it shows live on the portfolio
- Contact form messages go to MongoDB AND send an email notification to you
