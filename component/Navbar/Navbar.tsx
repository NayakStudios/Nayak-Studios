"use client";

export default function Navbar() {
  return (
    <header className="navbar">

      <a
        href="/"
        className="navbar-logo"
      >
        <span className="logo-mark">
          N
        </span>

        <span className="logo-text">
          NAYAK
          <small>STUDIOS</small>
        </span>
      </a>


      <nav className="navbar-links">

        <a href="/">
          Home
        </a>

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

      </nav>


      <a
        href="/portfolio"
        className="navbar-portfolio"
      >
        PORTFOLIO
        <span>↗</span>
      </a>

    </header>
  );
}