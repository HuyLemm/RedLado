# RedLado Backend (Node + Express)

This directory now contains a lightweight Node/Express backend used for authentication prototyping. It exposes `/api/auth/login`, `/api/auth/signup`, and `/api/profile/:id` (PATCH) endpoints backed by MongoDB (Atlas) via Mongoose.

## Getting Started

```bash
cd backend
npm install
npm run dev
```

Environment variables:

- `PORT` – server port (default `4000`)
- `CLIENT_ORIGIN` – allowed CORS origin (default `*`)
- `MONGODB_URI` – Mongo connection string (e.g. Atlas SRV URI)

## Project Structure

```
backend/
├── package.json
├── tsconfig.json
└── src
    ├── app.ts
    ├── server.ts
    ├── config/
    │   ├── database.ts
    │   └── env.ts
    ├── controllers/
    │   └── auth/
    │       ├── loginController.ts
    │       └── signupController.ts
    │   └── profile/
    │       └── updateProfileController.ts
    ├── middleware/
    │   ├── error/
    │   │   └── errorHandler.ts
    │   └── validation/
    │       └── validateRequest.ts
    ├── models/
    │   ├── user.model.ts
    │   └── user.ts
    ├── repositories/
    │   └── userRepository.ts
    ├── routes/
    │   ├── auth/
    │   │   └── auth.routes.ts
    │   ├── profile/
    │   │   └── profile.routes.ts
    │   └── index.ts
    ├── schemas/
    │   ├── authSchemas.ts
    │   └── profileSchemas.ts
    ├── seeders/
    │   └── userSeeder.ts
    ├── services/
    │   ├── auth/
    │   │   └── authService.ts
    │   └── profile/
    │       └── profileService.ts
    └── utils/
        ├── password.ts
        └── token.ts
```

> ⚠️ This scaffold now persists data in MongoDB but still returns mock JWT tokens; replace `utils/token.ts` with real JWT logic when ready.
