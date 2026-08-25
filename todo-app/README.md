# Full-Stack Todo Application

## Overview
A modern, responsive, and fully functional Todo application built to demonstrate clean architecture, robust API design, and resilient frontend state management. It features a React-based frontend that communicates with a Node.js/Express backend, backed by an SQLite database. Key functionalities include full CRUD operations, task filtering, inline editing, and a robust offline-first fallback caching mechanism via `localStorage`.

## Setup & Running

### Prerequisites
- Node.js and npm installed on your machine.

### 1. Clone & Setup
```bash
# Navigate to your project directory
cd todo-app
```

### 2. Run the Backend (API & Database)
```bash
cd backend
npm install
npm start
```
*The backend server will start on `http://localhost:3001`. The SQLite database (`database.sqlite`) is created automatically.*

### 3. Run the Frontend (UI)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The Vite development server will start on `http://localhost:5174` (or similar). Open this link in your browser to use the app.*

### 4. Running Tests
To run the automated backend security and API tests:
```bash
cd backend
npm test
```

## Architecture & Design Choices

### Frontend
- **React & Vite:** Chosen for fast compilation, HMR (Hot Module Replacement), and a component-driven architecture.
- **TypeScript:** Enforces static typing for safer code, reducing runtime errors.
- **Vanilla CSS:** I utilized plain CSS variables for the "Indigo SaaS" theme. This keeps the project lightweight without the overhead of heavy frameworks like Tailwind or Bootstrap.
- **State Management & Caching:** We use standard React state hooks combined with a custom `api.ts` fetch wrapper. This wrapper falls back to `localStorage` caching if the backend is unreachable, ensuring resilience.

### Backend
- **Node.js & Express:** Chosen for their lightweight and unopinionated nature, perfect for a fast REST API.
- **SQLite3:** A file-based database was chosen for simplicity and zero-configuration setup, making the review and running process completely frictionless.
- **Security Middlewares:** Utilized `helmet` for HTTP headers, `express-rate-limit` for DDoS/brute-force prevention, and strict JSON body sizes to harden the API.

## Trade-offs & Future Work

### Trade-offs
- **Authentication:** To prioritize core mechanics and ease of local testing, full user authentication (JWT, Login/Signup) was skipped. The application acts as a single-tenant system.
- **Database:** SQLite is excellent for local development and simple reads, but lacks concurrent write performance. In a large-scale system, this would be a bottleneck.
- **CSS Architecture:** While Vanilla CSS was chosen for simplicity, as the app grows, moving to CSS Modules or a utility framework like Tailwind would make managing styles easier.

### Future Work
- **Authentication & Multi-Tenant:** I would implement a full User model using a secure hashing algorithm (like bcrypt) and JWT-based authentication to allow multiple users to manage their own private lists.
- **Database Migration:** For a production environment, I would migrate from SQLite to PostgreSQL and use a robust ORM like Prisma or Sequelize for easier schema management.
- **Frontend State Management:** If the application scaled to include multiple complex views (e.g., team dashboards, analytics), I would introduce a state management library like Redux Toolkit or React Query to handle complex caching and synchronization.
