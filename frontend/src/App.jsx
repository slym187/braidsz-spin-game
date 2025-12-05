import { useState } from "react";

const OFFERS = [
  { label: "$10 off", description: "$10 off your total service." },
  { label: "$15 off", description: "$15 off braids over $200." },
  {
    label: "$50 off extra full boho",
    description: "$50 off your extra full boho style.",
  },
  { label: "Free boho hair", description: "Free boho curly hair added." },
  { label: "$25 off next appointment", description: "$25 off your next visit." },
  { label: "Try again", description: "No win this time, spin again 🥹" },
];

// Your real booking link
const BOOKING_LINK = "https://braidszbyslym.as.me";

function App() {
  const [form, setForm] = useState({
    name: "",
    style: "",
    instagram: "",
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setCopied(false);
  };

  const handleSpin = () => {
    // only name is required
    if (!form.name.trim()) {
      setError("Please enter your name before spinning.");
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setHasSpun(true);
    setError("");
    setCopied(false);

    setTimeout(() => {
      const weightedOffers = [
        "10", "10", "10", // $10 off (3)
        "15", "15",       // $15 off (2)
        "boho",           // $50 off (1 - rare)
        "free", "free",   // Free boho hair (2)
        "25",             // $25 off (1)
        "none", "none",   // Try again (2)
      ];

      const randomPick =
        weightedOffers[Math.floor(Math.random() * weightedOffers.length)];

      switch (randomPick) {
        case "10":
          setResult(OFFERS[0]);
          break;
        case "15":
          setResult(OFFERS[1]);
          break;
        case "boho":
          setResult(OFFERS[2]);
          break;
        case "free":
          setResult(OFFERS[3]);
          break;
        case "25":
          setResult(OFFERS[4]);
          break;
        default:
          setResult(OFFERS[5]);
      }

      setIsSpinning(false);
    }, 1500);
  };

  const handleShare = async () => {
    if (!result) {
      setError("Spin the wheel first to get an offer to share.");
      return;
    }

    const lines = [
      "Braidsz by Slym · Spin Result ✨",
      "",
      `Name: ${form.name || "(not provided)"}`,
      `Requested Style: ${form.style || "(not specified)"}`,
      form.instagram ? `Instagram: ${form.instagram}` : null,
      "",
      `Offer: ${result.label}`,
      result.description ? `Details: ${result.description}` : null,
      "",
      "To book with this offer, use this link:",
      BOOKING_LINK,
    ].filter(Boolean);

    const text = lines.join("\n");

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError("");
      } else {
        alert("Copy not supported here. You can screenshot this screen instead.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not copy. You can screenshot this screen instead.");
    }
  };

  const handleBookNow = () => {
    if (!result) {
      setError("Spin the wheel first, then book with your offer.");
      return;
    }

    window.open(BOOKING_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fdf1f7, #fae1ec 40%, #fbdde8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          borderRadius: "1.75rem",
          padding: "2rem",
          background:
            "linear-gradient(135deg, rgba(255,240,246,0.92), rgba(255,234,244,0.95))",
          boxShadow:
            "0 20px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(148,163,184,0.18)",
          display: "grid",
          gap: "1.75rem",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.1fr)",
          border: "1px solid rgba(255,230,240,0.8)",
        }}
      >
        {/* Left: Brand + Form */}
        <section>
          <header style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.2rem 0.7rem",
                borderRadius: "999px",
                backgroundColor: "#ffe0ec",
                border: "1px solid #ffb7d3",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle at 30% 20%, #ff7bbd, #ff3c91)",
                }}
              ></span>
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.11em",
                  color: "#b91c57",
                  fontWeight: 600,
                }}
              >
                Braidsz by Slym · Promo Spin
              </span>
            </div>

            <h1
              style={{
                fontSize: "1.9rem",
                margin: 0,
                color: "#3b041a",
              }}
            >
              Spin for your braid deal 💖
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#7a1b46",
                marginTop: "0.4rem",
                maxWidth: "28rem",
              }}
            >
              Enter your details, spin once, then screenshot or copy your result.
              Use it immediately when you book your appointment.
            </p>
          </header>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                style={inputStyle}
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={labelStyle}>Requested style (optional)</label>
              <input
                style={inputStyle}
                type="text"
                name="style"
                placeholder="Medium knotless, extra full boho, etc."
                value={form.style}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={labelStyle}>Instagram handle (optional)</label>
              <input
                style={inputStyle}
                type="text"
                name="instagram"
                placeholder="@yourhandle"
                value={form.instagram}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p
                style={{
                  margin: 0,
                  marginTop: "0.2rem",
                  fontSize: "0.78rem",
                  color: "#b91c1c",
                }}
              >
                {error}
              </p>
            )}

            {hasSpun && !isSpinning && result && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.82rem",
                  color: "#7a1b46",
                  background: "#ffe4ef",
                  width: "fit-content",
                  padding: "0.35rem 0.65rem",
                  borderRadius: "0.65rem",
                }}
              >
                You already spun. Screenshot or share your result, then tap “Book
                now” 💕
              </p>
            )}

            <button
              type="button"
              onClick={handleSpin}
              style={{
                marginTop: "0.8rem",
                padding: "0.85rem 1.1rem",
                borderRadius: "999px",
                border: "none",
                background: isSpinning
                  ? "#e5e7eb"
                  : "linear-gradient(135deg, #ff8bbd, #cc3f91)",
                color: isSpinning ? "#9ca3af" : "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: isSpinning ? "wait" : "pointer",
                boxShadow: isSpinning
                  ? "none"
                  : "0 10px 28px rgba(255, 105, 180, 0.3)",
                transition:
                  "transform 0.1s ease, box-shadow 0.1s ease, opacity 0.1s ease",
              }}
            >
              {isSpinning ? "Spinning..." : "Spin the wheel"}
            </button>

            {BOOKING_LINK && (
              <p
                style={{
                  marginTop: "0.6rem",
                  fontSize: "0.78rem",
                  color: "#7a1b46",
                }}
              >
                After you spin, you can go straight to booking using the “Book
                now” button on the right.
              </p>
            )}
          </form>
        </section>

        {/* Right: Wheel + Result + Booking CTA */}
        <section
          style={{
            background:
              "radial-gradient(circle at top left, #ffe3ef, #fccada 50%, #ffe8f1)",
            padding: "1.25rem",
            borderRadius: "1rem",
            border: "1px solid rgba(255,200,220,0.6)",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          {/* Wheel */}
          <div
            style={{
              width: "230px",
              height: "230px",
              borderRadius: "999px",
              margin: "0 auto",
              marginBottom: "1.2rem",
              background:
                "conic-gradient(#ffe3ef, #ffc3dd, #ffa6ca, #ffc3dd, #ffe3ef)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isSpinning ? "rotate(560deg)" : "rotate(0deg)",
              transition: "transform 1.5s cubic-bezier(0.24, 0.74, 0.58, 1)",
              boxShadow:
                "0 16px 40px rgba(255, 105, 180, 0.35), inset 0 0 0 12px rgba(255,255,255,0.9)",
            }}
          >
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "999px",
                background: "#6e163a",
                color: "#ffeaf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0.8rem",
                fontSize: "0.85rem",
              }}
            >
              {isSpinning
                ? "Good luck boo! 💕"
                : result
                ? result.label
                : "Spin to reveal your braid deal"}
            </div>
          </div>

          {/* Result + actions */}
          <div
            style={{
              background: "rgba(255,240,246,0.96)",
              borderRadius: "1rem",
              padding: "1rem",
              boxShadow: "0 6px 16px rgba(255,105,180,0.25)",
            }}
          >
            {!result ? (
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  color: "#7a1b46",
                  fontSize: "0.9rem",
                }}
              >
                Spin the wheel to see your braid deal ✨
              </p>
            ) : (
              <>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "0.3rem",
                    color: "#7a1b46",
                    fontSize: "1rem",
                  }}
                >
                  {result.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "0.7rem",
                    color: "#3b041a",
                    fontSize: "0.88rem",
                  }}
                >
                  {result.description}
                </p>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "0.6rem",
                    color: "#7a1b46",
                    fontSize: "0.8rem",
                  }}
                >
                  Screenshot this or tap “Copy result to share”, then hit “Book
                  now” and paste it into your booking notes or DM so your
                  discount can be applied.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "0.55rem",
                  }}
                >
                  <button
                    onClick={handleShare}
                    style={{
                      flex: 1,
                      borderRadius: "999px",
                      padding: "0.45rem 0.9rem",
                      border: "none",
                      background: "#ffffff",
                      color: "#b31757",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "Copied! 💕" : "Copy result to share"}
                  </button>

                  <button
                    onClick={handleBookNow}
                    style={{
                      flex: 1,
                      borderRadius: "999px",
                      padding: "0.45rem 0.9rem",
                      border: "none",
                      background:
                        "linear-gradient(135deg, #ff8bbd, #cc3f91)",
                      color: "#fff",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Book now
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "0.25rem",
  fontSize: "0.8rem",
  color: "#7a1b46",
};

const inputStyle = {
  width: "100%",
  padding: "0.55rem 0.7rem",
  borderRadius: "0.7rem",
  border: "1px solid #e5b9cc",
  fontSize: "0.9rem",
  outline: "none",
  backgroundColor: "#fff6fa",
};

export default App;
