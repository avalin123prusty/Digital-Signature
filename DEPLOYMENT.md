Deployment guide

Backend (Render / Railway / Heroku)
- Set up a new service pointing to this repository (branch: daywise-real-pr or main).
- Set build command: `npm install` and start command: `npm start` (or `node server.js`).
- Environment variables to set (Server > Environment):
  - `MONGODB_URI` -> MongoDB Atlas connection string
  - `JWT_SECRET` -> secure secret
  - `PORT` -> 5000 (or default)
  - `FRONTEND_URL` or `APP_BASE_URL` -> your frontend URL (e.g. https://your-site.vercel.app)
  - Email (optional): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `APP_BASE_URL`

Frontend (Vercel / Netlify)
- Create a new project linking this repo and the `client` folder as the root.
- Build command: `npm install && npm run build` (or `npm run build` in `client` folder).
- Output directory: `client/build` (for Create React App) or `build`.
- Set env var `REACT_APP_API_BASE` if you override API location.

MongoDB Atlas
- Create a cluster and a database user with a strong password.
- Whitelist your app IPs or enable access from anywhere (0.0.0.0/0) for testing.
- Copy the connection string and set `MONGODB_URI` in backend env.

Notes
- For email invites, configure SMTP env vars. If not configured the API still returns the public link in the response.
- Ensure `APP_BASE_URL` points to your frontend so emailed links open the correct location.
- Use HTTPS in production for token links.

Docker
- Build backend image from `server/Dockerfile` and frontend from `client/Dockerfile`.
- Example (build & run backend):
```bash
docker build -t digital-signature-backend -f server/Dockerfile .
docker run -e MONGODB_URI="<uri>" -e JWT_SECRET="<secret>" -p 5000:5000 digital-signature-backend
```

Heroku
- Include `Procfile` at repo root (`web: node server/server.js`). Set env vars in Heroku dashboard. Push repo to Heroku remote.
