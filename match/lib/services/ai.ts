import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from "@/types/index";
import { buildAnalysisPrompt } from "./prompt-builder";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER },
    verdict: {
      type: Type.STRING,
      enum: [
        "Excellent Match",
        "Good Match",
        "Average Match",
        "Weak Match",
        "Not Recommended",
      ],
    },
    summary: { type: Type.STRING },
    matchedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    partialSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    requirements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          requirement: { type: Type.STRING },
          status: {
            type: Type.STRING,
            enum: ["matched", "missing", "partial"],
          },
          evidence: { type: Type.STRING },
          notes: { type: Type.STRING },
        },
        required: ["requirement", "status", "evidence", "notes"],
      },
    },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    ats: {
      type: Type.OBJECT,
      properties: {
        keywords: { type: Type.INTEGER },
        experience: { type: Type.INTEGER },
        projects: { type: Type.INTEGER },
        education: { type: Type.INTEGER },
        overall: { type: Type.INTEGER },
      },
      required: ["keywords", "experience", "projects", "education", "overall"],
    },
  },
  required: [
    "score",
    "verdict",
    "summary",
    "matchedSkills",
    "missingSkills",
    "partialSkills",
    "requirements",
    "strengths",
    "weaknesses",
    "suggestions",
    "ats",
  ],
};

export class AIResponseParseError extends Error {
  constructor(raw: string) {
    super("The AI response could not be parsed as valid JSON.");
    this.name = "AIResponseParseError";
    this.raw = raw;
  }
  raw: string;
}

export async function analyzeResumeAgainstJob({
  resumeText,
  jobDescription,
}: {
  resumeText: string;
  jobDescription: string;
}): Promise<AnalysisResult> {
  const { system, user } = buildAnalysisPrompt({ resumeText, jobDescription });

  const response = await client.models.generateContent({
    model: MODEL,
    contents: user,
    config: {
      systemInstruction: system,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  });

  const raw = response.text ?? "";

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new AIResponseParseError(raw);
  }

  return normalizeAnalysisResult(parsed);
}

/**
 * Defensive normalization in case the model omits a field or returns a
 * slightly different shape than requested — keeps the API contract stable
 * for the frontend even if the LLM output drifts.
 */
function normalizeAnalysisResult(data: unknown): AnalysisResult {
  const d = data as Partial<AnalysisResult>;

  return {
    score: clampScore(d.score),
    verdict: d.verdict ?? "Average Match",
    summary: d.summary ?? "",
    matchedSkills: d.matchedSkills ?? [],
    missingSkills: d.missingSkills ?? [],
    partialSkills: d.partialSkills ?? [],
    requirements: d.requirements ?? [],
    strengths: d.strengths ?? [],
    weaknesses: d.weaknesses ?? [],
    suggestions: d.suggestions ?? [],
    ats: {
      keywords: clampScore(d.ats?.keywords),
      experience: clampScore(d.ats?.experience),
      projects: clampScore(d.ats?.projects),
      education: clampScore(d.ats?.education),
      overall: clampScore(d.ats?.overall),
    },
  };
}

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}
