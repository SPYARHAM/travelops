"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MessageSquare,
  Palette,
  TrendingUp,
  FileText,
  Zap,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { trackActivity } from "@/lib/firebase";

const features = [
  {
    icon: Bot,
    title: "Custom AI Chat Assistant",
    description:
      "Trained on your destinations & packages to instantly answer enquiries",
    detail:
      "Your AI learns from your unique travel packages, destinations, pricing, and policies to provide accurate, personalized responses 24/7.",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20",
  },
  {
    icon: Palette,
    title: "Visual Itinerary Builder",
    description:
      "Drag & drop interface to create beautiful customer itineraries",
    detail:
      "Create stunning visual itineraries in minutes with our intuitive builder. Add photos, maps, and day-by-day schedules that wow your clients.",
    gradient: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-500/20",
  },
  {
    icon: TrendingUp,
    title: "Enquiry → Payment Lifecycle",
    description:
      "Track every step from first inquiry to completed trip payment",
    detail:
      "Full visibility into your sales pipeline. Track leads, conversions, payments, and trip status all in one centralized dashboard.",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
  },
  {
    icon: FileText,
    title: "Beautiful Itinerary Delivery",
    description:
      "Customers get stunning visual itineraries instead of boring PDFs",
    detail:
      "Interactive web-based itineraries that customers can access on any device. Real-time updates, maps, and booking confirmations included.",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
  },
  {
    icon: Zap,
    title: "One-Click Admin Automation",
    description: "Receipts, invoices, and confirmations generated instantly",
    detail:
      "Automate repetitive tasks like invoicing, payment reminders, and confirmation emails. Save hours every week on admin work.",
    gradient: "from-cyan-500 to-blue-600",
    bgGlow: "bg-cyan-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const handleFeatureHover = async (index: number) => {
    setActiveFeature(index);
    await trackActivity({
      type: "feature_hover",
      metadata: { feature: features[index].title },
    });
  };

  return (
    <section
      id="features"
      className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-violet-700 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Core Features
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What We Build <span className="gradient-text">For You</span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Core capabilities that transform how you operate
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => handleFeatureHover(index)}
                onMouseLeave={() => setActiveFeature(null)}
                className="group relative cursor-pointer"
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />

                {/* Card */}
                <motion.div
                  animate={{
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full p-6 rounded-2xl glass-card border border-white/40 hover:border-white/60 transition-all duration-300"
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`mb-5 inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200/60"
                      >
                        <p className="text-sm text-gray-700">
                          {feature.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Arrow indicator */}
                  <motion.div
                    animate={{
                      x: isActive ? 4 : 0,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    className="absolute bottom-4 right-4"
                  >
                    <ArrowRight className="w-4 h-4 text-violet-500" />
                  </motion.div>

                  {/* Bottom gradient line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Hover over any feature to learn more
          </p>
        </motion.div>
      </div>
    </section>
  );
}
