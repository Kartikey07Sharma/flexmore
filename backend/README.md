# Flexmore Backend (Node.js + Express + PostgreSQL)

A standalone REST API for the Flexmore website. This runs **outside** of Lovable — deploy it to your own host (Render, Railway, Fly.io, a VPS, etc.).

> ⚠️ The Lovable preview keeps using Lovable Cloud (Supabase). This `backend/` folder is a separate, optional Node.js implementation you can host yourself.

## Stack

- **Node.js 18+** with native ES modules
- **Express 4** REST API
- **PostgreSQL** via the `pg` driver (raw SQL, no ORM)
- **JWT** auth (`jsonwebtoken`) + **bcrypt** password hashing
- **Multer** file uploads (local disk, served from `/uploads`)
- **Zod** request validation
- **Helmet**, **CORS**, **rate-limit**, **morgan** for hardening + logging

## Getting started

```bash
cd backend
cp .env.example .env       # then edit DATABASE_URL, JWT_SECRET, etc.
npm install

# 1. Create tables
npm run migrate

# 2. (optional) Seed sample categories / settings
npm run seed

# 3. Create the first admin user (uses ADMIN_EMAIL / ADMIN_PASSWORD from .env)
npm run create-admin

# 4. Run the API
npm run dev      # or: npm start
```

API will be at `http://localhost:4000/api`. Health check: `GET /api/health`.

## Environment variables

| Var | Description |
|-----|-------------|
| `PORT` | HTTP port (default `4000`) |
| `NODE_ENV` | `development` / `production` |
| `CORS_ORIGIN` | Comma-separated list of allowed origins |
| `DATABASE_URL` | Postgres connection string |
| `PGSSL` | Set to `true` for managed Postgres requiring SSL |
| `JWT_SECRET` | Long random string — required |
| `JWT_EXPIRES_IN` | e.g. `7d` |
| `UPLOAD_DIR` | Local upload folder (default `./uploads`) |
| `MAX_FILE_SIZE_MB` | Per-file upload limit (default `10`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used by `create-admin` |

## REST API

All admin routes require `Authorization: Bearer <jwt>`.

### Auth
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET  /api/auth/me`
- `POST /api/auth/change-password`

### Categories
- `GET    /api/categories`
- `GET    /api/categories/:slug`
- `POST   /api/categories` *(admin)*
- `PUT    /api/categories/:id` *(admin)*
- `DELETE /api/categories/:id` *(admin)*

### Products
- `GET    /api/products?category=&featured=true&q=&limit=&offset=`
- `GET    /api/products/:slug` (includes images)
- `POST   /api/products` *(admin)*
- `PUT    /api/products/:id` *(admin)*
- `DELETE /api/products/:id` *(admin)*
- `POST   /api/products/:id/images` *(admin)*
- `DELETE /api/products/:id/images/:imageId` *(admin)*

### Blog
- `GET    /api/blog` (published only; pass `?all=true` as admin)
- `GET    /api/blog/:slug`
- `POST   /api/blog` *(admin)*
- `PUT    /api/blog/:id` *(admin)*
- `DELETE /api/blog/:id` *(admin)*

### Inquiries
- `POST   /api/inquiries` (public — quote/contact form)
- `GET    /api/inquiries` *(admin)*
- `PATCH  /api/inquiries/:id` *(admin — update status/notes)*
- `DELETE /api/inquiries/:id` *(admin)*

### Catalogues
- `GET    /api/catalogues`
- `POST   /api/catalogues` *(admin)*
- `DELETE /api/catalogues/:id` *(admin)*

### Settings
- `GET /api/settings` → `[{ key, value }, ...]`
- `PUT /api/settings` *(admin)* — `{ settings: { key: value, ... } }`

### Uploads
- `POST /api/uploads/:bucket` *(admin, `multipart/form-data`, field `file`)*
  - Buckets: `product-images`, `blog-images`, `catalogues`
  - Returns `{ url, filename, size, mimetype }`
  - Files served at `GET /uploads/<bucket>/<filename>`

## Project layout

```
backend/
├── package.json
├── .env.example
├── README.md
├── sql/
│   ├── schema.sql
│   └── seed.sql
└── src/
    ├── server.js
    ├── db/pool.js
    ├── middleware/
    │   ├── auth.js
    │   ├── error.js
    │   └── validate.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── category.routes.js
    │   ├── product.routes.js
    │   ├── blog.routes.js
    │   ├── inquiry.routes.js
    │   ├── catalogue.routes.js
    │   ├── settings.routes.js
    │   └── upload.routes.js
    └── scripts/
        ├── migrate.js
        ├── seed.js
        └── createAdmin.js
```

## Pointing the frontend at this API

The current frontend uses Lovable Cloud (Supabase) directly. To switch later:

1. Replace calls in `src/hooks/use-*.ts` and `AuthContext.tsx` with `fetch(\`${import.meta.env.VITE_API_URL}/api/...\`)`.
2. Store the JWT (e.g. in `localStorage`) and add `Authorization: Bearer <token>` to admin requests.
3. Set `VITE_API_URL` in your frontend `.env`.

## Pushing to GitHub

This `backend/` folder lives in the same repo as the frontend. Once Lovable is connected to GitHub (Connectors → GitHub), every change here is pushed automatically.

## License

MIT — internal use for Flexmore.
