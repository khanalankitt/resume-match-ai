import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "@/app/actions/auth";
import SignOutButton from "@/components/sign-out-button";

export default async function LandingPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-ink/10 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
            AI Resume Match
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                <Link
                  href="/history"
                  className="cursor-pointer text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  History
                </Link>
                <span className="hidden max-w-[160px] truncate text-sm text-ink/50 sm:inline">
                  {user.name ?? user.email}
                </span>
                <SignOutButton onSignOut={signOutAction} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="cursor-pointer text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  Log in
                </Link>
                <Link
                  href="/login?mode=signup"
                  className="cursor-pointer rounded bg-cobalt px-3 py-1.5 text-sm font-medium text-white shadow-paper-sm transition-colors hover:bg-cobalt-hover sm:px-4 sm:py-2"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Know your match
            <br />
            before you apply.
          </h1>
          <p className="mt-4 text-base text-ink/60 sm:mt-6 sm:text-lg md:text-xl">
            Upload your resume, paste a job description, and get an AI-powered
            compatibility report — with skills, gaps, and exact fixes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <Link
              href="/analyze"
              className="cursor-pointer inline-flex w-full items-center justify-center rounded bg-cobalt px-6 py-3 text-base font-medium text-white shadow-paper transition-colors hover:bg-cobalt-hover sm:w-auto"
            >
              Analyze a resume
            </Link>
          </div>
        </div>

        {/* Mock document pair preview */}
        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2">
          {/* Resume card */}
          <div className="rounded border border-ink/10 bg-white p-4 shadow-paper-sm sm:p-6">
            <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
              Resume
            </span>
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded-sm bg-ink/8" />
              <div className="h-3 w-1/2 rounded-sm bg-ink/8" />
              <div className="mt-4 space-y-1.5">
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-4/5 rounded-sm bg-ink/5" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-3/5 rounded-sm bg-ink/5" />
              </div>
              {/* Highlighted phrases */}
              <div className="mt-4 space-y-1.5">
                <span className="highlighter-green inline-block h-2.5 w-2/3 rounded-sm bg-green/10" />
                <span className="highlighter-coral inline-block h-2.5 w-1/2 rounded-sm bg-coral/10" />
                <span className="highlighter-amber inline-block h-2.5 w-3/5 rounded-sm bg-amber/10" />
              </div>
            </div>
          </div>

          {/* Job description card */}
          <div className="rounded border border-ink/10 bg-white p-4 shadow-paper-sm sm:p-6">
            <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
              Job Description
            </span>
            <div className="space-y-2">
              <div className="h-3 w-2/3 rounded-sm bg-ink/8" />
              <div className="h-3 w-1/3 rounded-sm bg-ink/8" />
              <div className="mt-4 space-y-1.5">
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-5/6 rounded-sm bg-ink/5" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
                <div className="h-2.5 w-4/5 rounded-sm bg-ink/5" />
                <div className="h-2.5 w-full rounded-sm bg-ink/5" />
              </div>
            </div>
            {/* Rubber stamp */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex h-16 w-16 rotate-[-4deg] items-center justify-center rounded-full border-[3px] border-green font-mono text-xs font-bold uppercase leading-none text-green sm:h-20 sm:w-20 sm:text-sm">
                <span className="text-center leading-tight">
                  87
                  <br />
                  MATCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-ink/10 bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload your resume",
                desc: "Drop a PDF or DOCX. We extract the text cleanly, no formatting lost.",
              },
              {
                step: "02",
                title: "Paste the job posting",
                desc: "Copy the full job description into the comparison panel.",
              },
              {
                step: "03",
                title: "Get your report",
                desc: "AI scores your match, highlights gaps, and suggests exact fixes.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <span className="font-mono text-sm font-medium text-cobalt">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            What&apos;s in the report
          </h2>
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            {[
              { label: "Match score", detail: "Overall percentage with verdict" },
              { label: "Skills comparison", detail: "Matched, missing, and partial" },
              { label: "Requirement check", detail: "Each JD requirement vs your resume" },
              { label: "ATS keyword scan", detail: "Found, missing, and suggested" },
              { label: "Strengths & gaps", detail: "What you have and what you don't" },
              { label: "Actionable suggestions", detail: "Specific resume improvements" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded border border-ink/10 bg-white px-4 py-3"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cobalt" />
                <div>
                  <span className="text-sm font-medium">{item.label}</span>
                  <p className="text-xs text-ink/50">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink/10 px-4 py-14 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Stop guessing. Start matching.
          </h2>
          <p className="mt-3 text-sm text-ink/60 sm:mt-4 sm:text-base">
            Your next application deserves a test run first.
          </p>
          <Link
            href="/analyze"
            className="cursor-pointer mt-6 inline-flex items-center rounded bg-ink px-6 py-3 text-base font-medium text-paper shadow-paper transition-colors hover:bg-ink/90 sm:mt-8"
          >
            Try it now — free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 text-center text-xs text-ink/40 sm:flex-row sm:justify-between sm:text-left">
          <span>AI Resume Match</span>
          <span>Built for job seekers who want clarity.</span>
        </div>
      </footer>
    </div>
  );
}
