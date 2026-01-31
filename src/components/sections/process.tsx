"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Cog,
  RefreshCw,
  Rocket,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Business Discovery",
    description: "We understand your workflow, pain points, and growth goals",
    detail:
      "A deep dive into your operations to understand exactly how your business works",
    gradient: "from-violet-500 to-purple-600",
    duration: "Week 1",
  },
  {
    number: 2,
    icon: Cog,
    title: "System + AI Setup",
    description: "Our team designs and builds your custom travel system",
    detail: "Custom development of your dashboard, workflows, and AI assistant",
    gradient: "from-indigo-500 to-violet-600",
    duration: "Weeks 2-4",
  },
  {
    number: 3,
    icon: RefreshCw,
    title: "Review & Fine-tuning",
    description: "You review, we adjust until it's perfect for your team",
    detail:
      "Iterative refinement based on your feedback and real-world testing",
    gradient: "from-purple-500 to-pink-600",
    duration: "Week 5",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Go-Live",
    description: "Your custom travel system is live and operational",
    detail: "Full deployment with training, documentation, and ongoing support",
    gradient: "from-pink-500 to-rose-600",
    duration: "Week 6",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

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
            Simple Process
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How Onboarding <span className="gradient-text">Works</span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Four simple steps from discovery to live system
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connection line */}
          <div className="absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-gradient-to-r from-violet-200 via-purple-300 to-pink-200 rounded-full" />

          {/* Progress indicator */}
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{
              width: `${((activeStep + 1) / steps.length) * 80}%`,
            }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-[4.5rem] left-[10%] h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full"
          />

          {/* Steps Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep >= index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onMouseEnter={() => setActiveStep(index)}
                  className="cursor-pointer group"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Step circle */}
                    <motion.div
                      animate={{
                        scale: activeStep === index ? 1.15 : 1,
                        boxShadow:
                          activeStep === index
                            ? "0 0 40px rgba(139, 92, 246, 0.4)"
                            : "0 0 0px rgba(139, 92, 246, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative w-24 h-24 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${step.gradient} shadow-xl`
                          : "bg-white border-2 border-gray-200"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${isActive ? "text-white" : "text-gray-400"}`}
                      />

                      {/* Step number badge */}
                      <div
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isActive
                            ? "bg-white text-violet-600 shadow-lg"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.number}
                      </div>

                      {/* Glossy overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl" />
                      )}
                    </motion.div>

                    {/* Duration badge */}
                    <motion.div
                      animate={{ y: activeStep === index ? -4 : 0 }}
                      className="mb-3"
                    >
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          isActive
                            ? "bg-violet-100 text-violet-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.duration}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      animate={{ y: activeStep === index ? -8 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <h3
                        className={`text-lg font-bold mb-2 transition-colors ${
                          activeStep === index
                            ? "text-violet-600"
                            : "text-gray-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Detail on hover */}
                      {activeStep === index && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-gray-500 mt-3 italic"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <motion.div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-violet-300 to-purple-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-100 text-violet-700">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Typical timeline: 6 weeks from discovery to go-live
            <ArrowRight className="w-4 h-4 text-violet-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
