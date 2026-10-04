// The Createovate mark: an open ring (the "C") with a spark in its opening.
// The same shape is the last form the hero particles build ("Ship").
export default function Mark({ size = 28, id = "mark" }: { size?: number; id?: string }) {
  const gradientId = `${id}-grad`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6F8CFF" />
          <stop offset="0.55" stopColor="#C493FF" />
          <stop offset="1" stopColor="#FF7A45" />
        </linearGradient>
      </defs>
      <path
        d="M24.14 10.19 A10 10 0 1 0 24.14 21.81"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <circle cx="26.6" cy="16" r="2.5" fill="#FF7A45" />
    </svg>
  );
}
