"use client";

import {
  motion,
  // useScroll,
  // useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Phone, Mail } from "lucide-react";
import { BookCallModal } from "@/components/modals/book-call-modal";
import { ContactModal } from "@/components/modals/contact-modal";
import { AuthGateModal } from "@/components/modals/auth-gate-modal";
import { trackCTAClick } from "@/lib/firebase";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  // { href: "#investment", label: "Investment" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [pendingModalType, setPendingModalType] = useState<
    "booking" | "contact"
  >("booking");
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  // const { scrollY } = useScroll();

  // const headerBg = useTransform(
  //   scrollY,
  //   [0, 50],
  //   ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"],
  // );

  // const headerBlur = useTransform(scrollY, [0, 50], [0, 16]);
  // const headerBorder = useTransform(
  //   scrollY,
  //   [0, 50],
  //   ["rgba(255, 255, 255, 0)", "rgba(139, 92, 246, 0.1)"],
  // );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookCall = () => {
    trackCTAClick("book_call", "header");
    setPendingModalType("booking");
    setAuthGateOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleContact = () => {
    trackCTAClick("contact", "header");
    setPendingModalType("contact");
    setAuthGateOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleAuthGateClosed = () => {
    setAuthGateOpen(false);
  };

  const handleAuthGateSignedIn = () => {
    setAuthGateOpen(false);
    if (pendingModalType === "booking") {
      setIsBookCallOpen(true);
    } else if (pendingModalType === "contact") {
      setIsContactOpen(true);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-violet-100"
            : "bg-white/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg opacity-40" />
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold gradient-text">
                  TraveloOps
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex items-center gap-1"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Desktop Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center gap-3"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleContact}
                className="text-gray-600 hover:text-violet-600 hover:bg-violet-50 gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="sm"
                  onClick={handleBookCall}
                  className="glossy-button text-white rounded-xl px-6 py-2 gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Book a Call
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:hidden p-2 rounded-xl hover:bg-violet-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-violet-100"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleContact}
                    className="w-full justify-center gap-2 rounded-xl"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Button>
                  <Button
                    onClick={handleBookCall}
                    className="w-full glossy-button text-white justify-center gap-2 rounded-xl"
                  >
                    <Phone className="w-4 h-4" />
                    Book a Call
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Modals */}
      <AuthGateModal
        isOpen={authGateOpen}
        onClose={handleAuthGateClosed}
        onSignedIn={handleAuthGateSignedIn}
        modalType={pendingModalType}
      />
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
