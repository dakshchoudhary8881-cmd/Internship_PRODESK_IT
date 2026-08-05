# 🌊 Ripple — Real-Time Chat

A production-quality real-time chat application built with **React 19**, **Socket.IO**, and **Express.js**. Features room-based messaging, live typing indicators, online user tracking, and a clean light-themed UI.

---

## 📋 Overview

Ripple enables real-time communication using WebSockets. Users join one of two rooms (**General** or **Developers**), exchange instant messages, and see live typing indicators — all without page refreshes.

---

## ✨ Features

- ⚡ Real-time bidirectional messaging via Socket.IO
- 🏠 Room-based chat with complete message isolation
- ✍️ Live typing indicators with 2-second debounce
- 🔌 Automatic reconnection on connection loss
- 🚫 Input validation (empty usernames, rooms, messages)
- 📜 Auto-scroll to newest messages
- ⌨️ Enter key sends messages
- 🟢 Live connection status indicator
- 👥 Online user count per room
- 🔔 Toast notifications on join/leave
- 📱 Fully responsive (desktop, tablet, mobile)

---

## 📁 Folder Structure

```
Sprint_12/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── socket/
│   │   └── socketHandler.js
│   └── routes/
│       └── health.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── socket.js
│       ├── index.css
│       └── components/
│           ├── JoinScreen.jsx
│           ├── ChatRoom.jsx
│           ├── RoomSelector.jsx
│           ├── MessageList.jsx
│           ├── MessageInput.jsx
│           └── TypingIndicator.jsx
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- Node.js 18+
- npm

### Backend
```bash
cd Sprint_12/backend
npm install
```

### Frontend
```bash
cd Sprint_12/frontend
npm install
```

---

## 🔐 Environment Variables

### `backend/.env`

| Variable     | Default                 | Description          |
|-------------|-------------------------|----------------------|
| `PORT`      | `5000`                  | Server port          |
| `CLIENT_URL`| `http://localhost:5173` | Frontend CORS origin |
| `NODE_ENV`  | `development`           | Environment          |

---

## 🏃 Running

### Backend
```bash
cd backend
npm run dev
```

### Frontend (separate terminal)
```bash
cd frontend
npm run dev
```

---

## 📡 Socket Events

### Client → Server

| Event          | Payload                             |
|----------------|-------------------------------------|
| `join_room`    | `{ username, room }`                |
| `send_message` | `{ username, room, message, time }` |
| `typing`       | `{ username, room }`                |

### Server → Client

| Event            | Payload                                  |
|------------------|------------------------------------------|
| `receive_message`| `{ username, room, message, time, ... }` |
| `user_typing`    | `{ username, room }`                     |
| `room_users`     | `{ room, users, count }`                 |

---

## 🖼️ Screenshots

> Add screenshots here

---

## 🛠️ Tech Stack

| Layer    | Technology                       |
|----------|----------------------------------|
| Frontend | React 19, Vite, Socket.IO Client |
| Backend  | Node.js, Express, Socket.IO      |
| Styling  | Vanilla CSS                      |
| Dev      | Nodemon, Vite HMR                |

---

## 🧪 Testing

1. Start both servers
2. Open two browser tabs at `http://localhost:5173`
3. Join the same room with different usernames
4. Send messages and verify real-time delivery
5. Test room isolation by joining different rooms
6. Stop backend to verify reconnection behavior

---

## 📝 License

ISC
