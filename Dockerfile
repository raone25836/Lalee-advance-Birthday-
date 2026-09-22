# ==============================================================================
# Multi-stage Dockerfile for Lalee Advance Birthday Portal
# Production-ready, ultra-lightweight, and optimized for all environments:
# Local Docker, Docker Compose, Cloud Run, AWS ECS, DigitalOcean, Kubernetes, VPS
# ==============================================================================

# STAGE 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* bun.lock* ./

# Install npm dependencies cleanly
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy all source files
COPY . .

# Build production bundle to dist/
RUN npm run build

# ==============================================================================
# STAGE 2: Production Nginx Web Server
# Ultra-fast, ~25MB image size, minimal memory footprint (<15MB RAM)
# ==============================================================================
FROM nginx:alpine AS runner

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built SPA from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (SPA routing, Gzip, Security headers, Port 3000)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Port 3000 (standard for Cloud Run and container environments)
EXPOSE 3000

# Container Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/healthz || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
