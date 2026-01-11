# Use multi-stage build for frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Use Python image for backend and serving
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt

COPY backend/ ./backend/

# Copy frontend static files to a location FastAPI can serve (or use Nginx)
# For this implementation, we'll serve them via FastAPI or keep them for Nginx
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
