import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TraveloOps - Custom Travel Operator System",
  description:
    "Premium custom travel operator system with AI assistant for travel agencies and tour operators. Stop managing travel with WhatsApp, Excel & PDFs.",
  keywords: [
    "travel operator system",
    "travel agency software",
    "AI travel assistant",
    "custom travel system",
    "tour operator software",
  ],
  openGraph: {
    title: "TraveloOps - Custom Travel Operator System",
    description:
      "Premium custom travel operator system with AI assistant for travel agencies and tour operators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
            success: {
              iconTheme: {
                primary: "#8b5cf6",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
