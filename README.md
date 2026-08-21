# AI Resume Match

An AI-powered tool that compares your resume against a job description and gives you a detailed compatibility report — match score, skills gap analysis, ATS keyword check, and actionable improvement suggestions.

🔗 **Live site:** [airesumematch.khanalankit.com](https://airesumematch.khanalankit.com)

---

## Features

- **Match Score** — 0–100 score with a plain-English verdict (Excellent / Good / Average / Weak / Not Recommended)
- **Skills Analysis** — matched, missing, and partial skills extracted from both documents
- **Requirements Breakdown** — each job requirement evaluated with resume evidence cited
- **ATS Audit** — keyword density, experience, projects, education, and overall ATS scores
- **Strengths & Weaknesses** — honest recruiter-perspective feedback
- **Actionable Suggestions** — specific things to add or rewrite in your resume
- **Analysis History** — past analyses saved to your browser's local storage
- **Rate Limiting** — 5 analyses per hour per user (tracked server-side in MongoDB)
- **Auth** — Google and GitHub OAuth via Auth.js (NextAuth v5)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | [Google Gemini](https://ai.google.dev/) (`gemini-3.6-flash`) via `@google/genai` |
| PDF parsing | [unpdf](https://github.com/unjs/unpdf) |
| DOCX parsing | [mammoth](https://github.com/mwilliamson/mammoth.js) |
| Database | MongoDB Atlas via Mongoose + `@auth/mongodb-adapter` |
| Auth | [Auth.js v5 (NextAuth)](https://authjs.dev/) — Google & GitHub OAuth |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A MongoDB Atlas cluster (free tier is fine)
- A Google Cloud project with OAuth 2.0 credentials
- A GitHub OAuth App
- A Google AI Studio API key

### 1. Clone and install

```bash
git clone https://github.com/khanalankitt/resume-match-ai.git
cd resume-match-ai/match
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key |
| `GEMINI_MODEL` | Model name (default: `gemini-3.6-flash`) |
| `MONGODB_URI` | MongoDB connection string |
| `AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |

**OAuth redirect URIs to register:**

- Google → `<your-origin>/api/auth/callback/google`
- GitHub → `<your-origin>/api/auth/callback/github`

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
match/
├── app/
│   ├── (pages)/
│   │   ├── analyze/        # Resume upload + job description form
│   │   ├── history/        # Past analyses (localStorage)
│   │   └── login/          # Sign-in page
│   ├── api/
│   │   └── analyze/        # POST /api/analyze — core AI endpoint
│   └── page.tsx            # Landing page
├── components/
│   ├── analyze-view.tsx    # Main analysis form component
│   ├── results.tsx         # Analysis results display
│   └── history-view.tsx    # History list component
├── lib/
│   ├── db.ts               # MongoDB client (raw driver, used by Auth adapter)
│   ├── mongoose.ts         # Mongoose connection (used by rate limiter)
│   ├── history.ts          # localStorage history helpers
│   └── services/
│       ├── ai.ts           # Gemini API call + response normalization
│       ├── prompt-builder.ts   # System + user prompt construction
│       ├── rate-limit.ts       # Hourly quota enforcement (MongoDB)
│       ├── rate-limit-error.ts # RateLimitExceededError class
│       └── resume-parser.ts    # PDF (unpdf) + DOCX (mammoth) text extraction
├── models/
│   └── user.ts             # Mongoose User schema (rate limit fields)
├── types/
│   └── index.ts            # AnalysisResult and shared TypeScript types
├── auth.ts                 # Auth.js setup (MongoDB adapter, JWT strategy)
├── auth.config.ts          # OAuth provider config
└── next.config.ts          # Next.js config
```

---

## How It Works

1. **Upload** — user submits a PDF or DOCX resume and pastes a job description
2. **Parse** — server extracts plain text from the file (`unpdf` for PDF, `mammoth` for DOCX)
3. **Rate check** — an atomic MongoDB `findOneAndUpdate` verifies the user hasn't exceeded 5 analyses/hour
4. **AI analysis** — the resume text and job description are sent to Gemini with a structured JSON schema; the model returns a scored, validated result
5. **Response** — the frontend renders the score, skills breakdown, ATS scores, and suggestions; the result is saved to `localStorage` for history

---

## Deployment

The app is deployed on **Vercel**. Set all environment variables listed above in the Vercel project settings (not via `.env` — that file is local only).

> **Important:** Use your MongoDB Atlas URI (not `localhost`) in production. Serverless functions cannot reach a local database.

---

## License

MIT
