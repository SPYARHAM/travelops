import { NextRequest } from "next/server";
import { sendEmail } from "@/lib/email-smtp";

// Create HTML for newsletter admin notification
function createNewsletterAdminHTML(email: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Newsletter Signup - TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;background:#f8f9fa;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#059669,#047857);padding:30px;text-align:center;color:white;">
      <h1 style="font-size:28px;margin:0 0 10px;">🎯 New Newsletter Signup!</h1>
      <p style="font-size:16px;opacity:0.9;margin:0;">Someone wants to hear from TravelOps</p>
    </div>
    <div style="padding:30px;">
      <div style="background:#ecfdf5;border:1px solid #a3e635;padding:20px;border-radius:12px;text-align:center;margin-bottom:20px;">
        <p style="color:#166534;font-weight:600;margin:0;font-size:18px;">🔥 Hot Lead Alert!</p>
        <p style="color:#15803d;margin:8px 0 0;font-size:14px;">New subscriber: ${email}</p>
      </div>
      <div style="background:#f8f9ff;border-left:4px solid #8b5cf6;padding:20px;margin-bottom:20px;border-radius:8px;">
        <div style="font-weight:600;color:#374151;margin-bottom:5px;">📧 Email Address:</div>
        <div style="color:#6b7280;font-size:16px;">${email}</div>
      </div>
      <div style="background:#fef3c7;border:1px solid #f59e0b;padding:20px;border-radius:12px;text-align:center;">
        <p style="color:#92400e;margin:0;font-weight:600;">⏰ Action Required</p>
        <p style="color:#78350f;margin:8px 0 0;font-size:14px;">Follow up with this subscriber within 24 hours for best engagement!</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function createNewsletterUserHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:0;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:32px;text-align:center;color:#fff;">
      <div style="font-size:48px;margin-bottom:16px;">🎉</div>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Welcome to TravelOps!</h1>
      <p style="color:#ede9fe;margin:10px 0 0;font-size:16px;">You're now part of the travel innovation community</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#f0f9ff;border-radius:8px;padding:24px;margin-bottom:24px;text-align:center;">
        <h2 style="color:#1e40af;margin:0 0 16px;font-size:20px;font-weight:600;">What's Coming Your Way?</h2>
        <div style="text-align:left;margin:20px 0;">
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#3b82f6;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-size:14px;">📈</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Industry Insights</div>
              <div style="color:#64748b;font-size:14px;">Latest trends and data in travel operations</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#10b981;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-size:14px;">🚀</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Product Updates</div>
              <div style="color:#64748b;font-size:14px;">Be the first to know about new TravelOps capabilities</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;">
            <div style="background:#ec4899;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-size:14px;">💡</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Expert Tips &amp; Strategies</div>
              <div style="color:#64748b;font-size:14px;">Actionable advice to grow your travel business</div>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#ede9fe;border-radius:8px;padding:20px;text-align:center;">
        <p style="color:#7c3aed;margin:0;font-weight:600;">🔥 Special Offer</p>
        <p style="color:#6b21a8;margin:8px 0 0;font-size:14px;">Reply to this email to get a free strategy session worth $200!</p>
      </div>
    </div>
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">Welcome aboard! You can unsubscribe anytime.</p>
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
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Send admin notification
    const adminResult = await sendEmail({
      to: "jainarham2101@gmail.com",
      subject: `🎯 New Newsletter Signup: ${email}`,
      html: createNewsletterAdminHTML(email),
      replyTo: "jainarham2101@gmail.com",
    });

    if (!adminResult.success) {
      console.error("Admin newsletter email error:", adminResult.error);
      return Response.json(
        { error: "Failed to send admin notification" },
        { status: 500 },
      );
    }

    // Send welcome email to subscriber
    const userResult = await sendEmail({
      to: email,
      subject: "Welcome to TravelOps Insights! ✈️",
      html: createNewsletterUserHTML(),
      replyTo: "jainarham2101@gmail.com",
    });

    if (!userResult.success) {
      console.error("User newsletter email error:", userResult.error);
      return Response.json(
        { error: "Failed to send welcome email" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      adminResult,
      userResult,
      message: "Newsletter emails sent successfully",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
