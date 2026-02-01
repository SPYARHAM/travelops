import {
  ContactEmailTemplate,
  ContactUserEmailTemplate,
} from "@/components/email-templates/contact-email";
import { Resend } from "resend";
import { NextRequest } from "next/server";

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
      react: ContactEmailTemplate({ name, email, message, company, phone }),
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
      react: ContactUserEmailTemplate({ name }),
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
