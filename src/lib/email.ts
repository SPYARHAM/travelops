import { Resend } from "resend";

const ADMIN_EMAIL = "jainarham2101@gmail.com";

// Helper function to get Resend instance (lazy initialization)
const getResend = () => {
  return new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "");
};

// Email types
export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface BookingEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

// Send newsletter subscription using Resend
export const sendNewsletterEmail = async (email: string): Promise<boolean> => {
  if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
    console.error("❌ Resend API Key is not configured!");
    return false;
  }
  const resend = getResend();
  try {
    const adminEmailHtml = createNewsletterAdminEmailHTML(email);
    const userEmailHtml = createNewsletterUserEmailHTML();

    // Send notification to admin
    const { data: adminResult, error: adminError } = await resend.emails.send({
      from: "Newsletter <jainarham2101@gmail.com>",
      to: [ADMIN_EMAIL],
      subject: "📧 New Newsletter Subscription",
      html: adminEmailHtml,
      replyTo: email,
    });

    if (adminError) {
      console.error("❌ Resend admin newsletter error:", adminError);
    }

    // Send welcome email to subscriber
    const { data: userResult, error: userError } = await resend.emails.send({
      from: "TravelOps Team <jainarham2101@gmail.com>",
      to: [email],
      subject: "🎉 Welcome to TravelOps - Your Journey Starts Now!",
      html: userEmailHtml,
      replyTo: ADMIN_EMAIL,
    });

    if (userError) {
      console.error("❌ Resend user newsletter error:", userError);
    }

    console.log("✅ Newsletter emails sent via Resend", {
      adminResult,
      userResult,
    });
    return !adminError && !userError;
  } catch (error) {
    console.error("❌ Error sending newsletter email:", error);
    return false;
  }
};

// Send booking request email to admin using Resend
export const sendBookingEmail = async (
  data: BookingEmailData,
): Promise<boolean> => {
  if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
    console.error("❌ Resend API Key is not configured!");
    return false;
  }
  const resend = getResend();
  try {
    const adminEmailHtml = createAdminBookingEmailHTML(data);

    const { data: result, error } = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: [ADMIN_EMAIL],
      subject: `🚨 New Booking from ${data.name} - ${data.preferredDate || "Flexible"}`,
      html: adminEmailHtml,
      replyTo: data.email,
    });

    if (error) {
      console.error("❌ Resend admin error:", error);
      return false;
    }

    console.log("✅ Admin booking notification sent via Resend", result);
    return true;
  } catch (error) {
    console.error("❌ Error sending admin booking email:", error);
    return false;
  }
};

// Send confirmation email to user using Resend
export const sendUserBookingConfirmation = async (
  data: BookingEmailData,
): Promise<boolean> => {
  if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
    console.error("❌ Resend API Key is not configured!");
    return false;
  }
  const resend = getResend();
  try {
    const userEmailHtml = createUserConfirmationEmailHTML(data);

    const { data: result, error } = await resend.emails.send({
      from: "TravelOps Team <jainarham2101@gmail.com>",
      to: [data.email],
      subject: `🎉 Booking Confirmed - We'll be in touch soon!`,
      html: userEmailHtml,
      replyTo: ADMIN_EMAIL,
    });

    if (error) {
      console.error("❌ Resend user error:", error);
      return false;
    }

    console.log("✅ User confirmation email sent via Resend", result);
    return true;
  } catch (error) {
    console.error("❌ Error sending user confirmation email:", error);
    return false;
  }
};

// Create beautiful HTML email template for admin booking notification
const createAdminBookingEmailHTML = (data: BookingEmailData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - Admin Notification</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">🚨 NEW BOOKING ALERT</h1>
      <p style="color:#cbd5e1;margin:10px 0 0;font-size:16px;">A new consultation has been requested</p>
    </div>
    
    <div style="padding:32px;">
      <div style="background:#f8fafc;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h2 style="color:#1e293b;margin:0 0 20px;font-size:20px;font-weight:600;">Client Information</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;width:120px;">Name:</td><td style="color:#1e293b;font-weight:500;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Email:</td><td><a href="mailto:${data.email}" style="color:#3b82f6;text-decoration:none;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Phone:</td><td><a href="tel:${data.phone}" style="color:#3b82f6;text-decoration:none;">${data.phone || "Not provided"}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Company:</td><td style="color:#1e293b;">${data.company || "Not provided"}</td></tr>
        </table>
      </div>
      
      <div style="background:#ede9fe;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#7c3aed;margin:0 0 16px;font-size:18px;font-weight:600;">Scheduling Preferences</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="text-align:center;">
            <div style="background:#fff;border-radius:6px;padding:16px;">
              <div style="color:#7c3aed;font-size:24px;margin-bottom:8px;">📅</div>
              <div style="color:#1e293b;font-weight:600;">${data.preferredDate || "Flexible"}</div>
              <div style="color:#64748b;font-size:12px;">Preferred Date</div>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="background:#fff;border-radius:6px;padding:16px;">
              <div style="color:#7c3aed;font-size:24px;margin-bottom:8px;">🕐</div>
              <div style="color:#1e293b;font-weight:600;">${data.preferredTime || "Flexible"}</div>
              <div style="color:#64748b;font-size:12px;">Preferred Time</div>
            </div>
          </div>
        </div>
      </div>
      
      ${
        data.message
          ? `
      <div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px;padding:20px;margin-bottom:24px;">
        <h4 style="color:#92400e;margin:0 0 12px;font-size:16px;font-weight:600;">📝 Message from Client</h4>
        <p style="color:#78350f;margin:0;line-height:1.6;">${data.message}</p>
      </div>
      `
          : ""
      }
      
      <div style="background:#dcfce7;border-radius:8px;padding:20px;text-align:center;">
        <p style="color:#166534;margin:0 0 12px;font-weight:600;">⏰ Action Required</p>
        <p style="color:#15803d;margin:0;font-size:14px;">Please respond to this booking request within 24 hours for best customer experience.</p>
      </div>
    </div>
    
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">This is an automated notification from TraveloOps booking system.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Create beautiful HTML email template for user confirmation
const createUserConfirmationEmailHTML = (data: BookingEmailData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - TraveloOps</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:32px;text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">🎉</div>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Booking Confirmed!</h1>
      <p style="color:#ede9fe;margin:10px 0 0;font-size:16px;">Thank you, ${data.name.split(" ")[0]}! We've received your consultation request.</p>
    </div>
    
    <div style="padding:32px;">
      <div style="background:#f0f9ff;border-radius:8px;padding:24px;margin-bottom:24px;text-align:center;">
        <div style="background:#3b82f6;color:#fff;border-radius:50%;width:60px;height:60px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:24px;">✓</div>
        <h2 style="color:#1e40af;margin:0 0 8px;font-size:20px;font-weight:600;">Your Request is Confirmed</h2>
        <p style="color:#1e40af;margin:0;font-size:14px;">We'll get back to you within 24 hours</p>
      </div>
      
      <div style="background:#f8fafc;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#1e293b;margin:0 0 20px;font-size:18px;font-weight:600;">Your Booking Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;width:120px;">Name:</td><td style="color:#1e293b;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Email:</td><td style="color:#1e293b;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Phone:</td><td style="color:#1e293b;">${data.phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Company:</td><td style="color:#1e293b;">${data.company || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Preferred Date:</td><td style="color:#1e293b;">${data.preferredDate || "Flexible"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Preferred Time:</td><td style="color:#1e293b;">${data.preferredTime || "Flexible"}</td></tr>
        </table>
      </div>
      
      <div style="background:#ede9fe;border-radius:8px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#7c3aed;margin:0 0 20px;font-size:18px;font-weight:600;">What Happens Next?</h3>
        <div style="space-y:16px;">
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#7c3aed;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">1</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Review & Confirmation</div>
              <div style="color:#64748b;font-size:14px;">Our team will review your request and confirm the best time slot</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#7c3aed;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">2</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Calendar Invite</div>
              <div style="color:#64748b;font-size:14px;">You'll receive a calendar invite with video call link</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;">
            <div style="background:#7c3aed;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">3</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Strategy Call</div>
              <div style="color:#64748b;font-size:14px;">We'll discuss your business goals and how TraveloOps can help</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="text-align:center;">
        <p style="color:#64748b;margin:0 0 16px;font-size:14px;">Have questions or need to reschedule?</p>
        <a href="mailto:${ADMIN_EMAIL}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;">Contact Us</a>
      </div>
    </div>
    
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">This is your booking confirmation from TraveloOps.</p>
      <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">© 2026 TraveloOps. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Create newsletter admin notification email template
const createNewsletterAdminEmailHTML = (email: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Subscription</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">📧 NEW SUBSCRIBER</h1>
      <p style="color:#dcfce7;margin:10px 0 0;font-size:16px;">Someone joined the TraveloOps newsletter</p>
    </div>
    
    <div style="padding:32px;">
      <div style="background:#f0fdf4;border-radius:8px;padding:24px;text-align:center;">
        <div style="background:#10b981;color:#fff;border-radius:50%;width:60px;height:60px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:24px;">📧</div>
        <h2 style="color:#15803d;margin:0 0 16px;font-size:20px;font-weight:600;">New Email Subscriber</h2>
        <div style="background:#fff;border-radius:6px;padding:16px;margin:16px 0;">
          <strong style="color:#1f2937;font-size:18px;">${email}</strong>
        </div>
        <p style="color:#15803d;margin:0;font-size:14px;">Add this email to your marketing campaigns and follow up!</p>
      </div>
    </div>
    
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">New subscriber notification from TraveloOps.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Create newsletter user welcome email template
const createNewsletterUserEmailHTML = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TraveloOps</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:32px;text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">🎉</div>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Welcome to TraveloOps!</h1>
      <p style="color:#ede9fe;margin:10px 0 0;font-size:16px;">You're now part of the travel innovation community</p>
    </div>
    
    <div style="padding:32px;">
      <div style="background:#f0f9ff;border-radius:8px;padding:24px;margin-bottom:24px;text-align:center;">
        <h2 style="color:#1e40af;margin:0 0 16px;font-size:20px;font-weight:600;">What's Coming Your Way?</h2>
        <div style="text-align:left;margin:20px 0;">
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#3b82f6;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">✨</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Exclusive Travel Tech Insights</div>
              <div style="color:#64748b;font-size:14px;">Latest trends and innovations in travel automation</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;margin-bottom:16px;">
            <div style="background:#8b5cf6;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">🚀</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Product Updates & Features</div>
              <div style="color:#64748b;font-size:14px;">Be the first to know about new TraveloOps capabilities</div>
            </div>
          </div>
          <div style="display:flex;align-items:start;">
            <div style="background:#ec4899;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;margin-right:16px;font-weight:600;font-size:14px;flex-shrink:0;">💡</div>
            <div>
              <div style="color:#1e293b;font-weight:600;margin-bottom:4px;">Expert Tips & Strategies</div>
              <div style="color:#64748b;font-size:14px;">Actionable advice to grow your travel business</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="text-align:center;margin:32px 0;">
        <p style="color:#64748b;margin:0 0 16px;font-size:16px;font-weight:500;">Ready to transform your travel business?</p>
        <a href="mailto:${ADMIN_EMAIL}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;">Book a Free Consultation</a>
      </div>
      
      <div style="background:#ede9fe;border-radius:8px;padding:20px;text-align:center;">
        <p style="color:#7c3aed;margin:0;font-weight:600;">🔥 Special Offer</p>
        <p style="color:#6b21a8;margin:8px 0 0;font-size:14px;">Reply to this email to get a free strategy session worth $200!</p>
      </div>
    </div>
    
    <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;margin:0;font-size:13px;">Welcome aboard! You can unsubscribe anytime.</p>
      <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">© 2026 TraveloOps. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Contact form email templates
export function createContactAdminEmailHTML(formData: {
  name: string;
  email: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - TravelOps</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
    .email-wrapper { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 30px 20px; text-align: center; color: white; }
    .header h1 { font-size: 28px; margin-bottom: 10px; }
    .header p { font-size: 16px; opacity: 0.9; }
    .content { padding: 30px; }
    .contact-info { background: #f8f9ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .contact-item { margin-bottom: 15px; }
    .contact-label { font-weight: 600; color: #374151; margin-bottom: 5px; }
    .contact-value { color: #6b7280; }
    .message-box { background: #fef3ff; border: 1px solid #d8b4fe; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .urgent { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="header">
        <h1>🚨 New Contact Form Submission</h1>
        <p>Someone is interested in TravelOps!</p>
      </div>
      <div class="content">
        <div class="urgent">
          <strong>Action Required:</strong> New contact submission needs your attention
        </div>
        
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-label">👤 Name:</div>
            <div class="contact-value">${formData.name}</div>
          </div>
          <div class="contact-item">
            <div class="contact-label">📧 Email:</div>
            <div class="contact-value">${formData.email}</div>
          </div>
        </div>
        
        <div class="message-box">
          <h3 style="color: #7c3aed; margin-bottom: 10px;">💬 Message:</h3>
          <p style="line-height: 1.6;">${formData.message}</p>
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #a3e635; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
          <p style="color: #166534; font-weight: 600;">📈 This is a hot lead! Respond within 1 hour for best conversion rates.</p>
        </div>
      </div>
      <div class="footer">
        <p>TravelOps Admin Notification System</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function createContactUserEmailHTML(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for Reaching Out - TravelOps</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
    .email-wrapper { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 40px 20px; text-align: center; color: white; }
    .header h1 { font-size: 32px; margin-bottom: 10px; }
    .header p { font-size: 18px; opacity: 0.9; }
    .content { padding: 40px; }
    .feature-card { background: linear-gradient(135deg, #f3e8ff, #fef3ff); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 20px 0; transition: transform 0.2s; }
    .cta-button:hover { transform: translateY(-2px); }
    .footer { text-align: center; padding: 30px; background: #f8f9fa; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="header">
        <h1>✈️ Message Received!</h1>
        <p>We'll be in touch soon, ${name}!</p>
      </div>
      <div class="content">
        <p style="font-size: 18px; margin-bottom: 25px; color: #374151;">Hi ${name},</p>
        
        <p style="margin-bottom: 20px; color: #6b7280;">Thank you for reaching out to TravelOps! We've received your message and our team is excited to connect with you.</p>
        
        <div class="feature-card">
          <h3 style="color: #7c3aed; margin-bottom: 15px;">🚀 What happens next?</h3>
          <ul style="color: #6b7280; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Our team will review your message within 24 hours</li>
            <li style="margin-bottom: 8px;">We'll send you a personalized response with next steps</li>
            <li style="margin-bottom: 8px;">If relevant, we'll schedule a demo call to show you TravelOps in action</li>
          </ul>
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #a3e635; padding: 20px; border-radius: 12px; margin: 25px 0;">
          <p style="color: #166534; text-align: center; font-weight: 600;">🎯 In the meantime, check out our demo to see TravelOps in action!</p>
        </div>
        
        <div style="text-align: center;">
          <a href="#" class="cta-button">Learn More</a>
        </div>
        
        <p style="margin-top: 30px; color: #6b7280; font-style: italic;">Questions? Just reply to this email - we're here to help!</p>
      </div>
      <div class="footer">
        <p><strong>TravelOps Team</strong></p>
        <p>Revolutionizing travel management, one business at a time</p>
        <div style="margin-top: 15px;">
          <a href="#" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">Website</a>
          <a href="#" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">LinkedIn</a>
          <a href="#" style="color: #8b5cf6; text-decoration: none; margin: 0 10px;">Twitter</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
    console.error("❌ Resend API Key is not configured!");
    throw new Error("Resend API Key is not configured");
  }
  const resend = getResend();
  try {
    // Send admin notification
    const adminEmailResult = await resend.emails.send({
      from: "TravelOps Notifications <jainarham2101@gmail.com>",
      to: ["jainarham2101@gmail.com"],
      subject: `🚨 New Contact Form Submission from ${formData.name}`,
      html: createContactAdminEmailHTML(formData),
      replyTo: formData.email, // Admin can reply directly to the user
    });

    // Send user confirmation
    const userEmailResult = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: [formData.email],
      subject: "Thanks for reaching out to TravelOps! ✈️",
      html: createContactUserEmailHTML(formData.name),
      replyTo: "jainarham2101@gmail.com",
    });

    console.log("Contact emails sent successfully:", {
      admin: adminEmailResult,
      user: userEmailResult,
    });

    return { success: true, adminEmailResult, userEmailResult };
  } catch (error) {
    console.error("Error sending contact emails:", error);
    throw new Error("Failed to send contact emails");
  }
}
