import type { HistoryEntry } from "@/types/index";

const STORAGE_KEY = "resume-match-history";
const MAX_ENTRIES = 30;

let cache: HistoryEntry[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry);
  } catch {
    return [];
  }
}

function persist(history: HistoryEntry[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}

function commit(history: HistoryEntry[]): boolean {
  let ok = persist(history);
  if (!ok) {
    // Storage likely full — keep only the newest half and retry once.
    ok = persist(history.slice(0, Math.floor(MAX_ENTRIES / 2)));
  }
  if (ok) {
    cache = null;
    for (const listener of listeners) listener();
  }
  return ok;
}

export function subscribeToHistory(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Stable snapshot for useSyncExternalStore — same reference until mutated. */
export function getHistorySnapshot(): HistoryEntry[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

export function saveToHistory(
  entry: Omit<HistoryEntry, "id" | "createdAt">,
): HistoryEntry | null {
  const newEntry: HistoryEntry = {
    ...entry,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const ok = commit([newEntry, ...readFromStorage()].slice(0, MAX_ENTRIES));
  return ok ? newEntry : null;
}

export function deleteFromHistory(id: string): void {
  commit(readFromStorage().filter((entry) => entry.id !== id));
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures when clearing.
  }
  cache = null;
  for (const listener of listeners) listener();
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.createdAt === "string" &&
    typeof entry.resumeFileName === "string" &&
    typeof entry.jobDescription === "string" &&
    typeof entry.result === "object" &&
    entry.result !== null
  );
}
