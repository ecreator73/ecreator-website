import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Todo } from "@/components/page/Blocks";
import type { LegalBlock, LegalPage, LegalSection, LegalSheet } from "@/content/pages/legal";

/**
 * Gemeinsames Layout der Rechtstexte (/impressum, /datenschutz, /agb).
 * Ruhig: Kopf ohne Aside, Dokumentdaten + Inhaltsverzeichnis als Karte im Rand, Text in .article-Typografie.
 * Impressum: Firmenangaben als drei Karten auf grauem Band. Kein FinalCta (Vertrag C22).
 */

/** Schlüssel / Wert in einer Karte: feine Linien statt schwarzer Regel. */
function Rows({ rows }: { rows: { k: string; v: string; href?: string }[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r) => (
        <div key={r.k} className="py-3 first:pt-0 last:pb-0">
          <dt className="t-small text-grey-600">{r.k}</dt>
          <dd className="t-body mt-0.5 text-ink">
            {r.href ? (
              <a href={r.href} className="link">
                {r.v}
              </a>
            ) : (
              r.v
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** [Text](href) → Link, **fett** → strong */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
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
          <a key={k++} href={href} className="link">
            {m[1]}
          </a>
        ),
      );
    } else if (m[3]) {
      out.push(<strong key={k++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ b }: { b: LegalBlock }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          {inline(b.text)}
          {b.todo && (
            <span className="mt-2 block">
              <Todo>{b.todo}</Todo>
            </span>
          )}
        </p>
      );
    case "ul":
      return (
        <ul>
          {b.items.map((it) => (
            <li key={it.text}>
              {inline(it.text)}
              {it.todo && (
                <span className="mt-2 block">
                  <Todo>{it.todo}</Todo>
                </span>
              )}
            </li>
          ))}
        </ul>
      );
    case "address":
      return (
        <address className="not-italic text-ink">
          {b.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
      );
    case "todo":
      return (
        <p>
          <Todo>{b.text}</Todo>
        </p>
      );
  }
}

/** Nummer und Titel trennen: «12. Haftungsausschluss» → ["12", "Haftungsausschluss"] */
function splitTitle(title: string): [string | null, string] {
  const m = /^(\d+)\.\s+(.*)$/.exec(title);
  return m ? [m[1].padStart(2, "0"), m[2]] : [null, title];
}

function TocList({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="divide-y divide-line">
      {sections.map((s) => {
        const [num, label] = splitTitle(s.title);
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="t-small grid min-h-11 grid-cols-[2.25rem_1fr] items-center gap-2 py-2 text-grey-700 transition-colors hover:text-ink lg:min-h-0 lg:py-[0.3rem]"
            >
              <span className="t-meta text-grey-600">{num ?? "/"}</span>
              <span>{label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Inhaltsverzeichnis in der Randkarte: mobil aufklappbar, ab lg immer sichtbar. */
function Toc({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      <details className="group mt-4 border-t border-line lg:hidden">
        <summary className="t-small flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold text-ink [&::-webkit-details-marker]:hidden">
          <span>Inhalt · {sections.length} Abschnitte</span>
          <span aria-hidden className="text-lg leading-none transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-1">
          <TocList sections={sections} />
        </div>
      </details>
      <nav aria-label="Inhalt" className="mt-5 hidden border-t border-line pt-5 lg:block">
        <p className="t-meta mb-2 text-grey-600">Inhalt</p>
        <TocList sections={sections} />
      </nav>
    </>
  );
}

/** Impressum: Firmendaten als drei Karten auf grauem Band. */
function Sheets({ sheets }: { sheets: LegalSheet[] }) {
  return (
    <section aria-label="Firmenangaben" className="bg-paper-2">
      <div className="wrap sec-m">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sheets.map((s, i) => (
            <div key={s.id} className="card p-6 md:p-8">
              <h2 id={s.id} className="t-h4 mb-5">
                {s.title}
              </h2>
              <dl className="divide-y divide-line">
                {s.rows.map((r) => (
                  <div key={r.k} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="t-small text-grey-600">{r.k}</dt>
                    <dd className={`mt-0.5 ${i === 0 && r.k === "Firma" ? "t-h4" : "t-body text-ink"}`}>
                      {r.href ? (
                        <a href={r.href} className="link">
                          {r.v}
                        </a>
                      ) : (
                        r.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalDoc({ page }: { page: LegalPage }) {
  const { header, doc, sheets, note, toc, sections, closing, related } = page;
  return (
    <>
      <PageHeader
        crumbs={page.crumbs}
        meta={header.meta}
        title={header.title}
        lead={header.lead}
      />

      {sheets && <Sheets sheets={sheets} />}

      <section aria-label="Text">
        <div className={`wrap ${sheets ? "sec-l" : "sec-m"}`}>
          <div className="grid-12 gap-y-10">
            <aside className={`col-span-4 md:col-span-12 lg:col-span-3 ${sheets ? "hidden lg:block" : ""}`}>
              {/* Dokumentdaten und Inhalt als eine Karte, ab lg mitlaufend */}
              <div className="card p-5 md:p-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:max-h-[calc(100vh-var(--header-h)-3rem)] lg:overflow-y-auto">
                <Rows rows={doc} />
                {toc && <Toc sections={sections} />}
              </div>
            </aside>

            <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
              {note && (
                <div className="card mb-14 max-w-[44rem] p-6 md:p-8">
                  <Todo>{note.todo}</Todo>
                  <p className="t-small mt-4 max-w-[62ch] text-grey-700">{note.text}</p>
                </div>
              )}

              <div className="article">
                {sections.map((s, si) => (
                  <SectionBody key={s.id} s={s} first={si === 0} />
                ))}
                {closing && (
                  <p className="t-meta text-grey-600" style={{ marginTop: "4rem" }}>
                    {closing}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weitere Rechtstexte: die Karte trennt genug, keine Linie über die ganze Breite */}
      <section aria-label="Weitere Rechtstexte">
        <div className="wrap pb-[clamp(2.75rem,5vw,4rem)]">
          <div className="grid-12">
            <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
              <RelatedLinks title="Rechtliches" links={related} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionBody({ s, first }: { s: LegalSection; first: boolean }) {
  return (
    <>
      <h2 id={s.id} style={first ? { marginTop: 0 } : undefined}>
        {s.title}
      </h2>
      {s.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </>
  );
}
