import * as React from "react";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}

export function ContactEmailTemplate({
  name,
  email,
  message,
  company,
  phone,
}: ContactEmailTemplateProps) {
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
          padding: "30px",
          textAlign: "center",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "28px" }}>
          🚨 New Contact Form Submission
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "16px", opacity: 0.9 }}>
          Someone is interested in TravelOps!
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
            background: "#f8f9ff",
            borderLeft: "4px solid #8b5cf6",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
              }}
            >
              👤 Name:
            </div>
            <div style={{ color: "#6b7280" }}>{name}</div>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                fontWeight: "600",
                color: "#374151",
                marginBottom: "5px",
              }}
            >
              📧 Email:
            </div>
            <div style={{ color: "#6b7280" }}>{email}</div>
          </div>
          {company && (
            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                🏢 Company:
              </div>
              <div style={{ color: "#6b7280" }}>{company}</div>
            </div>
          )}
          {phone && (
            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                📱 Phone:
              </div>
              <div style={{ color: "#6b7280" }}>{phone}</div>
            </div>
          )}
        </div>

        <div
          style={{
            background: "#fef3ff",
            border: "1px solid #d8b4fe",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{ color: "#7c3aed", marginBottom: "10px", marginTop: "0" }}
          >
            💬 Message:
          </h3>
          <p style={{ lineHeight: "1.6", margin: "0", color: "#374151" }}>
            {message}
          </p>
        </div>

        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a3e635",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#166534", fontWeight: "600", margin: "0" }}>
            📈 This is a hot lead! Respond within 1 hour for best conversion
            rates.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactUserEmailTemplate({ name }: { name: string }) {
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
          padding: "40px",
          textAlign: "center",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "32px" }}>✈️ Message Received!</h1>
        <p style={{ margin: "10px 0 0", fontSize: "18px", opacity: 0.9 }}>
          We&apos;ll be in touch soon, {name}!
        </p>
      </div>

      <div
        style={{
          padding: "40px",
          background: "white",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "25px", color: "#374151" }}>
          Hi {name},
        </p>

        <p
          style={{ marginBottom: "20px", color: "#6b7280", lineHeight: "1.6" }}
        >
          Thank you for reaching out to TravelOps! We&apos;ve received your
          message and our team is excited to connect with you.
        </p>

        <div
          style={{
            background: "linear-gradient(135deg, #f3e8ff, #fef3ff)",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "20px",
            borderLeft: "4px solid #8b5cf6",
          }}
        >
          <h3
            style={{ color: "#7c3aed", marginBottom: "15px", marginTop: "0" }}
          >
            🚀 What happens next?
          </h3>
          <ul style={{ color: "#6b7280", paddingLeft: "20px", margin: "0" }}>
            <li style={{ marginBottom: "8px" }}>
              Our team will review your message within 24 hours
            </li>
            <li style={{ marginBottom: "8px" }}>
              We&apos;ll send you a personalized response with next steps
            </li>
            <li style={{ marginBottom: "8px" }}>
              If relevant, we&apos;ll schedule a demo call to show you TravelOps
              in action
            </li>
          </ul>
        </div>

        <p style={{ marginTop: "30px", color: "#6b7280", fontStyle: "italic" }}>
          Questions? Just reply to this email - we&apos;re here to help!
        </p>
      </div>
    </div>
  );
}
