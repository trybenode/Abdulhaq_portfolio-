import { ImageResponse } from "next/og";
export const alt =
  "Abdulhaq — Software engineer / Engineering systems. Securing the future.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#05070a",
        color: "#eaf6ff",
        padding: "65px 75px",
        flexDirection: "column",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 18,
          letterSpacing: 4,
          color: "#a4b3c2",
        }}
      >
        ABDULRASHEED O. ABDULHAQ / BLACKSITE
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          lineHeight: 1.02,
          letterSpacing: -5,
          marginTop: 55,
        }}
      >
        <span>Engineering systems.</span>
        <span style={{ color: "#00f0ff" }}>Securing the future.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: 25,
          borderTop: "1px solid #34434f",
          justifyContent: "space-between",
          fontSize: 16,
          color: "#a4b3c2",
        }}
      >
        <span>SOFTWARE ENGINEER / SECURITY-MINDED BUILDER</span>
        <span style={{ color: "#00f0ff" }}>ABDULHAQ ↗</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          top: 40,
          width: 100,
          height: 100,
          borderRadius: 50,
          border: "1px solid #00f0ff44",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00f0ff",
          fontSize: 35,
        }}
      >
        A
      </div>
    </div>,
    size,
  );
}
