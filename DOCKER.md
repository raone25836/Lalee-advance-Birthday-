# 🐳 Docker Deployment Guide - Lalee Advance Birthday Portal

Yeh website ab **100% Docker-ready aur Production-ready** hai. Aap isse kisi bhi environment (Local Docker, Docker Compose, Linux VPS, AWS ECS, GCP Cloud Run, DigitalOcean, Kubernetes) me chala sakte hain.

---

## 🚀 Quick Start (Docker Compose)

Sabse asaan tarika Docker Compose se chalana hai:

```bash
# 1. Build and start the container
docker compose up -d --build

# 2. Browser me open karein:
http://localhost:3000
```

Container band karne ke liye:
```bash
docker compose down
```

---

## 🛠️ Direct Docker Commands

### 1. Docker Image Build Karein:
```bash
docker build -t lalee-birthday-portal:latest .
```

### 2. Container Run Karein:
```bash
docker run -d -p 3000:3000 --name lalee-portal lalee-birthday-portal:latest
```

### 3. Container Logs Dekhein:
```bash
docker logs -f lalee-portal
```

### 4. Container Stop & Remove Karein:
```bash
docker stop lalee-portal && docker rm lalee-portal
```

---

## 🌐 Public Deployment (Any Cloud / VPS / Cloud Run)

### Option A: Google Cloud Run (Single command):
```bash
gcloud run deploy lalee-birthday-portal \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 3000
```

### Option B: Linux VPS (Ubuntu/Debian):
```bash
git clone <your-repo-url>
cd <repo-folder>
docker compose up -d --build
```

---

## ✨ Features & Architecture
- **Multi-Stage Build**: Node 22 Alpine builder + Nginx Alpine runner (~25MB total image size).
- **RAM Usage**: <15MB RAM consumption.
- **SPA Fallback**: Nginx automatically redirects all client routes to `index.html`.
- **Gzip & Security**: Compression + Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `nosniff`).
- **Healthcheck**: Built-in `/healthz` endpoint returning HTTP 200 for cloud orchestrators.
