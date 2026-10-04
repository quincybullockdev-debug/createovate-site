import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ParticleStage from "@/components/ParticleStage";
import BookingPreview from "@/components/BookingPreview";
import CopyEmail from "@/components/CopyEmail";

const PRINCIPLES = [
  {
    title: "We build small, focused products.",
    body: "Each one does a clear job well, without the bloat.",
  },
  {
    title: "Your data stays yours.",
    body: "We collect only what a product needs, never sell it, and delete it when you ask.",
  },
  {
    title: "We don’t fake it.",
    body: "No fake reviews, no bought followers, no made-up numbers. If we claim it, we can prove it.",
  },
  {
    title: "AI builds with us. People decide.",
    body: "We use AI to move fast, and a person approves every release before it ships.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__scrim" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__content">
              <h1 id="hero-title" className="hero__title">
                <span>Create boldly.</span>
                <span>Build carefully.</span>
              </h1>
              <p className="hero__lede">
                Createovate is an independent software studio. We design and build focused
                products for local businesses and everyday people.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#products">
                  See what we’re building
                </a>
                <a className="btn btn--ghost" href="#contact">
                  Contact us
                </a>
              </div>
            </div>
            <ParticleStage />
          </div>
        </section>

        {/* Products */}
        <section id="products" className="section products" aria-labelledby="products-title">
          <div className="container products__grid">
            <div className="products__intro">
              <h2 id="products-title" className="section__title">
                What we’re building
              </h2>
              <p className="section__lede">
                Two products are in the works. Both are coming soon.
              </p>
            </div>

            <div className="products__list">
              <article className="product" aria-labelledby="bookwitme-title">
                <div className="product__info">
                  <div className="product__meta">
                    <span className="status">
                      <span className="status__dot" aria-hidden="true" />
                      Coming soon
                    </span>
                    <span className="product__platform">Web</span>
                  </div>
                  <h3 id="bookwitme-title" className="product__name">
                    BookWitMe
                  </h3>
                  <p className="product__desc">
                    Booking websites for salons, barbers, and other appointment businesses. Each
                    business gets its own site where clients pick a service, choose a time, and
                    request a booking.
                  </p>
                </div>
                <div className="product__demo">
                  <BookingPreview />
                </div>
              </article>

              <article className="product product--phone" aria-labelledby="lookmaxxing-title">
                <div className="product__info">
                  <div className="product__meta">
                    <span className="status">
                      <span className="status__dot" aria-hidden="true" />
                      Coming soon
                    </span>
                    <span className="product__platform">iPhone</span>
                  </div>
                  <h3 id="lookmaxxing-title" className="product__name">
                    lookmaxxing
                  </h3>
                  <p className="product__desc">
                    A self-improvement app for iPhone, focused on how you look and feel.
                  </p>
                </div>
                <div className="product__demo product__demo--phone" aria-hidden="true">
                  <div className="phone">
                    <div className="phone__island" />
                    <div className="phone__screen">
                      <span className="phone__orb" />
                      <span className="phone__name">lookmaxxing</span>
                      <span className="phone__soon">In development</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="how-we-work" className="section principles" aria-labelledby="principles-title">
          <div className="container principles__grid">
            <div className="principles__intro">
              <h2 id="principles-title" className="section__title">
                Small studio.
                <br />
                High standards.
              </h2>
              <p className="section__lede">
                Our name is our method: create, then innovate until it’s simple.
              </p>
            </div>
            <ul className="principles__list">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="principle">
                  <h3 className="principle__title">{p.title}</h3>
                  <p className="principle__body">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="container contact__inner">
            <h2 id="contact-title" className="contact__title">
              Talk to us.
            </h2>
            <p className="section__lede contact__lede">
              Questions, partnerships, or help with one of our products. A real person reads every
              message.
            </p>
            <dl className="contact__list">
              <div className="contact__row">
                <dt>General and support</dt>
                <dd>
                  <CopyEmail email="support@createovate.io" />
                </dd>
              </div>
              <div className="contact__row">
                <dt>Privacy and legal</dt>
                <dd>
                  <CopyEmail email="legal@createovate.io" />
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
