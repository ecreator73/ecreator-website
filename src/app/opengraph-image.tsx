import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "eCreator · Marketingagentur Schweiz: Kunden statt Klicks.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social-Sharing-Bild im Stil der Website (Version 4): weiss, violettes Leuchten, Label-Pille,
 * Headline in Satzschreibung mit violettem Akzentwort. Schrift: Archivo (TTF lokal in src/app/_og).
 */
export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [bold, logo] = await Promise.all([
    readFile(path.join(dir, "Archivo-800.ttf")),
    readFile(path.join(process.cwd(), "public/brand/ecreator-black.svg")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          backgroundImage: "radial-gradient(60% 60% at 50% 45%, rgba(120,102,244,0.18), rgba(255,255,255,0) 75%)",
          color: "#1d1d1f",
          fontFamily: "Archivo",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(120,102,244,0.1)",
            color: "#5a48d8",
            fontSize: 24,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#7866f4" }} />
          Marketingagentur für KMU in der Schweiz
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 88, letterSpacing: -3.5, lineHeight: 1 }}>
          <span style={{ color: "#7866f4" }}>Kunden</span>
          <span style={{ marginLeft: 22 }}>statt Klicks.</span>
        </div>

        <div style={{ display: "flex", marginTop: 30, fontSize: 30, color: "#56565b", letterSpacing: -0.5 }}>
          Videos, Werbung, Website und CRM aus einem Team.
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 70,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={240} height={85} alt="" />
          <div style={{ display: "flex", fontSize: 24, color: "#56565b" }}>Content · Ads · Web · CRM</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: bold, weight: 800, style: "normal" }],
    },
  );
}
