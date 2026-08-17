# 📝 Sprint 15 — Full Stack Todo & Task Manager

> 🚀 **Prodesk IT Internship — Sprint 15 | Track B: Full Stack Developer**

A simple, secure, and responsive **Full Stack Todo / Task Management Application** built as part of Sprint 15.

This sprint focuses on completing the complete **CRUD lifecycle** for tasks while connecting a React frontend to a secure Express REST API backed by MongoDB.

---

## 🌐 Live Demo

### 🚀 [**Open Live Demo**](https://sprint-15-client.vercel.app)

---

## 📌 About The Project

The Sprint 15 application extends the authentication architecture developed in the previous sprint and introduces the application's core task-management functionality.

Users can:

- ➕ Create new tasks
- 👀 View their tasks
- ✏️ Edit existing tasks
- 🔄 Change task status
- 🗑️ Delete tasks
- 🔐 Access only their own tasks
- ⚡ Experience instant UI updates
- 💾 Persist task data in MongoDB

The project demonstrates how a React frontend communicates with a protected Node.js/Express REST API while maintaining user-level data ownership.

---

# 🎯 Sprint 15 Objectives

The primary goal of this sprint was to implement **Track B — Full Stack Developer** requirements.

### Phase 1 — Base Architecture 🏗️

- ✅ Complete REST API CRUD endpoints
- ✅ JWT-protected API routes
- ✅ MongoDB task persistence
- ✅ User ownership validation
- ✅ Secure task creation
- ✅ User-specific task retrieval

### Phase 2 — State & Integration 🔗

- ✅ Connect React frontend to REST API
- ✅ Axios API service
- ✅ Dynamic task rendering
- ✅ Create task interface
- ✅ Edit task interface
- ✅ Delete confirmation
- ✅ Optimistic UI deletion
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling

### Phase 3 — Advanced Optimization 🚀

- ⏳ Stripe Test Mode / Checkout integration

> **Note:** P0 and P1 were prioritized as the core Sprint 15 implementation. Stripe Checkout is an optional P2 enhancement and is not required for the core CRUD workflow.

---

# ✨ Features

## 🔐 Authentication

The application uses JWT-based authentication to protect user-specific resources.

- 🔑 Secure login
- 🪪 JWT authentication
- 🛡️ Protected API routes
- 👤 Authenticated user identification
- 🚪 Logout functionality
- ⚠️ Unauthorized request handling

---

## 📝 Task Management

The application provides a complete CRUD workflow.

### ➕ Create

Users can create a task with:

- Task title
- Description
- Status

The authenticated user's ID is automatically associated with the task.

---

### 👀 Read

Users can retrieve their existing tasks.

The backend automatically filters tasks using the authenticated user's ID.

```text
GET /api/tasks
