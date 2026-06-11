Hosting guide — Vercel (frontend) + Render (backend) + Supabase (Postgres)

Overview

- Supabase: Postgres database. Run SQL migrations there.
- Render: Run the Node backend (Docker or direct). Provide `DATABASE_URL` and `JWT_SECRET`.
- Vercel: Deploy frontend; set `VITE_API_URL` to the Render backend URL.

Step 1 — Create Supabase DB

1. Go to https://app.supabase.com and create a new project.
2. Copy the `Connection string` (postgres URL) from Project Settings → Database → Connection string.
3. Open SQL Editor and run the migration files from `server/migrations/` in this repo in this order:
   - `create_users.sql`
   - `add_fullname_to_users.sql`
   - `create_orders.sql`

Step 2 — Deploy backend to Render (Docker)

1. Create a new Web Service on Render and connect your GitHub repo.
2. Select "Docker" and let Render build the `server/Dockerfile`.
3. Set environment variables on Render:
   - `DATABASE_URL` = <your supabase connection string>
   - `JWT_SECRET` = <a secure random string>
4. Start the service; note the public URL `https://your-backend.onrender.com`.

Step 3 — Deploy frontend to Vercel

1. Create a new project on Vercel and connect your repo.
2. Build command: `npm run build`; Output directory: `dist` (Vite default).
3. Set an environment variable `VITE_API_URL` to your backend URL (e.g. `https://your-backend.onrender.com`).
4. Deploy.

Step 4 — Verify

1. Visit your Vercel URL. You should see the site.
2. Register a user at `/register`, then login at `/login`.
3. Click "Make It Yours" and submit an order. Verify order appears in Supabase `orders` table.

Optional: Use Render managed Postgres or Railway instead of Supabase.

Notes

- Frontend fetch base URL uses `import.meta.env.VITE_API_URL` with a localhost fallback.
- Keep `JWT_SECRET` and `DATABASE_URL` secret and never commit them to source control.
