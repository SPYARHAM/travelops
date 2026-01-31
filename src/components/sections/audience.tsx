"use client";

import { motion } from "framer-motion";
import {
  Users,
  Zap,
  Briefcase,
  Target,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "Operators Selling Customized Trips",
    description:
      "Travel businesses with unique, tailored itineraries for each client",
    benefits: [
      "Custom itinerary builder",
      "AI-powered responses",
      "Visual proposals",
    ],
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20",
  },
  {
    icon: Zap,
    title: "Agencies Scaling Enquiry Volume",
    description:
      "Businesses experiencing rapid growth and drowning in manual work",
    benefits: ["Automated workflows", "Instant responses", "Lead tracking"],
    gradient: "from-indigo-500 to-violet-600",
    bgGlow: "bg-indigo-500/20",
  },
  {
    icon: Briefcase,
    title: "Businesses Ready to Modernize",
    description:
      "Organizations done with spreadsheets and looking for real infrastructure",
    benefits: ["Unified dashboard", "Real-time analytics", "Zero manual entry"],
    gradient: "from-purple-500 to-pink-600",
    bgGlow: "bg-purple-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />

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
            <Target className="w-4 h-4" />
            Perfect Fit
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Who This Is <span className="gradient-text">For</span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto mb-3">
            This is not for operators looking for basic tools
          </p>
          <p className="text-lg text-violet-600 font-medium">
            It&apos;s for serious businesses ready for real infrastructure
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-2 ${audience.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl glass-card border border-white/40 hover:border-white/60 transition-all duration-300 overflow-hidden">
                  {/* Top gradient line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div
                    className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${audience.gradient} shadow-xl`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
                    {audience.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {audience.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, y: 10 }}
                    whileHover={{ opacity: 1, x: 0, y: 0 }}
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="w-6 h-6 text-violet-500" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Qualification note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <p className="text-lg text-gray-700 font-medium">
              This is a premium system implementation for serious operators
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
