import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paintball Parties Blacon | TriggerKings",
  description:
    "Book the ultimate mobile paintball experience for parties, stag dos, and events in Blacon. Real-time scoring, prizes, and unforgettable fun!",
};

export default function BlaconPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#181818",
        color: "#fff",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#ff3b3b" }}
      >
        Paintball Parties Blacon
      </h1>
      <p
        style={{
          maxWidth: 600,
          marginBottom: "2rem",
          fontSize: "1.2rem",
          color: "#ccc",
        }}
      >
        Looking for a unique, adrenaline-fueled event in Blacon? TriggerKings
        brings the mobile paintball range to you—perfect for birthdays, stag
        dos, and corporate events. Book now and claim your crown!
      </p>
      <a
        href="/contact"
        style={{
          background: "#ff3b3b",
          color: "#fff",
          padding: "1rem 2rem",
          borderRadius: 8,
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Enquire Now
      </a>
    </main>
  );
}
