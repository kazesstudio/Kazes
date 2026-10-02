export type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner. Deliberately dependency-free — the project does
 * not need the override semantics of `tailwind-merge` at this size.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}
