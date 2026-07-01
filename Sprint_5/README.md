<p align="center">
  <img src="../logo.png" alt="Prodesk IT Logo" width="200" />
</p>

<h1 align="center">📌 TaskFlow</h1>
<p align="center"><strong>Trello-style Kanban Task Management Board</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/dnd--kit-Drag_%26_Drop-8B5CF6?style=flat-square" />
  <img src="https://img.shields.io/badge/Sprint_05-React_Architecture-22c55e?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" />
</p>

---

## 🌟 Overview

TaskFlow is a production-grade Kanban board built entirely with **React.js** and bootstrapped with **Vite**. It implements state-driven UI architecture with component composition, prop drilling, and persistent state management — no direct DOM manipulation.

---

## ✨ Features

### Phase 1 — P0 (Base MVP)
| | Feature |
|---|---|
| 📋 | **3-Column Layout** — To Do, In Progress, Done |
| ➕ | **Add Task** — Input field injects tasks into "To Do" state array |
| 🗑️ | **Delete Task** — Universal delete action on every card |
| ➡️ | **Move Task** — Action buttons mutate column state |

### Phase 2 — P1 (Priority 1)
| | Feature |
|---|---|
| ✏️ | **Inline Editing** — Click task text to toggle editable input |
| 🎨 | **Priority System** — High / Medium / Low with conditional CSS |
| 💾 | **State Persistence** — `localStorage` hook survives hard refresh |

### Phase 3 — P2 (Stretch Goals)
| | Feature |
|---|---|
| 🖱️ | **Drag-and-Drop** — `@dnd-kit` replaces move buttons with physical dragging |
| 🔍 | **Global Search** — Real-time filtering across all columns |

---

## 🏗️ Architecture

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Root state + DnD context
├── App.css
├── index.css                # Design tokens & globals
├── hooks/
│   └── useLocalStorage.js   # Custom persistence hook
├── components/
│   ├── Header.jsx / .css    # Brand, search, stats
│   ├── TaskForm.jsx / .css  # Input + priority + submit
│   ├── Board.jsx / .css     # 3-column layout + filter
│   ├── Column.jsx / .css    # Droppable zone + sortable context
│   └── TaskCard.jsx / .css  # Draggable card + inline edit
└── utils/
    └── constants.js         # Column/priority config
```

### State Flow

```
App (useLocalStorage)
 ├── addTask()   → injects into tasks.todo[]
 ├── deleteTask() → filters from all columns
 ├── moveTask()   → splices between column arrays
 ├── editTask()   → maps & replaces text
 └── DndContext   → onDragOver cross-column moves
      └── Board → Column → TaskCard (props ↓)
```

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/dnd--kit-DnD-8B5CF6?style=for-the-badge" alt="dnd-kit" />
  <img src="https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Google_Fonts-Inter-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white" alt="Google Fonts" />
</p>

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

---

## 🎨 Design

- **Dark glassmorphism** theme with animated gradient background mesh
- **Priority-coded** accent lines on cards (🔴 High, 🟡 Medium, 🟢 Low)
- **Micro-animations** on card enter, hover, and drag
- **Fully responsive** — desktop 3-col, tablet 2-col, mobile stack
- **Custom scrollbar** & focus-visible accessibility styles

---

<p align="center"><sub>Sprint 05 · React Architecture · Prodesk IT Internship 🚀</sub></p>
