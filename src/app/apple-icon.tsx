import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e8583f",
        }}
      >
        <svg width="108" height="108" viewBox="0 0 28 28" fill="none">
          <path d="M7.5 17.5a6.5 6.5 0 0 1 13 0Z" fill="#fff8f5" />
          <path d="M6.5 17.5h15" stroke="#fff8f5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
