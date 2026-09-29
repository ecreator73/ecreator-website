/**
 * Firmendaten für Impressum und Structured Data.
 * Quellen: Impressum ecreator.ch, Handelsregister ZH via Moneyhouse (SHAB 03.03.2026), siehe _research/FACTS.md.
 */
export const company = {
  legalName: "eCreator GmbH",
  legalForm: "Gesellschaft mit beschränkter Haftung",
  uid: "CHE-462.387.483",
  registerNo: "CH-020.4.091.361-6",
  register: "Handelsregister des Kantons Zürich",
  seat: "Neerach",
  /** HR-Eintrag der GmbH. Die Marke eCreator ist älter (Website Spitex Nächstenpflege © 2025). */
  registeredOn: "2026-02-26",
  /** Nicht ins Schema, solange unklar ist, ob die Marke oder die GmbH gemeint ist. */
  foundingDate: null as string | null,
  /** Geschäftsführung laut Impressum der Live-Site */
  management: "Claudio Peres & Fabian Mbah",
  founders: [
    { name: "Claudio Peres", role: "Co-Inhaber, Geschäftsführung" },
    { name: "Fabian Mbah", role: "Co-Inhaber, Geschäftsführung" },
  ],
};
