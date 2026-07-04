# Food Truck Menu - Digital Menu Management System

A production-quality, enterprise-grade React application for food truck staff to digitally manage, search, and filter menu items. Built from scratch using **React Fundamentals** (`useState`, `useEffect`, Prop Drilling) and custom monochromatic CSS without any external libraries or UI frameworks.

---

## 🌟 Key Features

- **📊 Dashboard Statistics**: Real-time calculation of Total Items, Total Categories, and Average Price.
- **🔍 Instant Case-Insensitive Search**: Filter menu items instantly by name or category.
- **🏷️ Category Filtering**: One-click category filter buttons (`All`, `Fast Food`, `Drinks`, `Desserts`, `Snacks`).
- **✨ Skeleton Loading Experience**: Professional animated skeleton placeholders simulating initial data fetch (`1500ms`).
- **📝 Enterprise Add Menu Form**:
  - **Validation**: Enforces required fields, positive numeric prices, and highlights errors with red borders.
  - **Duplicate Detection**: Prevents adding duplicate items (e.g., `"Burger already exists."`).
  - **Enhanced Form UX**: Auto-clears inputs, returns DOM focus to the first field, and displays a success toast message.
- **🛡️ Advanced XSS Sanitization**: Strips HTML tags, trims whitespace, and collapses multiple spaces before storing data in state.
- **🗑️ Clear Menu with Confirmation**: Interactive confirmation modal (`"Are you sure?"`) demonstrating clean empty-state handling.
- **🎨 Monochromatic Enterprise UI**: Sleek Black, White, and Gray dashboard design with soft shadows, rounded corners, and smooth hover transitions.
- **♿ 100% Accessible**: Full keyboard navigation support, visible `focus-visible` outlines, semantic HTML, and ARIA labels across all interactive elements.

---

## 🛠️ Technology Stack

- **Core**: React 18+ (JavaScript, no TypeScript), Vite
- **State Management**: React `useState` & `useEffect` (Pure Prop Drilling, zero external state libraries)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Zero Dependencies**: No Redux, Context API, React Router, Tailwind CSS, Bootstrap, or Material UI.

---

## 🚀 Getting Started

The application is pre-configured to run immediately without requiring any modifications.

### 1. Installation

Navigate to the project directory and install dependencies:

```bash
cd "client delivery project 1"
npm install
```

### 2. Run Development Server

Start the Vite local dev server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` (or the URL displayed in your terminal).

### 3. Build for Production

To create an optimized production bundle:

```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Dashboard header with stats & clear menu confirmation
│   ├── SearchBar.jsx      # Instant search input & category filter buttons
│   ├── Menu.jsx           # Responsive menu grid container
│   ├── MenuCard.jsx       # Individual food card with formatted price & emoji
│   ├── AddMenuForm.jsx    # Enterprise form with validation, XSS protection & duplicate check
│   ├── Loader.jsx         # Skeleton card grid loading animation
│   └── EmptyState.jsx     # Clean SVG illustration when no items match
├── data/
│   └── menuData.js        # Initial realistic dataset (10 items across 4 categories)
├── utils/
│   └── sanitizeInput.js   # Advanced HTML stripping & whitespace trimming utility
├── App.jsx                # Core application logic, state management & filtering
├── App.css                # Dashboard layout, responsive rules & animations
├── index.css              # Monochromatic theme tokens, reset & accessibility outlines
└── main.jsx               # React DOM mounting entry point
```

---

## 📈 Analytics Simulation

Whenever a new menu item is successfully validated and added, the application logs the following event to the browser console:
`[Analytics] User interacted with React Components`
