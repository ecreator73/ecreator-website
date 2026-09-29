import Link from "next/link";
import { contentDay, podcastStudio } from "@/content/offers";

type Row = {
  product: string;
  href: string;
  duration: string;
  detail: string;
  price: string;
  delivery?: string;
};

const opt = (id: string) => contentDay.options.find((o) => o.id === id)!;

const rows: Row[] = [
  { product: "Content Day + Model", href: "/content-day", duration: opt("4h-model").duration, detail: "Model von eCreator", price: opt("4h-model").price.amount, delivery: "7 Arbeitstagen" },
  { product: "Content Day", href: "/content-day", duration: opt("4h").duration, detail: "ohne Model von eCreator", price: opt("4h").price.amount, delivery: "7 Arbeitstagen" },
  { product: "Full Content Day", href: "/content-day", duration: opt("8h").duration, detail: "Events, Testimonials, grosse Produktionen", price: "auf Anfrage", delivery: "14 Arbeitstagen" },
  ...podcastStudio.options.map((o) => ({
    product: `Podcast-Studio`,
    href: "/podcast-studio",
    duration: o.duration,
    detail: podcastStudio.includes.join(", "),
    price: o.price.amount,
  })),
];

/**
 * Preisliste im Fahrplan-Stil: tabellarische Ziffern, Linien, keine Pricing-Cards.
 * Auf Mobile trägt jede Zeile Dauer und Fertigstellung selbst (keine versteckten Spaltenköpfe).
 */
export function RateCard() {
  const existing = opt("3h-bestand");
  return (
    <div>
      <p className="t-meta mb-4 text-grey-600 [.studio_&]:text-grey-400">Beim Content Day immer dabei: {contentDay.includes.join(" / ")}</p>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Preise Content Day und Podcast-Studio in CHF</caption>
        <thead className="t-meta text-grey-600 [.studio_&]:text-grey-400">
          <tr className="border-b border-line-strong">
            <th scope="col" className="py-3 pr-4 font-normal">Produkt</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal md:table-cell">Dauer</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal lg:table-cell">Hinweis</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal sm:table-cell">Fertig in</th>
            <th scope="col" className="py-3 text-right font-normal">Preis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.product}-${i}`} className="group border-b border-line align-baseline">
              <th scope="row" className="py-5 pr-4 font-normal">
                <Link href={r.href} className="block">
                  <span className="t-h4 block transition-colors group-hover:text-grey-600 [.studio_&]:group-hover:text-grey-300">{r.product}</span>
                  <span className="t-meta mt-1 block text-grey-600 [.studio_&]:text-grey-400 md:hidden">
                    {r.duration}
                    {r.delivery ? ` / fertig in ${r.delivery}` : ""}
                  </span>
                  <span className="t-small mt-1 block text-grey-600 [.studio_&]:text-grey-400 lg:hidden">{r.detail}</span>
                </Link>
              </th>
              <td className="t-meta-lg hidden py-5 pr-4 md:table-cell">{r.duration}</td>
              <td className="t-small hidden py-5 pr-4 text-grey-700 [.studio_&]:text-grey-300 lg:table-cell">{r.detail}</td>
              <td className="t-meta-lg hidden py-5 pr-4 sm:table-cell">{r.delivery ?? "Termin nach Absprache"}</td>
              <td className="whitespace-nowrap py-5 text-right">
                {r.price === "auf Anfrage" ? (
                  <span className="t-h4">auf Anfrage</span>
                ) : (
                  <>
                    <span className="t-meta mr-2 text-grey-600 [.studio_&]:text-grey-400">CHF</span>
                    <span className="t-num">{r.price}</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="t-small mt-4 flex flex-col gap-1 text-grey-700 [.studio_&]:text-grey-300 md:flex-row md:flex-wrap md:gap-x-8">
        <li>
          Bestehende Kunden: Content Day {existing.duration}, CHF {existing.price.amount}
        </li>
        <li>{contentDay.express}</li>
        <li>Podcast-Studio: {podcastStudio.onRequest.join(", ")} auf Anfrage</li>
      </ul>
    </div>
  );
}
