# Old Age Home Management System (Roles)

This repository contains:

- frontend/ — React app (simple, plain CSS)
- backend/  — Node.js + Express + MongoDB API with role-based access control

Quick start:

1. Start MongoDB locally (or provide MONGO_URI in backend/.env)
2. Start backend:
   ```
   cd backend
   npm install
   cp .env.example .env
   npm run seed
   npm start
   ```
3. Start frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
Notes:
- The backend returns `role` with login response and includes role in JWT.
- Residents listing and creation are restricted to staff and admin.
- Deletion is restricted to admin only.
