import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Mona Sans (by GitHub, SIL Open Font License) — one variable font file whose
// width and weight can both change, so headlines can run wide and body text normal.
const mona = localFont({
  src: "./fonts/MonaSans-Variable.woff2",
  variable: "--font-mona",
  weight: "200 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

const description =
  "Createovate LLC is an independent software studio building focused products for local businesses and everyday people.";

export const metadata: Metadata = {
  metadataBase: new URL("https://createovate.io"),
  title: {
    default: "Createovate | Independent software studio",
    template: "%s | Createovate",
  },
  description,
  applicationName: "Createovate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Createovate",
    url: "/",
    title: "Createovate | Independent software studio",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A0D1C",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mona.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
