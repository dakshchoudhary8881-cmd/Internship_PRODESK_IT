# Prodesk IT — Sprint 15

## Track B — Full-Stack REST API CRUD & Data Ownership

Sprint 15 completes the core full-stack functionality for the Prodesk IT TaskMatrix application.

The application combines the authentication foundation from Sprint 14 with the TaskMatrix product experience from Sprint 13 and adds a complete REST API CRUD architecture with secure user ownership.

---

## Project Overview

TaskMatrix is a task management dashboard where authenticated users can create, view, update, and delete their own tasks.

The Sprint 15 implementation focuses on:

- JWT authentication
- Protected REST API endpoints
- MongoDB persistence
- Complete CRUD functionality
- User data ownership
- React frontend integration
- Optimistic UI updates
- Task status management
- Search and task organization
- Responsive TaskMatrix dashboard

---

# Sprint 15 Objectives

The main Sprint 15 Track B objectives were:

1. Complete REST API CRUD operations.
2. Protect API endpoints using JWT authentication.
3. Enforce strict user ownership of task data.
4. Connect the React frontend to the REST API.
5. Implement optimistic deletion.
6. Provide a polished TaskMatrix dashboard.
7. Maintain the authentication foundation from Sprint 14.
8. Maintain the TaskMatrix product experience established in Sprint 13.

---

# Technology Stack

## Frontend

- React
- JavaScript
- CSS
- Axios
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Development

- Git
- npm
- VS Code

---

# Application Structure

```text
Sprint_15/
│
├── server/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   └── server.js
│
└── client/
    └── src/
        ├── pages/
        │   └── Dashboard.jsx
        │
        ├── services/
        │   └── tasks.js
        │
        └── index.css