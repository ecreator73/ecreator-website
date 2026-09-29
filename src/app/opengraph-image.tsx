import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "eCreator · Marketingagentur Schweiz: Wir machen aus Aufmerksamkeit Kunden.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-Sharing-Bild im Stil der Website: Papier, Tinte, ein violettes Signal. */
export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [bold, expanded, mono, logo] = await Promise.all([
    readFile(path.join(dir, "Archivo-800.ttf")),
    readFile(path.join(dir, "Archivo-Expanded-600.ttf")),
    readFile(path.join(dir, "FragmentMono-Regular.ttf")),
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
          justifyContent: "space-between",
          background: "#f4f3ef",
          color: "#0b0b0c",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Mono",
            fontSize: 20,
            letterSpacing: 1,
            color: "#55555a",
            borderBottom: "1px solid rgba(11,11,12,0.2)",
            paddingBottom: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#7866f4" }} />
            MARKETINGAGENTUR SCHWEIZ
          </div>
          <div style={{ display: "flex" }}>CONTENT / ADS / WEB / CRM</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontSize: 104, lineHeight: 0.9, letterSpacing: -4 }}>
          <div style={{ display: "flex" }}>Wir machen aus</div>
          <div style={{ display: "flex" }}>Aufmerksamkeit</div>
          <div style={{ display: "flex" }}>
            Kunden<span style={{ color: "#7866f4" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontFamily: "Expanded", fontSize: 26, letterSpacing: 2 }}>
            SYSTEMS<span style={{ color: "#7866f4", margin: "0 12px" }}>/</span>OVER
            <span style={{ color: "#7866f4", margin: "0 12px" }}>/</span>CAMPAIGNS.
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={106} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
        { name: "Expanded", data: expanded, weight: 600, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
