"use client";

import { useState } from "react";
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
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { trackBookingRequest } from "@/lib/firebase";
import { sendBookingEmail, sendUserBookingConfirmation } from "@/lib/email";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

// Validation errors interface
interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation rules
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        return undefined;

      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim()))
          return "Please enter a valid email address";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length < 10)
          return "Please enter a valid phone number (at least 10 digits)";
        if (phoneDigits.length > 15) return "Phone number is too long";
        return undefined;

      case "company":
        if (value.trim().length > 0 && value.trim().length < 2)
          return "Company name must be at least 2 characters if provided";
        return undefined;

      case "preferredDate":
        if (!value) return "Please select a preferred date";
        const selectedDate = new Date(value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Cannot select a past date";
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6)
          return "Please select a weekday (Monday-Friday)";
        return undefined;

      case "preferredTime":
        if (!value) return "Please select a preferred time";
        return undefined;

      case "message":
        if (value.length > 500)
          return "Message must be less than 500 characters";
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    const fieldsToValidate = [
      "name",
      "email",
      "phone",
      "company",
      "preferredDate",
      "preferredTime",
      "message",
    ] as const;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle field blur (validation trigger)
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle date change
  const handleDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDate: date,
      preferredTime: "", // Reset time when date changes
    }));
    setTouched((prev) => ({ ...prev, preferredDate: true }));
    const error = validateField("preferredDate", date);
    setErrors((prev) => ({
      ...prev,
      preferredDate: error,
      preferredTime: undefined,
    }));
  };

  // Handle time change
  const handleTimeChange = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: time,
    }));
    setTouched((prev) => ({ ...prev, preferredTime: true }));
    const error = validateField("preferredTime", time);
    setErrors((prev) => ({ ...prev, preferredTime: error }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
    setErrors({});
    setTouched({});
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      preferredDate: true,
      preferredTime: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in Firebase
      await trackBookingRequest({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message.trim(),
      });

      // Send email to admin
      await sendBookingEmail({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message.trim(),
      });

      // Send confirmation email to user
      await sendUserBookingConfirmation({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message.trim(),
      });

      // Show success message
      toast.success(
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Booking Request Sent!</p>
            <p className="text-sm opacity-90">
              We will contact you within 24 hours to confirm your appointment.
            </p>
          </div>
        </div>,
        {
          duration: 6000,
          icon: "🎉",
          style: {
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "white",
            borderRadius: "16px",
            padding: "16px",
          },
        },
      );

      resetForm();
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm opacity-90">
              Please try again or contact us directly.
            </p>
          </div>
        </div>,
        {
          style: {
            background: "#ef4444",
            color: "white",
            borderRadius: "12px",
          },
        },
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
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
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name *"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        className={`w-full pl-10 pr-4 h-12 rounded-xl border bg-white transition-all outline-none ${
                          touched.name && errors.name
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address *"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        className={`w-full pl-10 pr-4 h-12 rounded-xl border bg-white transition-all outline-none ${
                          touched.email && errors.email
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        className={`w-full pl-10 pr-4 h-12 rounded-xl border bg-white transition-all outline-none ${
                          touched.phone && errors.phone
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={() => handleBlur("company")}
                        className={`w-full pl-10 pr-4 h-12 rounded-xl border bg-white transition-all outline-none ${
                          touched.company && errors.company
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        }`}
                      />
                      {touched.company && errors.company && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div id="date-picker-trigger">
                      <DatePicker
                        value={formData.preferredDate}
                        onChange={handleDateChange}
                        error={
                          touched.preferredDate
                            ? errors.preferredDate
                            : undefined
                        }
                      />
                    </div>
                    <TimePicker
                      value={formData.preferredTime}
                      onChange={handleTimeChange}
                      date={formData.preferredDate}
                      error={
                        touched.preferredTime ? errors.preferredTime : undefined
                      }
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      placeholder="Tell us about your travel business... (optional)"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white transition-all resize-none outline-none ${
                        touched.message && errors.message
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                      }`}
                    />
                    {formData.message.length > 0 && (
                      <span
                        className={`absolute right-3 bottom-2 text-xs ${
                          formData.message.length > 450
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      >
                        {formData.message.length}/500
                      </span>
                    )}
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.message}
                      </p>
                    )}
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
                    By booking, you agree to our privacy policy. We will never
                    spam you.
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
