import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const company = [
    { label: "Cases", href: "/cases" },
    { label: "Pakete", href: "/pakete" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Insights", href: "/insights" },
    { label: "Standort Kanton Zürich", href: "/marketingagentur-zuerich" },
    { label: "Potenzialrechner", href: "/rechner" },
    { label: "Strategie-Call", href: "/strategie-call" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <footer className="bg-paper-2 text-ink">
      <div className="wrap pt-16 lg:pt-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Logo variant="full" className="h-12 w-auto text-ink" />
            <p className="t-small mt-6 max-w-[34ch] text-grey-600">
              Content, Werbung, Website und CRM aus einem Team. We create customers, not clicks.
            </p>
            <address className="t-small mt-6 not-italic text-grey-600">
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}, {site.address.region}
            </address>
            <div className="mt-4 flex flex-col gap-1">
              <a href={site.phoneHref} className="link t-small w-fit py-1 font-semibold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link t-small w-fit py-1 font-semibold">
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-4 grid grid-cols-subgrid gap-y-12 md:col-span-12 lg:col-span-8">
            <FooterCol
              title="Leistungen"
              className="col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-2"
              links={[{ label: "Übersicht", href: "/leistungen" }, ...nav.leistungen.flatMap((g) => g.links)]}
            />
            <FooterCol title="Studio" className="col-span-2 md:col-span-4 lg:col-span-2" links={nav.studio} />
            <FooterCol title="eCreator" className="col-span-4 md:col-span-4 lg:col-span-2" links={company} />
          </nav>
        </div>
      </div>

      <div className="wrap">
        <div className="mt-16 flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="t-small text-grey-500">
            © {year} {site.legalName}. Systems over campaigns.
          </p>
          <ul className="t-small flex flex-wrap gap-x-6 gap-y-1 text-grey-600">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 hover:text-ink">
                  {s.label} ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </li>
            ))}
            {nav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-2 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="t-small font-semibold text-ink">{title}</h2>
      <ul className="mt-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="t-small inline-block py-1.5 text-grey-600 transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
