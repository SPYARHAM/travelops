"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Mail,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { trackFormSubmission } from "@/lib/firebase";
import toast from "react-hot-toast";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/traveloops", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/traveloops",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/traveloops", label: "GitHub" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store in Firebase
      await trackFormSubmission({
        email,
        formType: "footer_newsletter",
      });

      // Send email via API route
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }

      const result = await response.json();
      console.log("Newsletter signup success:", result);

      toast.success(
        "You're subscribed! Check your email for a welcome message.",
        {
          icon: "✈️",
          style: {
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "white",
            borderRadius: "12px",
          },
        },
      );
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-b from-slate-50 to-white border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* Main Footer Grid - Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">
                TraveloOps
              </span>
            </Link>
            <p className="text-gray-500 text-xs mb-4 leading-relaxed max-w-[200px]">
              Custom travel operator systems built for serious operators.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-violet-100 flex items-center justify-center text-gray-500 hover:text-violet-600 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-violet-600 transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="mailto:hello@traveloops.com"
                  className="text-gray-500 hover:text-violet-600 transition-colors"
                >
                  jainarham@gmail.com
                </a>
              </li>
              <li className="text-gray-500">774001952</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Newsletter
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 h-9 rounded-lg bg-white border-gray-200 text-xs focus:border-violet-400 transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white text-xs font-medium"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-gray-400">
            © {currentYear} TraveloOps. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-violet-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-violet-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
