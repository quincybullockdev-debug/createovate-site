import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using createovate.io.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="legal">
        <div className="container">
          <article className="legal__inner">
            <h1>Terms of use</h1>
            <p className="legal__updated">Effective October 4, 2026</p>

            <p>
              These terms cover your use of createovate.io, the website of Createovate LLC
              (“Createovate,” “we,” or “us”). By using this site, you agree to them. Each of our
              products has its own terms, which apply when you use that product.
            </p>

            <h2>Using this site</h2>
            <p>
              You may browse this site for personal and business information. Please don’t try to
              break, overload, or get unauthorized access to it.
            </p>

            <h2>Our content</h2>
            <p>
              The Createovate name, logo, product names, and the content of this site belong to
              Createovate LLC. Please don’t copy or reuse them without our written permission.
            </p>

            <h2>Products described here</h2>
            <p>
              Products marked “Coming soon” are still in development. Their features, availability,
              and prices may change before launch.
            </p>

            <h2>Links to other sites</h2>
            <p>
              We aren’t responsible for the content or practices of other websites we link to.
            </p>

            <h2>No warranty</h2>
            <p>
              This site is provided “as is,” without warranties of any kind. We work to keep it
              accurate and available, but we can’t promise it will always be error-free or online.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent the law allows, Createovate LLC is not liable for any indirect or
              consequential damages arising from your use of this site.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms. When we do, we’ll change the effective date above.
              Continuing to use the site means you accept the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:legal@createovate.io">legal@createovate.io</a>
            </p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
