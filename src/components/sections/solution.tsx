"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Brain, Workflow, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Fully Custom",
    description:
      "Built specifically for your workflow, not a cookie-cutter solution",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description:
      "Your own AI assistant trained on your destinations and packages",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    icon: Workflow,
    title: "End-to-End",
    description:
      "From enquiry to payment to trip completion — all in one place",
    gradient: "from-purple-500 to-pink-600",
  },
];

const dashboardStats = [
  { label: "Active Trips", value: "42", trend: "+12%" },
  { label: "Revenue", value: "$240K", trend: "+28%" },
  { label: "Pending", value: "8", trend: "-15%" },
  { label: "Response", value: "2 min", trend: "-60%" },
];

const trips = [
  {
    id: "#521",
    status: "Confirmed",
    customer: "Sarah & James",
    statusColor: "bg-emerald-500",
  },
  {
    id: "#520",
    status: "Pending",
    customer: "Marco Rossi",
    statusColor: "bg-amber-500",
  },
  {
    id: "#519",
    status: "Completed",
    customer: "Chen Family",
    statusColor: "bg-violet-500",
  },
];

export function SolutionSection() {
  return (
    <section
      id="solution"
      className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-violet-700 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              The Solution
            </motion.div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              A Custom-Built Travel System{" "}
              <span className="gradient-text">— Not a Tool</span>
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              We don&apos;t sell generic software. We design and onboard a
              complete system tailored to how YOUR travel business works.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex gap-4 p-4 rounded-2xl hover:bg-white/60 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all ml-auto self-center" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Visual - Premium Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/30 via-purple-500/20 to-indigo-500/30 rounded-3xl blur-3xl" />

            {/* Dashboard Card */}
            <div className="relative glass-card rounded-3xl p-6 shadow-2xl border border-white/40 overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      TraveloOps Dashboard
                    </h4>
                    <p className="text-xs text-gray-500">Real-time analytics</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-3 rounded-xl bg-white/60 border border-white/40"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-emerald-600" : "text-violet-600"}`}
                    >
                      {stat.trend}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trips Table */}
              <div className="rounded-xl bg-white/60 border border-white/40 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50/50 text-xs font-medium text-gray-500">
                  <div>Trip</div>
                  <div>Status</div>
                  <div>Customer</div>
                </div>
                {trips.map((trip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 p-3 border-t border-gray-100 hover:bg-violet-50/50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {trip.id}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${trip.statusColor}`}
                      />
                      <span className="text-sm text-gray-700">
                        {trip.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{trip.customer}</div>
                  </motion.div>
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 px-4 py-2 glass-card rounded-full text-sm font-medium text-emerald-600 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Live
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
