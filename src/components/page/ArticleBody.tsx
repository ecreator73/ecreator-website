import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Artikel-Inhalte als typisierte Blöcke (kein MDX nötig, zentral pflegbar).
 * Inline-Links im Text: [Linktext](/pfad) wird automatisch in <Link> umgewandelt.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "checklist"; items: string[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** [Text](/pfad) → Link, **fett** → strong */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href} className="link">
            {m[1]}
          </Link>
        ) : (
          <a key={k++} href={href} className="link" target="_blank" rel="noopener noreferrer">
            {m[1]}
          </a>
        ),
      );
    } else if (m[3]) {
      out.push(
        <strong key={k++} className="font-semibold">
          {m[3]}
        </strong>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function headingsOf(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id ?? slug(b.text), text: b.text }));
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{inline(b.text)}</p>;
          case "h2":
            return (
              <h2 key={i} id={b.id ?? slug(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{inline(it)}</li>
                ))}
              </ol>
            );
          case "checklist":
            return (
              <ul key={i} className="checklist">
                {b.items.map((it) => (
                  <li key={it}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="table-wrap">
                <table>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri}>
                        {r.map((c, ci) => (ci === 0 ? <th key={ci} scope="row">{inline(c)}</th> : <td key={ci}>{inline(c)}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="callout">
                {b.title && <p className="callout-title">{b.title}</p>}
                <p>{inline(b.text)}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <p>{inline(b.text)}</p>
                {b.by && <footer>{b.by}</footer>}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
