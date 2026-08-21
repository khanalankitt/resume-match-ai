export type RequirementStatus = "matched" | "missing" | "partial";

export interface RequirementResult {
  requirement: string;
  status: RequirementStatus;
  evidence: string;
  notes: string;
}

export interface AtsScore {
  keywords: number;
  experience: number;
  projects: number;
  education: number;
  overall: number;
}

export type Verdict =
  | "Excellent Match"
  | "Good Match"
  | "Average Match"
  | "Weak Match"
  | "Not Recommended";

export interface AnalysisResult {
  score: number;
  verdict: Verdict;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  requirements: RequirementResult[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  ats: AtsScore;
}
