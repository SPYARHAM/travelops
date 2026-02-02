import { NextRequest } from "next/server";
import { sendEmail } from "@/lib/email-smtp";

// Create HTML for booking admin notification
function createBookingAdminHTML({
  name,
  email,
  phone,
  company,
  preferredDate,
  preferredTime,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Request - TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;background:#f8f9fa;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:30px;text-align:center;color:white;">
      <h1 style="font-size:28px;margin:0 0 10px;">🚨 New Booking Request!</h1>
      <p style="font-size:16px;opacity:0.9;margin:0;">Someone wants to book a consultation</p>
    </div>
    <div style="padding:30px;">
      <div style="background:#fee2e2;border:1px solid #fca5a5;padding:20px;border-radius:12px;text-align:center;margin-bottom:20px;">
        <p style="color:#dc2626;font-weight:600;margin:0;font-size:18px;">🔥 Hot Lead Alert!</p>
        <p style="color:#b91c1c;margin:8px 0 0;font-size:14px;">Client: ${name} from ${company || "Individual"}</p>
      </div>
      <div style="background:#f8f9ff;border-left:4px solid #8b5cf6;padding:20px;margin-bottom:20px;border-radius:8px;">
        <h2 style="color:#374151;font-size:20px;margin:0 0 15px;">📋 Client Details</h2>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">👤 Name:</span> <span style="color:#6b7280;">${name}</span></div>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">📧 Email:</span> <span style="color:#6b7280;">${email}</span></div>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">📞 Phone:</span> <span style="color:#6b7280;">${phone || "Not provided"}</span></div>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">🏢 Company:</span> <span style="color:#6b7280;">${company || "Not provided"}</span></div>
      </div>
      <div style="background:#ecfdf5;border-left:4px solid #10b981;padding:20px;margin-bottom:20px;border-radius:8px;">
        <h2 style="color:#374151;font-size:20px;margin:0 0 15px;">📅 Scheduling Preferences</h2>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">📅 Preferred Date:</span> <span style="color:#6b7280;">${preferredDate}</span></div>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">⏰ Preferred Time:</span> <span style="color:#6b7280;">${preferredTime}</span></div>
      </div>
      ${
        message
          ? `
      <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:20px;margin-bottom:20px;border-radius:8px;">
        <h2 style="color:#374151;font-size:20px;margin:0 0 15px;">💬 Additional Message</h2>
        <p style="color:#6b7280;margin:0;font-style:italic;">${message}</p>
      </div>`
          : ""
      }
      <div style="background:#fee2e2;border:1px solid #f87171;padding:20px;border-radius:12px;text-align:center;">
        <p style="color:#dc2626;margin:0;font-weight:600;">⚡ Action Required</p>
        <p style="color:#b91c1c;margin:8px 0 0;font-size:14px;">Reply to ${email} within 2 hours for best conversion!</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function createBookingUserHTML({
  name,
  preferredDate,
  preferredTime,
}: {
  name: string;
  preferredDate: string;
  preferredTime: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:0;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#059669 0%,#047857 100%);padding:32px;text-align:center;color:#fff;">
      <div style="font-size:48px;margin-bottom:16px;">✅</div>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Booking Received!</h1>
      <p style="color:#d1fae5;margin:10px 0 0;font-size:16px;">We'll get back to you within 24 hours</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#ecfdf5;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h2 style="color:#065f46;margin:0 0 16px;font-size:20px;font-weight:600;">Hello ${name}! 👋</h2>
        <p style="color:#374151;margin:0 0 16px;font-size:16px;">Thank you for your interest in TravelOps! We've received your consultation request and our team is excited to learn more about your travel business.</p>
        <div style="background:#fff;border:1px solid #d1fae5;border-radius:6px;padding:16px;">
          <div style="color:#059669;font-weight:600;margin-bottom:8px;">📅 Your Preferences:</div>
          <div style="color:#6b7280;margin-bottom:4px;">Date: ${preferredDate}</div>
          <div style="color:#6b7280;">Time: ${preferredTime}</div>
        </div>
      </div>
      <div style="background:#f0f9ff;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#1e40af;margin:0 0 16px;font-size:18px;font-weight:600;">What happens next?</h3>
        <div style="margin-bottom:16px;">
          <div style="display:flex;align-items:start;margin-bottom:12px;">
            <div style="background:#3b82f6;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;margin-right:12px;font-size:12px;font-weight:600;">1</div>
            <div style="color:#374151;font-size:14px;">We'll review your request and match you with the right TravelOps specialist</div>
          </div>
          <div style="display:flex;align-items:start;margin-bottom:12px;">
            <div style="background:#10b981;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;margin-right:12px;font-size:12px;font-weight:600;">2</div>
            <div style="color:#374151;font-size:14px;">You'll receive a calendar invite with meeting details within 24 hours</div>
          </div>
          <div style="display:flex;align-items:start;">
            <div style="background:#8b5cf6;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;margin-right:12px;font-size:12px;font-weight:600;">3</div>
            <div style="color:#374151;font-size:14px;">We'll discuss your travel operations and explore how TravelOps can help you scale</div>
          </div>
        </div>
      </div>
      <div style="background:#ede9fe;border-radius:8px;padding:20px;text-align:center;">
        <p style="color:#7c3aed;margin:0;font-weight:600;">💡 Pro Tip</p>
        <p style="color:#6b21a8;margin:8px 0 0;font-size:14px;">Come prepared with questions about your current travel workflow - we love problem-solving!</p>
      </div>
    </div>
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">Questions? Reply to this email or call us at (555) 123-4567</p>
      <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">&copy; 2026 TravelOps. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_APP_PASSWORD environment variable");
    return Response.json(
      {
        error:
          "Email service not configured. Please set up Gmail app password.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      preferredDate,
      preferredTime,
      message,
    } = body;

    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Send admin notification
    const adminResult = await sendEmail({
      to: "jainarham2101@gmail.com",
      subject: `🚨 New Booking from ${name} - ${preferredDate || "Flexible"} at ${preferredTime || "Flexible"}`,
      html: createBookingAdminHTML({
        name,
        email,
        phone: phone || "",
        company: company || "",
        preferredDate: preferredDate || "Flexible",
        preferredTime: preferredTime || "Flexible",
        message: message || "",
      }),
      replyTo: email,
    });

    if (!adminResult.success) {
      console.error("Admin booking email error:", adminResult.error);
      return Response.json(
        { error: "Failed to send admin notification" },
        { status: 500 },
      );
    }

    // Send user confirmation
    const userResult = await sendEmail({
      to: email,
      subject: "🎉 Booking Confirmed - We'll be in touch soon!",
      html: createBookingUserHTML({
        name,
        preferredDate: preferredDate || "Flexible",
        preferredTime: preferredTime || "Flexible",
      }),
      replyTo: "jainarham2101@gmail.com",
    });

    if (!userResult.success) {
      console.error("User booking email error:", userResult.error);
      return Response.json(
        { error: "Failed to send user confirmation" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      adminResult,
      userResult,
      message: "Booking emails sent successfully",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
