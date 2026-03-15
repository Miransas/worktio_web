import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Worktio — n8n'den Güçlü Otomasyon Platformu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030303",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Arka plan glow */}
        <div style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-200px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        }} />

        {/* Grid pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* İçerik */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          padding: "0 80px",
          textAlign: "center",
        }}>
          {/* Logo */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(124,58,237,0.6)",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" />
              </svg>
            </div>
            <span style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}>
              WORKTIO
            </span>
          </div>

          {/* Ana başlık */}
          <div style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "16px",
          }}>
            Otomasyonu
          </div>
          <div style={{
            fontSize: "64px",
            fontWeight: 900,
            background: "linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "32px",
          }}>
            Yeniden Düşün
          </div>

          {/* Alt açıklama */}
          <div style={{
            fontSize: "22px",
            color: "rgba(161,161,170,1)",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}>
            Flow Builder + AI Agent + Gerçek zamanlı execution
          </div>

          {/* Özellik pilleri */}
          <div style={{
            display: "flex",
            gap: "12px",
          }}>
            {["Flow Builder", "AI Agent", "Webhook Trigger", "GPT-4o"].map(tag => (
              <div key={tag} style={{
                padding: "8px 20px",
                borderRadius: "100px",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#c4b5fd",
                fontSize: "16px",
                fontWeight: 600,
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}