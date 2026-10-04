import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Createovate LLC handles information on createovate.io.",
  alternates: { canonical: "/privacy" },
};

// Keep this page true. If we add analytics, cookies, forms, or new providers
// to this site, update this policy in the same change (company rule 6).
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="legal">
        <div className="container">
          <article className="legal__inner">
            <h1>Privacy policy</h1>
            <p className="legal__updated">Effective October 4, 2026</p>

            <p>
              This policy explains how Createovate LLC (“Createovate,” “we,” or “us”) handles
              information on this website, createovate.io. Each of our products has its own privacy
              policy, which applies when you use that product.
            </p>

            <h2>What we collect</h2>
            <p>We keep this site simple on purpose.</p>
            <ul>
              <li>We don’t use cookies, analytics, advertising pixels, or other tracking on this site.</li>
              <li>This site has no sign-up or contact forms.</li>
              <li>
                If you email us, we receive your email address and whatever you choose to send. We
                use it only to reply to you.
              </li>
            </ul>

            <h2>Services that help run this site</h2>
            <ul>
              <li>
                <strong>Vercel</strong> hosts this site. To deliver pages and protect the site from
                abuse, Vercel processes technical information such as your IP address, browser type,
                and the page you requested.
              </li>
              <li>
                <strong>Google Workspace</strong> handles our email, so messages you send us are
                stored with Google.
              </li>
            </ul>

            <h2>What we never do</h2>
            <p>We never sell your personal information or share it with others for advertising.</p>

            <h2>How long we keep it</h2>
            <p>
              We keep emails only as long as we need them to help you and to keep normal business
              records. You can ask us to delete them at any time.
            </p>

            <h2>Your choices</h2>
            <p>
              Email <a href="mailto:legal@createovate.io">legal@createovate.io</a> to ask what
              information we have about you, to correct it, or to delete it. We respond within 30
              days.
            </p>

            <h2>Children</h2>
            <p>
              This site is not directed to children under 13, and we don’t knowingly collect their
              information.
            </p>

            <h2>Changes</h2>
            <p>
              If we change this policy, we’ll update it on this page and change the effective date
              above.
            </p>

            <h2>Contact</h2>
            <p>
              Createovate LLC
              <br />
              <a href="mailto:legal@createovate.io">legal@createovate.io</a>
            </p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
