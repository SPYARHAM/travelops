"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BookCallModal } from "@/components/modals/book-call-modal";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Calendar,
  Rocket,
} from "lucide-react";
import { trackFormSubmission, trackCTAClick } from "@/lib/firebase";
import toast from "react-hot-toast";

export function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await trackFormSubmission({
        email,
        formType: "newsletter",
      });

      toast.success("Thanks! We'll send you details shortly.", {
        duration: 5000,
        icon: "✉️",
        style: {
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          color: "white",
          borderRadius: "12px",
        },
      });

      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookCall = async () => {
    await trackCTAClick("book_strategy_call", "final_cta");
    setIsBookCallOpen(true);
  };

  return (
    <>
      <section id="cta-final" className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-indigo-50/50 to-white" />

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-indigo-400/30 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-violet-700 mb-8"
          >
            <Rocket className="w-4 h-4" />
            Ready to Transform?
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6"
          >
            Ready to Build a{" "}
            <span className="gradient-text-animated">Smart Travel System</span>?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Let&apos;s discuss how we can transform your travel operator system
            with a custom solution built just for you.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleBookCall}
                className="glossy-button text-white rounded-2xl px-12 py-8 text-xl font-semibold group animate-pulse-glow"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Schedule a Strategy Call
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            {[
              "Early partner onboarding available",
              "Limited spots per month",
              "30-minute strategy call",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent mx-auto mb-10"
          />

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-gray-500 mb-4 text-sm">
              Or get more details sent to your inbox
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-14 rounded-xl border-gray-200 focus:border-violet-500 transition-all glass-card"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-8 rounded-xl glossy-button text-white font-semibold"
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
                    <Sparkles className="w-5 h-5 mr-2" />
                    Send Details
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </>
  );
}
