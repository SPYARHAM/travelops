import * as React from "react";

interface NewsletterEmailTemplateProps {
  email: string;
}

export function NewsletterEmailTemplate({
  email,
}: NewsletterEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          padding: "32px",
          textAlign: "center",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <h1
          style={{
            color: "#fff",
            margin: "0",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Welcome to TravelOps!
        </h1>
        <p style={{ color: "#ede9fe", margin: "10px 0 0", fontSize: "16px" }}>
          You're now part of the travel innovation community
        </p>
      </div>

      <div
        style={{
          padding: "32px",
          background: "white",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            background: "#f0f9ff",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#1e40af",
              margin: "0 0 16px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            What's Coming Your Way?
          </h2>
          <div style={{ textAlign: "left", margin: "20px 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                  fontSize: "14px",
                  flexShrink: "0",
                }}
              >
                📊
              </div>
              <div>
                <div
                  style={{
                    color: "#1e293b",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Industry Insights
                </div>
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  Latest trends and data in travel operations
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "#10b981",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                  fontSize: "14px",
                  flexShrink: "0",
                }}
              >
                🚀
              </div>
              <div>
                <div
                  style={{
                    color: "#1e293b",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Product Updates
                </div>
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  Be the first to know about new TravelOps capabilities
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "start" }}>
              <div
                style={{
                  background: "#ec4899",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                  fontSize: "14px",
                  flexShrink: "0",
                }}
              >
                💡
              </div>
              <div>
                <div
                  style={{
                    color: "#1e293b",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Expert Tips & Strategies
                </div>
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  Actionable advice to grow your travel business
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <p
            style={{
              color: "#64748b",
              margin: "0 0 16px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Ready to transform your travel business?
          </p>
          <a
            href={`mailto:jainarham2101@gmail.com?subject=Let's discuss TravelOps&body=Hi! I just subscribed to your newsletter and would love to learn more about TravelOps.`}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Book a Free Consultation
          </a>
        </div>

        <div
          style={{
            background: "#ede9fe",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#7c3aed", margin: "0", fontWeight: "600" }}>
            🔥 Special Offer
          </p>
          <p style={{ color: "#6b21a8", margin: "8px 0 0", fontSize: "14px" }}>
            Reply to this email to get a free strategy session worth $200!
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "24px",
          textAlign: "center",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <p style={{ color: "#64748b", margin: "0", fontSize: "13px" }}>
          Welcome aboard! You can unsubscribe anytime.
        </p>
        <p style={{ color: "#9ca3af", margin: "8px 0 0", fontSize: "12px" }}>
          © 2026 TravelOps. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function NewsletterAdminEmailTemplate({ email }: { email: string }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #059669, #047857)",
          padding: "30px",
          textAlign: "center",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "28px" }}>
          🎯 New Newsletter Signup!
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "16px", opacity: 0.9 }}>
          Someone wants to hear from TravelOps
        </p>
      </div>

      <div
        style={{
          padding: "30px",
          background: "white",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a3e635",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              color: "#166534",
              fontWeight: "600",
              margin: "0",
              fontSize: "18px",
            }}
          >
            🔥 Hot Lead Alert!
          </p>
          <p style={{ color: "#15803d", margin: "8px 0 0", fontSize: "14px" }}>
            New subscriber: {email}
          </p>
        </div>

        <div
          style={{
            background: "#f8f9ff",
            borderLeft: "4px solid #8b5cf6",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{ fontWeight: "600", color: "#374151", marginBottom: "5px" }}
          >
            📧 Email Address:
          </div>
          <div style={{ color: "#6b7280", fontSize: "16px" }}>{email}</div>
        </div>

        <div
          style={{
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#92400e", margin: "0", fontWeight: "600" }}>
            ⏰ Action Required
          </p>
          <p style={{ color: "#78350f", margin: "8px 0 0", fontSize: "14px" }}>
            Follow up with this subscriber within 24 hours for best engagement!
          </p>
        </div>
      </div>
    </div>
  );
}
