# Wash World frontend

See the [project README](../README.md) for environment variables, database setup, and the full Docker workflow.

From this directory:

```powershell
docker compose up --build
```

Open http://localhost:3001. This uses the `wash-world-frontend` Compose project, keeping it separate from other projects that have a `frontend` directory.

For the alternative development Dockerfile, run from this directory:

```powershell
docker compose -f dev/docker-compose.dev.yml up --build
```

Use one frontend Compose configuration at a time. Both run the same application on port 3001.

To run Next.js directly on the host instead, use port 3001 so it matches the backend CORS setting and email links:

```powershell
npm install
npm run dev -- --port 3001
```

For host execution, set `BACKEND_INTERNAL_URL` and `FLASK_SERVER_SIDE_ONLY` in `.env` to `http://localhost`; inside Docker, use `http://host.docker.internal`.
