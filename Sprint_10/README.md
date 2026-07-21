<p align="center">
  <img src="../logo.png" alt="The Data Hub Logo" width="120" />
</p>

<h1 align="center">🚀 The Data Hub v2 — Sprint 10</h1>

<p align="center">
  <strong>Production-Grade RESTful Blog API with MongoDB Atlas</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  A complete migration from Sprint 09's in-memory storage to a production-ready MongoDB Atlas backend.<br/>
  Features full CRUD for Posts & Users, advanced querying, pagination, soft delete, and bonus analytics routes.
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗄️ MongoDB Atlas | Cloud-hosted NoSQL database with Mongoose ODM |
| 📝 Full CRUD | Create, Read, Update, Delete for Posts and Users |
| 🔍 Advanced Search | Regex-based keyword search across title, content, category |
| 📊 Filtering | Filter posts by category, author, tags, or any field |
| 🔄 Sorting | Sort by latest, oldest, or most liked |
| 📄 Pagination | Page-based pagination with metadata |
| 🗑️ Soft Delete | Posts flagged as deleted, not permanently removed |
| ♻️ Restore | Recover soft-deleted posts |
| ❤️ Like Counter | PATCH endpoint to increment like count |
| 🏷️ Auto Slug | URL-friendly slugs generated from post titles |
| ⏱️ Reading Time | Auto-calculated based on word count |
| 📈 Database Stats | Total posts, users, categories, likes |
| 🏆 Top Categories | Categories ranked by post count |
| 👑 Top Authors | Authors ranked by post count and likes |
| 🩺 Health Check | Combined server + database status endpoint |
| ✅ Validation | express-validator on every write endpoint |
| 🛡️ Security | Helmet, CORS, input sanitization |
| 📦 Compression | gzip compression for all responses |
| 📋 Morgan Logging | HTTP request logging (dev + production modes) |
| 👤 User Roles | Role-based user model (user/admin) |
| 🚀 Vercel Ready | Configured for serverless deployment |

---

## 📁 Project Structure

```text
Sprint_10/
│
├── config/
│   └── db.js                    # MongoDB Atlas connection
│
├── controllers/
│   ├── postController.js        # Post business logic + analytics
│   └── userController.js        # User business logic
│
├── middleware/
│   ├── asyncHandler.js          # Async error wrapper
│   ├── errorHandler.js          # Centralized error handler
│   └── validateObjectId.js      # MongoDB ObjectId validator
│
├── models/
│   ├── Post.js                  # Post Mongoose schema
│   └── User.js                  # User Mongoose schema
│
├── routes/
│   ├── postRoutes.js            # Post API routes
│   ├── userRoutes.js            # User API routes
│   ├── statsRoutes.js           # Database statistics route
│   ├── categoryRoutes.js        # Top categories route
│   └── authorRoutes.js          # Top authors route
│
├── validators/
│   ├── postValidator.js         # Post request validation
│   └── userValidator.js         # User request validation
│
├── utils/
│   └── ApiFeatures.js           # Query builder (filter, search, sort, paginate)
│
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore rules
├── app.js                       # Express app configuration
├── server.js                    # Entry point (connects DB + starts server)
├── package.json                 # Dependencies and scripts
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Cloud Database |
| Mongoose | ODM (Object Data Modeling) |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |
| helmet | Security HTTP Headers |
| compression | Response Compression |
| morgan | HTTP Request Logger |
| express-validator | Input Validation |
| slugify | URL Slug Generation |
| nodemon | Development Auto-Restart |

---

## 🔄 Architecture Diagram

```text
                Client Request
                      │
                      ▼
              ┌───────────────┐
              │   Helmet      │  Security Headers
              │   CORS        │  Cross-Origin
              │   Compression │  gzip
              │   Morgan      │  Logging
              └───────┬───────┘
                      │
                      ▼
              Express Router
                      │
                      ▼
         ┌────────────────────────┐
         │  Validation Middleware │  express-validator
         │  ObjectId Validator   │  validateObjectId
         └────────────┬──────────┘
                      │
                      ▼
              Controller Logic
                      │
                      ▼
         ┌────────────────────────┐
         │  Mongoose + MongoDB   │  Atlas Cloud DB
         │  (populate, aggregate)│
         └────────────┬──────────┘
                      │
                      ▼
              JSON Response
```

---

## 🌐 API Documentation

### Base URL

```
http://localhost:5000
```

---

### 🩺 Health & System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |
| GET | `/api` | API documentation index |
| GET | `/api/health` | Server + Database health check |

---

### 📝 Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts` | Get all posts (filter, search, sort, paginate) |
| GET | `/api/posts/:id` | Get a single post by ID |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Soft delete a post |
| PUT | `/api/posts/:id/restore` | Restore a soft-deleted post |
| PATCH | `/api/posts/:id/like` | Like a post (increment counter) |
| GET | `/api/posts/recent` | Get latest 3 posts |

---

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get a single user with posts |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

---

### 📊 Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Database-wide statistics |
| GET | `/api/categories/top` | Top 5 categories by post count |
| GET | `/api/authors/top` | Top 5 authors by post count |

---

### 🔍 Query Parameters (Posts)

| Parameter | Example | Description |
|-----------|---------|-------------|
| `category` | `?category=Technology` | Filter by category |
| `search` | `?search=node` | Search in title, content, category |
| `author` | `?author=<userId>` | Filter by author ID |
| `tags` | `?tags=express` | Filter by tag |
| `sort` | `?sort=latest` | Sort: `latest`, `oldest`, `likes` |
| `page` | `?page=2` | Page number (default: 1) |
| `limit` | `?limit=5` | Results per page (default: 10, max: 100) |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dakshchoudhary8881-cmd/Internship_PRODESK_IT.git
```

### 2. Navigate to Sprint 10

```bash
cd Internship_PRODESK_IT/Sprint_10
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment File

```bash
cp .env.example .env
```

### 5. Add Your MongoDB URI

Edit `.env` and replace the placeholder:

```env
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/datahub?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 6. Start the Server

Development (with auto-restart):

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs at: `http://localhost:5000`

---

## 🍃 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0 Shared)
3. Create a database user with read/write access
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Click **Connect** → **Connect your application**
6. Copy the connection string and paste into your `.env` file
7. Replace `<password>` with your database user's password
8. Replace `<database-name>` with `datahub` (or your preferred name)

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ Yes | — | MongoDB Atlas connection string |
| `PORT` | No | `5000` | HTTP server port |
| `NODE_ENV` | No | `development` | `development` or `production` |

---

## 📬 Postman Testing Guide

### Step 1: Create a User

```
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "name": "Daksh Choudhary",
  "email": "daksh@example.com",
  "password": "securePassword123",
  "role": "admin"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "name": "Daksh Choudhary",
    "email": "daksh@example.com",
    "role": "admin",
    "avatar": "https://api.dicebear.com/7.x/initials/svg?seed=User",
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2026-07-19T12:00:00.000Z",
    "updatedAt": "2026-07-19T12:00:00.000Z"
  }
}
```

---

### Step 2: Create a Post

```
POST http://localhost:5000/api/posts
Content-Type: application/json

{
  "title": "Getting Started with MongoDB Atlas",
  "content": "MongoDB Atlas is a fully managed cloud database service. In this guide, we explore how to connect a Node.js application to Atlas using Mongoose. We cover connection strings, schemas, and best practices for production deployments.",
  "category": "Technology",
  "tags": ["mongodb", "atlas", "nodejs"],
  "authorId": "PASTE_USER_ID_HERE"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Post created successfully.",
  "data": {
    "title": "Getting Started with MongoDB Atlas",
    "slug": "getting-started-with-mongodb-atlas-lxyz123",
    "content": "MongoDB Atlas is a fully managed...",
    "category": "Technology",
    "tags": ["mongodb", "atlas", "nodejs"],
    "authorId": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Daksh Choudhary",
      "email": "daksh@example.com",
      "avatar": "..."
    },
    "likes": 0,
    "readingTime": 1,
    "isDeleted": false,
    "_id": "64f1b2c3d4e5f6a7b8c9d0e1"
  }
}
```

---

### Step 3: Get All Posts

```
GET http://localhost:5000/api/posts
```

### Step 4: Get All Posts with Filters

```
GET http://localhost:5000/api/posts?category=Technology&sort=latest&page=1&limit=5
```

### Step 5: Search Posts

```
GET http://localhost:5000/api/posts?search=mongodb
```

### Step 6: Get a Single Post

```
GET http://localhost:5000/api/posts/:id
```

### Step 7: Update a Post

```
PUT http://localhost:5000/api/posts/:id
Content-Type: application/json

{
  "title": "Updated: MongoDB Atlas Guide",
  "likes": 10
}
```

### Step 8: Like a Post

```
PATCH http://localhost:5000/api/posts/:id/like
```

### Step 9: Delete a Post (Soft Delete)

```
DELETE http://localhost:5000/api/posts/:id
```

### Step 10: Restore a Deleted Post

```
PUT http://localhost:5000/api/posts/:id/restore
```

### Step 11: Get Recent Posts

```
GET http://localhost:5000/api/posts/recent
```

### Step 12: Get Database Statistics

```
GET http://localhost:5000/api/stats
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Database statistics retrieved successfully.",
  "data": {
    "totalPosts": 5,
    "totalUsers": 2,
    "totalCategories": 3,
    "totalLikes": 42,
    "deletedPosts": 1,
    "averageReadingTime": 2.5
  }
}
```

### Step 13: Get Top Categories

```
GET http://localhost:5000/api/categories/top
```

### Step 14: Get Top Authors

```
GET http://localhost:5000/api/authors/top
```

### Step 15: Get All Users

```
GET http://localhost:5000/api/users
```

### Step 16: Get a Single User (with Posts)

```
GET http://localhost:5000/api/users/:id
```

### Step 17: Update a User

```
PUT http://localhost:5000/api/users/:id
Content-Type: application/json

{
  "name": "Daksh C.",
  "role": "admin"
}
```

### Step 18: Delete a User

```
DELETE http://localhost:5000/api/users/:id
```

### Step 19: Health Check

```
GET http://localhost:5000/api/health
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Health check completed.",
  "data": {
    "server": "Running",
    "database": "Connected",
    "uptime": "120s",
    "timestamp": "2026-07-19T12:00:00.000Z",
    "environment": "development",
    "dbHost": "cluster.mongodb.net",
    "dbName": "datahub"
  }
}
```

---

## 📊 Response Format

### Success

```json
{
  "success": true,
  "message": "...",
  "data": { }
}
```

### Error

```json
{
  "success": false,
  "message": "...",
  "error": "..."
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```

---

## 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request / Validation Error |
| 404 | Resource Not Found |
| 409 | Conflict (Duplicate) |
| 500 | Internal Server Error |
| 503 | Service Unavailable (DB down) |

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the **Root Directory** to `Sprint_10`
4. Add environment variables:
   - `MONGO_URI` — Your MongoDB Atlas connection string
   - `NODE_ENV` — `production`
5. Deploy!

The `vercel.json` is already configured to route all requests through the Express app.

---

## 🏅 Sprint Phases Completed

| Phase | Requirement | Status |
|-------|-------------|--------|
| **P0** | MongoDB Atlas connection, Post/User models, schema validation, env config | ✅ |
| **P1** | Replace mock arrays with Mongoose CRUD, async/await controllers | ✅ |
| **P2** | populate(), search, filtering, sorting, pagination, recent posts | ✅ |
| **P3** | Soft delete, slug, reading time, like counter, stats, top categories, top authors, health check | ✅ |

---

## 🎯 Sprint 09 → Sprint 10 Migration Summary

| Feature | Sprint 09 | Sprint 10 |
|---------|-----------|-----------|
| Storage | In-memory array | MongoDB Atlas |
| Models | Plain JS objects | Mongoose schemas |
| IDs | Auto-increment integers | MongoDB ObjectIds |
| Validation | Manual checks | express-validator |
| Error Handling | Basic try/catch | Centralized middleware |
| Security | None | Helmet + CORS + Compression |
| Logging | Custom console.log | Morgan |
| Search | None | Regex across fields |
| Filtering | None | Query parameter filtering |
| Sorting | None | latest / oldest / likes |
| Pagination | None | Page-based with metadata |
| Soft Delete | None | isDeleted flag |
| Slug | None | Auto-generated from title |
| Reading Time | None | Auto-calculated |
| Like Counter | None | PATCH endpoint |
| Analytics | None | Stats, top categories, top authors |
| Users | None | Full CRUD with roles |
| Health Check | Basic | Server + Database status |

---

## 🔮 Future Improvements

- 🔐 JWT Authentication & Authorization
- 📧 Email verification on signup
- 📸 Image upload with Cloudinary
- 💬 Comment system
- 🔖 Bookmark / Save posts
- 📊 Analytics dashboard
- 🧪 Unit & integration tests (Jest + Supertest)
- 📱 Rate limiting
- 🔄 WebSocket real-time updates
- 📖 Swagger/OpenAPI documentation

---

## 👨‍💻 Author

**Daksh Choudhary**

B.Tech Artificial Intelligence & Machine Learning
Frontend & Full Stack Developer

GitHub: [dakshchoudhary8881-cmd](https://github.com/dakshchoudhary8881-cmd)

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">
  <strong>⭐ Sprint 10 Completed — Production-Grade Blog API with MongoDB Atlas</strong>
</p>
