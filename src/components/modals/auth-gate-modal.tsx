"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignedIn: () => void;
  modalType: "booking" | "contact" | "newsletter";
}

export function AuthGateModal({
  isOpen,
  onClose,
  onSignedIn,
  modalType,
}: AuthGateModalProps) {
  const { user, signInWithGoogle, logout, userEmail, userName, loading } =
    useAuth();

  // Auto-proceed if already signed in
  useEffect(() => {
    if (isOpen && user && !loading) {
      // Small delay to ensure auth state is settled
      const timer = setTimeout(() => {
        onSignedIn();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, user, loading, onSignedIn]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // onSignedIn will be called by useEffect when user state updates
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const modalTitle = {
    booking: "Book a Consultation Call",
    contact: "Get in Touch",
    newsletter: "Subscribe to Newsletter",
  }[modalType];

  const modalDescription = {
    booking:
      "Sign in with Google to book your consultation call. Your email will be auto-filled.",
    contact:
      "Sign in with Google to contact us. Your information will be pre-filled.",
    newsletter:
      "Sign in with Google to subscribe. Your email will be auto-filled.",
  }[modalType];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Background gradient accent */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-40" />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {modalTitle}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {modalDescription}
                </p>
              </motion.div>

              {/* Sign-in state */}
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="h-12 bg-gradient-to-r from-violet-200 to-purple-200 rounded-lg animate-pulse" />
                  <p className="text-sm text-gray-500 text-center">
                    Loading authentication...
                  </p>
                </motion.div>
              ) : user ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
                    <p className="text-sm text-gray-600">
                      Signed in as{" "}
                      <span className="font-semibold text-gray-900">
                        {userName || userEmail || "User"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
                  </div>

                  <Button
                    onClick={onSignedIn}
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Continue to {modalTitle}
                  </Button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Button
                    onClick={handleSignIn}
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                    Sign in with Google
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We&apos;ll never share your email without permission
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
