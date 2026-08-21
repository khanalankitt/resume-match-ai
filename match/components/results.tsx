"use client";

import type { AnalysisResult, RequirementStatus } from "@/types/index";

const statusColor: Record<RequirementStatus, string> = {
  matched: "bg-green/15 text-green",
  missing: "bg-coral/15 text-coral",
  partial: "bg-amber/15 text-amber",
};

const statusLabel: Record<RequirementStatus, string> = {
  matched: "Matched",
  missing: "Missing",
  partial: "Partial",
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink/60">{label}</span>
        <span className="font-mono text-xs font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/8">
        <div
          className="h-full rounded-full bg-cobalt transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Results({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-10 space-y-8">
      {/* Header: score + verdict + summary */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Rubber stamp badge */}
        <div className="flex h-28 w-28 shrink-0 rotate-[-3deg] items-center justify-center rounded-full border-[3px] border-green font-mono text-base font-bold uppercase leading-none text-green">
          <span className="text-center leading-tight">
            {result.score}
            <br />
            MATCH
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {result.verdict}
          </span>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            {result.summary}
          </p>
        </div>
      </div>

      {/* ATS scores */}
      <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
        <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
          ATS Breakdown
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          <ScoreBar label="Keywords" value={result.ats.keywords} />
          <ScoreBar label="Experience" value={result.ats.experience} />
          <ScoreBar label="Projects" value={result.ats.projects} />
          <ScoreBar label="Education" value={result.ats.education} />
          <ScoreBar label="Overall" value={result.ats.overall} />
        </div>
      </section>

      {/* Skills */}
      <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
        <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
          Skills
        </h3>
        <div className="space-y-4">
          {result.matchedSkills.length > 0 && (
            <div>
              <span className="mb-2 inline-block text-xs font-medium text-green">
                Matched
              </span>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-green/30 bg-green/10 px-2.5 py-1 font-mono text-xs text-green"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.partialSkills.length > 0 && (
            <div>
              <span className="mb-2 inline-block text-xs font-medium text-amber">
                Partial
              </span>
              <div className="flex flex-wrap gap-2">
                {result.partialSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-amber/30 bg-amber/10 px-2.5 py-1 font-mono text-xs text-amber"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.missingSkills.length > 0 && (
            <div>
              <span className="mb-2 inline-block text-xs font-medium text-coral">
                Missing
              </span>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-coral/30 bg-coral/10 px-2.5 py-1 font-mono text-xs text-coral"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Requirements */}
      {result.requirements.length > 0 && (
        <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
          <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
            Requirements
          </h3>
          <div className="space-y-0 divide-y divide-ink/8">
            {result.requirements.map((r, i) => (
              <div key={i} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${statusColor[r.status].split(" ")[0]}`}
                  />
                  <span className="text-sm font-medium">{r.requirement}</span>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${statusColor[r.status]}`}
                  >
                    {statusLabel[r.status]}
                  </span>
                </div>
                {(r.evidence || r.notes) && (
                  <div className="max-w-lg text-xs leading-relaxed text-ink/50 sm:text-right">
                    {r.evidence && (
                      <p>
                        <span className="font-medium text-ink/70">Evidence:</span>{" "}
                        {r.evidence}
                      </p>
                    )}
                    {r.notes && <p>{r.notes}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strengths + Weaknesses side by side */}
      <div className="grid gap-4 sm:grid-cols-2">
        {result.strengths.length > 0 && (
          <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
              Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}
        {result.weaknesses.length > 0 && (
          <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
              Weaknesses
            </h3>
            <ul className="space-y-2">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  {w}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <section className="rounded border border-ink/10 bg-white p-4 sm:p-6">
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-ink/40">
            Suggestions
          </h3>
          <ul className="space-y-3">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink/70">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
