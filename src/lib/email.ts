import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_demo";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_demo";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "demo_public_key";

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
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
      EMAILJS_TEMPLATE_ID,
      templateParams,
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error sending contact email:", error);
    return false;
  }
};

// Send booking request email
export const sendBookingEmail = async (
  data: BookingEmailData,
): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      preferred_date: data.preferredDate || "Not specified",
      preferred_time: data.preferredTime || "Not specified",
      message: data.message || "No additional message",
      to_email: "hello@traveloops.com",
      subject: `New Consultation Booking Request from ${data.name}`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      "template_booking", // Use a separate template for bookings
      templateParams,
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error sending booking email:", error);
    return false;
  }
};

// Send newsletter subscription
export const sendNewsletterEmail = async (email: string): Promise<boolean> => {
  try {
    const templateParams = {
      subscriber_email: email,
      to_email: "hello@traveloops.com",
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
