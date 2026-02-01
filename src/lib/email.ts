// Send newsletter subscription using Web3Forms
export const sendNewsletterEmail = async (email: string): Promise<boolean> => {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("❌ Web3Forms Access Key is not configured!");
    return false;
  }
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New Newsletter Subscription",
      subscriber_email: email,
      to_email: "jainarham2101@gmail.com",
    };
    const response = await axios.post(WEB3FORMS_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data && response.data.success) {
      console.log("✅ Newsletter email sent via Web3Forms");
      return true;
    } else {
      console.error("❌ Web3Forms error:", response.data);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending newsletter email via Web3Forms:", error);
    return false;
  }
};
// Send contact email using Web3Forms
export const sendContactEmail = async (
  data: ContactEmailData,
): Promise<boolean> => {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("❌ Web3Forms Access Key is not configured!");
    return false;
  }
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Contact Form Submission from ${data.name}`,
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      message: data.message,
      replyto: data.email,
    };
    const response = await axios.post(WEB3FORMS_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data && response.data.success) {
      console.log("✅ Contact email sent via Web3Forms");
      return true;
    } else {
      console.error("❌ Web3Forms error:", response.data);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending contact email via Web3Forms:", error);
    return false;
  }
};
// Send confirmation email to user using Web3Forms
export const sendUserBookingConfirmation = async (
  data: BookingEmailData,
): Promise<boolean> => {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("❌ Web3Forms Access Key is not configured!");
    return false;
  }
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Booking Confirmed: ${data.name} - We'll be in touch!`,
      from_name: "TraveloOps Team",
      from_email: "noreply@traveloops.com",
      to_email: data.email,
      user_name: data.name,
      preferred_date: data.preferredDate || "a date that works for you",
      preferred_time: data.preferredTime || "a convenient time",
      company: data.company || "your company",
      message: data.message || "No additional message",
      replyto: "noreply@traveloops.com",
    };
    const response = await axios.post(WEB3FORMS_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data && response.data.success) {
      console.log("✅ User confirmation email sent via Web3Forms");
      return true;
    } else {
      console.error("❌ Web3Forms error:", response.data);
      return false;
    }
  } catch (error) {
    console.error(
      "❌ Error sending user confirmation email via Web3Forms:",
      error,
    );
    return false;
  }
};
import axios from "axios";

// Web3Forms API endpoint and key
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
// Send booking request email to admin using Web3Forms
export const sendBookingEmail = async (
  data: BookingEmailData,
): Promise<boolean> => {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("❌ Web3Forms Access Key is not configured!");
    return false;
  }
  try {
    // Send to admin
    const adminPayload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Booking: ${data.name} - ${data.preferredDate || "Flexible"}`,
      from_name: data.name,
      from_email: data.email,
      to_email: ADMIN_EMAIL,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      preferred_date: data.preferredDate || "Flexible",
      preferred_time: data.preferredTime || "Flexible",
      message: data.message || "No additional message",
      replyto: data.email,
      html_content: createAdminBookingEmailHTML(data),
    };
    const adminRes = await axios.post(WEB3FORMS_API_URL, adminPayload, {
      headers: { "Content-Type": "application/json" },
    });
    // Send to user
    const userPayload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Booking Confirmed: ${data.name} - We'll be in touch!`,
      from_name: "TraveloOps Team",
      from_email: "noreply@traveloops.com",
      to_email: data.email,
      user_name: data.name,
      preferred_date: data.preferredDate || "a date that works for you",
      preferred_time: data.preferredTime || "a convenient time",
      company: data.company || "your company",
      message: data.message || "No additional message",
      replyto: "noreply@traveloops.com",
      html_content: createUserConfirmationEmailHTML(data),
    };
    const userRes = await axios.post(WEB3FORMS_API_URL, userPayload, {
      headers: { "Content-Type": "application/json" },
    });
    const adminSuccess = adminRes.data && adminRes.data.success;
    const userSuccess = userRes.data && userRes.data.success;
    if (adminSuccess && userSuccess) {
      console.log("✅ Booking emails sent to admin and user via Web3Forms");
      return true;
    } else {
      if (!adminSuccess)
        console.error("❌ Web3Forms admin error:", adminRes.data);
      if (!userSuccess) console.error("❌ Web3Forms user error:", userRes.data);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending booking emails via Web3Forms:", error);
    return false;
  }
};

// Your admin email address
const ADMIN_EMAIL = "jainarham2101@gmail.com";

// Email types
export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
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

// Create HTML email template for admin booking notification
const createAdminBookingEmailHTML = (data: BookingEmailData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - Admin Notification</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#1e293b;padding:32px 30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:1px;">🚨 New Booking Received (Admin Notification)</h1>
              <p style="color:#cbd5e1;margin:10px 0 0;font-size:16px;">A new consultation booking was submitted on TraveloOps</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 30px;">
              <h2 style="color:#7c3aed;font-size:20px;font-weight:700;margin:0 0 18px;">Booking Details</h2>
              <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:18px;">
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;width:160px;">Name:</td><td style="color:#111827;">${data.name}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Email:</td><td><a href="mailto:${data.email}" style="color:#7c3aed;text-decoration:none;">${data.email}</a></td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Phone:</td><td><a href="tel:${data.phone}" style="color:#7c3aed;text-decoration:none;">${data.phone || "Not provided"}</a></td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Company:</td><td>${data.company || "Not provided"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Preferred Date:</td><td>${data.preferredDate || "Flexible"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Preferred Time:</td><td>${data.preferredTime || "Flexible"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Message:</td><td>${data.message || "No additional message"}</td></tr>
              </table>
              <div style="margin:24px 0 0 0;padding:18px 20px;background:#f1f5f9;border-radius:8px;color:#334155;font-size:15px;">
                <b>Action:</b> Please review and follow up with the client as soon as possible.
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:24px 30px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#64748b;margin:0;font-size:13px;">This is an automated admin notification from TraveloOps.</p>
              <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">© 2026 TraveloOps. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Create HTML email template for user confirmation
const createUserConfirmationEmailHTML = (data: BookingEmailData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - TraveloOps</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);padding:32px 30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:1px;">🎉 Booking Confirmed!</h1>
              <p style="color:#ede9fe;margin:10px 0 0;font-size:16px;">Thank you, <b>${data.name.split(" ")[0]}</b>! Your consultation request has been received.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 30px;">
              <h2 style="color:#7c3aed;font-size:20px;font-weight:700;margin:0 0 18px;">Your Booking Summary</h2>
              <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:18px;">
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;width:160px;">Name:</td><td style="color:#111827;">${data.name}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Email:</td><td><a href="mailto:${data.email}" style="color:#7c3aed;text-decoration:none;">${data.email}</a></td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Phone:</td><td><a href="tel:${data.phone}" style="color:#7c3aed;text-decoration:none;">${data.phone || "Not provided"}</a></td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Company:</td><td>${data.company || "Not provided"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Preferred Date:</td><td>${data.preferredDate || "Flexible"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Preferred Time:</td><td>${data.preferredTime || "Flexible"}</td></tr>
                <tr><td style="color:#64748b;font-weight:600;padding:6px 0;">Message:</td><td>${data.message || "No additional message"}</td></tr>
              </table>
              <div style="margin:24px 0 0 0;padding:18px 20px;background:#ede9fe;border-radius:8px;color:#7c3aed;font-size:15px;text-align:center;">
                <b>What's Next?</b><br>
                Our team will review your request and get back to you within 24 hours with a calendar invite and video call link.<br>
                If you have any questions, just reply to this email!
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:24px 30px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#64748b;margin:0;font-size:13px;">This is your booking confirmation from TraveloOps.</p>
              <p style="color:#9ca3af;margin:8px 0 0;font-size:12px;">© 2026 TraveloOps. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
