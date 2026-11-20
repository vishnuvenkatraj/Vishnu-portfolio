import { ImageResponse } from "next/og";
import { profileData } from "@/data/profile";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#050811",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#38bdf8",
            }}
          >
            VV
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", color: "#94a3b8", letterSpacing: "2px" }}>
              ENGINEERING PORTFOLIO
            </span>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: "#f8fafc" }}>
              {profileData.name}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: "15px",
              fontWeight: 600,
              width: "fit-content",
            }}
          >
            Indian Patent Application #202641130488 • Published
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
            {profileData.role}
          </div>
          <div style={{ fontSize: "20px", color: "#94a3b8", lineHeight: 1.4 }}>
            Computer Science and Business Systems • CGPA 8.10 • Java, C, React, Node.js & AI
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Full-Stack Web", "RESQTRAK Patent", "MediConnect Healthcare", "CivicConnect", "FlowVault"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
