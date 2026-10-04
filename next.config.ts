import type { NextConfig } from "next";

// Security headers sent with every page. Each one closes a common attack path.
const securityHeaders = [
  // Browsers must treat files as the type we say, not guess (blocks file-type tricks).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites may not embed this site in a frame (blocks clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // When a visitor clicks an outside link, only send our domain, not the full URL.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // This site never needs the camera, microphone, or location.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Always use HTTPS for two years, including subdomains.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't advertise which framework we run
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
