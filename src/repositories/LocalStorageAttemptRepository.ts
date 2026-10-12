import type { AttemptRepository, PracticeAttempt } from "@/domain/types";

const STORAGE_KEY = "cipherschools-lld-attempts-v1";

export class LocalStorageAttemptRepository implements AttemptRepository {
  private storage(): Storage | undefined {
    try { return typeof window === "undefined" ? undefined : window.localStorage; } catch { return undefined; }
  }
  getAll(): PracticeAttempt[] {
    const storage = this.storage();
    if (!storage) return [];
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isAttempt).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    } catch { return []; }
  }
  save(attempt: PracticeAttempt): void {
    const storage = this.storage();
    if (!storage) throw new Error("Browser storage is unavailable. Your evaluation is shown, but this attempt could not be saved.");
    try { storage.setItem(STORAGE_KEY, JSON.stringify([attempt, ...this.getAll()])); }
    catch { throw new Error("Browser storage could not save this attempt. Your evaluation is shown, but the history was not updated."); }
  }
  clear(): void {
    const storage = this.storage();
    if (!storage) throw new Error("Browser storage is unavailable.");
    try { storage.removeItem(STORAGE_KEY); } catch { throw new Error("Browser storage could not clear the history."); }
  }
}

function isAttempt(value: unknown): value is PracticeAttempt {
  if (!value || typeof value !== "object") return false;
  const a = value as Partial<PracticeAttempt>;
  return typeof a.id === "string" && typeof a.problemId === "string" && typeof a.submittedAt === "string" &&
    !!a.answers && typeof a.answers === "object" && !!a.evaluation && typeof a.evaluation.score === "number" &&
    typeof a.evaluation.label === "string" && Array.isArray(a.evaluation.strengths) &&
    Array.isArray(a.evaluation.missingInformation) && Array.isArray(a.evaluation.suggestions);
}
