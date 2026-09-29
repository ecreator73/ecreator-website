import { submitInquiry, validateInquiry } from "@/lib/integrations/inquiry";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: echte Menschen füllen dieses Feld nicht aus.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return Response.json({ ok: true, id: "ignored" });
  }

  const { value, errors } = validateInquiry(data);
  if (!value) return Response.json({ ok: false, errors }, { status: 422 });

  const result = await submitInquiry(value);
  if (!result.ok) return Response.json({ ok: false, error: "Senden fehlgeschlagen." }, { status: 502 });
  return Response.json({ ok: true, id: result.id });
}
