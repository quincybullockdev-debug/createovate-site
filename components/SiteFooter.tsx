import Mark from "./Mark";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Mark size={22} id="footer-mark" />
          <p>
            © {year} Createovate LLC. All rights reserved.
          </p>
        </div>
        <nav aria-label="Legal" className="site-footer__links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
