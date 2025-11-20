# RedLado Backend (Node + Express)

This directory now contains a lightweight Node/Express backend used for authentication prototyping. It exposes an `/api/auth/login` endpoint that validates user credentials against an in-memory data source.

## Getting Started

```bash
cd backend
npm install
npm run dev
```

Environment variables:

- `PORT` – server port (default `4000`)
- `CLIENT_ORIGIN` – allowed CORS origin (default `*`)

## Project Structure

```
backend/
├── package.json
├── tsconfig.json
└── src
    ├── app.ts
    ├── server.ts
    ├── config/
    │   └── env.ts
    ├── controllers/
    │   └── auth/
    │       └── loginController.ts
    ├── middleware/
    │   ├── error/
    │   │   └── errorHandler.ts
    │   └── validation/
    │       └── validateRequest.ts
    ├── models/
    │   └── user.ts
    ├── repositories/
    │   └── userRepository.ts
    ├── routes/
    │   ├── auth/
    │   │   └── auth.routes.ts
    │   └── index.ts
    ├── schemas/
    │   └── authSchemas.ts
    ├── seeders/
    │   └── userSeeder.ts
    ├── services/
    │   └── auth/
    │       └── authService.ts
    └── utils/
        └── password.ts
```

> ⚠️ This is a scaffold meant to be replaced with real persistence and JWT handling when the dedicated backend is ready.
