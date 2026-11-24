# ROYAL FEAST — Premium Restaurant Web Application

A modern, high-end luxury restaurant website and restaurant management platform. Built with React 18, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, and Prisma ORM.

---

## 🍽️ Brand Identity & Aesthetics

- **Primary Background**: `#151515` (Deep luxury black)
- **Secondary Background**: `#202020` (Dark charcoal)
- **Gold Accent**: `#C6A15B` (Royal metallic gold)
- **Cream Background**: `#F8F5EF` (Warm antique cream)
- **Typography**:
  - Headings: **Playfair Display** (High-contrast editorial serif)
  - Body: **Inter** (Clean, legible modern sans-serif)

---

## 🏛️ Project Architecture

```
royal-feast/
├── frontend/             # Vite + React 18 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/   # Atomic UI & layout components
│   │   ├── layouts/      # Main & Admin dashboard layouts
│   │   ├── pages/        # Route page views
│   │   ├── services/     # Axios client & API integrations
│   │   ├── styles/       # Global CSS & Tailwind design tokens
│   │   └── types/        # TypeScript interfaces & types
├── backend/              # Node.js + Express + TypeScript + Prisma
│   ├── src/
│   │   ├── config/       # Environment & server config
│   │   ├── controllers/  # Request handling logic
│   │   ├── middleware/   # Auth, Error handling, Security
│   │   ├── routes/       # Modular API routing
│   │   └── utils/        # Standardized API response formatters
│   └── prisma/
│       └── schema.prisma # PostgreSQL relational database schema
└── docs/                 # Architectural specifications
```

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Configure Environment:**
   - Copy `backend/.env.example` to `backend/.env`
   - Copy `frontend/.env.example` to `frontend/.env`

3. **Start Development:**
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`
