import { site } from "@/content/site";
import { company } from "@/content/company";

/**
 * Structured Data (schema.org). Keine Bewertungen/Ratings im Schema:
 * Google-Reviews werden nicht als AggregateRating ausgegeben, solange keine
 * eigenen, prüfbaren Review-Daten auf der Seite stehen.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: abs("/brand/ecreator-black.svg"),
    image: abs("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    ...(company.foundingDate ? { foundingDate: company.foundingDate } : {}),
    ...(company.uid ? { taxID: company.uid } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.regionCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "Country", name: "Schweiz" },
      { "@type": "AdministrativeArea", name: "Kanton Zürich" },
    ],
    knowsAbout: [
      "Performance Marketing",
      "Meta Ads",
      "Google Ads",
      "TikTok Ads",
      "Content-Produktion",
      "Social Media Marketing",
      "Webdesign",
      "Suchmaschinenoptimierung",
      "Answer Engine Optimization",
      "CRM",
      "Marketing-Automation",
      "Social Recruiting",
      "Podcast-Produktion",
    ],
    founder: company.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "de-CH",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  offers?: { name: string; price: string; unitText?: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Schweiz" },
    ...(opts.offers?.length
      ? {
          offers: opts.offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: o.price,
            priceCurrency: "CHF",
            ...(o.description ? { description: o.description } : {}),
            ...(o.unitText
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: o.price,
                    priceCurrency: "CHF",
                    unitText: o.unitText,
                  },
                }
              : {}),
          })),
        }
      : {}),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "de-CH",
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.image ? { image: abs(opts.image) } : {}),
    author: opts.authorName
      ? { "@type": "Person", name: opts.authorName, worksFor: { "@id": ORG_ID } }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function personSchema(p: { name: string; jobTitle: string; image?: string; description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    ...(p.image ? { image: abs(p.image) } : {}),
    ...(p.description ? { description: p.description } : {}),
    worksFor: { "@id": ORG_ID },
  };
}
