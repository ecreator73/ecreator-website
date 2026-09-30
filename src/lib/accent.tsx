import type { ReactNode } from "react";

/**
 * Setzt das erste Vorkommen von `word` in `text` als violettes Akzentwort (Utility text-accent).
 * Ohne Treffer bleibt der Text unverändert. Pro Titel höchstens ein Akzent.
 */
export function withAccent(text: string, word?: string): ReactNode {
  if (!word) return text;
  const i = text.indexOf(word);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}
