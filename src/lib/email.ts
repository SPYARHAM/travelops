import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_demo";
const EMAILJS_CONTACT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "template_demo";
const EMAILJS_BOOKING_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID || "template_booking";
const EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID ||
  "template_booking_confirm";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "demo_public_key";

// Your admin email address
const ADMIN_EMAIL = "jainarham2101@gmail.com";

// Initialize EmailJS
export const initEmailJS = () => {
  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === "demo_public_key") {
    console.error("❌ EmailJS Public Key is not configured!");
    console.error(
      "Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file",
    );
    return false;
  }
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("✅ EmailJS initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize EmailJS:", error);
    return false;
  }
};

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
  <title>New Consultation Booking</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🎯 New Consultation Booking!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Someone wants to talk to you</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Client Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h2 style="color: #111827; margin: 0 0 20px; font-size: 20px; font-weight: 600;">Client Information</h2>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding-bottom: 4px;">👤 Name</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 16px; font-weight: 600;">${data.name}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding-bottom: 4px;">📧 Email</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 16px; font-weight: 600;">
                                <a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding-bottom: 4px;">📱 Phone</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 16px; font-weight: 600;">
                                <a href="tel:${data.phone}" style="color: #8b5cf6; text-decoration: none;">${data.phone || "Not provided"}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      ${
                        data.company
                          ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding-bottom: 4px;">🏢 Company</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 16px; font-weight: 600;">${data.company}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Scheduling Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="color: #7c3aed; margin: 0 0 16px; font-size: 18px; font-weight: 600;">📅 Preferred Schedule</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding-right: 12px;">
                          <div style="background-color: rgba(255, 255, 255, 0.7); border-radius: 8px; padding: 16px; text-align: center;">
                            <div style="color: #7c3aed; font-size: 24px; font-weight: 700; margin-bottom: 4px;">${data.preferredDate || "Flexible"}</div>
                            <div style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Preferred Date</div>
                          </div>
                        </td>
                        <td width="50%" style="padding-left: 12px;">
                          <div style="background-color: rgba(255, 255, 255, 0.7); border-radius: 8px; padding: 16px; text-align: center;">
                            <div style="color: #7c3aed; font-size: 24px; font-weight: 700; margin-bottom: 4px;">${data.preferredTime || "Flexible"}</div>
                            <div style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Preferred Time</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              ${
                data.message
                  ? `
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-left: 4px solid #8b5cf6; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="color: #111827; margin: 0 0 12px; font-size: 16px; font-weight: 600;">💬 Message</h3>
                    <p style="color: #4b5563; margin: 0; font-size: 15px; line-height: 1.6;">${data.message}</p>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }
              
              <!-- Quick Actions -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply via Email</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="tel:${data.phone}" style="display: inline-block; background-color: #f3f4f6; color: #111827; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">Call Client</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 13px;">This booking was submitted through your TraveloOps website</p>
              <p style="color: #9ca3af; margin: 8px 0 0; font-size: 12px;">© 2026 TraveloOps. All rights reserved.</p>
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
  <title>Consultation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 50px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">✨</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">Thank You, ${data.name.split(" ")[0]}!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 12px 0 0; font-size: 18px;">Your consultation request has been received</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Success Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="text-align: center;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 12px; padding: 20px 30px;">
                      <div style="color: #065f46; font-size: 18px; font-weight: 600; margin-bottom: 6px;">✅ Booking Confirmed!</div>
                      <div style="color: #047857; font-size: 14px;">We'll get back to you within 24 hours</div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="color: #4b5563; margin: 0 0 24px; font-size: 16px; line-height: 1.6; text-align: center;">
                We're excited to learn about your travel business and discuss how TraveloOps can help you grow!
              </p>
              
              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="color: #111827; margin: 0 0 20px; font-size: 18px; font-weight: 600; text-align: center;">Your Booking Details</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding: 12px; text-align: center;">
                          <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
                            <div style="color: #8b5cf6; font-size: 32px; margin-bottom: 8px;">📅</div>
                            <div style="color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 4px;">${data.preferredDate || "Flexible"}</div>
                            <div style="color: #6b7280; font-size: 13px;">Preferred Date</div>
                          </div>
                        </td>
                        <td width="50%" style="padding: 12px; text-align: center;">
                          <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
                            <div style="color: #8b5cf6; font-size: 32px; margin-bottom: 8px;">🕐</div>
                            <div style="color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 4px;">${data.preferredTime || "Flexible"}</div>
                            <div style="color: #6b7280; font-size: 13px;">Preferred Time</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- What's Next -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #7c3aed; margin: 0 0 20px; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 0;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700; font-size: 14px;">1</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <div style="color: #111827; font-weight: 600; margin-bottom: 4px;">Review & Confirmation</div>
                                <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will review your request and confirm the best time slot</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700; font-size: 14px;">2</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <div style="color: #111827; font-weight: 600; margin-bottom: 4px;">Calendar Invite</div>
                                <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">You'll receive a calendar invite with video call link</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700; font-size: 14px;">3</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <div style="color: #111827; font-weight: 600; margin-bottom: 4px;">Strategy Call</div>
                                <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">We'll discuss your business goals and how TraveloOps can help</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Contact -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #6b7280; margin: 0 0 16px; font-size: 14px;">Have questions or need to reschedule?</p>
                    <a href="mailto:${ADMIN_EMAIL}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">Contact Us</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <div style="margin-bottom: 16px;">
                <a href="#" style="display: inline-block; margin: 0 8px; color: #8b5cf6; text-decoration: none; font-size: 13px;">Website</a>
                <span style="color: #d1d5db;">|</span>
                <a href="#" style="display: inline-block; margin: 0 8px; color: #8b5cf6; text-decoration: none; font-size: 13px;">LinkedIn</a>
                <span style="color: #d1d5db;">|</span>
                <a href="#" style="display: inline-block; margin: 0 8px; color: #8b5cf6; text-decoration: none; font-size: 13px;">Twitter</a>
              </div>
              <p style="color: #6b7280; margin: 0; font-size: 13px;">TraveloOps - Custom Travel Operator Systems</p>
              <p style="color: #9ca3af; margin: 8px 0 0; font-size: 12px;">© 2026 TraveloOps. All rights reserved.</p>
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

// Send contact email
export const sendContactEmail = async (
  data: ContactEmailData,
): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      message: data.message,
      to_email: "hello@traveloops.com",
      subject: `New Contact Form Submission from ${data.name}`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams,
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error sending contact email:", error);
    return false;
  }
};

// Send booking request email to admin
export const sendBookingEmail = async (
  data: BookingEmailData,
): Promise<boolean> => {
  try {
    // Validate configuration
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === "service_demo") {
      console.error("❌ EmailJS Service ID not configured");
      return false;
    }
    if (
      !EMAILJS_BOOKING_TEMPLATE_ID ||
      EMAILJS_BOOKING_TEMPLATE_ID === "template_booking"
    ) {
      console.error("❌ EmailJS Booking Template ID not configured");
      return false;
    }
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === "demo_public_key") {
      console.error("❌ EmailJS Public Key not configured");
      return false;
    }

    console.log("📧 Sending booking email to admin...");
    const htmlContent = createAdminBookingEmailHTML(data);

    // EmailJS template parameters - ensure to_email is properly set
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      preferred_date: data.preferredDate || "Flexible",
      preferred_time: data.preferredTime || "Flexible",
      message: data.message || "No additional message",
      // EmailJS requires 'to_email' or 'to' parameter for dynamic recipients
      to_email: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: data.email,
      html_content: htmlContent,
      subject: `New Booking: ${data.name} - ${data.preferredDate || "Flexible"}`,
    };

    // Send using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_BOOKING_TEMPLATE_ID,
      templateParams,
    );

    console.log("✅ Booking email sent successfully to admin", response);
    return response.status === 200;
  } catch (error: unknown) {
    const err = error as { message?: string; text?: string; status?: number };
    console.error("❌ Error sending booking email:", err?.message || error);
    return false;
  }
};

// Send confirmation email to user
export const sendUserBookingConfirmation = async (
  data: BookingEmailData,
): Promise<boolean> => {
  try {
    // Validate configuration
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === "service_demo") {
      console.error(
        "❌ EmailJS Service ID not configured for user confirmation",
      );
      return false;
    }
    if (
      !EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID ||
      EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID === "template_booking_confirm"
    ) {
      console.error("❌ EmailJS User Confirmation Template ID not configured");
      return false;
    }

    console.log("📧 Sending confirmation email to user...");
    const htmlContent = createUserConfirmationEmailHTML(data);

    // EmailJS template parameters for user confirmation
    const templateParams = {
      user_name: data.name,
      to_email: data.email,
      to: data.email,
      preferred_date: data.preferredDate || "a date that works for you",
      preferred_time: data.preferredTime || "a convenient time",
      admin_email: ADMIN_EMAIL,
      company: data.company || "your company",
      html_content: htmlContent,
      subject: `Booking Confirmed: ${data.name} - We'll be in touch!`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID,
      templateParams,
    );

    console.log("✅ User confirmation email sent successfully", response);
    return response.status === 200;
  } catch (error: unknown) {
    const err = error as { message?: string; text?: string; status?: number };
    console.error(
      "❌ Error sending user confirmation email:",
      err?.message || error,
    );
    return false;
  }
};

// Send newsletter subscription
export const sendNewsletterEmail = async (email: string): Promise<boolean> => {
  try {
    const templateParams = {
      subscriber_email: email,
      to_email: "jainarham2101@gmail.com",
      subject: "New Newsletter Subscription",
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      "template_newsletter",
      templateParams,
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    return false;
  }
};
