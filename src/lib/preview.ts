/**
 * Vorschau auf Vercel (z.B. *.vercel.app): nicht indexieren und Formulare nicht scharf schalten,
 * solange die Seite nicht unter ecreator.ch live ist. Beim Livegang in Vercel SITE_INDEXING=on setzen
 * (und INQUIRY_WEBHOOK_URL für das Formular).
 * Lokal (npm run dev / npm start) gilt das nicht.
 */
export const isVercelPreview = process.env.VERCEL === "1" && process.env.SITE_INDEXING !== "on";
