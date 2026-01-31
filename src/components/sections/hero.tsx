"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const floatingBadges = [
  { icon: Zap, text: "AI-Powered", delay: 0 },
  { icon: Shield, text: "Enterprise Ready", delay: 0.2 },
  { icon: Sparkles, text: "Custom Built", delay: 0.4 },
];

export function HeroSection() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleBookCall = async () => {
    await trackCTAClick("book_consultation", "hero");
    setIsBookCallOpen(true);
  };

  const handleSeeHow = async () => {
    await trackCTAClick("see_how_it_works", "hero");
    const element = document.getElementById("solution");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0 mesh-gradient" />

        {/* Animated Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-br from-violet-400/30 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-1/6 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-400/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              {/* Floating Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                {floatingBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5 + badge.delay, duration: 0.5 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-gray-700"
                    >
                      <Icon className="w-4 h-4 text-violet-600" />
                      {badge.text}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 text-gray-900"
              >
                Stop Managing Travel with{" "}
                <span className="relative">
                  <span className="gradient-text-animated">
                    WhatsApp, Excel & PDFs
                  </span>
                  <motion.svg
                    viewBox="0 0 300 12"
                    className="absolute -bottom-2 left-0 w-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <motion.path
                      d="M2 10 Q 75 0, 150 6 T 298 4"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              >
                We design and build a complete custom travel operator system —
                including your own dashboard, workflows, and AI assistant.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    onClick={handleBookCall}
                    className="glossy-button text-white rounded-2xl px-8 py-7 text-lg font-semibold group"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
                    className="rounded-2xl px-8 py-7 text-lg font-semibold border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 group glass-button"
                  >
                    <Play className="w-5 h-5 mr-2 text-violet-600" />
                    See How It Works
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-500"
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
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual - 3D Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[400px] lg:h-[600px]"
            >
              {/* Glow effect behind globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />
              </div>
              <AnimatedGlobe />

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute top-10 left-0 lg:-left-4 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute top-20 right-0 lg:-right-4 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold gradient-text">2min</div>
                <div className="text-sm text-gray-600">Avg Response</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-20 right-10 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600">Custom Built</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-violet-500 rounded-full"
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
