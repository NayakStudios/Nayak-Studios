export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "20px 40px",
        background: "#07111f",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ margin: 0 }}>Nayak Studios</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </a>
        <a href="#about" style={{ color: "white", textDecoration: "none" }}>
          About
        </a>
        <a href="#games" style={{ color: "white", textDecoration: "none" }}>
          Games
        </a>
        <a href="#contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </a>
      </div>
    </nav>
  );
}