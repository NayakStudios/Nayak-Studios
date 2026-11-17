import Navbar from "../component/Navbar/Navbar";
import Falls from "../component/FallsScene/Falls";
import Showroom from "../component/Showroom/Showroom";

export default function Home() {
  return (
    <main className="site">

      {/* =====================================================
          FALLING NATURE 3D BACKGROUND
      ===================================================== */}
      <Falls />

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />


      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            NAYAK STUDIOS • CREATIVE BUSINESS STUDIO
          </p>

          <h1>
            BUILDING
            <span>BEYOND LIMITS.</span>
          </h1>

          <p className="hero-description">
            Business, apps, games, animation, VFX,
            technology and creative experiences.
          </p>

          <div className="hero-actions">

            <a
              href="#showroom"
              className="primary-button"
            >
              ENTER THE STUDIO
              <span>↗</span>
            </a>

            <a
              href="#about"
              className="secondary-button"
            >
              ABOUT NAYAK
            </a>

          </div>

        </div>

        <div className="hero-side">
          NAYAK STUDIOS
          <br />
          EST. 2026
        </div>

        <div className="hero-scroll">
          SCROLL TO EXPLORE
          <span>↓</span>
        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="intro-section">

        <div className="intro-number">
          01
        </div>

        <div className="intro-content">

          <p className="section-label">
            THE STUDIO
          </p>

          <h2>
            One studio.
            <span>
              Infinite possibilities.
            </span>
          </h2>

          <p>
            Nayak Studios is an independent creative
            and technology studio exploring business,
            digital products, games and visual experiences.
          </p>

        </div>

      </section>


      {/* =====================================================
          3D SHOWROOM
      ===================================================== */}
      <Showroom />


      {/* =====================================================
          BUSINESS
      ===================================================== */}
      <section
        id="business"
        className="universe-section"
      >

        <div className="section-number">
          02
        </div>

        <div className="universe-content">

          <p className="section-label">
            VEHICLE 01 • BUSINESS
          </p>

          <h2>
            Something
            <span>
              is coming.
            </span>
          </h2>

          <p>
            New ventures, products and business
            opportunities are being explored under
            Nayak Studios.
          </p>

          <div className="status-badge">
            <span />
            COMING SOON
          </div>

        </div>

      </section>


      {/* =====================================================
          APPS + GAMES
      ===================================================== */}
      <section
        id="apps"
        className="universe-section"
      >

        <div className="section-number">
          03
        </div>

        <div className="universe-content">

          <p className="section-label">
            VEHICLE 02 • APPS
          </p>

          <h2>
            Apps.
            <span>
              Games.
            </span>
          </h2>

          <p>
            Digital products and interactive experiences
            created under Nayak Studios.
          </p>

          <div className="product-grid">

            <article className="product-card">

              <p>
                APP / 001
              </p>

              <h3>
                For Zen:
                <br />
                The Real World
              </h3>

              <span>
                RELEASED
              </span>

            </article>


            <article className="product-card">

              <p>
                APP / 002
              </p>

              <h3>
                Future
                <br />
                App
              </h3>

              <span>
                COMING SOON
              </span>

            </article>


            <article className="product-card">

              <p>
                GAME / 001
              </p>

              <h3>
                New Game
                <br />
                Universe
              </h3>

              <span>
                IN DEVELOPMENT
              </span>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT NAYAK
      ===================================================== */}
      <section
        id="about"
        className="universe-section"
      >

        <div className="section-number">
          04
        </div>

        <div className="universe-content">

          <p className="section-label">
            VEHICLE 03 • ABOUT NAYAK
          </p>

          <h2>
            Building
            <span>
              what comes next.
            </span>
          </h2>

          <p>
            Nayak Studios combines creativity,
            technology and business to build
            new experiences.
          </p>

          <div className="about-actions">

            <a
              href="mailto:contact@nayakstudios.com"
              className="outline-card"
            >

              <span>
                SUPPORT
              </span>

              <strong>
                contact@nayakstudios.com
              </strong>

              <small>
                Contact Nayak Studios
              </small>

            </a>


            <a
              href="/portfolio"
              className="outline-card"
            >

              <span>
                PRIVATE PORTFOLIO
              </span>

              <strong>
                View Portfolio
              </strong>

              <small>
                Authorized access only 🔐
              </small>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section
        id="contact"
        className="contact-section"
      >

        <div className="contact-content">

          <p className="section-label">
            05 • CONTACT
          </p>

          <h2>
            HAVE AN
            <span>
              IDEA?
            </span>
          </h2>

          <p>
            Business enquiries, collaborations,
            creative projects and opportunities.
          </p>

          <a
            href="mailto:contact@nayakstudios.com"
            className="contact-email"
          >
            contact@nayakstudios.com
            <span>↗</span>
          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="footer">

        <div className="footer-brand">
          NAYAK
          <br />
          STUDIOS
        </div>

        <div className="footer-tagline">
          CREATIVE • BUSINESS • TECHNOLOGY
        </div>

        <div className="footer-links">

          <a href="#showroom">
            Viewer
          </a>

          <a href="#business">
            Business
          </a>

          <a href="#apps">
            Apps
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Nayak Studios.
          All rights reserved.
        </div>

      </footer>

    </main>
  );
}