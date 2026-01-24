# ==========================================
# Stage 1: Build Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy dependency files first for better caching
COPY frontend/package*.json ./
RUN npm install

# Copy source and build
COPY frontend/ ./
RUN npm run build

# ==========================================
# Stage 2: Final Image
# ==========================================
FROM python:3.11-slim

LABEL maintainer="Lucky Draw Pro"

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.0.0 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    PYTHONPATH=/app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="$POETRY_HOME/bin:$PATH"

# Copy backend dependency files
COPY backend/pyproject.toml backend/poetry.lock* ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN poetry install --only main --no-root

# Copy backend source code
WORKDIR /app
COPY backend/ ./backend/

# Copy frontend build artifacts from Stage 1
# FastAPI main.py expects frontend/dist relative to the working directory (which is /app)
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Create data directory for SQLite
RUN mkdir -p /app/backend/data

# Expose port (Unified to 8000 to match development expectations and internal proxy)
EXPOSE 8000

# Run the application
# We run from /app so that relative path ./frontend/dist in main.py works
# We set PYTHONPATH to /app/backend so that app.main is found
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
