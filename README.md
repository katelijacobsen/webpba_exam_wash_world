# Wash World 2.0

A car wash customer application with a Flask/Python 3.12 backend, MariaDB database, and Next.js frontend. This Docker setup is for local development.

## Run the backend

Start [Docker Desktop](https://www.docker.com/products/docker-desktop/) with Docker Compose 2.22 or later. Clone or download this repository, then open PowerShell in the repository root.

For a fresh checkout, create the configuration file (keep an existing configured `.env`):

```powershell
cd backend
Copy-Item .env.example .env
```

Keep the example database settings for local development:

```dotenv
DB_HOST=mariadb
DB_USER=root
DB_PASSWORD=password
DB_NAME=wash_world
```

For signup verification and password-reset emails, fill in these entries in `backend/.env`:

- `SENDER_EMAIL`: the Gmail address that will send the emails.
- `SENDER_EMAIL_PASSWORD`: an app password generated at
[Google Account → App Passwords](https://myaccount.google.com/apppasswords), rather than your normal Gmail password. Your Google account must have 2-Step Verification enabled; see [Google's instructions](https://support.google.com/accounts/answer/185833).

The backend checks below need neither email credentials nor the frontend.

Build and start all three backend services:

```powershell
docker compose up --build -d --wait
```

Flask and phpMyAdmin wait for MariaDB's healthcheck before starting.

| Service | Access from your computer | Container port |
|---|---|---|
| Flask API | http://localhost | 8000 |
| phpMyAdmin | http://localhost:8080 | 80 |
| MariaDB | `localhost:3307` | 3306 |

With the default settings, log into phpMyAdmin with `root` / `password` and select `wash_world`. An empty database volume is initialized automatically from [wash_world.sql](backend/extentions/wash_world.sql); do not import the SQL again. Existing volumes retain their database credentials, so changing `.env` does not reset an existing password.

## Check and develop

Run these commands from `backend`:

```powershell
docker compose ps
docker compose exec flask-app id
Invoke-RestMethod http://localhost/health | Format-List

$result = Invoke-RestMethod http://localhost/api-get-all-locations
$result.locations |
    Select-Object -First 3 location_title, location_city |
    Format-Table -AutoSize
```

Expect Flask and MariaDB to be healthy, phpMyAdmin running, a non-root `appuser`, and location records. The health endpoint checks Flask's response; the locations request checks database access.

Source changes reload through the `.:/app` bind mount and Flask's reloader. To demonstrate this, temporarily change a JSON field returned by `/health`, save, request it again, then restore the change.

To also rebuild automatically when `requirements.txt` changes, use [Compose Watch](https://docs.docker.com/compose/how-tos/file-watch/):

```powershell
docker compose up --build --watch
```

After changing backend `.env` values read by Flask, run `docker compose restart flask-app`.

In another terminal opened in `backend`, inspect resource usage or stop the stack:

```powershell
docker stats --no-stream
docker compose down
```

Stats includes all running projects. Shutdown removes this project's containers and network but retains its named database volume; adding `--volumes` would delete that data.

## How the backend is containerized

| File | Role |
|---|---|
| [Dockerfile](backend/Dockerfile) | The Python 3.12 `builder` stage installs requirements into `/opt/venv`. The `runtime` stage copies that environment and the application. |
| [docker-compose.yml](backend/docker-compose.yml) | Builds Flask, maps host port 80 to container port 8000, mounts source code, defines its healthcheck and Watch rule, and includes `database.yaml`. |
| [database.yaml](backend/database.yaml) | Runs prebuilt MariaDB and phpMyAdmin images, mounts initialization SQL read-only, and declares the database volume. |
| [.dockerignore](backend/.dockerignore) | Excludes `.env`, `*.pyc`, and `__pycache__` from the build context. |

- **Build efficiency:** requirements are installed before source is copied, allowing dependency-layer reuse. The slim base and `--no-cache-dir` keep unnecessary content down. [Multiple stages](https://docs.docker.com/build/building/multi-stage/) separate dependency preparation from runtime assembly; a size reduction has not been verified.
- **Security:** Flask runs as a non-root user. This does not enable [Docker engine rootless mode](https://docs.docker.com/engine/security/rootless/). The application still uses Flask's development server.
- **Network:** Compose creates `wash-world-backend_default`; containers reach MariaDB at `mariadb:3306`.
- **Storage and configuration:** `wash-world-backend_mariadb_data` persists database files at `/var/lib/mysql`. The source bind mount exposes the local `.env` to Flask at runtime; it is excluded from the image. Dependencies remain outside that mount in `/opt/venv`.

Known limitation: `app.py` currently hard-codes its JWT key, so `JWT_SECRET_KEY` in `.env` has no effect.

## Run the frontend

In a second terminal at the repository root, create the frontend configuration for a fresh checkout (skip the copy if `.env` is already configured):

```powershell
cd frontend
Copy-Item .env.example .env
```

Set `NEXT_PUBLIC_MAPBOX_TOKEN` to your public Mapbox token. The other local settings are:

```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost
BACKEND_INTERNAL_URL=http://host.docker.internal
FLASK_SERVER_SIDE_ONLY=http://host.docker.internal
```

Keep `FRONTEND_URL=http://localhost:3001` in the backend's `.env` for CORS. Start the frontend with:

```powershell
docker compose up --build
```

Open http://localhost:3001. Only public values belong in `NEXT_PUBLIC_*` variables.
