"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  AlertCircle,
  Zap,
  Eye,
  TrendingDown,
  Grid,
  ChevronRight,
} from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Lost Enquiries",
    description: "Slow replies lead to customers going elsewhere",
    detail: "Average response time of 24+ hours means 60% of leads go cold",
    color: "from-rose-500 to-orange-500",
    bgGlow: "bg-rose-500/20",
  },
  {
    icon: Zap,
    title: "Manual Itineraries",
    description: "Repetitive, time-consuming itinerary creation",
    detail: "Teams spend 4-6 hours per custom itinerary manually",
    color: "from-amber-500 to-yellow-500",
    bgGlow: "bg-amber-500/20",
  },
  {
    icon: TrendingDown,
    title: "Boring PDFs",
    description: "PDFs don't excite or engage customers",
    detail: "Static documents fail to showcase the travel experience",
    color: "from-violet-500 to-purple-500",
    bgGlow: "bg-violet-500/20",
  },
  {
    icon: Eye,
    title: "Zero Visibility",
    description: "No tracking of enquiries, payments, or trips",
    detail: "Critical data scattered across spreadsheets and emails",
    color: "from-cyan-500 to-blue-500",
    bgGlow: "bg-cyan-500/20",
  },
  {
    icon: Grid,
    title: "Disconnected Tools",
    description: "Too many systems, no unified workflow",
    detail: "Average operator uses 5+ disconnected platforms daily",
    color: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

export function ProblemSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="problem"
      className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-6 border border-red-100"
          >
            ⚠️ Common Pain Points
          </motion.span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            The Problems Travel Operators
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Face Every Day
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            These challenges are silently costing you customers, revenue, and
            countless hours
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isExpanded = expandedIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="relative group cursor-pointer"
              >
                {/* Glossy glass card */}
                <motion.div
                  animate={{
                    y: isHovered ? -12 : 0,
                    rotateX: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-full"
                  style={{ perspective: "1000px" }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute -inset-1 ${problem.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  {/* Card body */}
                  <div className="relative h-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden">
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

                    {/* Matte texture overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent pointer-events-none" />

                    {/* Icon with gradient */}
                    <motion.div
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`relative mb-5 inline-flex p-4 rounded-xl bg-gradient-to-br ${problem.color} shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      {/* Icon shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-xl" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                      {problem.description}
                    </p>

                    {/* Expandable detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200/60"
                        >
                          <p className="text-sm text-gray-700 font-medium">
                            💡 {problem.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      className="absolute bottom-4 right-4 opacity-40 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </motion.div>

                    {/* Bottom gradient line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${problem.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Click any card to learn more • Scroll to see how we solve these
          </p>
        </motion.div>
      </div>
    </section>
  );
}
