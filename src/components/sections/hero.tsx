"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGlobe } from "@/components/3d/animated-globe";
import { useState } from "react";
import { BookCallModal } from "@/components/modals/book-call-modal";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { trackCTAClick } from "@/lib/firebase";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const floatingBadges = [
  { icon: Zap, text: "AI-Powered", delay: 0 },
  { icon: Shield, text: "Enterprise Ready", delay: 0.15 },
  { icon: Sparkles, text: "Custom Built", delay: 0.3 },
];

export function HeroSection() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleBookCall = () => {
    trackCTAClick("book_consultation", "hero");
    setIsBookCallOpen(true);
  };

  const handleSeeHow = () => {
    trackCTAClick("see_how_it_works", "hero");
    const element = document.getElementById("solution");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 px-4 md:px-6 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0 mesh-gradient" />

        {/* Animated Orbs - Simplified for better performance */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-br from-violet-400/25 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/6 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-gradient-to-bl from-indigo-400/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left order-2 lg:order-1"
            >
              {/* Floating Badges - Hidden on mobile */}
              <motion.div
                variants={itemVariants}
                className="hidden lg:flex flex-wrap gap-2 justify-center lg:justify-start mb-5"
              >
                {floatingBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + badge.delay, duration: 0.4 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-gray-700"
                    >
                      <Icon className="w-3.5 h-3.5 text-violet-600" />
                      {badge.text}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-4 text-gray-900"
              >
                Stop Managing Travel with{" "}
                <span className="relative inline-block">
                  <span className="gradient-text-animated">
                    WhatsApp, Excel & PDFs
                  </span>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0"
              >
                We design and build a complete custom travel operator system —
                including your own dashboard, workflows, and AI assistant.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    onClick={handleBookCall}
                    className="glossy-button text-white rounded-xl px-6 py-5 text-sm font-semibold group"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSeeHow}
                    className="rounded-xl px-6 py-5 text-sm font-semibold border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 group glass-button"
                  >
                    <Play className="w-4 h-4 mr-2 text-violet-600" />
                    See How It Works
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-gray-500"
              >
                {[
                  "No credit card required",
                  "30-minute strategy call",
                  "Custom scope discussion",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual - 3D Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[280px] md:h-[350px] lg:h-[420px] order-1 lg:order-2"
            >
              {/* Glow effect behind globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <AnimatedGlobe />
              </div>

              {/* Floating Stats Cards - Hidden on smallest screens, shown on md+ */}
              <motion.div
                initial={{ opacity: 0, x: -15, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-4 left-0 md:top-6 md:-left-2 glass-card rounded-xl p-2.5 md:p-3 shadow-lg hidden sm:block"
              >
                <div className="text-lg md:text-xl font-bold gradient-text">
                  95%
                </div>
                <div className="text-[10px] md:text-xs text-gray-600">
                  Time Saved
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15, y: -15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
                className="absolute top-12 right-0 md:top-14 md:-right-2 glass-card rounded-xl p-2.5 md:p-3 shadow-lg hidden sm:block"
              >
                <div className="text-lg md:text-xl font-bold gradient-text">
                  2min
                </div>
                <div className="text-[10px] md:text-xs text-gray-600">
                  Avg Response
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute bottom-12 right-6 md:bottom-16 md:right-8 glass-card rounded-xl p-2.5 md:p-3 shadow-lg hidden sm:block"
              >
                <div className="text-lg md:text-xl font-bold gradient-text">
                  100%
                </div>
                <div className="text-[10px] md:text-xs text-gray-600">
                  Custom Built
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Scroll to explore
            </span>
            <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 bg-violet-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </>
  );
}
