import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
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
        {/* ~70% safe zone so Android's adaptive-icon mask doesn't clip the mark */}
        <svg width="230" height="230" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c-2.8 3.2-5 6.4-5 9.5A5 5 0 0 0 12 17a5 5 0 0 0 5-4.5C17 9.4 14.8 6.2 12 3Z"
            fill="#fff8f5"
          />
        </svg>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
