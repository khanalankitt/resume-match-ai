import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AnalyzeView from "@/components/analyze-view";

export const metadata: Metadata = {
  title: "Analyze Your Resume",
  description:
    "Upload your resume and paste a job description to get an AI-powered match score, skills gap analysis, ATS keyword check, and actionable suggestions.",
  alternates: { canonical: "https://airesumematch.khanalankit.com/analyze" },
};

export default async function AnalyzePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fanalyze");
  }

  return <AnalyzeView />;
}
