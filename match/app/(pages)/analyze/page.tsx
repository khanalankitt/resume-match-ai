"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

export default function AnalyzePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setResumeFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  }, []);

  const canAnalyze = resumeFile && jobDescription.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <nav className="border-b border-ink/10 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight sm:text-xl"
          >
            AI Resume Match
          </Link>
          <Link
            href="/history"
            className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            History
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl">
          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Compare your resume to a job posting
            </h1>
            <p className="mt-1 text-sm text-ink/50">
              Upload your resume and paste the job description below.
            </p>
          </div>

          {/* Two paper layout */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Resume panel */}
            <div className="rounded border border-ink/10 bg-white p-4 shadow-paper-sm sm:p-5">
              <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-ink/40 sm:mb-4">
                Your Resume
              </span>

              {resumeFile ? (
                <div className="flex items-center gap-3 rounded border border-ink/10 bg-paper px-3 py-2.5 sm:px-4 sm:py-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-cobalt"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-ink/40">
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="shrink-0 text-xs font-medium text-coral transition-colors hover:text-coral/80"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-4 py-12 text-center transition-colors sm:px-6 sm:py-16 ${
                    isDragging
                      ? "border-cobalt bg-cobalt/5"
                      : "border-ink/15 hover:border-ink/30"
                  }`}
                >
                  <svg
                    className="mb-3 h-8 w-8 text-ink/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="text-sm font-medium">
                    Drop your resume here
                  </p>
                  <p className="mt-1 text-xs text-ink/40">
                    PDF or DOCX
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Job description panel */}
            <div className="rounded border border-ink/10 bg-white p-4 shadow-paper-sm sm:p-5">
              <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-ink/40 sm:mb-4">
                Job Description
              </span>

              {jobDescription ? (
                <div className="relative">
                  <div className="max-h-[250px] overflow-y-auto rounded border border-ink/10 bg-paper p-3 sm:max-h-[400px] sm:p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/70">
                      {jobDescription}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setJobDescription("")}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-white text-xs font-medium text-coral shadow-paper-sm transition-colors hover:bg-coral/5"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="h-[200px] w-full resize-none rounded border border-ink/15 bg-paper p-3 text-sm leading-relaxed text-ink/70 outline-none transition-colors placeholder:text-ink/30 focus:border-cobalt focus:ring-2 focus:ring-cobalt/20 sm:h-[300px] sm:p-4"
                />
              )}
            </div>
          </div>

          {/* Analyze button */}
          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              type="button"
              disabled={!canAnalyze}
              className={`inline-flex w-full items-center justify-center gap-2 rounded px-6 py-3 text-sm font-medium shadow-paper transition-colors sm:w-auto sm:px-8 ${
                canAnalyze
                  ? "bg-cobalt text-white hover:bg-cobalt-hover"
                  : "cursor-not-allowed bg-ink/10 text-ink/30"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              Analyze match
            </button>
          </div>

          {/* Status hint */}
          {!canAnalyze && (
            <p className="mt-3 text-center text-xs text-ink/40">
              {!resumeFile && !jobDescription.trim()
                ? "Upload a resume and paste a job description to continue."
                : !resumeFile
                  ? "Upload a resume to continue."
                  : "Paste a job description to continue."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
