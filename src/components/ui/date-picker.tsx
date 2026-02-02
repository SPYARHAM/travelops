"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null,
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    // Don't allow past dates
    if (date < today) return;

    // Don't allow weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    setSelectedDate(date);
    onChange(
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
    setIsOpen(false);
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    // Disable past dates
    if (checkDate < today) return true;

    // Disable weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;

    return false;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const days = getDaysInMonth(currentMonth);

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
        className={`w-full h-11 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-xl border bg-white text-left transition-all duration-200 flex items-center ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 hover:border-violet-300"
        }`}
      >
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <span
          className={`flex-1 text-xs sm:text-sm truncate ${value ? "text-gray-900" : "text-gray-400"}`}
        >
          {value || "Select preferred date"}
        </span>
        {value && (
          <Check className="w-4 h-4 text-violet-500 ml-1 flex-shrink-0" />
        )}
      </button>

      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - invisible click catcher */}
            <div
              className="fixed inset-0 z-[59]"
              onClick={() => setIsOpen(false)}
            />

            {/* Popover */}
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-[60] top-full mt-1 left-0 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="text-center">
                  <p className="text-sm font-bold text-white">
                    {months[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-3">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                    (day, idx) => (
                      <div
                        key={day}
                        className={`text-center text-xs font-semibold py-1.5 ${
                          idx === 0 || idx === 6
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                {/* Date grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, index) => {
                    const disabled = isDateDisabled(date);
                    const selected = isDateSelected(date);
                    const isToday =
                      date && date.toDateString() === new Date().toDateString();

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleDateClick(date)}
                        className={`
                          relative h-9 w-full rounded-lg text-sm font-medium transition-all duration-150
                          ${
                            !date
                              ? "invisible"
                              : disabled
                                ? "text-gray-300 cursor-not-allowed"
                                : selected
                                  ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/30"
                                  : isToday
                                    ? "bg-violet-100 text-violet-700 font-bold"
                                    : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                          }
                        `}
                      >
                        {date?.getDate()}
                        {isToday && !selected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer note */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600"></div>
                    <span className="text-xs text-gray-500">Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-violet-100 border border-violet-300"></div>
                    <span className="text-xs text-gray-500">Today</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gray-100"></div>
                    <span className="text-xs text-gray-500">Unavailable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default DatePicker;
