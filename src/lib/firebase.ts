import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Analytics (only in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;

export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    analytics = getAnalytics(app);
  }
  return analytics;
};

// Activity Types
export type ActivityType =
  | "page_view"
  | "cta_click"
  | "form_submit"
  | "book_call"
  | "send_email"
  | "feature_hover"
  | "section_view"
  | "scroll_depth"
  | "time_on_page";

export interface Activity {
  type: ActivityType;
  timestamp?: ReturnType<typeof serverTimestamp>;
  metadata?: Record<string, unknown>;
  sessionId?: string;
  userAgent?: string;
  page?: string;
}

// Track activity to Firestore
export const trackActivity = async (
  activity: Omit<Activity, "timestamp" | "userAgent" | "page">,
) => {
  try {
    const sessionId = getOrCreateSessionId();
    const activityData: Activity = {
      ...activity,
      timestamp: serverTimestamp(),
      sessionId,
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : undefined,
      page:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    };

    await addDoc(collection(db, "activities"), activityData);

    // Also log to analytics if available
    if (analytics) {
      logEvent(
        analytics,
        activity.type as string,
        activity.metadata as Record<string, string>,
      );
    }

    return true;
  } catch (error) {
    // Silently fail if Firebase permissions are not set up
    // This prevents errors from breaking the UI
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Firebase tracking disabled - check Firestore rules:",
        error,
      );
    }
    return false;
  }
};

// Track form submissions
export const trackFormSubmission = async (formData: {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  formType: "contact" | "newsletter" | "book_call" | "footer_newsletter";
}) => {
  try {
    await addDoc(collection(db, "leads"), {
      ...formData,
      timestamp: serverTimestamp(),
      sessionId: getOrCreateSessionId(),
      source: typeof window !== "undefined" ? window.location.href : undefined,
    });

    await trackActivity({
      type: "form_submit",
      metadata: { formType: formData.formType, email: formData.email },
    });

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Firebase form tracking disabled - check Firestore rules:",
        error,
      );
    }
    // Don't throw error - allow form submission to continue via email
    return false;
  }
};

// Track booking requests with full details
export const trackBookingRequest = async (bookingData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      timestamp: serverTimestamp(),
      sessionId: getOrCreateSessionId(),
      source: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : undefined,
      createdAt: new Date().toISOString(),
    });

    if (bookingData.preferredDate && bookingData.preferredTime) {
      await addDoc(collection(db, "booking_slots"), {
        bookingId: docRef.id,
        date: bookingData.preferredDate,
        time: bookingData.preferredTime,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    }

    await trackActivity({
      type: "book_call",
      metadata: {
        email: bookingData.email,
        date: bookingData.preferredDate || "not specified",
        time: bookingData.preferredTime || "not specified",
      },
    });

    return docRef.id;
  } catch (error: unknown) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    console.error("🔥 Firebase booking error details:", {
      code:
        errorObj instanceof Error && "code" in errorObj
          ? (errorObj as Record<string, unknown>).code
          : undefined,
      message: errorObj.message,
      details: error,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Firebase booking tracking disabled - check Firestore rules:",
        error,
      );
    }
    // Don't throw error - allow booking to continue via email
    return null;
  }
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: "pending" | "confirmed" | "completed" | "cancelled",
) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating booking status:", error);
    return false;
  }
};

// Get all bookings (admin function)
export const getBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, "bookings"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Get booked slots for a specific date
export const getBookedSlotsForDate = async (
  date: string,
): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, "booking_slots"));
    const bookedSlots: string[] = [];

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (
        data.date === date &&
        (data.status === "pending" || data.status === "confirmed")
      ) {
        if (data.time) {
          bookedSlots.push(data.time);
        }
      }
    });

    return bookedSlots;
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    return [];
  }
};

// Get all booked slots for upcoming days (preload for performance)
export const getBookedSlotsForMonth = async (): Promise<
  Record<string, string[]>
> => {
  try {
    const snapshot = await getDocs(collection(db, "booking_slots"));
    const bookedSlotsByDate: Record<string, string[]> = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (
        data.date &&
        data.time &&
        (data.status === "pending" || data.status === "confirmed")
      ) {
        if (!bookedSlotsByDate[data.date]) {
          bookedSlotsByDate[data.date] = [];
        }
        bookedSlotsByDate[data.date].push(data.time);
      }
    });

    return bookedSlotsByDate;
  } catch (error) {
    console.error("Error fetching booked slots for month:", error);
    return {};
  }
};

// Session management
const getOrCreateSessionId = (): string => {
  if (typeof window === "undefined") return "server";

  let sessionId = sessionStorage.getItem("travelops_session");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("travelops_session", sessionId);
  }
  return sessionId;
};

// Track page views
export const trackPageView = async (pageName: string) => {
  await trackActivity({
    type: "page_view",
    metadata: { page: pageName },
  });
};

// Track CTA clicks
export const trackCTAClick = async (ctaName: string, location: string) => {
  await trackActivity({
    type: "cta_click",
    metadata: { ctaName, location },
  });
};

// Track scroll depth
export const trackScrollDepth = async (depth: number) => {
  await trackActivity({
    type: "scroll_depth",
    metadata: { depth: `${depth}%` },
  });
};

export { app, db, analytics };
