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
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { trackFormSubmission } from "@/lib/firebase";
import toast from "react-hot-toast";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#audience", label: "Who We Help" },
  { href: "#investment", label: "Investment" },
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
      await trackFormSubmission({
        email,
        formType: "footer_newsletter",
      });

      toast.success("You're subscribed! Welcome aboard.", {
        icon: "✈️",
        style: {
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          color: "white",
          borderRadius: "12px",
        },
      });
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Top Section - Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 mb-16 bg-white/5 border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span className="text-violet-400 text-sm font-medium">
                  Stay Updated
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get the latest insights
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                Join our newsletter for travel tech insights, product updates,
                and exclusive early access.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-3 w-full lg:w-auto"
            >
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-14 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-violet-500 transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-6 rounded-xl glossy-button text-white font-semibold shrink-0"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TraveloOps</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Custom travel operator systems built for serious operators who
              demand excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-violet-500/30 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Email us</p>
                  <a
                    href="mailto:hello@traveloops.com"
                    className="text-white hover:text-violet-400 transition-colors"
                  >
                    hello@traveloops.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Call us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:text-violet-400 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">San Francisco, CA</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
              Ready to Start?
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              Transform your travel operations with a custom-built solution
              designed for your needs.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#cta-final"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glossy-button text-white font-semibold text-sm group"
              >
                Schedule a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} TraveloOps. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
