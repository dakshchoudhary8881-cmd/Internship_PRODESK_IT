<p align="center">
  <img src="../logo.png" width="240"/>
</p>

<div align="center">

# 🎯 The Data Hub RESTful Blog API

### Production-Ready REST API built with **Node.js** & **Express.js**

<p align="center">
  Backend CRUD API implementing clean architecture, modular routing, middleware, authentication, and enterprise backend development practices.
</p>

<p align="center">

<a href="https://YOUR-LIVE-API.vercel.app">
  <img src="https://img.shields.io/badge/🚀_Live_API-2EA44F?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<a href="https://github.com/dakshchoudhary8881-cmd/Internship_PRODESK_IT/tree/main/Sprint_9">
  <img src="https://img.shields.io/badge/📂_GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</p>

<p align="center">

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/REST_API-009688?style=flat-square"/>
<img src="https://img.shields.io/badge/CRUD-2563EB?style=flat-square"/>
<img src="https://img.shields.io/badge/Middleware-8E44AD?style=flat-square"/>
<img src="https://img.shields.io/badge/Status-Completed-success?style=flat-square"/>

</p>

<p align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,npm,git,github,vscode,postman,vercel" />
</p>

</div>

---

> **🚀 Internship Sprint 09 — Prodesk IT**  
> **👨‍💻 Track B: Full Stack Developers**

---

## 🚀 Live Demo

<div align="center">

### 🌐 Live API

🔗 **[Open Live API](https://internship-prodesk-it-ukpa-gvsv6whoi.vercel.app/)**

---

### 📡 Example Endpoint

🔗 **[`GET /blogs`](https://internship-prodesk-it-ukpa-gvsv6whoi.vercel.app/blogs)**


</div>

---

## ✨ Features

- 📄 Complete CRUD operations
- ⚡ RESTful API architecture
- 🧩 Modular MVC-inspired folder structure
- 📝 Custom request logging middleware
- 🔐 Mock JWT authentication
- 🚨 Global error handling
- ❌ Custom 404 handler
- ❤️ Health check endpoints
- 📊 Proper HTTP status codes
- 🧪 Thunder Client / Postman compatible

---

# 🏗️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| JavaScript (ES6) | Programming Language |
| Express Router | Route Management |
| Middleware | Request Processing |
| Thunder Client | API Testing |

---

# 📁 Folder Structure

```text
Sprint_9
│
├── controllers
│   ├── authController.js
│   ├── blogController.js
│   └── healthController.js
│
├── middleware
│   ├── requestLogger.js
│   ├── errorHandler.js
│   └── notFoundHandler.js
│
├── models
│   └── blogModel.js
│
├── routes
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   └── healthRoutes.js
│
├── utils
│   └── tokenGenerator.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# 🔄 Request Flow

```text
                Client
                   │
                   ▼
          Incoming Request
                   │
                   ▼
        Request Logger Middleware
                   │
                   ▼
             Express Router
                   │
                   ▼
             Route Handler
                   │
                   ▼
             Controller Logic
                   │
                   ▼
         In-Memory Blog Storage
                   │
                   ▼
          JSON Response Sent
```

---

# 🌐 API Endpoints

## Health

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API Status |
| GET | `/health` | Health Check |

---

## Blogs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/blogs` | Retrieve all blogs |
| GET | `/blogs/:id` | Retrieve blog by ID |
| POST | `/blogs` | Create a new blog |
| PUT | `/blogs/:id` | Update blog |
| DELETE | `/blogs/:id` | Delete blog |

---

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/login` |

Returns a mock JWT token.

---

# 📬 Sample Request

### POST /blogs

```json
{
  "title": "My First Blog",
  "content": "Learning Express.js",
  "author": "Daksh"
}
```

---

# ✅ Sample Response

```json
{
  "success": true,
  "message": "Blog created successfully.",
  "data": {
    "id": 1,
    "title": "My First Blog",
    "content": "Learning Express.js",
    "author": "Daksh",
    "createdAt": "2026-07-14T11:00:00.000Z"
  }
}
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/dakshchoudhary8881-cmd/Internship_PRODESK_IT.git
```

Navigate into Sprint 9

```bash
cd Internship_PRODESK_IT/Sprint_9
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

or

```bash
npm start
```

Server runs at

```text
http://localhost:5000
```

---

# 🧪 API Testing

The API can be tested using:

- Thunder Client
- Postman
- cURL

---

# 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# 🎯 Learning Outcomes

- Express.js fundamentals
- REST API development
- CRUD implementation
- Modular backend architecture
- Express Router
- Custom middleware
- Error handling
- Mock authentication
- API testing
- Professional backend project organization

---

# 👨‍💻 Author

**Daksh Choudhary**

B.Tech Artificial Intelligence & Machine Learning  
Frontend & Full Stack Developer

GitHub: **dakshchoudhary8881-cmd**

---

## ⭐ Sprint 09 Completed

Successfully developed a modular RESTful Blog API following industry-standard backend architecture using **Node.js** and **Express.js** as part of the **Prodesk IT Internship**.
