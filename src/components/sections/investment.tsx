"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Users,
  Headphones,
  Sparkles,
  Check,
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We don't stop until you're 100% satisfied with your system",
  },
  {
    icon: Clock,
    title: "Rapid Deployment",
    description: "From discovery to live system in just 6 weeks",
  },
  {
    icon: Users,
    title: "Limited Partners",
    description: "Only 3-4 new partners per month for dedicated attention",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "Premium support throughout your system's lifecycle",
  },
];

export function InvestmentSection() {
  return (
    <section
      id="investment"
      className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-violet-700 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Investment
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            Custom System <span className="gradient-text">Implementation</span>
          </h2>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />

            {/* Card */}
            <div className="relative p-10 rounded-3xl glass-card border border-white/40 overflow-hidden">
              {/* Top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

              <div className="max-w-2xl mx-auto">
                <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
                  This is a custom system implementation.
                </p>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  Pricing is discussed after understanding your business
                  workflow and scope during our free consultation call.
                </p>

                {/* Value props */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "No hidden fees or surprises",
                    "Transparent pricing breakdown",
                    "Flexible payment options",
                    "ROI-focused investment",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 rounded-2xl glass-card border border-white/40 hover:border-violet-200 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Pricing numbers are discussed after your consultation call
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
