import Mark from "./Mark";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a href="/" className="brand" aria-label="Createovate home">
          <Mark size={26} id="header-mark" />
          <span className="brand__name">Createovate</span>
        </a>
        <nav aria-label="Main" className="site-nav">
          <a href="/#products" className="site-nav__link site-nav__link--hide-sm">
            Products
          </a>
          <a href="/#how-we-work" className="site-nav__link site-nav__link--hide-sm">
            How we work
          </a>
          <a href="/#contact" className="site-nav__cta">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
