/** Anliegen für das Anfrageformular (Client + Server). Vorwahl per ?anliegen=<value>. */
export const ANLIEGEN = [
  { value: "strategie-call", label: "Strategie-Call / allgemeine Anfrage" },
  { value: "performance", label: "Performance Marketing" },
  { value: "content-day", label: "Content Day" },
  { value: "podcast-studio", label: "Podcast-Studio" },
  { value: "recruiting", label: "Social Recruiting" },
  { value: "website", label: "Website-Projekt" },
  { value: "seo", label: "SEO / AEO" },
  { value: "crm", label: "CRM & Automation" },
  { value: "pakete", label: "Pakete Pro / Advanced" },
  { value: "anderes", label: "Etwas anderes" },
] as const;

export type Anliegen = (typeof ANLIEGEN)[number]["value"];
