const JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY valid JSON (no markdown fences, no preamble, no commentary) matching exactly this shape:

{
  "score": number (0-100),
  "verdict": "Excellent Match" | "Good Match" | "Average Match" | "Weak Match" | "Not Recommended",
  "summary": string,
  "matchedSkills": string[],
  "missingSkills": string[],
  "partialSkills": string[],
  "requirements": [
    {
      "requirement": string,
      "status": "matched" | "missing" | "partial",
      "evidence": string,
      "notes": string
    }
  ],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "ats": {
    "keywords": number (0-100),
    "experience": number (0-100),
    "projects": number (0-100),
    "education": number (0-100),
    "overall": number (0-100)
  }
}
`.trim();

const SYSTEM_RULES = `
You are an expert technical recruiter and ATS (Applicant Tracking System) analyst.

Rules you must follow:
- Never hallucinate or invent experience, skills, or credentials that are not present in the resume text.
- Only use information explicitly present in the resume. If something is not mentioned, treat it as missing, not as "likely present".
- For every requirement, explain briefly why it matched, partially matched, or failed, citing the specific resume text as evidence when it exists.
- "evidence" must be a short direct excerpt from the resume, or an empty string if there is no matching text.
- Be honest and specific. Do not inflate the score to be encouraging.
- Return valid JSON only, matching the schema exactly. No extra keys, no missing keys.
`.trim();

export interface BuildAnalysisPromptInput {
  resumeText: string;
  jobDescription: string;
}

export function buildAnalysisPrompt({
  resumeText,
  jobDescription,
}: BuildAnalysisPromptInput): { system: string; user: string } {
  const user = `
Compare the following resume against the job description and produce a compatibility analysis.

--- RESUME START ---
${resumeText}
--- RESUME END ---

--- JOB DESCRIPTION START ---
${jobDescription}
--- JOB DESCRIPTION END ---

${JSON_SCHEMA_INSTRUCTIONS}
`.trim();

  return { system: SYSTEM_RULES, user };
}
