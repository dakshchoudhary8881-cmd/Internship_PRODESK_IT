# The Data Hub – RESTful Blog API

A production-quality RESTful Blog API built with Node.js and Express.js. This API provides full CRUD operations for managing blog posts, mock authentication, health checks, and follows clean architectural patterns with separated concerns.

## Features

- Full CRUD operations for blog posts (Create, Read, Update, Delete)
- Mock authentication with token generation
- Custom request logging middleware
- Global 404 and error handling
- Health check endpoints
- Clean MVC-style project architecture
- Proper HTTP status codes and JSON responses
- Input validation and meaningful error messages
- In-memory data storage (no database required)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript (ES6)
- **Storage:** In-memory array
- **Testing:** Postman / Thunder Client compatible

## Installation

```bash
git clone <repository-url>
cd Sprint_9
npm install
```

## Usage

**Start the server:**

```bash
npm start
```

**Start with auto-reload (development):**

```bash
npm run dev
```

The server runs on **http://localhost:5000**

## Available Endpoints

### Health

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| GET    | `/`       | API running confirmation   |
| GET    | `/health` | Health check status        |

### Blogs

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/blogs`      | Get all blogs            |
| GET    | `/blogs/:id`  | Get a single blog by ID  |
| POST   | `/blogs`      | Create a new blog        |
| PUT    | `/blogs/:id`  | Update an existing blog  |
| DELETE | `/blogs/:id`  | Delete a blog            |

### Authentication

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| POST   | `/login`  | Mock login with token    |

## Sample Requests & Responses

### GET /

**Response (200):**
```json
{
  "message": "Data Hub API Running Successfully"
}
```

### GET /health

**Response (200):**
```json
{
  "status": "OK"
}
```

### POST /blogs

**Request Body:**
```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
  "author": "Daksh Choudhary"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blog created successfully.",
  "data": {
    "id": 1,
    "title": "Getting Started with Node.js",
    "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
    "author": "Daksh Choudhary",
    "createdAt": "2026-07-14T11:00:00.000Z"
  }
}
```

### GET /blogs

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Node.js",
      "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
      "author": "Daksh Choudhary",
      "createdAt": "2026-07-14T11:00:00.000Z"
    }
  ]
}
```

### GET /blogs/1

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Getting Started with Node.js",
    "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
    "author": "Daksh Choudhary",
    "createdAt": "2026-07-14T11:00:00.000Z"
  }
}
```

### PUT /blogs/1

**Request Body:**
```json
{
  "title": "Updated: Getting Started with Node.js"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blog updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated: Getting Started with Node.js",
    "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
    "author": "Daksh Choudhary",
    "createdAt": "2026-07-14T11:00:00.000Z"
  }
}
```

### DELETE /blogs/1

**Response (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully.",
  "data": {
    "id": 1,
    "title": "Updated: Getting Started with Node.js",
    "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
    "author": "Daksh Choudhary",
    "createdAt": "2026-07-14T11:00:00.000Z"
  }
}
```

### POST /login

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "mock-jwt-token-aB3dEfGhIjKlMnOp"
}
```

### Error Responses

**Missing fields (400):**
```json
{
  "success": false,
  "message": "All fields are required: title, content, author."
}
```

**Blog not found (404):**
```json
{
  "success": false,
  "message": "Blog with ID 99 not found."
}
```

**Invalid ID (400):**
```json
{
  "success": false,
  "message": "Invalid blog ID. ID must be a number."
}
```

**Route not found (404):**
```json
{
  "success": false,
  "message": "Route GET /unknown not found."
}
```

## Folder Structure

```
Sprint_9/
├── server.js
├── package.json
├── .gitignore
├── README.md
├── routes/
│   ├── blogRoutes.js
│   ├── authRoutes.js
│   └── healthRoutes.js
├── controllers/
│   ├── blogController.js
│   ├── authController.js
│   └── healthController.js
├── middleware/
│   ├── requestLogger.js
│   ├── notFoundHandler.js
│   └── errorHandler.js
├── models/
│   └── blogModel.js
└── utils/
    └── tokenGenerator.js
```

## Middleware

**Request Logger** – Logs every incoming request with the HTTP method, URL, and timestamp to the console.

Example output:
```
[2026-07-14T11:00:00.000Z] GET /blogs
[2026-07-14T11:00:01.000Z] POST /login
[2026-07-14T11:00:02.000Z] DELETE /blogs/3
```

## HTTP Status Codes Used

| Code | Meaning               | Usage                          |
| ---- | --------------------- | ------------------------------ |
| 200  | OK                    | Successful GET, PUT, DELETE    |
| 201  | Created               | Successful POST                |
| 400  | Bad Request           | Invalid ID or missing fields   |
| 404  | Not Found             | Blog or route not found        |
| 500  | Internal Server Error | Unexpected server errors       |

## Learning Outcomes

- Setting up a Node.js project from scratch
- Building RESTful APIs with Express.js
- Implementing CRUD operations with in-memory storage
- Using Express Router for modular routing
- Creating custom middleware functions
- Handling errors globally with middleware
- Structuring a project using MVC-style architecture
- Working with HTTP status codes and JSON responses
- Input validation and error handling best practices
- Testing APIs with Postman or Thunder Client
