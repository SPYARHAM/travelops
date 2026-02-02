import * as React from "react";

interface BookingEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export function BookingEmailTemplate({
  name,
  email,
  phone,
  company,
  preferredDate,
  preferredTime,
  message,
}: BookingEmailTemplateProps) {
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
          🚨 New Booking Request
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "16px", opacity: 0.9 }}>
          Someone wants to schedule a consultation!
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
            ⏰ Action Required!
          </p>
          <p style={{ color: "#15803d", margin: "8px 0 0", fontSize: "14px" }}>
            New consultation booking for {preferredDate} at {preferredTime}
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
            <div style={{ color: "#6b7280" }}>{phone || "Not provided"}</div>
          </div>
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
            <div style={{ color: "#6b7280" }}>{company || "Not provided"}</div>
          </div>
        </div>

        <div
          style={{
            background: "#ede9fe",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              color: "#7c3aed",
              margin: "0 0 16px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Scheduling Preferences
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    color: "#7c3aed",
                    fontSize: "24px",
                    marginBottom: "8px",
                  }}
                >
                  📅
                </div>
                <div style={{ color: "#1e293b", fontWeight: "600" }}>
                  {preferredDate}
                </div>
                <div style={{ color: "#64748b", fontSize: "12px" }}>
                  Preferred Date
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    color: "#7c3aed",
                    fontSize: "24px",
                    marginBottom: "8px",
                  }}
                >
                  🕐
                </div>
                <div style={{ color: "#1e293b", fontWeight: "600" }}>
                  {preferredTime}
                </div>
                <div style={{ color: "#64748b", fontSize: "12px" }}>
                  Preferred Time
                </div>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div
            style={{
              background: "#fef3c7",
              borderLeft: "4px solid #f59e0b",
              borderRadius: "4px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <h4
              style={{
                color: "#92400e",
                margin: "0 0 12px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              📝 Message from Client
            </h4>
            <p style={{ color: "#78350f", margin: "0", lineHeight: "1.6" }}>
              {message}
            </p>
          </div>
        )}

        <div
          style={{
            background: "#dcfce7",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{ color: "#166534", margin: "0 0 12px", fontWeight: "600" }}
          >
            ⏰ Action Required
          </p>
          <p style={{ color: "#15803d", margin: "0", fontSize: "14px" }}>
            Please respond to this booking request within 24 hours for best
            customer experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BookingUserEmailTemplate({ name }: { name: string }) {
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
        <h1 style={{ margin: "0", fontSize: "32px" }}>🎉 Booking Confirmed!</h1>
        <p style={{ margin: "10px 0 0", fontSize: "18px", opacity: 0.9 }}>
          We'll be in touch soon, {name}!
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
          Thank you for booking a consultation with TravelOps! We&apos;ve received
          your booking request and our team will be in touch shortly.
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
              Our team will review your booking within 2-4 hours
            </li>
            <li style={{ marginBottom: "8px" }}>
              We'll send you a calendar invite with the meeting details
            </li>
            <li style={{ marginBottom: "8px" }}>
              We'll prepare a custom demo based on your business needs
            </li>
          </ul>
        </div>

        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a3e635",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
          }}
        >
          <p
            style={{
              color: "#166534",
              textAlign: "center",
              fontWeight: "600",
              margin: "0",
            }}
          >
            📞 Need to reschedule? Just reply to this email!
          </p>
        </div>

        <p style={{ marginTop: "30px", color: "#6b7280", fontStyle: "italic" }}>
          Looking forward to showing you how TravelOps can transform your
          business!
        </p>
      </div>
    </div>
  );
}
