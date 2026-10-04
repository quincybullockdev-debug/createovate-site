import { ImageResponse } from "next/og";

// Home-screen icon for iPhone (180×180), drawn from the Createovate mark.
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
          background: "#0A0D1C",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="g" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6F8CFF" />
              <stop offset="0.55" stopColor="#C493FF" />
              <stop offset="1" stopColor="#FF7A45" />
            </linearGradient>
          </defs>
          <path d="M24.14 10.19 A10 10 0 1 0 24.14 21.81" stroke="url(#g)" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="26.6" cy="16" r="2.5" fill="#FF7A45" />
        </svg>
      </div>
    ),
    size
  );
}
