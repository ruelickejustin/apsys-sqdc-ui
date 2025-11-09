import { z } from "zod";

const Version = 1 as const;

export const DayEntry = z.object({
  date: z.string(),             // ISO-String
  status: z.enum(["S", "Q", "D", "C", "OK", "NOK"]).default("OK"),
  note: z.string().optional()
});

export const BoardConfig = z.object({
  version: z.number().default(Version),
  title: z.string().default("SQDC-Board"),
  month: z.string(),            // "2025-11"
  days: z.array(DayEntry)
});

export type TBoardConfig = z.infer<typeof BoardConfig>;

const KEY = "sqdc/config";

export function load(): TBoardConfig | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return BoardConfig.parse(migrate(data));
  } catch {
    return null;
  }
}

export function save(cfg: TBoardConfig): void {
  const parsed = BoardConfig.parse(cfg);
  localStorage.setItem(KEY, JSON.stringify(parsed));
}

export function exportJson(): string {
  const data = load();
  return JSON.stringify(data, null, 2);
}

export function importJson(json: string): TBoardConfig {
  const data = JSON.parse(json);
  const parsed = BoardConfig.parse(migrate(data));
  save(parsed);
  return parsed;
}

// Warum: einfache Vorwärtskompatibilität bei Strukturänderungen
function migrate(input: any): any {
  if (!input || typeof input !== "object") return input;
  if (typeof input.version !== "number") input.version = Version;
  return input;
}
