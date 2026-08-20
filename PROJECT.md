# PROJECT.md

# AI Resume Match

> An AI-powered ATS Resume Analyzer that compares a candidate's resume against a job description and provides a detailed compatibility report.

---

# Goal

Build a production-quality full-stack web application that helps job seekers understand how well their resume matches a job posting.

The application should analyze the uploaded resume, compare it with the pasted job description using an LLM, and generate an easy-to-understand report with scores, missing skills, strengths, weaknesses, and actionable suggestions.

This is intended to be a portfolio-quality project showcasing modern full-stack development, AI integration, document processing, and clean UI/UX.

---

# Core Problem

Applicants often submit resumes without knowing:

- How well they match a job
- Which skills are missing
- Whether ATS systems can identify relevant keywords
- What improvements should be made before applying

The application solves this by generating a detailed AI-powered analysis.

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- TanStack Query
- Zod

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM

---

## Database

PostgreSQL

Development may use SQLite.

---

## AI

OpenAI API (preferred)

Alternative providers should be easy to swap.

The AI should always return structured JSON.

---

## File Parsing

PDF

- pdf-parse

DOCX

- mammoth

---

## Deployment

Frontend

- Vercel

Backend

- Railway or Render

Database

- Neon PostgreSQL

---

# Architecture

User

↓

Next.js Frontend

↓

Express REST API

↓

Resume Parser

↓

Prompt Builder

↓

OpenAI

↓

JSON Response

↓

Frontend Dashboard

---

# Application Flow

1. User uploads a resume (PDF or DOCX)
2. User pastes a job description
3. Resume text is extracted
4. Prompt is generated
5. AI compares both documents
6. AI returns structured JSON
7. Dashboard renders results
8. Analysis can optionally be saved

---

# Main Features

## Resume Upload

Accept:

- PDF
- DOCX

Extract readable text.

---

## Job Description Input

Large textarea supporting long job descriptions.

---

## AI Analysis

Compare:

- Skills
- Technologies
- Responsibilities
- Experience
- Education
- Certifications
- Soft skills

---

## Match Score

Generate an overall compatibility score.

Example

87%

---

## Requirement Comparison

Each requirement should include:

- Requirement
- Match status
- Evidence from resume
- Notes

Example

Requirement:

Docker

Status:

Matched

Evidence:

"Containerized backend using Docker"

---

## Skills Analysis

Split into:

Matched Skills

Missing Skills

Partially Mentioned Skills

---

## Experience Analysis

Compare:

Years required

vs

Years found

Example

Required:

3+ years

Resume:

2 years

Result:

Partial Match

---

## Keyword Analysis

Identify ATS keywords.

Display:

Found keywords

Missing keywords

Suggested keywords

---

## Strengths

Summarize what makes the candidate suitable.

Example

- Strong backend experience
- Modern JavaScript ecosystem
- REST API development

---

## Weaknesses

Summarize shortcomings.

Example

- Missing cloud experience
- No CI/CD projects
- Limited testing examples

---

## Resume Suggestions

Provide actionable improvements.

Example

Instead of

Built backend API

Suggest

Built scalable Express.js REST API serving thousands of daily requests.

---

## ATS Score

Break into categories.

Example

Keywords

Experience

Projects

Education

Formatting

Overall

---

## Final Verdict

Possible values

Excellent Match

Good Match

Average Match

Weak Match

Not Recommended

Include a short explanation.

---

# Future Features

Resume Rewrite

Generate an optimized resume aligned with the job description without inventing information.

---

Cover Letter Generator

Generate a personalized cover letter.

---

Interview Questions

Generate interview questions based on:

Resume

+

Job Description

---

Learning Roadmap

Suggest technologies to learn based on missing skills.

---

History

Store previous analyses.

---

Authentication

User accounts.

---

PDF Report Export

Download analysis.

---

Dark Mode

Supported.

---

# REST API

## POST

/api/analyze

Input

Multipart form

Fields

resume

jobDescription

Returns

```json
{
  "score": 87,
  "verdict": "Excellent Match",
  "matchedSkills": [],
  "missingSkills": [],
  "requirements": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "ats": {}
}
```

---

## GET

/api/report/:id

Returns a saved report.

---

## GET

/api/history

Returns previous analyses.

---

## DELETE

/api/report/:id

Deletes report.

---

# Suggested Folder Structure

```
root
│
├── client
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── types
│   └── utils
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── services
│   │   ├── prompts
│   │   ├── parser
│   │   ├── ai
│   │   ├── prisma
│   │   └── utils
│   │
│   └── prisma
│
└── shared
```

---

# Backend Services

ResumeParserService

Responsible for extracting text from uploaded files.

---

PromptBuilderService

Creates the prompt sent to the LLM.

---

AIService

Communicates with OpenAI.

---

AnalysisService

Processes AI output.

Calculates fallback scores if necessary.

---

ReportService

Stores completed reports.

---

# AI Prompt Rules

The AI must

- Never hallucinate
- Never invent experience
- Never fabricate skills
- Use only information from the resume
- Explain why a requirement matched or failed
- Return valid JSON only

---

# JSON Response Schema

```json
{
  "score": 87,
  "verdict": "Excellent Match",
  "summary": "",
  "matchedSkills": [],
  "missingSkills": [],
  "partialSkills": [],
  "requirements": [
    {
      "requirement": "",
      "status": "matched",
      "evidence": "",
      "notes": ""
    }
  ],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "ats": {
    "keywords": 90,
    "experience": 85,
    "projects": 92,
    "education": 95,
    "overall": 89
  }
}
```

---

# UI Pages

/

Landing page

---

/analyze

Upload resume

Paste job description

Analyze

---

/report/:id

Complete analysis dashboard

---

/history

Saved reports

---

# Dashboard Sections

Overall Score

ATS Score

Skills Comparison

Requirements Table

Keyword Analysis

Strengths

Weaknesses

Suggestions

Final Verdict

---

# UI Style & Design Direction

## Concept: "The Recruiter's Desk"

The product's whole job is to mark up one document against another, so the UI should look and behave like an actual document review — not a generic dashboard with stat cards and a gradient hero. Think of a sharp recruiter sitting at a desk with a highlighter, marking up a printed resume next to a job posting. That's the visual metaphor for every screen.

Explicitly avoid the current "AI-made" defaults:

- No warm cream background paired with a terracotta/orange accent
- No near-black background with a single neon-green or violet accent
- No glassmorphism, no purple-to-blue gradient hero banners
- No soft, blurred drop-shadow "floating cards" everywhere
- No gradient circular progress rings for the score
- No emoji used as status icons (✅ ❌) — use the highlighter color system instead

## Color System

| Token | Hex | Use |
|---|---|---|
| Ink | `#12141C` | Primary text, headings |
| Paper | `#F1F1EC` | App background — cool, slightly grey off-white, not cream |
| Cobalt | `#2B4CFF` | Primary actions, links, focus rings |
| Highlighter Green | `#2FA84F` | Matched skills / requirements |
| Highlighter Coral | `#E8543E` | Missing skills / requirements |
| Highlighter Amber | `#F2A93C` | Partial matches |

Status colors are used the way a real highlighter pen is used: as a translucent stroke behind text, never as a solid filled badge background. Cobalt is reserved only for things the user can click.

## Typography

- **Display — Fraunces** (variable serif): used only for the H1 on the landing page and the score stamp. Large size, tight tracking, a little personality — never used for body copy.
- **Body/UI — Public Sans**: everything else — nav, buttons, form labels, table text. Neutral and legible at small sizes.
- **Data — IBM Plex Mono**: scores, percentages, keyword chips, and the ATS category numbers. The monospace grid gives the "being scanned by a machine" feeling that reinforces what an ATS actually does.

## Layout Concept

Two literal "paper" documents sit side by side on the `/analyze` and `/report/:id` screens — resume on the left, job description on the right — rather than a single centered form. Matched requirements are connected between the two documents with a thin, slightly hand-drawn connector line, like string on a cork board, instead of a checklist icon.

```
┌─────────────────────────────────────────────────┐
│  AI Resume Match                    [Analyze]    │
├───────────────────────┬───────────────────────────┤
│  RESUME (paper card)  │   JOB DESCRIPTION (paper)  │
│  ~~~~~~~~~~~~~~~~~~~~ │   ~~~~~~~~~~~~~~~~~~~~~~   │
│  highlighted phrase ~~┼~~ requirement line          │
│  ~~~~~~~~~~~~~~~~~~~~ │   ~~~~~~~~~~~~~~~~~~~~~~   │
└───────────────────────┴───────────────────────────┘
        ┌────────────┐
        │  87 MATCH  │  ← rotated rubber-stamp badge
        └────────────┘
```

On `/report/:id`, the requirements table reads like a manila folder tab list (left-aligned labels, thin rules, no zebra striping) rather than a default shadcn/Bootstrap table.

## Signature Element

The **highlighter stroke**. Matched, missing, and partial phrases inside the resume text are underlined with an irregular, slightly imperfect SVG highlighter shape (not a flat `<mark>` rectangle) in the matching status color. This same visual language drives the score: instead of a gradient progress ring, the overall score renders as a circular **rubber-stamp badge** ("87 MATCH"), rotated a couple of degrees off-axis with a doubled ink-press outline, like a stamp on a paper application.

## Motion

- On report load, highlighter strokes paint across the resume text one at a time in reading order — as if someone is marking it up live — rather than a generic fade/slide-up on page load.
- Hovering a row in the requirements table draws the connector thread to its evidence highlight in the resume panel.
- Everywhere else, motion stays minimal: no shimmering skeletons, no floating gradient blobs, no bouncing icons.

## Components

- **Buttons**: solid Ink or Cobalt fill, small 4px corner radius (not a full pill), with a crisp 1px offset "paper" shadow instead of a soft blurred box-shadow.
- **Score badge**: circular stamp described above, used identically on the report header and in history/list views.
- **Requirement rows**: folder-tab styling — thin hairline rule between rows, status shown as a small highlighter swatch + label, not a colored pill.
- **Keyword chips**: monospace, outlined (not filled), color of outline indicates found/missing/suggested.
- **Empty & error states**: written in the interface's voice, specific about what happened and what to do next (e.g. "No job description yet — paste one to start the comparison" rather than a generic "No data").

## Dark Mode

"Night desk" variant, not just inverted colors:

| Token | Hex |
|---|---|
| Ink (bg) | `#15171D` |
| Paper (text) | `#EDEAE1` |
| Cobalt | `#5C7CFF` |
| Highlighter Green | `#3FC46A` |
| Highlighter Coral | `#FF7A66` |
| Highlighter Amber | `#FFC65C` |

Accessible, responsive down to mobile (documents stack vertically, connector threads are dropped in favor of inline status swatches), and visible keyboard focus rings in Cobalt throughout.

---

# Non-Functional Requirements

- Fast response times
- Mobile responsive
- Type-safe
- Modular architecture
- Reusable components
- Error handling
- Loading states
- Empty states
- Validation
- Secure file uploads
- Production-ready code quality

---

# Out of Scope (MVP)

- OCR for scanned resumes
- LinkedIn import
- Multi-language resume support
- Team collaboration
- Recruiter dashboard
- AI chat assistant

These can be added in later versions.

---

# Success Criteria

A user should be able to:

1. Upload a resume.
2. Paste a job description.
3. Receive an AI-generated compatibility report within seconds.
4. Understand exactly why they match or don't match.
5. Know how to improve their resume before applying.

---

# Portfolio Value

This project demonstrates:

- Full-stack TypeScript development
- Express.js backend architecture
- Next.js frontend  
- REST API design
- AI integration
- Prompt engineering
- Structured JSON generation
- File parsing
- Document processing
- Database design
- Clean UI/UX
- Production deployment
- Real-world software engineering practices