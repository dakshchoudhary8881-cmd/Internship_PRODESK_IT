# Aurora Store — Production-Quality React E-Commerce SPA (Sprint 6)

A production-ready, highly responsive, modern React Single Page Application (SPA) engineered with **React 19**, **Vite**, **React Router DOM**, **Context API**, and curated **CSS Variables / Vanilla CSS**.

---

## 🌟 Key Features & Architecture

### 1. **True Single Page Application (SPA)**
- Built with `react-router-dom` using declarative client-side routing (`BrowserRouter`).
- Navigation never triggers browser reloads (`<Link>`, `<NavLink>`, and `useNavigate()` implemented throughout).
- Automatic scroll-to-top handler on route changes.

### 2. **Global State Management (No Redux)**
- **CartContext (`CartContext.jsx`)**: Manages cart contents, quantities, wishlist items, dark theme toggle, and floating toast notifications. Automatically syncs with `localStorage`.
- **AuthContext (`AuthContext.jsx`)**: Manages guest authentication state (`isLoggedIn`, `user`) with persistent sessions across refreshes.

### 3. **Live API Integration**
- Connected directly to [DummyJSON API](https://dummyjson.com).
- Features live pagination, multi-field product search, dynamic category filtering, and real-time sorting (by Price Low/High, Rating, and Discount).

### 4. **Premium UI/UX Design System**
- Custom curated HSL color tokens with glassmorphism header, soft drop shadows, and responsive grid layouts.
- **Dark Mode Support**: One-click theme toggle switching seamlessly between light and dark themes.
- **Interactive Micro-Animations**: Cart badge pulse on add, product card hover zooms, wishlist heart toggle, and order confirmation confetti celebration.
- **Skeleton Loaders & Spinners**: Smooth feedback states while fetching asynchronous catalog data.

### 5. **Robust Route Protection & Security**
- **ProtectedRoute (`ProtectedRoute.jsx`)**: Higher-order wrapper ensuring unauthenticated users attempting to access `/checkout` are cleanly redirected to `/login` with post-auth redirection state preserved.

---

## 📂 Exact Folder Structure

```
Sprint_6/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── CartBadge.jsx
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/
│   │   └── useFetch.js
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Shop.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Instructions

1. **Navigate to the Sprint 6 workspace directory:**
   ```bash
   cd Sprint_6
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 🎯 Sprint Requirements Checklist Verified

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **React 19 + Vite** | Scaffolding created via `create-vite@latest` | ✅ |
| **Routing (React Router DOM)** | `/`, `/shop`, `/product/:id`, `/cart`, `/login`, `/checkout`, `*` | ✅ |
| **No Page Reloads** | Zero browser reloads across navigation flows | ✅ |
| **Live API Data** | Dynamic fetching via `https://dummyjson.com` | ✅ |
| **Global Cart Context** | Add, remove, quantity adjustments, duplicate prevention | ✅ |
| **Cart Persistence** | Seamless `localStorage` restoration on refresh | ✅ |
| **Guest Auth Context** | Guest sign-in status persisted locally | ✅ |
| **Protected Route** | Restricts `/checkout` to authenticated guests | ✅ |
| **Premium Responsive UI** | Custom HSL design tokens, soft shadows, glassmorphism | ✅ |
| **Bonus Features** | Search, Category filter, Sorting, Wishlist, Dark Mode, Toasts | ✅ |
