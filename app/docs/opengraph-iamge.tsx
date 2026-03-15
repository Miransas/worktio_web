import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        background: "#030303",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 40%, rgba(124,58,237,0.2) 0%, transparent 60%)",
        }} />
        <div style={{
          fontSize: "20px",
          color: "#a78bfa",
          fontWeight: 700,
          marginBottom: "16px",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}>
          Worktio Docs
        </div>
        <div style={{
          fontSize: "72px",
          fontWeight: 900,
          color: "white",
          letterSpacing: "-3px",
        }}>
          Dokümantasyon
        </div>
        <div style={{
          fontSize: "24px",
          color: "rgba(113,113,122,1)",
          marginTop: "16px",
        }}>
          Kurulum, Flow Builder, AI Agent rehberleri
        </div>
      </div>
    ),
    { ...size }
  );
}