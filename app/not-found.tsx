import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container missing">
        <h1>This page doesn’t exist.</h1>
        <p>The link may be old, or the address may have a typo.</p>
        <a className="btn btn--primary" href="/">
          Go to the home page
        </a>
      </main>
    </>
  );
}
