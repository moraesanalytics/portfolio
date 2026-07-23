import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Business Intelligence & Data Analytics`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#F8F9F8",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4E665D",
            fontWeight: 600,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 88,
            lineHeight: 1.1,
            color: "#2F3437",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Business Intelligence</span>
          <span>Data Analytics</span>
          <span style={{ color: "#4E665D", fontStyle: "italic" }}>
            Automation
          </span>
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              width: 14,
              height: 36,
              backgroundColor: "#4E665D",
              opacity: 0.35,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 14,
              height: 64,
              backgroundColor: "#4E665D",
              opacity: 0.6,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 14,
              height: 88,
              backgroundColor: "#4E665D",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
