# Royal Feast - Setup & Development Guide

Welcome to the **ROYAL FEAST** luxury restaurant web application and management platform.

---

## 1. Prerequisites

Ensure you have installed:
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **npm**: `v9.0.0` or higher
- **PostgreSQL**: `v14+` running locally or via Docker / cloud (e.g., Supabase, Neon)

---

## 2. Directory Structure

```text
royal-feast/
├── frontend/             # React 18, TypeScript, Tailwind CSS, Vite
├── backend/              # Node.js, Express, TypeScript, Prisma ORM
├── docs/                 # Architectural specifications & documentation
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_DESIGN.md
│   └── SETUP_GUIDE.md
├── package.json          # Root scripts orchestration
└── README.md
```

---

## 3. Environment Variables Configuration

### 3.1 Backend Environment Configuration
Navigate to `backend/` and copy the example environment file:
```bash
cd backend
cp .env.example .env
```
Update the `.env` settings:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/royal_feast_db?schema=public"

# Authentication Secrets
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Payment Gateways (Razorpay / Stripe)
RAZORPAY_KEY_ID="rzp_test_placeholder"
RAZORPAY_KEY_SECRET="rzp_test_secret_placeholder"
```

### 3.2 Frontend Environment Configuration
Navigate to `frontend/` and copy the example environment file:
```bash
cd frontend
cp .env.example .env
```
Ensure `VITE_API_URL` points to your backend instance:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RESTAURANT_NAME="ROYAL FEAST"
```

---

## 4. Installation & Running

### 4.1 Install All Dependencies
From the root directory:
```bash
npm run install:all
```
Or individually:
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### 4.2 Start Development Servers
From the root directory:
```bash
npm run dev
```
Or start individually:
```bash
# Backend server (http://localhost:5000)
npm run dev:backend

# Frontend application (http://localhost:5173)
npm run dev:frontend
```

---

## 5. Database Setup with Prisma

In `backend/`:
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Explore data with Prisma Studio
npx prisma studio
```
