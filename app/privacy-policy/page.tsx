
export default function PrivacyPolicy() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "60px 24px",
        color: "#e5e7eb",
        background: "#050816",
        minHeight: "100vh",
        lineHeight: 1.8,
      }}
    >
      <h1 style={{ color: "white" }}>Privacy Policy</h1>
      <p>Last updated: November 17, 2026</p>

      <p>
        Nayak Studios ("we", "our", or "us") respects your
        privacy. This Privacy Policy explains how information
        may be handled when you play SIA: The Survival Nightmare.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We do not intentionally ask players to provide personal
        information such as their name, phone number, or email
        address to play the game.
      </p>
      <p>
        However, the game and its third-party services may
        process technical information such as device details,
        advertising identifiers, app interactions, and
        diagnostic information.
      </p>

      <h2>2. Advertising</h2>
      <p>
        Our game uses Google AdMob to display advertisements.
        Google and its advertising partners may collect and
        process information, including advertising identifiers
        and information about ad interactions, to provide,
        measure, and improve advertising, subject to their
        applicable policies and settings.
      </p>
      <p>
        Learn more:
        {" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#60a5fa" }}
        >
          Google Advertising Policies
        </a>
      </p>

      <h2>3. Third-Party Services</h2>
      <p>
        The game may use third-party services such as Google
        AdMob. These services operate under their own privacy
        policies. We encourage players to review them.
      </p>

      <h2>4. Data Security and Retention</h2>
      <p>
        We do not operate a separate personal-data account
        system for this game. Information processed by
        third-party services is handled according to their
        respective policies and retention practices.
      </p>

      <h2>5. Children's Privacy</h2>
      <p>
        This game is not specifically directed at children
        under 13. We do not knowingly collect personal
        information directly from children. If you believe
        that a child has provided personal information,
        please contact us.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Any changes will be published on this page.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy,
        contact Nayak Studios through our website:
      </p>
      <a
        href="https://nayak-studios.vercel.app/"
        style={{ color: "#60a5fa" }}
      >
        Nayak Studios
      </a>

      <p style={{ marginTop: "40px", color: "#9ca3af" }}>
        © 2026 Nayak Studios. All rights reserved.
      </p>
    </main>
  );
}
