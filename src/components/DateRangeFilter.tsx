"use client";

import { useState, useRef, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateRangeFilterProps {
  label: string;
  dateRange: { start: string; end: string } | null;
  onDateRangeChange: (range: { start: string; end: string } | null) => void;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
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

export default function DateRangeFilter({
  label,
  onDateRangeChange,
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [viewMonth1, setViewMonth1] = useState(new Date(2022, 0)); // January 2022
  const [viewMonth2, setViewMonth2] = useState(new Date(2022, 1)); // February 2022
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Utility: get days in month with leading nulls for first day offset
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    // JS: Sunday=0, so shift to Monday=0
    const offset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array(offset).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  // Utility: is date in selected range
  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  // Utility: is date at edge of range
  const isDateRangeEdge = (date: Date) => {
    if (!startDate || !endDate) return false;
    return (
      date.getTime() === startDate.getTime() ||
      date.getTime() === endDate.getTime()
    );
  };

  // Handler: quick select menu
  const handleQuickSelect = (value: string) => {
    const now = new Date();
    let start: Date | null = null;
    let end: Date | null = null;
    switch (value) {
      case "today":
        start = end = now;
        break;
      case "yesterday":
        start = end = subWeeks(now, 1);
        break;
      case "thisWeek":
        start = startOfWeek(now, { weekStartsOn: 1 });
        end = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case "lastWeek": {
        const lastWeek = subWeeks(now, 1);
        start = startOfWeek(lastWeek, { weekStartsOn: 1 });
        end = endOfWeek(lastWeek, { weekStartsOn: 1 });
        break;
      }
      case "thisMonth":
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case "lastMonth": {
        const lastMonth = subMonths(now, 1);
        start = startOfMonth(lastMonth);
        end = endOfMonth(lastMonth);
        break;
      }
      case "thisYear":
        start = startOfYear(now);
        end = endOfYear(now);
        break;
      case "lastYear": {
        const lastYear = subYears(now, 1);
        start = startOfYear(lastYear);
        end = endOfYear(lastYear);
        break;
      }
      case "allTime":
        start = new Date(2000, 0, 1);
        end = now;
        break;
      default:
        return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Handler: click on calendar day
  const handleDateClick = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onDateRangeChange({
        start: format(startDate, "yyyy-MM-dd"),
        end: format(endDate, "yyyy-MM-dd"),
      });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next", calendarIndex: 1 | 2) => {
    if (calendarIndex === 1) {
      const newDate =
        direction === "prev"
          ? new Date(viewMonth1.getFullYear(), viewMonth1.getMonth() - 1)
          : new Date(viewMonth1.getFullYear(), viewMonth1.getMonth() + 1);
      setViewMonth1(newDate);
    } else {
      const newDate =
        direction === "prev"
          ? new Date(viewMonth2.getFullYear(), viewMonth2.getMonth() - 1)
          : new Date(viewMonth2.getFullYear(), viewMonth2.getMonth() + 1);
      setViewMonth2(newDate);
    }
  };

  const renderCalendar = (viewMonth: Date, calendarIndex: 1 | 2) => {
    const days = getDaysInMonth(viewMonth);
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev", calendarIndex)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <span className="text-white font-medium">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={() => navigateMonth("next", calendarIndex)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const date = new Date(year, month, day);
            const isInRange = isDateInRange(date);
            const isEdge = isDateRangeEdge(date);
            const isStart = startDate && date.getTime() === startDate.getTime();
            const isEnd = endDate && date.getTime() === endDate.getTime();

            return (
              <button
                key={day}
                onClick={() => handleDateClick(year, month, day)}
                className={`aspect-square flex items-center justify-center text-sm rounded transition-colors relative
                  ${isInRange ? "bg-yellow-600/20" : "hover:bg-gray-700"}
                  ${isEdge
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "text-gray-300"
                  }
                  ${isStart ? "rounded-l-full" : ""}
                  ${isEnd ? "rounded-r-full" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-[760px]"
          style={{ right: 0, top: 'calc(100% + 8px)' }}
        >
          <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg shadow-2xl">
            <div className="p-4">
              <div className="flex">
                <div className="w-44 border-r border-gray-700 p-3">
                  <div className="space-y-1">
                    {[
                      { label: "Today", value: "today" },
                      { label: "Yesterday", value: "yesterday" },
                      { label: "This week", value: "thisWeek", highlight: true },
                      { label: "Last week", value: "lastWeek" },
                      { label: "This month", value: "thisMonth" },
                      { label: "Last month", value: "lastMonth" },
                      { label: "This year", value: "thisYear" },
                      { label: "Last year", value: "lastYear" },
                      { label: "All time", value: "allTime" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleQuickSelect(item.value)}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${item.highlight
                          ? "bg-yellow-600 text-white hover:bg-yellow-700"
                          : "text-gray-300 hover:bg-gray-700"
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <div className="flex gap-6 mb-4">
                    {renderCalendar(viewMonth1, 1)}
                    {renderCalendar(viewMonth2, 2)}
                  </div>

                  {/* Date inputs and buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                    <input
                      type="text"
                      value={startDate ? format(startDate, "MMM d, yyyy") : ""}
                      readOnly
                      placeholder="Start date"
                      className="px-3 py-2 bg-[#0f1319] border border-gray-700 rounded text-sm text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      value={startDate && endDate ? "00:00:00" : ""}
                      readOnly
                      placeholder="00:00:00"
                      className="px-3 py-2 bg-[#0f1319] border border-gray-700 rounded text-sm text-white placeholder-gray-500 w-24"
                    />

                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApply}
                        disabled={!startDate || !endDate}
                        className="px-4 py-2 text-sm font-medium bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
