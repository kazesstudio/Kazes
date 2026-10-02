import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

/**
 * Default OpenGraph / Twitter card.
 *
 * Generated rather than committed as a binary so it stays in sync with the
 * brand palette and the tagline. The root layout declares
 * `twitter.card = "summary_large_image"`, so this file is what backs that
 * promise — without it the card type would claim an image that does not exist.
 *
 * Only system fonts are used: `next/og` renders with Satori, which cannot use
 * the `next/font` pipeline, and fetching a font file at build time for a single
 * social card is not worth the extra weight.
 */

export const alt = "KAZES.studio — San Francisco engineering startup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function readLogo(): string | null {
  try {
    const buffer = readFileSync(
      join(process.cwd(), "public", "brand", "logo-mark-white.png"),
    );
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

const logo = readLogo();

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(140deg, #151515 0%, #0a0a0a 55%, #232323 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- Satori requires a raw <img>
            <img
              src={logo}
              width={186}
              height={100}
              alt=""
              style={{ display: "flex" }}
            />
          ) : (
            <div style={{ fontSize: 34, letterSpacing: 1 }}>KAZES.studio</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            We engineer what comes next.
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            Forward-deployed engineering · AI systems · Hardware
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 22, color: "#8b8b93" }}>
            {siteConfig.locationLine}
          </div>
          <div style={{ fontSize: 22, color: "#d4ff3f" }}>kazes.studio</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}