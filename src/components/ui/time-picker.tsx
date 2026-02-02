"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check } from "lucide-react";
import { getBookedSlotsForMonth } from "@/lib/firebase";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  date: string;
  error?: string;
  firebaseBookedSlots?: Record<string, string[]>;
}

const TIME_SLOTS = [
  { time: "09:00", label: "9:00 AM" },
  { time: "09:30", label: "9:30 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "10:30", label: "10:30 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "11:30", label: "11:30 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "12:30", label: "12:30 PM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "13:30", label: "1:30 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "14:30", label: "2:30 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "15:30", label: "3:30 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "16:30", label: "4:30 PM" },
  { time: "17:00", label: "5:00 PM" },
  { time: "17:30", label: "5:30 PM" },
];

// Generate simulated booked slots for a given date (looks more premium)
const generateSimulatedBookedSlots = (dateStr: string): string[] => {
  if (!dateStr) return [];

  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Calculate days from today
  const daysDiff = Math.floor(
    (selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Week 1 (next 7 days): 4-8 booked slots (busier)
  // Week 2 (days 8-14): 2-5 booked slots
  let minSlots = 4;
  let maxSlots = 8;

  if (daysDiff >= 7 && daysDiff < 14) {
    minSlots = 2;
    maxSlots = 5;
  } else if (daysDiff >= 14) {
    minSlots = 1;
    maxSlots = 3;
  }

  // Use date as seed for consistent randomness
  const seed = dateStr.split(/[-/\s]/).join("");
  const random = (index: number) => {
    const x = Math.sin(parseInt(seed) + index) * 10000;
    return x - Math.floor(x);
  };

  // Randomly select number of slots to book
  const numBookedSlots =
    Math.floor(random(0) * (maxSlots - minSlots + 1)) + minSlots;

  // Randomly select which slots are booked (prefer morning/early afternoon)
  const bookedIndices: number[] = [];
  while (bookedIndices.length < numBookedSlots) {
    // Weight towards earlier slots (more realistic)
    const weightedIndex = Math.floor(
      Math.pow(random(bookedIndices.length + 100), 0.7) * TIME_SLOTS.length,
    );
    if (!bookedIndices.includes(weightedIndex)) {
      bookedIndices.push(weightedIndex);
    }
  }

  return bookedIndices.map((i) => TIME_SLOTS[i].time);
};

export function TimePicker({
  value,
  onChange,
  date,
  error,
  firebaseBookedSlots,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [realBookedSlots, setRealBookedSlots] = useState<
    Record<string, string[]>
  >({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load booked slots from Firebase on mount
  useEffect(() => {
    const loadBookedSlots = async () => {
      if (firebaseBookedSlots) {
        setRealBookedSlots(firebaseBookedSlots);
        return;
      }

      try {
        const slots = await getBookedSlotsForMonth();
        setRealBookedSlots(slots);
      } catch (error) {
        console.error("Failed to load booked slots:", error);
      }
    };

    loadBookedSlots();
  }, [firebaseBookedSlots]);

  // Combine simulated and real booked slots
  const bookedSlots = useMemo(() => {
    if (!date) return [];

    // Get real booked slots from Firebase
    const realSlots = realBookedSlots[date] || [];

    // Get simulated booked slots
    const simulatedSlots = generateSimulatedBookedSlots(date);

    // Combine and deduplicate
    const allBooked = [...new Set([...realSlots, ...simulatedSlots])];
    return allBooked;
  }, [date, realBookedSlots]);

  // Format display for selected time
  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get if a date is in the past
  const isPastDate = () => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date + "T00:00:00");
    return selectedDate < today;
  };

  const isToday = () => {
    if (!date) return false;
    return (
      new Date(date + "T00:00:00").toDateString() === new Date().toDateString()
    );
  };

  // Get current hour to disable past time slots for today
  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const shouldDisableSlot = (slotTime: string) => {
    if (!date) return true;

    // If it's a past date, disable all
    if (isPastDate()) return true;

    // If it's today, disable past time slots
    if (isToday()) {
      const [hours] = slotTime.split(":").map(Number);
      return hours <= getCurrentHour();
    }

    return false;
  };

  const isSlotBooked = (slotTime: string) => {
    return bookedSlots.includes(slotTime);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => {
          if (!date) {
            // Focus on date picker if no date selected
            document.getElementById("date-picker-trigger")?.focus();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full h-11 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-xl border bg-white text-left transition-all duration-200 flex items-center ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 hover:border-violet-300"
        } ${!date ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <span
          className={`flex-1 text-xs sm:text-sm truncate ${value ? "text-gray-900" : "text-gray-400"}`}
        >
          {value
            ? formatDisplayTime(value)
            : date
              ? "Select time slot"
              : "Select date first"}
        </span>
        {value && (
          <Check className="w-4 h-4 text-violet-500 ml-1 flex-shrink-0" />
        )}
      </button>

      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}

      {/* Time Slots Popover */}
      <AnimatePresence>
        {isOpen && date && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[60] top-full mt-1 left-0 w-[200px] sm:w-[240px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600">
              <p className="text-sm font-bold text-white text-center">
                Select a time
              </p>
              <p className="text-xs text-violet-100 text-center mt-0.5">
                30-minute slots
              </p>
            </div>

            {/* Time Grid - Scrollable */}
            <div className="max-h-[240px] overflow-y-auto p-2">
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = value === slot.time;
                  const isDisabled = shouldDisableSlot(slot.time);
                  const isBooked = isSlotBooked(slot.time);
                  const isUnavailable = isDisabled || isBooked;

                  return (
                    <div key={slot.time} className="relative group">
                      <button
                        type="button"
                        onClick={() => {
                          if (!isUnavailable) {
                            onChange(slot.time);
                            setIsOpen(false);
                          }
                        }}
                        disabled={isUnavailable}
                        className={`
                          relative px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full
                          ${
                            isUnavailable
                              ? "text-gray-300 cursor-not-allowed bg-gray-50 line-through"
                              : isSelected
                                ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/30"
                                : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-700 border border-gray-100 hover:border-violet-200"
                          }
                        `}
                      >
                        {slot.label}
                        {isBooked && !isDisabled && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                        {isSelected && (
                          <motion.div
                            layoutId="selected-time"
                            className="absolute inset-0 rounded-lg ring-2 ring-violet-500 ring-offset-1"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>

                      {/* Tooltip for booked slots */}
                      {isBooked && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Already Booked
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer legend */}
            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <span className="text-[10px] text-gray-500">Booked</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600"></div>
                  <span className="text-[10px] text-gray-500">Selected</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
