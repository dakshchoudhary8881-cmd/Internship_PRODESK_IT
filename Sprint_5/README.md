<p align="center">
  <img src="../logo.png" alt="TaskFlow Logo" width="200" />
</p>

<h1 align="center">🗂️ TaskFlow</h1>
<p align="center"><strong>React-Powered Kanban Task Management Board</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/@dnd--kit-Drag_&_Drop-FF4500?style=flat-square" />
  <img src="https://img.shields.io/badge/Sprint_05-React_Engineering-8B5CF6?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" />
</p>

---

## 🌐 Live Demo

> **Try it now → [TaskFlow](https://internship-prodesk-it-k7fs.vercel.app/)**

---

## 🌟 Overview

TaskFlow is a Trello-style Kanban board that marks the sprint's transition from **Vanilla JavaScript** to **React 19**. Tasks move across **To Do**, **In Progress**, and **Done** columns via native drag-and-drop, with priorities, inline editing, and search — all persisted locally so your board survives a refresh.

Built entirely around **component-based architecture** and **state-driven UI** — no backend, no build complexity beyond Vite.

---

## ✨ Features

| | Feature |
|---|---|
| 🗂️ | Three-column board — To Do, In Progress, Done |
| 🖱️ | Native drag-and-drop between columns via `@dnd-kit` |
| ✏️ | Inline task editing |
| 🚦 | Priority levels — High, Medium, Low with color tags |
| 🔍 | Global task search across all columns |
| 💾 | Local Storage persistence — board state survives reloads |
| 🎞️ | Smooth transitions & drag animations |
| 📱 | Fully responsive, mobile-first layout |

---

## 🔄 How It Works

```
   Add / Edit Task
          │
          ▼
  ┌───────────────┐
  │  React State   │  useState + useEffect
  │  (App.jsx)     │
  └───────┬───────┘
          │
   ┌──────┴───────┐
   │  Board.jsx    │  Drag context via @dnd-kit
   └──────┬───────┘
          │
 ┌────────┼────────┐
 ▼        ▼         ▼
To Do   In Progress  Done
 │        │         │
 └────────┼─────────┘
          ▼
  ┌────────────────┐
  │  Local Storage  │  Auto-synced on every change
  └────────────────┘
```

---

## 📂 Project Structure

```
Sprint_5/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header/          # Branding + search bar
│   │   ├── TaskForm/        # New task creation
│   │   ├── Board/           # Drag context + column layout
│   │   ├── Column/          # Single status group
│   │   └── TaskCard/        # Individual task UI
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── taskHelpers.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/@dnd--kit-FF4500?style=for-the-badge" alt="dnd-kit" />
  <img src="https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white" alt="React Icons" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

---

## ⚙️ Running Locally

```bash
git clone https://github.com/dakshchoudhary8881-cmd/Internship_PRODESK_IT.git
cd Internship_PRODESK_IT/Sprint_5
npm install
npm run dev        # http://localhost:5173
```

---

## 📚 Key React Concepts

| Concern | How it's handled |
|---|---|
| State management | `useState` at `App.jsx` level, lifted and passed via props |
| Persistence | `useEffect` syncs board state to Local Storage on every change |
| Drag & drop | `@dnd-kit` sensors + `DndContext` wrapping the `Board` |
| Reusability | `TaskCard`, `Column`, and `TaskForm` are fully prop-driven and stateless |
| Communication | Callback props for add/edit/delete/move actions |

---

> ⭐ **Found this useful? Star the repo** — it helps others discover it.

<p align="center"><sub>Sprint 05 · React Engineering · Prodesk IT Internship 🚀</sub></p>
