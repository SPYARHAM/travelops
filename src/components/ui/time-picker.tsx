"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  date: string;
  error?: string;
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

export function TimePicker({ value, onChange, date, error }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-white text-left transition-all duration-200 flex items-center ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 hover:border-violet-300"
        } ${!date ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <span className={`flex-1 ${value ? "text-gray-900" : "text-gray-400"}`}>
          {value
            ? formatDisplayTime(value)
            : date
              ? "Select time slot"
              : "Select date first"}
        </span>
        {value && <Check className="w-4 h-4 text-violet-500 ml-2" />}
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
            className="absolute z-[60] top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-700">
                Select a time
              </p>
            </div>

            {/* Time Grid - Scrollable */}
            <div className="max-h-[200px] overflow-y-auto p-2">
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = value === slot.time;
                  const isDisabled = shouldDisableSlot(slot.time);

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => {
                        if (!isDisabled) {
                          onChange(slot.time);
                          setIsOpen(false);
                        }
                      }}
                      disabled={isDisabled}
                      className={`
                        relative px-2 py-2 rounded-lg text-xs font-medium transition-all duration-150
                        ${
                          isDisabled
                            ? "text-gray-300 cursor-not-allowed bg-gray-50/50"
                            : isSelected
                              ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/30"
                              : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-700 border border-gray-100 hover:border-violet-200"
                        }
                      `}
                    >
                      {slot.label}
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
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
