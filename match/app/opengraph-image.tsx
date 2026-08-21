import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Resume Match — Know your match before you apply.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#F1F1EC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top label */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#12141C",
            opacity: 0.4,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          airesumematch.khanalankit.com
        </span>

        {/* Main content row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            marginTop: "32px",
          }}
        >
          {/* Left: headline + subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "680px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#12141C",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Know your match
              <br />
              before you apply.
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#12141C",
                opacity: 0.55,
                marginTop: "24px",
                lineHeight: 1.4,
                fontFamily: "sans-serif",
                fontWeight: 400,
              }}
            >
              AI-powered resume analysis — match score,
              <br />
              skills gaps &amp; exact fixes.
            </p>
          </div>

          {/* Right: match badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              border: "5px solid #2FA84F",
              transform: "rotate(-4deg)",
              flexShrink: 0,
              marginLeft: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#2FA84F",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              <span style={{ fontSize: "48px" }}>87</span>
              <span
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                MATCH
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#12141C",
              letterSpacing: "-0.01em",
            }}
          >
            AI Resume Match
          </span>
          <div
            style={{
              width: "120px",
              height: "2px",
              background: "#12141C",
              opacity: 0.1,
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
