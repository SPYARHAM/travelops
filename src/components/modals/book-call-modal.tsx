"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
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
import toast from "react-hot-toast";
import { getBookedSlotsForMonth, trackBookingRequest } from "@/lib/firebase";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { GoogleSignInButton, useAuth } from "@/lib/auth";

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
  const { user, userEmail, userName } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowCustomEmail, setAllowCustomEmail] = useState(false);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<
    Record<string, string[]>
  >({});
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

  useEffect(() => {
    if (userEmail && !allowCustomEmail) {
      setFormData((prev) => ({
        ...prev,
        email: userEmail,
        name: prev.name || userName || "",
      }));
    }
  }, [userEmail, userName, allowCustomEmail]);

  useEffect(() => {
    let isMounted = true;
    const loadBookedSlots = async () => {
      try {
        const slots = await getBookedSlotsForMonth();
        if (isMounted) {
          setBookedSlotsByDate(slots);
        }
      } catch (error) {
        console.error("Failed to preload booked slots:", error);
      }
    };

    loadBookedSlots();
    return () => {
      isMounted = false;
    };
  }, []);

  // No EmailJS initialization needed for Web3Forms

  // Validation rules
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        const nameParts = value
          .trim()
          .split(" ")
          .filter((part) => part.length > 0);
        if (nameParts.length < 2)
          return "Please enter your full name (first and last name)";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        if (nameParts.some((part) => part.length < 2))
          return "Each name part must be at least 2 characters";
        return undefined;

      case "email":
        if (!value.trim()) return "Email address is required";
        const emailValue = value.trim().toLowerCase();
        // Strict email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue))
          return "Please enter a valid email address (e.g., name@example.com)";
        // Check for common typos
        if (emailValue.includes(".."))
          return "Invalid email format - contains consecutive dots";
        if (emailValue.startsWith(".") || emailValue.endsWith("."))
          return "Email cannot start or end with a dot";
        const domain = emailValue.split("@")[1];
        if (!domain || !domain.includes("."))
          return "Please enter a valid email domain";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        // Remove all non-digit characters
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length === 0)
          return "Please enter a valid phone number";
        if (phoneDigits.length < 10)
          return "Phone number must be at least 10 digits";
        if (phoneDigits.length > 15)
          return "Phone number cannot exceed 15 digits";
        // Check for invalid patterns like all same digits
        if (/^(\d)\1+$/.test(phoneDigits))
          return "Please enter a valid phone number";
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
      toast.error(
        "Please check the form and fix all errors before submitting",
        {
          duration: 4000,
          icon: "⚠️",
        },
      );
      return;
    }

    setIsSubmitting(true);

    try {
      toast.loading("Sending your booking request...", { id: "booking" });

      // Try to store in Firebase (optional - don't block if it fails)
      let firebaseSuccess = false;
      try {
        const firebaseResult = await trackBookingRequest({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message.trim(),
        });
        firebaseSuccess = !!firebaseResult;
        console.log(
          firebaseSuccess
            ? "✅ Firebase storage successful"
            : "⚠️ Firebase storage failed but continuing with email",
        );
      } catch (firebaseError) {
        console.warn(
          "⚠️ Firebase failed, continuing with email only:",
          firebaseError,
        );
      }

      // Send emails via API route
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send booking request");
      }

      const result = await response.json();
      console.log("Booking API success:", result);

      // Show success message
      toast.success(
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Booking Request Sent!</p>
            <p className="text-sm opacity-90">
              Check your email for confirmation details. We&apos;ll contact you
              within 24 hours.
              {!firebaseSuccess && " (Email backup active)"}
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
            className="fixed inset-0 z-[100] modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
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

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Google sign-in helper */}
                  {!user && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          Prefill with Google
                        </p>
                        <p className="text-xs text-gray-500">
                          Sign in to auto-fill your name and email. You can
                          still use your work email.
                        </p>
                      </div>
                      <GoogleSignInButton
                        size="small"
                        className="w-full sm:w-auto"
                      />
                    </div>
                  )}

                  {user && userEmail && (
                    <div className="rounded-xl border border-green-200 bg-green-50/60 p-3 sm:p-4 flex items-center justify-between gap-3">
                      <div className="text-xs sm:text-sm text-green-700">
                        Signed in as{" "}
                        <span className="font-semibold">{userEmail}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAllowCustomEmail((prev) => !prev)}
                        className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                      >
                        {allowCustomEmail
                          ? "Use Google email"
                          : "Use work email"}
                      </button>
                    </div>
                  )}
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name *"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm rounded-xl border bg-white transition-all outline-none ${
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
                        placeholder={
                          allowCustomEmail || !userEmail
                            ? "Work email address *"
                            : "Email address *"
                        }
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        readOnly={!!userEmail && !allowCustomEmail}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm rounded-xl border bg-white transition-all outline-none ${
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm rounded-xl border bg-white transition-all outline-none ${
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
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm rounded-xl border bg-white transition-all outline-none ${
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                      firebaseBookedSlots={bookedSlotsByDate}
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
