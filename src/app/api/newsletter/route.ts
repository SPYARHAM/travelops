import {
  NewsletterEmailTemplate,
  NewsletterAdminEmailTemplate,
} from "@/components/email-templates/newsletter-email";
import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Send admin notification
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: ["jainarham2101@gmail.com"],
      subject: `🎯 New Newsletter Signup: ${email}`,
      react: NewsletterAdminEmailTemplate({ email }),
      replyTo: "jainarham2101@gmail.com",
    });

    if (adminError) {
      console.error("Admin newsletter email error:", adminError);
      return Response.json(
        { error: "Failed to send admin notification" },
        { status: 500 },
      );
    }

    // Send welcome email to subscriber
    const { data: userData, error: userError } = await resend.emails.send({
      from: "TravelOps <jainarham2101@gmail.com>",
      to: [email],
      subject: "Welcome to TravelOps Insights! ✈️",
      react: NewsletterEmailTemplate({ email }),
      replyTo: "jainarham2101@gmail.com",
    });

    if (userError) {
      console.error("User newsletter email error:", userError);
      return Response.json(
        { error: "Failed to send welcome email" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      adminData,
      userData,
      message: "Newsletter emails sent successfully",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
