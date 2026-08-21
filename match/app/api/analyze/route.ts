import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  extractResumeText,
  UnsupportedFileTypeError,
  EmptyResumeTextError,
} from "@/lib/services/resume-parser";
import {
  analyzeResumeAgainstJob,
  AIResponseParseError,
} from "@/lib/services/ai";
import {
  checkAndRecordAnalysis,
  RateLimitExceededError,
} from "@/lib/services/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_JOB_DESCRIPTION_LENGTH = 20000;

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Sign in to analyze a resume." },
      { status: 401 },
    );
  }

  // Recorded up front (not after success) so two simultaneous requests from
  // the same user can't both pass the check before either is logged.
  try {
    await checkAndRecordAnalysis(session.user.id);
  } catch (err) {
    if (err instanceof RateLimitExceededError) {
      return NextResponse.json(
        {
          error: err.message,
          retryAfterMs: err.retryAfterMs,
        },
        { status: 429 },
      );
    }
    throw err;
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Request must be multipart/form-data." },
      { status: 400 },
    );
  }

  const resume = formData.get("resume");
  const jobDescription = formData.get("jobDescription");

  // --- Validation ---
  if (!(resume instanceof File)) {
    return NextResponse.json(
      { error: "Missing required field: resume (file)." },
      { status: 400 },
    );
  }

  if (typeof jobDescription !== "string" || jobDescription.trim().length < 20) {
    return NextResponse.json(
      {
        error:
          "Missing or too-short field: jobDescription. Paste the full job posting text.",
      },
      { status: 400 },
    );
  }

  if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
    return NextResponse.json(
      {
        error: `jobDescription exceeds ${MAX_JOB_DESCRIPTION_LENGTH} characters.`,
      },
      { status: 400 },
    );
  }

  if (resume.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Resume file exceeds the 5MB size limit." },
      { status: 400 },
    );
  }

  // --- Extraction ---
  let resumeText: string;
  try {
    resumeText = await extractResumeText(resume);
  } catch (err) {
    if (err instanceof UnsupportedFileTypeError) {
      return NextResponse.json(
        { error: "Only PDF and DOCX resumes are supported." },
        { status: 400 },
      );
    }
    if (err instanceof EmptyResumeTextError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    console.error("Resume parsing failed:", err);
    const detail =
      process.env.NODE_ENV !== "production" && err instanceof Error
        ? err.message
        : undefined;
    return NextResponse.json(
      { error: "Could not read the uploaded resume file.", detail },
      { status: 422 },
    );
  }

  // --- AI Analysis ---
  try {
    const result = await analyzeResumeAgainstJob({
      resumeText,
      jobDescription: jobDescription.trim(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof AIResponseParseError) {
      console.error("AI returned unparseable JSON:", err.raw);
      return NextResponse.json(
        {
          error:
            "The AI analysis failed to generate a valid result. Please try again.",
        },
        { status: 502 },
      );
    }
    console.error("AI analysis failed:", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong while analyzing the resume. Please try again.",
      },
      { status: 500 },
    );
  }
}
