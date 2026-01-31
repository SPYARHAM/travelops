"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { trackBookingRequest } from "@/lib/firebase";
import { sendBookingEmail } from "@/lib/email";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track to Firebase
      await trackBookingRequest(formData);

      // Send email notification
      await sendBookingEmail(formData);

      toast.success(
        "Booking request sent! We'll contact you within 24 hours.",
        {
          duration: 5000,
          icon: "🎉",
          style: {
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "white",
            borderRadius: "12px",
          },
        },
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });

      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Book a Free Consultation
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Schedule a 30-minute strategy call
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="preferredDate"
                        type="date"
                        placeholder="Preferred date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        name="preferredTime"
                        type="time"
                        placeholder="Preferred time"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      placeholder="Tell us about your travel business..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl glossy-button text-white text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Scheduling...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Book My Free Call
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By booking, you agree to our privacy policy. We&apos;ll
                    never spam you.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
