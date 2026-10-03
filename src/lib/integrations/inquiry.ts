/**
 * Anfrage-Integration (serverseitig). Austauschbar ohne UI-Änderung.
 *
 * Provider-Reihenfolge:
 *  1. INQUIRY_WEBHOOK_URL gesetzt → JSON-POST dorthin (z.B. CRM, Make/Zapier, eigene Edge Function)
 *  2. sonst: lokal in .data/inquiries.jsonl speichern (nur für die lokale Beurteilung)
 *
 * TODO vor Livegang: Ziel-CRM festlegen, Datenschutzerklärung (Auftragsverarbeiter) ergänzen.
 */

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { ANLIEGEN, type Anliegen } from "@/content/anliegen";
export { ANLIEGEN, type Anliegen };

export type Inquiry = {
  anliegen: Anliegen;
  name: string;
  firma?: string;
  email: string;
  telefon?: string;
  nachricht: string;
  quelle?: string;
};

export type InquiryResult = { ok: true; id: string } | { ok: false; error: string };

export function validateInquiry(data: Record<string, unknown>): { value?: Inquiry; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const str = (k: string) => (typeof data[k] === "string" ? (data[k] as string).trim() : "");
  const anliegen = str("anliegen") as Anliegen;
  if (!ANLIEGEN.some((a) => a.value === anliegen)) errors.anliegen = "Bitte wähle ein Anliegen.";
  const name = str("name");
  if (name.length < 2) errors.name = "Bitte gib deinen Namen an.";
  const email = str("email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Bitte gib eine gültige E-Mail-Adresse an.";
  const telefon = str("telefon");
  if (telefon && !/^[+\d][\d\s()/-]{6,}$/.test(telefon)) errors.telefon = "Bitte prüfe die Telefonnummer.";
  const nachricht = str("nachricht");
  if (nachricht.length < 10) errors.nachricht = "Ein, zwei Sätze zu deinem Anliegen helfen uns bei der Vorbereitung.";
  if (data.datenschutz !== true && data.datenschutz !== "on") errors.datenschutz = "Bitte bestätige die Datenschutzerklärung.";
  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    value: {
      anliegen,
      name,
      firma: str("firma") || undefined,
      email,
      telefon: telefon || undefined,
      nachricht,
      quelle: str("quelle") || undefined,
    },
  };
}

export async function submitInquiry(inquiry: Inquiry): Promise<InquiryResult> {
  const id = `anf_${Date.now().toString(36)}`;
  const payload = { id, receivedAt: new Date().toISOString(), ...inquiry };
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return { ok: false, error: `Webhook antwortete mit ${res.status}` };
      return { ok: true, id };
    } catch {
      return { ok: false, error: "Webhook nicht erreichbar" };
    }
  }

  // Vorschau auf Vercel ohne Webhook: dort ist das Dateisystem schreibgeschützt, eine Ablage ginge verloren.
  // Ehrlich melden statt still verlieren; das Formular zeigt dann E-Mail und Telefon.
  if (process.env.VERCEL === "1") return { ok: false, error: "preview" };

  // Lokale Ablage (Beurteilungsphase)
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "inquiries.jsonl"), JSON.stringify(payload) + "\n", "utf8");
    return { ok: true, id };
  } catch {
    return { ok: false, error: "Lokale Ablage fehlgeschlagen" };
  }
}
