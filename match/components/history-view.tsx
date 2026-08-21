"use client";

import Link from "next/link";
import { useCallback, useState, useSyncExternalStore } from "react";
import Results from "@/components/results";
import {
  clearHistory,
  deleteFromHistory,
  getHistorySnapshot,
  subscribeToHistory,
} from "@/lib/history";
import type { HistoryEntry } from "@/types/index";

const EMPTY: HistoryEntry[] = [];

function getServerSnapshot(): HistoryEntry[] {
  return EMPTY;
}

function scoreTone(score: number): string {
  if (score >= 75) return "border-green text-green";
  if (score >= 50) return "border-amber text-amber";
  return "border-coral text-coral";
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const day = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day} · ${time}`;
}

export default function HistoryView() {
  const entries = useSyncExternalStore(
    subscribeToHistory,
    getHistorySnapshot,
    getServerSnapshot,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = useCallback((id: string) => {
    deleteFromHistory(id);
    setExpandedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleClearAll = useCallback(() => {
    clearHistory();
    setExpandedId(null);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

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
            href="/analyze"
            className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            New analysis
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Title */}
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
            <div>
              <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                Your analysis history
              </h1>
              <p className="mt-1 text-sm text-ink/50">
                Past reports are saved on this device.
              </p>
            </div>
            {entries.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="shrink-0 rounded border border-ink/20 bg-white px-3 py-1.5 text-xs font-medium text-coral shadow-paper-sm transition-colors hover:border-coral/40 sm:text-sm"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Empty state */}
          {entries.length === 0 && (
            <div className="flex flex-col items-center rounded border border-dashed border-ink/15 bg-white/50 px-6 py-16 text-center">
              <svg
                className="mb-4 h-10 w-10 text-ink/25"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="font-display text-lg font-semibold tracking-tight">
                No analyses yet
              </p>
              <p className="mt-1 max-w-xs text-sm text-ink/50">
                Run your first resume match and it will show up here.
              </p>
              <Link
                href="/analyze"
                className="mt-6 inline-flex items-center rounded bg-cobalt px-5 py-2.5 text-sm font-medium text-white shadow-paper transition-colors hover:bg-cobalt-hover"
              >
                Analyze a resume
              </Link>
            </div>
          )}

          {/* Entries */}
          {entries.length > 0 && (
            <ul className="space-y-3 sm:space-y-4">
              {entries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <li
                    key={entry.id}
                    className="rounded border border-ink/10 bg-white shadow-paper-sm"
                  >
                    <div className="flex items-start gap-4 p-4 sm:p-5">
                      {/* Score stamp */}
                      <div
                        className={`flex h-14 w-14 shrink-0 rotate-[-3deg] items-center justify-center rounded-full border-[3px] font-mono text-sm font-bold ${scoreTone(entry.result.score)}`}
                      >
                        {entry.result.score}%
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                            {entry.result.verdict}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                            {formatDateTime(entry.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-ink/60">
                          <span className="font-medium text-ink/80">
                            {entry.resumeFileName}
                          </span>
                          {" — "}
                          {entry.jobDescription.slice(0, 120)}
                          {entry.jobDescription.length > 120 ? "…" : ""}
                        </p>

                        {/* Actions */}
                        <div className="mt-3 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => toggleExpand(entry.id)}
                            className="text-xs font-medium text-cobalt transition-colors hover:text-cobalt-hover sm:text-sm"
                          >
                            {isExpanded ? "Hide report" : "View full report"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(entry.id)}
                            className="text-xs font-medium text-coral transition-colors hover:text-coral/80 sm:text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded report */}
                    {isExpanded && (
                      <div className="border-t border-ink/10 bg-paper px-4 pb-2 pt-2 sm:px-6">
                        <Results result={entry.result} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
