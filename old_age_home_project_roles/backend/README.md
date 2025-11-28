# Backend - Old Age Home (Node/Express + MongoDB) - Roles added

Install and run:
```
cd backend
npm install
cp .env.example .env
# edit .env if necessary
npm run seed   # creates admin, staff, resident users
npm start
```

Default credentials created by seed.js:
- admin@example.com / admin123  (role: admin)
- staff@example.com / staff123  (role: staff)
- resident@example.com / resident123  (role: resident)
