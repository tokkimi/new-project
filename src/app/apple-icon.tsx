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
        <svg width="108" height="108" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c-2.8 3.2-5 6.4-5 9.5A5 5 0 0 0 12 17a5 5 0 0 0 5-4.5C17 9.4 14.8 6.2 12 3Z"
            fill="#fff8f5"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
