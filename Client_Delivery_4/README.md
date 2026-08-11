# ✈️ SkyHigh Airlines — Frequent Flyer Portal

A production-ready **End-to-End Frequent Flyer Management Portal** built for airline floor staff to efficiently manage frequent flyer member records through a clean, accessible, and responsive enterprise interface.

> **Client Delivery:** Project 4 — End-to-End Frequent Flyer Portal  
> **Ticket ID:** `ENG-163087`  
> **Priority:** P1 — High

---

## 🌐 Live Demo

**Live Application:**  
[Add your Vercel deployment URL here]

---

## 📌 Overview

The SkyHigh Airlines Frequent Flyer Portal digitizes the management of frequent flyer records that were previously handled through manual paperwork and spreadsheet-based workflows.

The application provides airline staff with a centralized interface to:

- View frequent flyer members
- Search and filter member records
- Add new members
- View member details
- Edit existing records
- Delete members safely
- Track loyalty tiers and points
- Handle invalid inputs and empty states
- Persist data locally
- Maintain accessibility and responsive usability

The application was developed with a strong focus on **production quality, accessibility, resilience, and clean enterprise UI design**.

---

## ✨ Features

### 📊 Dashboard

- Total member count
- Active member count
- Gold member count
- Platinum member count
- Recently joined members
- Clear corporate dashboard layout

### 👥 Member Management

- View all frequent flyer members
- Search by:
  - Name
  - Member ID
  - Email
- Filter by loyalty tier
- Filter by account status
- Reset filters
- View member details
- Add new members
- Edit existing members
- Delete members with confirmation

### 📝 Form Validation

The member form validates:

- First name
- Last name
- Email
- Phone
- Loyalty tier
- Points
- Account status

Invalid submissions are prevented and users receive clear inline validation feedback.

### 🔄 Loading & Empty States

The application handles:

- Loading states
- Empty member lists
- Empty search results
- Failed operations
- Invalid input
- Corrupted local storage data

Instead of displaying blank screens, users receive clear and actionable feedback.

### 🔐 Security

- User input is handled safely
- XSS injection attempts are prevented
- No `dangerouslySetInnerHTML`
- No real customer PII
- No API keys or sensitive credentials are stored in source code

### 📈 Analytics Simulation

The application includes simulated telemetry logging for primary actions.

Example:

```text
[Analytics] User interacted with End-to-End Frequent Flyer Portal
Action: member_created