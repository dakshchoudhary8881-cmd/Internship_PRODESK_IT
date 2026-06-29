<p align="center">
  <img src="../logo.png" alt="Prodesk IT Logo" width="120" />
</p>

# ✨ CoverCraft — AI Cover Letter Generator

> **Sprint 04 Deliverable** · AI Engineering & LLM Integration  
> Built by **Daksh Choudhary** for Prodesk IT Internship

---

## 🚀 Overview

CoverCraft is a SaaS-style utility that generates professional, personalized cover letters using AI. It ingests user parameters (name, role, company, skills) and optionally a PDF resume, then uses the **Google Gemini API** to dynamically craft tailored cover letters.

## ✅ Features Implemented

### Phase 1 — Base MVP (P0)
- 📝 Robust form capturing: Name, Job Role, Target Company, Key Skills
- 🔄 Real-time state management via `onChange` event binding
- 📄 Template-based cover letter generation with string interpolation
- 📋 **Copy to Clipboard** utility with visual feedback
- 📥 **Download as TXT** file export

### Phase 2 — AI Integration (P1)
- 🤖 **Google Gemini 2.0 Flash API** integration with programmatic prompt engineering
- 🎨 Three tone options: Professional, Conversational, Confident
- 🔒 **Secure API key management** — keys stored ONLY in browser `localStorage`
- ⏳ Animated loading/skeleton UI for API latency (2-5s)
- 🔄 Automatic template fallback on API failure

### Phase 3 — Resume Upload (P2)
- 📎 **PDF drag-and-drop upload** with file validation
- 📖 Client-side text extraction using **Mozilla PDF.js**
- 🎯 Dynamic AI personalization using extracted resume content
- 🖋️ Markdown-to-HTML output rendering

---

## 🔒 Security Architecture

> **Critical: No API key is ever exposed in source code or committed to GitHub.**

| Layer | Implementation |
|-------|---------------|
| **Storage** | API key stored exclusively in the user's browser `localStorage` |
| **Transport** | Direct browser → Google API calls (HTTPS) — no intermediary server |
| **Source Code** | Zero hardcoded keys — `.env` files are in `.gitignore` |
| **CI Safety** | `.gitignore` prevents accidental commits of `.env` files |
| **User Control** | Users can add/remove their keys via the Settings modal at any time |

---

## 🛠 Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Semantic structure & accessibility |
| CSS3 | Glassmorphism design system, animations, responsive grid |
| JavaScript (ES6+) | State management, async/await, DOM manipulation |
| Google Gemini API | LLM-powered cover letter generation |
| PDF.js (Mozilla) | Client-side PDF text extraction |
| Lucide Icons | SVG icon system |
| Google Fonts | Inter + Outfit typography |

---

## ⚡ Quick Start

1. **Open** `index.html` in your browser
2. **Click the ⚙️ Settings** icon in the header
3. **Paste your Gemini API key** (get one free at [aistudio.google.com](https://aistudio.google.com/apikey))
4. **Fill in the form** and click **Generate Cover Letter**

> Without an API key, CoverCraft uses a built-in template engine as fallback.

---

## 📂 Project Structure

```
Sprint_4/
├── index.html          # Main SaaS UI
├── css/
│   └── style.css       # Complete design system
├── js/
│   ├── app.js          # State management & event binding
│   ├── generator.js    # Template engine + Gemini API
│   └── pdf-parser.js   # PDF text extraction
├── .env.example        # Environment variable template
└── README.md           # This file
```

---

### Developed by Daksh Choudhary 🚀

Frontend Developer | AI & ML Student | Prodesk IT Intern
