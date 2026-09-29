const drawers = ["Videoproduktion.", "Ads-Agentur.", "Webagentur.", "CRM-Anbieter."];

/**
 * Positionierung in einem Satz: vier Anbieter werden durchgestrichen
 * (violetter Strich pro Zeile, danach grau), übrig bleibt «Ein Team».
 */
export function Manifest() {
  return (
    <section aria-labelledby="manifest-title" className="sec-l border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[50rem] text-center">
          <h2 id="manifest-title">
            <span className="t-h4 block text-grey-600">Video, Kampagne, Website, CRM. Oft sind das vier Anbieter:</span>{" "}
            <span className="t-h2 mt-6 block">
              {drawers.map((d, i) => (
                <span key={d} className="block">
                  <span className="strike whitespace-nowrap" style={{ ["--d" as string]: `${i * 160}ms` }}>
                    {d}
                  </span>{" "}
                </span>
              ))}
            </span>{" "}
            <span className="t-h1 mt-8 block">Ein Team.</span>
          </h2>
          <p className="t-lead mx-auto mt-8 max-w-[46ch] text-grey-700" data-reveal>
            Sonst passt das Video nicht zur Landingpage, die Landingpage nicht zum CRM, und am Ende weiss niemand, welche
            Anzeige einen Kunden gebracht hat. Bei eCreator greift das ineinander, und alle schauen auf dieselbe Zahl:{" "}
            <strong className="font-semibold text-ink">neue Kunden.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
