import { ImageResponse } from "next/og";

export const alt = "Ternline Wholesale Commerce — workplace products for repeat orders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F6F1E8",
        color: "#17211E",
        fontFamily: "Arial, sans-serif",
        borderTop: "28px solid #123849",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            width: 54,
            height: 54,
            border: "3px solid #123849",
            alignItems: "center",
            justifyContent: "center",
            color: "#123849",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          TL
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 10 }}>TERNLINE</div>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
          <div
            style={{
              color: "#5A6560",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Wholesale workplace systems
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.03 }}>
            Useful goods for repeat workplace orders.
          </div>
          <div style={{ color: "#5A6560", fontSize: 25, lineHeight: 1.4, marginTop: 24 }}>
            Browse by category, enter known SKUs, and prepare a reviewable wholesale request.
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "2px solid #D9D9D1",
          paddingTop: 24,
          justifyContent: "space-between",
          color: "#5A6560",
          fontSize: 18,
        }}
      >
        <span>12 products · 4 operational categories</span>
        <span style={{ color: "#123849", fontWeight: 700 }}>Trade catalog · USD</span>
      </div>
    </div>,
    size,
  );
}
