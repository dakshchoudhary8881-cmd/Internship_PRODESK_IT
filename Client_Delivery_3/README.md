<p align="center">
  <img src="../logo.png" alt="Game Waitlist API" width="240"/>
</p>

<h1 align="center">
🎮 Game Waitlist CRUD API
</h1>

<h3 align="center">
Production-Inspired RESTful Backend API
</h3>

<p align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,git,github,vercel,vscode,postman"/>
</p>

<p align="center">
<img src="https://img.shields.io/badge/API-REST-009688?style=flat-square"/>
<img src="https://img.shields.io/badge/Architecture-Modular-blue?style=flat-square"/>
<img src="https://img.shields.io/badge/Status-Production_Ready-success?style=flat-square"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square"/>
</p>

---

## 🔗 Live Demo 

🌐 **Live API**

https://clientproject3.vercel.app/

---

# 📖 Overview

The **Game Waitlist CRUD API** is a production-inspired RESTful backend application designed to digitize the manual waitlist process used by gaming arcades.

Instead of managing player queues through paper registers or spreadsheets, this API provides a structured backend service capable of creating, retrieving, updating, and deleting waitlist entries while following REST principles and enterprise development practices.

---

# ✨ Features

- ✅ Complete CRUD Operations
- ✅ RESTful API Architecture
- ✅ Express Router
- ✅ Route Parameters
- ✅ Input Validation
- ✅ XSS Sanitization
- ✅ Analytics Simulation
- ✅ Proper HTTP Status Codes
- ✅ Centralized Error Handling
- ✅ Modular Folder Structure
- ✅ UUID-based IDs
- ✅ Environment Variables
- ✅ Helmet Security
- ✅ CORS Enabled
- ✅ Morgan Request Logger
- ✅ Thunder Client Tested

---

# 🛠 Tech Stack

## 💻 Programming Languages

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="45"/>
</p>

---

## ⚙️ Backend

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="45"/>
</p>

---

## 🧰 Tools

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="45"/>
</p>

---

# 📂 Project Structure

```text
Game-Waitlist-CRUD-API
│
├── controllers/
├── routes/
├── middleware/
├── utils/
├── data/
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# 🚀 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/waitlist` | Get all players |
| GET | `/api/waitlist/:id` | Get player by ID |
| POST | `/api/waitlist` | Add new player |
| PUT | `/api/waitlist/:id` | Update player |
| DELETE | `/api/waitlist/:id` | Delete player |

---

# 📋 Example Request

```json
{
  "name":"Daksh",
  "game":"Bowling",
  "players":4,
  "phone":"9876543210",
  "status":"waiting"
}
```

---

# 📦 Example Response

```json
{
    "success": true,
    "message": "Player added successfully",
    "data": {
        ...
    }
}
```

---

# 🛡 Validation

- Required Fields
- Phone Validation
- Player Count Validation
- Status Validation
- UUID Validation
- XSS Sanitization

---

# 📊 API Testing

The API has been tested using **Thunder Client**.

### Tested Scenarios

- GET All
- GET by ID
- POST
- PUT
- DELETE
- Invalid ID
- Validation Errors
- Empty State
- Route Parameters
- XSS Protection
- Analytics Logging

---

# ⚙️ Installation

```bash
git clone https://github.com/yourusername/Game-Waitlist-CRUD-API.git

cd Game-Waitlist-CRUD-API

npm install

npm run dev
```

---

# 🌍 Base URL

```
http://localhost:5000/api/waitlist
```

or

```
https://your-project.vercel.app/api/waitlist
```

---

# 🚀 Future Improvements

- MongoDB Integration
- JWT Authentication
- Pagination
- Search & Filtering
- Rate Limiting
- Swagger Documentation
- Docker Support

---

# 👨‍💻 Author

**Daksh Choudhary**

B.Tech (Artificial Intelligence & Machine Learning)

Frontend & Backend Developer

---

⭐ If you found this project useful, consider giving it a star!
