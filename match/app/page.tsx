import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-ink/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-tight">
            AI Resume Match
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              Log in
            </Link>
            <Link
              href="/login?mode=signup"
              className="rounded bg-cobalt px-4 py-2 text-sm font-medium text-white shadow-paper-sm transition-colors hover:bg-cobalt-hover"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Know your match
            <br />
            before you apply.
          </h1>
          <p className="mt-6 text-lg text-ink/60 sm:text-xl">
            Upload your resume, paste a job description, and get an AI-powered
            compatibility report — with skills, gaps, and exact fixes.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center rounded bg-cobalt px-6 py-3 text-base font-medium text-white shadow-paper transition-colors hover:bg-cobalt-hover"
            >
              Analyze a resume
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded border border-ink/20 bg-paper px-6 py-3 text-base font-medium text-ink shadow-paper-sm transition-colors hover:border-ink/40"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Mock document pair preview */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Resume card */}
          <div className="rounded border border-ink/10 bg-white p-6 shadow-paper-sm">
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
          <div className="rounded border border-ink/10 bg-white p-6 shadow-paper-sm">
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
              <div className="inline-flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-full border-[3px] border-green font-mono text-sm font-bold uppercase leading-none text-green">
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
      <section className="border-t border-ink/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            What&apos;s in the report
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
      <section className="border-t border-ink/10 px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop guessing. Start matching.
          </h2>
          <p className="mt-4 text-ink/60">
            Your next application deserves a test run first.
          </p>
          <Link
            href="/analyze"
            className="mt-8 inline-flex items-center rounded bg-ink px-6 py-3 text-base font-medium text-paper shadow-paper transition-colors hover:bg-ink/90"
          >
            Try it now — free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-ink/40">
          <span>AI Resume Match</span>
          <span>Built for job seekers who want clarity.</span>
        </div>
      </footer>
    </div>
  );
}
