# 🚀 Sprint 11 — Full Stack MERN Content Management System

A production-inspired **MERN Stack** application that demonstrates complete frontend-backend integration using **React, Node.js, Express, and MongoDB Atlas**. The project allows users to create, view, and delete content while supporting image uploads, responsive UI, loading states, and robust error handling.

---

## 🌐 [Live Demo](https://sprint-11frontend.vercel.app/)

---

## 📖 Overview

Sprint 11 focuses on integrating a React frontend with a Node.js + Express backend and MongoDB Atlas database.

The application provides complete CRUD functionality through REST APIs and demonstrates production-ready full-stack architecture with responsive design and modern development practices.

---

## ✨ Features

### 🔹 Full Stack Integration
- React frontend connected to Express backend
- Axios-based API communication
- MongoDB Atlas cloud database integration
- RESTful API architecture

### 🔹 CRUD Operations
- Create new posts
- View all posts
- Delete existing posts
- Real-time UI updates

### 🔹 Image Upload
- Multipart form submission using FormData
- Multer middleware integration
- Image preview support
- Local storage / Cloudinary support *(depending on your implementation)*

### 🔹 User Experience
- Responsive design
- Loading indicators
- Error handling
- Empty state UI
- Modern SaaS-inspired interface

### 🔹 Backend Features
- Express.js REST API
- MVC Architecture
- MongoDB Atlas
- Mongoose ODM
- Environment variables
- CORS configuration
- File upload middleware
- Proper HTTP status codes

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Axios
- CSS3 / Tailwind CSS *(whichever you used)*
- React Hooks

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- CORS
- dotenv

---

# 📂 Project Structure

```
Sprint_11/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/repository.git

cd Sprint_11
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string
```

If Cloudinary is used:

```env
CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# 📡 API Endpoints

## Get All Posts

```
GET /api/posts
```

---

## Create Post

```
POST /api/posts
```

---

## Delete Post

```
DELETE /api/posts/:id
```

---

# 🚀 Key Learning Outcomes

- MERN Stack Architecture
- React and Express Integration
- REST API Development
- MongoDB Atlas Integration
- Mongoose ODM
- Axios API Communication
- File Upload with Multer
- Responsive UI Development
- Component-Based Architecture
- State Management with React Hooks
- Error Handling
- Production Deployment

---

# 👨‍💻 Author

**Daksh Choudhary**
