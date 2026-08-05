# 🚀 Sprint 12 – Real-Time WebSocket Chat

A modern real-time chat application built using **React, Node.js, Express, and Socket.IO**. This project demonstrates bidirectional communication with WebSockets, live typing indicators, and room-based messaging.

---

# 📌 Project Overview

Traditional web applications rely on HTTP requests, where the client must repeatedly ask the server for updates. This project replaces that workflow with **persistent WebSocket connections**, allowing the server and clients to exchange data instantly without refreshing the page.

Users can join a chat room, communicate in real time, and see typing indicators as messages are exchanged seamlessly.

---

# ✨ Features

## 🔌 Real-Time Communication

* Persistent WebSocket connection
* Instant message delivery
* Bidirectional client-server communication

## 👤 User Sessions

* Join with a custom username
* Unique session per connected user

## 💬 Live Messaging

* Send and receive messages instantly
* Timestamp for every message
* Message bubbles with sender information

## ⌨️ Typing Indicator

* Live typing detection
* Real-time typing status
* Automatically disappears after inactivity

## 🏠 Chat Rooms

* Room-based messaging
* Join different channels
* Messages stay isolated within each room

## 🎨 Modern UI

* Responsive layout
* Dark theme interface
* Clean chat bubbles
* Smooth user experience

---

# 🛠️ Tech Stack

### Frontend

* ⚛️ React 19
* ⚡ Vite
* 🔌 Socket.IO Client
* 🎨 CSS

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🔌 Socket.IO
* 🌐 CORS

---

# 📂 Project Structure

```text
Sprint_12/
│
├── backend/
│   ├── server.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── routes/
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── socket.js
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd Sprint_12
```

---

## 2️⃣ Install Backend

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend

```bash
cd ../frontend
npm install
```

---

# ▶️ Run the Application

## Start Backend

```bash
cd backend
npm run dev
```

Server runs on

```text
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on

```text
http://localhost:5174
```

---

# 📡 Socket Events

## Client ➜ Server

| Event          | Description                       |
| -------------- | --------------------------------- |
| `join_room`    | Join a selected chat room         |
| `send_message` | Send a new chat message           |
| `typing`       | Notify server that user is typing |

---

## Server ➜ Client

| Event             | Description                               |
| ----------------- | ----------------------------------------- |
| `receive_message` | Broadcast incoming message                |
| `user_typing`     | Notify room members about typing activity |

---

# 🏠 Available Rooms

* 🌍 General
* 💻 Developers

Each room maintains its own isolated conversation and typing events.

---

# 🧪 How to Test

1. Open the application in two or more browser tabs.
2. Enter different usernames.
3. Join the same room to exchange messages.
4. Join different rooms to verify message isolation.
5. Start typing to observe the live typing indicator.
6. Send messages and confirm instant delivery without refreshing.

---

# 🎯 Sprint Objectives Covered

* ✅ WebSocket Server Configuration
* ✅ Socket.IO Client Integration
* ✅ Persistent Client Connection
* ✅ Bidirectional Communication
* ✅ Real-Time Message Broadcasting
* ✅ Username-Based Sessions
* ✅ Typing Indicator
* ✅ Room-Based Architecture
* ✅ Room Isolation
* ✅ Responsive User Interface

---

# 📈 Future Improvements

* 🔐 User authentication
* 🟢 Online user list
* 📩 Private messaging
* 😊 Emoji support
* 📎 File sharing
* 🔔 Push notifications
* 💾 Chat history with MongoDB
* 🌙 Theme switcher

---

# 👨‍💻 Author

**Daksh Choudhary**

B.Tech (Artificial Intelligence & Machine Learning)

Passionate about Full-Stack Development, AI, and Building Scalable Web Applications.
