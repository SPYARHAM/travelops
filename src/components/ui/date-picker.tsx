"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Check } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month padding
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isPast: prevDate < new Date(new Date().setHours(0, 0, 0, 0)),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isToday = new Date().toDateString() === currentDate.toDateString();
      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0));
      const isWeekend =
        currentDate.getDay() === 0 || currentDate.getDay() === 6;

      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday,
        isPast,
        isWeekend,
      });
    }

    // Next month padding
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isPast: false,
      });
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateSelect = (day: (typeof days)[0]) => {
    if (day.isPast || day.isWeekend) return;
    onChange(formatDate(day.date));
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(viewDate);
  const monthYear = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

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
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-white text-left transition-all duration-200 flex items-center ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 hover:border-violet-300"
        }`}
      >
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <span className={`flex-1 ${value ? "text-gray-900" : "text-gray-400"}`}>
          {value ? formatDisplayDate(value) : "Select preferred date"}
        </span>
        {value && <Check className="w-4 h-4 text-violet-500 ml-2" />}
      </button>

      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[60] top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-100">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1.5 rounded-lg hover:bg-white/80 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <span className="text-sm font-semibold text-gray-900">
                {monthYear}
              </span>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1.5 rounded-lg hover:bg-white/80 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-100">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-semibold text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5 p-2">
              {days.map((day, index) => {
                const isSelected = value === formatDate(day.date);
                const isDisabled =
                  day.isPast ||
                  (!day.isCurrentMonth && day.isPast) ||
                  day.isWeekend;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    disabled={isDisabled}
                    className={`
                      relative h-10 w-full rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        !day.isCurrentMonth
                          ? "text-gray-300"
                          : day.isPast || day.isWeekend
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-violet-50"
                      }
                      ${isSelected ? "bg-violet-500 text-white hover:bg-violet-600" : ""}
                      ${day.isToday && !isSelected ? "bg-violet-100 text-violet-700" : ""}
                    `}
                  >
                    {day.date.getDate()}
                    {day.isToday && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Business days only • 9 AM - 6 PM available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
