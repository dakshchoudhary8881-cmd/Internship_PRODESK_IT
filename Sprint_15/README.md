# 🚀 Prodesk IT — Sprint 14

### 🔐 Full-Stack Authentication & JWT Integration

> **Sprint 14 | Prodesk IT Internship**
>
> A secure MERN-stack authentication MVP featuring **JWT authentication, bcrypt password hashing, MongoDB persistence, protected routes, and React authentication state management.**

---

## 🖥️ Project Overview

Sprint 14 focuses on building the **Authentication & Routing Walking Skeleton** for Prodesk IT.

The application provides a complete authentication flow where users can:

* 📝 Create an account
* 🔑 Log in securely
* 🔐 Receive and store a JWT
* 🛡️ Access protected routes
* 👤 View their authenticated profile
* 🚪 Log out securely
* 🗄️ Persist account information in MongoDB

The project follows the **Track B — Fullstack Developer** requirements.

---

## ✨ Features

* 📝 **User Registration**
* 🔑 **User Login**
* 🔐 **JWT Authentication**
* 🔒 **bcryptjs Password Hashing**
* 🛡️ **Protected React Routes**
* ⚡ **Express JWT Middleware**
* 🗄️ **MongoDB Atlas Database**
* 👤 **Authenticated User Dashboard**
* 🚪 **Logout Functionality**
* 🔄 **Automatic Authentication State Handling**
* ❌ **Invalid Credential Handling**
* ⏰ **Expired JWT Handling**
* 📱 **Responsive UI**
* 🌐 **REST API Architecture**

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| ⚛️ **React**        | Frontend UI                 |
| ⚡ **Vite**          | Development & build tooling |
| 🧭 **React Router** | Client-side routing         |
| 📡 **Axios**        | API communication           |
| 🎨 **CSS3**         | Styling & responsive UI     |

### ⚙️ Backend

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| 🟢 **Node.js**       | Server-side runtime       |
| 🚂 **Express.js**    | REST API framework        |
| 🍃 **Mongoose**      | MongoDB ODM               |
| 🔐 **bcryptjs**      | Password hashing          |
| 🎟️ **jsonwebtoken** | JWT authentication        |
| 🌍 **CORS**          | Cross-origin requests     |
| 🔧 **dotenv**        | Environment configuration |

### 🗄️ Database

**🍃 MongoDB Atlas**

Used for securely storing registered user accounts.

Passwords are stored as **bcrypt hashes**, never as plaintext.

---

## 🏗️ Architecture

```text
                    🚀 Prodesk IT
                         │
                         ▼
              ┌─────────────────────┐
              │    ⚛️ React Client   │
              │                     │
              │  📝 Register        │
              │  🔑 Login           │
              │  🏠 Dashboard       │
              └──────────┬──────────┘
                         │
                         │ Axios / REST API
                         ▼
              ┌─────────────────────┐
              │   🟢 Express API    │
              │                     │
              │  Auth Controllers   │
              │  JWT Middleware     │
              └──────────┬──────────┘
                         │
                         │ Mongoose
                         ▼
              ┌─────────────────────┐
              │ 🍃 MongoDB Atlas    │
              │                     │
              │ 👤 Users Collection │
              └─────────────────────┘
```

---

## 🔐 Authentication Flow

### 📝 Registration

```text
👤 User
   │
   ▼
📝 Register Form
   │
   ▼
POST /api/auth/register
   │
   ▼
🔎 Validate User
   │
   ▼
🔐 bcryptjs Hash Password
   │
   ▼
🗄️ Save User → MongoDB
   │
   ▼
🎟️ Generate JWT
   │
   ▼
💾 Store JWT in localStorage
   │
   ▼
🏠 Redirect → Dashboard
```

### 🔑 Login

```text
👤 User
   │
   ▼
🔑 Login Form
   │
   ▼
POST /api/auth/login
   │
   ▼
🔎 Find User
   │
   ▼
🔐 bcrypt.compare()
   │
   ▼
🎟️ Generate JWT
   │
   ▼
💾 Store JWT
   │
   ▼
🏠 Dashboard
```

### 🛡️ Protected Route

```text
🌐 Request
   │
   ▼
Authorization: Bearer <JWT>
   │
   ▼
🛡️ JWT Middleware
   │
   ▼
🔍 jwt.verify()
   │
   ├───────────────┐
   ▼               ▼
✅ Valid          ❌ Invalid
   │               │
   ▼               ▼
🔓 Allow          🚫 401
   │               │
   ▼               ▼
Protected API    🔑 Login
```

---

## 📁 Project Structure

```text
Sprint_14/
│
├── 📂 client/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   └── 🛡️ ProtectedRoute.jsx
│   │   │
│   │   ├── 📂 context/
│   │   │   └── 🔐 AuthContext.jsx
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── 🔑 Login.jsx
│   │   │   ├── 📝 Register.jsx
│   │   │   └── 🏠 Dashboard.jsx
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── 📡 api.js
│   │   │   └── 🔐 auth.js
│   │   │
│   │   ├── ⚛️ App.jsx
│   │   ├── 🚀 main.jsx
│   │   └── 🎨 index.css
│   │
│   └── 📦 package.json
│
├── 📂 server/
│   ├── 📂 config/
│   │   └── 🗄️ db.js
│   │
│   ├── 📂 controllers/
│   │   └── 🔐 authController.js
│   │
│   ├── 📂 middleware/
│   │   └── 🛡️ authMiddleware.js
│   │
│   ├── 📂 models/
│   │   └── 👤 User.js
│   │
│   ├── 📂 routes/
│   │   └── 🔐 authRoutes.js
│   │
│   ├── 📂 utils/
│   │   └── 🎟️ generateToken.js
│   │
│   ├── ⚙️ server.js
│   └── 📦 package.json
│
├── 📄 .env.example
└── 📖 README.md
```

---

## 📡 API Endpoints

### 📝 Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123"
}
```

---

### 🔑 Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "Test@123"
}
```

---

### 👤 Get Current User

```http
GET /api/auth/me
```

**Authorization Required:**

```http
Authorization: Bearer <JWT>
```

---

## 🔒 Security

Security was a major requirement of Sprint 14.

### 🔐 Password Protection

Passwords are hashed using **bcryptjs** before being stored in MongoDB.

Example:

```text
$2b$10$................................
```

❌ Plaintext passwords are never stored.

### 🎟️ JWT Security

JWTs are:

* 🔐 Signed using a secret key
* ⏰ Configured with an expiration
* 🛡️ Verified by Express middleware
* 🚫 Rejected when invalid or expired

### 🔑 Environment Variables

Sensitive credentials are stored in `.env` files and should **never be committed to GitHub**.

---

## ⚙️ Environment Variables

### Backend — `server/.env`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Never commit real MongoDB credentials or JWT secrets to GitHub.**

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Sprint_14
```

### 2️⃣ Install backend dependencies

```bash
cd server
npm install
```

### 3️⃣ Configure backend environment

Create:

```text
server/.env
```

Add your MongoDB Atlas connection string and JWT secret.

### 4️⃣ Start the backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 5️⃣ Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

### 6️⃣ Configure frontend environment

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 7️⃣ Start the frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧪 Testing

The following authentication scenarios were successfully tested:

* [x] 📝 User registration
* [x] 🔐 bcrypt password hashing
* [x] 🗄️ MongoDB user persistence
* [x] 🔑 User login
* [x] 🎟️ JWT generation
* [x] 💾 JWT localStorage persistence
* [x] 🏠 Authenticated dashboard
* [x] 🛡️ Protected dashboard route
* [x] 🔒 Protected `/api/auth/me` endpoint
* [x] 🚪 Logout
* [x] ❌ Invalid login handling
* [x] 🔄 Duplicate email handling
* [x] ⏰ Invalid/expired JWT handling
* [x] 🚫 Unauthorized request handling
* [x] 🏗️ Production frontend build

---

## 📋 Sprint 14 Requirements

### 🟢 P0 — Base Architecture

* [x] 👤 Mongoose User schema
* [x] 📧 Email field
* [x] 🔑 Password field
* [x] 👤 Name field
* [x] 🔐 bcryptjs password hashing
* [x] 🗄️ MongoDB persistence

### 🟡 P1 — State & Integration

* [x] 📝 Register endpoint
* [x] 🔑 Login endpoint
* [x] 🎟️ JWT generation
* [x] ⚛️ React authentication forms
* [x] 📡 POST API requests
* [x] 💾 JWT localStorage persistence

### 🔴 P2 — Advanced Optimization

* [x] 🛡️ Express JWT middleware
* [x] 🔒 Protected API endpoint
* [x] 🔍 JWT verification
* [x] 🚧 Protected dashboard
* [x] 🔄 Automatic authentication handling
* [x] ⏰ Expired JWT handling
* [x] 🚪 Logout

---

## 🎯 Sprint Deliverable

The Sprint 14 MVP successfully demonstrates a complete authentication **Walking Skeleton** for Prodesk IT.

```text
📝 Register
     ↓
🔐 bcrypt Hash
     ↓
🗄️ MongoDB
     ↓
🎟️ JWT
     ↓
🔑 Login
     ↓
🛡️ Authentication
     ↓
🏠 Protected Dashboard
     ↓
🚪 Logout
```

This authentication foundation can now be extended with the future Prodesk IT application features.

---

## 👨‍💻 Author

**Daksh Choudhary**

🎓 Prodesk IT Internship
📅 Sprint 14
💻 Full-Stack Developer Track

---

## ⭐ Acknowledgement

Built as part of the **Prodesk IT Internship — Sprint 14**.

> **Build securely. Authenticate reliably. Ship confidently. 🚀**
