import { Resend } from "resend";
import { NextRequest } from "next/server";

// Create HTML for contact admin notification
function createContactAdminHTML({
  name,
  email,
  message,
  company,
  phone,
}: {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission - TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;background:#f8f9fa;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:30px;text-align:center;color:white;">
      <h1 style="font-size:28px;margin:0 0 10px;">🚨 New Contact Form!</h1>
      <p style="font-size:16px;opacity:0.9;margin:0;">Someone reached out through your website</p>
    </div>
    <div style="padding:30px;">
      <div style="background:#fee2e2;border:1px solid #fca5a5;padding:20px;border-radius:12px;text-align:center;margin-bottom:20px;">
        <p style="color:#dc2626;font-weight:600;margin:0;font-size:18px;">🔥 New Lead Alert!</p>
        <p style="color:#b91c1c;margin:8px 0 0;font-size:14px;">From: ${name} ${company ? `at ${company}` : ""}</p>
      </div>
      <div style="background:#f8f9ff;border-left:4px solid #8b5cf6;padding:20px;margin-bottom:20px;border-radius:8px;">
        <h2 style="color:#374151;font-size:20px;margin:0 0 15px;">📋 Contact Details</h2>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">👤 Name:</span> <span style="color:#6b7280;">${name}</span></div>
        <div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">📧 Email:</span> <span style="color:#6b7280;">${email}</span></div>
        ${phone ? `<div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">📞 Phone:</span> <span style="color:#6b7280;">${phone}</span></div>` : ""}
        ${company ? `<div style="margin-bottom:12px;"><span style="font-weight:600;color:#374151;">🏢 Company:</span> <span style="color:#6b7280;">${company}</span></div>` : ""}
      </div>
      <div style="background:#ecfdf5;border-left:4px solid #10b981;padding:20px;margin-bottom:20px;border-radius:8px;">
        <h2 style="color:#374151;font-size:20px;margin:0 0 15px;">💬 Message</h2>
        <div style="color:#6b7280;background:white;padding:15px;border-radius:8px;font-style:italic;">${message}</div>
      </div>
      <div style="background:#fef3c7;border:1px solid #f59e0b;padding:20px;border-radius:12px;text-align:center;">
        <p style="color:#92400e;margin:0;font-weight:600;">⏰ Action Required</p>
        <p style="color:#78350f;margin:8px 0 0;font-size:14px;">Reply to ${email} within 2 hours for best engagement!</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function createContactUserHTML({ name }: { name: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thanks for contacting TravelOps</title>
</head>
<body style="font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:0;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#059669 0%,#047857 100%);padding:32px;text-align:center;color:#fff;">
      <div style="font-size:48px;margin-bottom:16px;">✅</div>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Thanks for reaching out!</h1>
      <p style="color:#d1fae5;margin:10px 0 0;font-size:16px;">We'll get back to you soon</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#ecfdf5;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h2 style="color:#065f46;margin:0 0 16px;font-size:20px;font-weight:600;">Hi ${name}! 👋</h2>
        <p style="color:#374151;margin:0 0 16px;font-size:16px;">Thanks for getting in touch with TravelOps. We've received your message and our team will review it shortly.</p>
        <p style="color:#374151;margin:0;font-size:16px;">We typically respond to inquiries within 24 hours during business days.</p>
      </div>
      <div style="background:#f0f9ff;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#1e40af;margin:0 0 16px;font-size:18px;font-weight:600;">While you wait...</h3>
        <p style="color:#374151;margin:0 0 16px;font-size:14px;">Check out some of our latest insights:</p>
        <div style="margin-bottom:12px;padding-left:16px;">
          <div style="color:#374151;font-size:14px;">• How TravelOps can streamline your operations</div>
        </div>
        <div style="margin-bottom:12px;padding-left:16px;">
          <div style="color:#374151;font-size:14px;">• Best practices for travel business management</div>
        </div>
        <div style="padding-left:16px;">
          <div style="color:#374151;font-size:14px;">• Success stories from our clients</div>
        </div>
      </div>
      <div style="background:#ede9fe;border-radius:8px;padding:20px;text-align:center;">
        <p style="color:#7c3aed;margin:0;font-weight:600;">🚀 Ready to transform your travel business?</p>
        <p style="color:#6b21a8;margin:8px 0 0;font-size:14px;">Let's discuss how TravelOps can help you scale efficiently.</p>
      </div>
    </div>
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">Need immediate assistance? Call us at (555) 123-4567</p>
      <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">&copy; 2026 TravelOps. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  // Initialize Resend inside the handler to avoid build-time errors
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

  try {
    const body = await req.json();
    const { name, email, message, company, phone } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send admin notification
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: ["jainarham2101@gmail.com"],
      subject: `🚨 New Contact Form Submission from ${name}`,
      html: createContactAdminHTML({ name, email, message, company, phone }),
      replyTo: email,
    });

    if (adminError) {
      console.error("Admin email error:", adminError);
      return Response.json(
        { error: "Failed to send admin email" },
        { status: 500 },
      );
    }

    // Send user confirmation
    const { data: userData, error: userError } = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: [email],
      subject: "Thanks for reaching out to TravelOps! ✈️",
      html: createContactUserHTML({ name }),
      replyTo: "jainarham2101@gmail.com",
    });

    if (userError) {
      console.error("User email error:", userError);
      return Response.json(
        { error: "Failed to send user confirmation" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      adminData,
      userData,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
