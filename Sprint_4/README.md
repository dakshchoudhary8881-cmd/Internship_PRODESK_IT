<p align="center">
  <img src="../logo.png" alt="CoverCraft Logo" width="200" />
</p>

<h1 align="center">✍️ CoverCraft</h1>
<p align="center"><strong>AI-Powered Cover Letter Generator</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Gemini_2.0_Flash-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Sprint_04-AI_Engineering-8B5CF6?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" />
</p>

---

## 🌐 Live Demo

> **Try it now → [https://your-username.github.io/covercraft/](https://your-username.github.io/covercraft/)**
>
> *(Replace with your GitHub Pages URL after deploying)*

![CoverCraft Demo](./screenshots/demo.gif)

---

## 🌟 Overview

CoverCraft is a SaaS-style utility that generates tailored, professional cover letters in seconds. Enter your details, optionally upload your résumé as a PDF, and the **Google Gemini 2.0 Flash API** crafts a personalized letter — with a smart template engine fallback when offline or API-key-free.

Built entirely in **Vanilla HTML, CSS, and JavaScript** — zero frameworks, zero build tools, zero dependencies.

---

## ✨ Features

| | Feature |
|---|---|
| 🤖 | Gemini 2.0 Flash API with dynamic prompt engineering |
| 🎨 | Three tone modes — Professional, Conversational, Confident |
| 📄 | PDF résumé upload with client-side text extraction via **PDF.js** |
| 🔄 | Template engine fallback when API is unavailable |
| 📋 | Copy to Clipboard & Download as `.txt` |
| ⏳ | Skeleton loading UI during API response (2–5s) |
| 🔒 | API key in `localStorage` only — never hardcoded or sent to a server |
| 📱 | Fully responsive glassmorphism design |

---

## 🔄 How It Works

```
  Fill the form  +  Upload résumé (optional)  +  Gemini API key (optional)
                                │
                ┌───────────────┴────────────────┐
                │        API key present?        │
                └───────────────┬────────────────┘
                       Yes ─────┤───── No
                       │                │
            ┌──────────▼──────┐  ┌──────▼──────────────┐
            │  Gemini 2.0     │  │  Template engine     │
            │  Flash API      │  │  fallback            │
            └──────────┬──────┘  └──────┬───────────────┘
                       └────────┬────────┘
                                │
                    ┌───────────▼──────────┐
                    │  Cover letter ready  │
                    │  📋 Copy  ⬇ Download │
                    └──────────────────────┘
```

---

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/your-username/covercraft.git && cd covercraft

# 2. Serve locally — PDF.js requires HTTP, not file://
python3 -m http.server 3000

# 3. Open in your browser
open http://localhost:3000
```

> 🔑 **Get a free API key** at [aistudio.google.com/apikey](https://aistudio.google.com/apikey), then paste it into the **⚙️ Settings** modal inside the app. No `.env` file needed.

---

## 📂 Project Structure

```
Sprint_4/
├── index.html            # App entry point
├── css/
│   └── style.css         # Full design system & animations
├── js/
│   ├── app.js            # State management & event binding
│   ├── generator.js      # Gemini API + template fallback
│   └── pdf-parser.js     # Client-side PDF text extraction
├── .env.example          # API key reference (gitignored, never committed)
└── README.md
```

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/PDF.js-FF0000?style=for-the-badge&logo=mozilla&logoColor=white" alt="PDF.js" />
  <img src="https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white" alt="Lucide Icons" />
  <img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white" alt="Google Fonts" />
</p>

---

## 🔒 Security

| Concern | How it's handled |
|---|---|
| API key storage | `localStorage` only — never in source code |
| Data transport | Browser → Google API directly over HTTPS |
| File privacy | PDFs parsed client-side via PDF.js, never uploaded |
| Source code | Zero hardcoded secrets; `.env` covered by `.gitignore` |

---

---

> ⭐ **Found this useful? Star the repo** — it helps others discover it.

<p align="center"><sub>Sprint 04 · AI Engineering · Prodesk IT Internship 🚀</sub></p>
