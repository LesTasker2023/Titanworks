"use client";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#fff",
        fontFamily: "'Bebas Neue', sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Logo */}
      <div className="logo" />

      {/* Headline */}
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#ff3b3b",
          textShadow: "0 0 15px rgba(255,59,59,0.7)",
        }}
      >
        Mobile Paintball Range
      </h1>

      {/* Tagline */}
      <p
        style={{
          maxWidth: "600px",
          marginBottom: "2rem",
          fontSize: "1.2rem",
          lineHeight: "1.5",
          color: "#ccc",
        }}
      >
        Challenge your friends. Smash the high score. Claim your crown at
        markets, fairs, parties, and events.
      </p>

      {/* Coming Soon Badge */}
      <span
        style={{
          display: "inline-block",
          border: "2px solid #ff3b3b",
          padding: "0.85rem 2rem",
          borderRadius: "50px",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: "#ff3b3b",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLSpanElement;
          target.style.background = "#ff3b3b";
          target.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLSpanElement;
          target.style.background = "transparent";
          target.style.color = "#ff3b3b";
        }}
      >
        Coming Soon
      </span>
    </main>
  );
}
