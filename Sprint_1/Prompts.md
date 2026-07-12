# Prompts.md — AI Assistance Log
## Sprint 01 | Prodesk IT · Digital Marketing Landing Page

> This file documents every AI interaction used during the sprint. AI was used only to confirm my own understanding — not to write, generate, or architect any part of the project.

---

## Tool Used

**Google Gemini 3.1 Pro** — used twice, briefly, for concept confirmation and a small directional nudge.

---

## Interaction Log

---

### Interaction 01

**What I was working on:**
I had already isolated `.menu-items` using `position: absolute` to fix the mobile overlap. I just wanted to confirm that `position: relative` on the parent was the correct anchor approach before committing to it.

**Prompt sent to Gemini:**

> "If a child div is `position: absolute`, does the parent need `position: relative` to contain it, or is that optional?"

**What Gemini said:**
Confirmed that yes, the parent needs `position: relative` (or any non-static value) to act as the containing block. Standard CSS behaviour.

**What I used:**
Already had the solution written. This just confirmed I was right. No code was taken from the response.

---

### Interaction 02

**What I was working on:**
My 3-column service grid was collapsing correctly on mobile, but the card spacing felt uneven — the gap between cards was inconsistent depending on screen width. I had been using fixed `gap` values and wasn't sure whether to switch to padding on the cards themselves or adjust the grid properties.

**Prompt sent to Gemini:**

> "I have a CSS Grid layout with 3 columns that collapses to 1 on mobile. The gap between cards looks uneven at different screen sizes. Should I control spacing through `gap` on the grid or `padding` on individual cards?"

**What Gemini said:**
Suggested sticking with `gap` on the grid container for spacing between cards, and using `padding` inside the cards only for internal content spacing. It mentioned that mixing both can cause double-spacing issues and that `gap` is more predictable for grid layouts.

**What I used:**
The distinction between `gap` (external) and `padding` (internal) helped me clean up my approach. I kept `gap` on the grid and removed the extra margins I had on the cards. The actual values and the responsive breakpoint logic were already mine — I just reorganized which property was doing which job.

---

## Summary

| # | Prompt | Why | Code taken? |
|---|--------|-----|-------------|
| 01 | Asked about `position: relative` on parent containers | To confirm existing understanding | No |
| 02 | Asked about `gap` vs `padding` in CSS Grid | To resolve inconsistent card spacing | No — only the concept clarified |

---

*Everything else — layout, dark mode controller, frosted glass navbar, micro-interactions, service grid, footer, and all responsive breakpoints — was built independently.*