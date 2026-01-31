"use client";

import { motion } from "framer-motion";
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

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => {
          if (!date) {
            // Focus on date picker if no date selected
            document.getElementById("date-picker-trigger")?.focus();
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

      {/* Time Slots Grid */}
      {date && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4"
        >
          <div className="grid grid-cols-3 gap-2">
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
                    }
                  }}
                  disabled={isDisabled}
                  className={`
                    relative px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isDisabled
                        ? "text-gray-300 cursor-not-allowed bg-gray-50"
                        : isSelected
                          ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                          : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-700 border border-gray-100"
                    }
                  `}
                >
                  {slot.label}
                  {isSelected && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute inset-0 rounded-xl border-2 border-violet-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500" />
              <span className="text-xs text-gray-500">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-100" />
              <span className="text-xs text-gray-500">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-50" />
              <span className="text-xs text-gray-500">Unavailable</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
