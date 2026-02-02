import nodemailer from "nodemailer";

// Create SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "jainarham2101@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail app password
    },
  });
};

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    // Debug: Check if credentials are loaded
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    console.log("Gmail credentials check:", {
      user: user ? "Present" : "Missing",
      pass: pass ? `Present (${pass.length} chars)` : "Missing",
    });

    if (!user || !pass) {
      throw new Error(
        `Missing Gmail credentials: user=${!!user}, pass=${!!pass}`,
      );
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"TravelOps" <${user}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
