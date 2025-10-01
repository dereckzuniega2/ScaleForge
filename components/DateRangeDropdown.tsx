"use client";

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  subMonths,
  startOfYear,
  endOfYear,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  onCancel?: () => void;
  onApply?: () => void;
  onApplyRange?: (v: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  }) => void;
};

export default function DateRangeDropdown({ onCancel, onApply, onApplyRange }: Props) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");

  const quickRanges = [
    { label: "Today", range: { startDate: new Date(), endDate: new Date() } },
    {
      label: "Yesterday",
      range: {
        startDate: subDays(new Date(), 1),
        endDate: subDays(new Date(), 1),
      },
    },
    {
      label: "This week",
      range: {
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date()),
      },
    },
    {
      label: "Last week",
      range: {
        startDate: startOfWeek(subDays(new Date(), 7)),
        endDate: endOfWeek(subDays(new Date(), 7)),
      },
    },
    {
      label: "This month",
      range: {
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      },
    },
    {
      label: "Last month",
      range: {
        startDate: startOfMonth(subMonths(new Date(), 1)),
        endDate: endOfMonth(subMonths(new Date(), 1)),
      },
    },
    {
      label: "This year",
      range: {
        startDate: startOfYear(new Date()),
        endDate: endOfYear(new Date()),
      },
    },
    {
      label: "Last year",
      range: {
        startDate: startOfYear(new Date(new Date().getFullYear() - 1, 0, 1)),
        endDate: endOfYear(new Date(new Date().getFullYear() - 1, 11, 31)),
      },
    },
    {
      label: "All time",
      range: { startDate: new Date(2000, 0, 1), endDate: new Date() },
    },
  ];

  // positioning: make sure the panel stays inside the viewport
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [alignRight, setAlignRight] = React.useState(false);
  const [panelWidth, setPanelWidth] = React.useState(900);

  React.useEffect(() => {
    const update = () => {
      const pw = Math.min(900, Math.max(300, window.innerWidth - 32));
      setPanelWidth(pw);
      const parent = wrapperRef.current?.parentElement;
      if (!parent) return setAlignRight(false);
      const rect = parent.getBoundingClientRect();
      setAlignRight(rect.left + pw > window.innerWidth - 8);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className={`absolute z-50 mt-2 flex bg-[#07121a] text-white p-0 rounded-lg shadow-xl border border-gray-700 scale-100 origin-top-left`}
        style={{ width: panelWidth, [alignRight ? "right" : "left"]: 0 } as React.CSSProperties}
      >
        {/* Left Quick Select */}
        <div className="flex flex-col w-48 bg-[#061219] p-4 border-r border-gray-800 text-sm">
          {quickRanges.map((item, idx) => {
            const isSelected =
              range[0].startDate?.toDateString() ===
                item.range.startDate.toDateString() &&
              range[0].endDate?.toDateString() ===
                item.range.endDate.toDateString();

            return (
              <button
                key={idx}
                onClick={() =>
                  setRange([
                    {
                      startDate: item.range.startDate,
                      endDate: item.range.endDate,
                      key: "selection",
                    },
                  ])
                }
                className={`text-left text-sm px-3 py-2 rounded mb-1 transition flex items-center justify-start gap-2 ${
                  isSelected
                    ? "bg-yellow-500 text-black font-medium shadow-inner"
                    : "text-gray-300 hover:bg-[#0b1720]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Calendar + Footer */}
        <div className="flex-1 px-4 py-4">
          <div className="[&_.rdrMonth]:scale-95 [&_.rdrMonth]:origin-top-left [&_.rdrCalendarWrapper]:p-0">
            <DateRangePicker
              onChange={(item) =>
                setRange([
                  {
                    startDate: item.selection.startDate ?? new Date(),
                    endDate: item.selection.endDate ?? new Date(),
                    key: "selection",
                  },
                ])
              }
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={range}
              direction="horizontal"
              rangeColors={["#EAB308"]}
            />
          </div>

          {/* Time inputs */}
          <div className="flex items-center space-x-2 mt-4 bg-transparent p-1 rounded text-xs">
            <div className="flex items-center gap-2 bg-[#0b1114] px-3 py-2 rounded border border-gray-700">
              <span className="text-gray-300 text-sm">{range[0].startDate?.toLocaleDateString()}</span>
              <input
                type="time"
                step="1"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-[#07121a] border border-gray-700 rounded px-2 text-gray-200 w-28"
              />
            </div>

            <div className="text-gray-400">–</div>

            <div className="flex items-center gap-2 bg-[#0b1114] px-3 py-2 rounded border border-gray-700">
              <span className="text-gray-300 text-sm">{range[0].endDate?.toLocaleDateString()}</span>
              <input
                type="time"
                step="1"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-[#07121a] border border-gray-700 rounded px-2 text-gray-200 w-28"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end items-center space-x-3 mt-4">
            <button
              onClick={() => onCancel && onCancel()}
              className="px-4 py-2 rounded border border-yellow-600 text-yellow-400 hover:bg-yellow-600/5"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onApplyRange) {
                  onApplyRange({
                    startDate: range[0].startDate,
                    endDate: range[0].endDate,
                    startTime,
                    endTime,
                  });
                }
                if (onApply) onApply();
              }}
              className="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400"
            >
              Apply
            </button>
          </div>
        </div>
  </div>
      {/* Dark theme overrides for react-date-range - placed inside return so JSX is valid */}
      <style jsx global>{`
.rdrCalendarWrapper, .rdrDefinedRangesWrapper, .rdrDateDisplayWrapper, .rdrMonth {
  background: transparent !important;
  color: #e5e7eb !important;
}
.rdrMonth { padding: 0 !important; }
.rdrMonthName {
  color: #e5e7eb !important;
  text-align: center;
  font-weight: 600;
}
.rdrDays { background: transparent !important; }
.rdrDayName { color: #9ca3af !important; }
.rdrDayNumber { color: #d1d5db !important; }
.rdrDay { background: transparent !important; padding: 0.125rem !important; }
.rdrDay .rdrDayNumber span { display: inline-block; width: 2.25rem; height: 2.25rem; line-height: 2.25rem; border-radius: 999px; text-align: center; }
.rdrDay:hover .rdrDayNumber span { background: rgba(234,179,8,0.16) !important; }
.rdrDayPassive .rdrDayNumber { color: #6b7280 !important; }
.rdrDayDisabled .rdrDayNumber { color: #374151 !important; opacity: 0.6; }

/* In-range background as an elongated pill */
.rdrInRange .rdrDayNumber span { background: rgba(234,179,8,0.28) !important; color: #000 !important; }
.rdrInRange { background: transparent !important; }

/* Start/end edges should be solid yellow and rounded on the correct side */
.rdrDayStartEdge .rdrDayNumber span,
.rdrStartEdge .rdrDayNumber span {
  background: #EAB308 !important;
  color: #000 !important;
  border-top-left-radius: 999px !important;
  border-bottom-left-radius: 999px !important;
}
.rdrDayEndEdge .rdrDayNumber span,
.rdrEndEdge .rdrDayNumber span {
  background: #EAB308 !important;
  color: #000 !important;
  border-top-right-radius: 999px !important;
  border-bottom-right-radius: 999px !important;
}
.rdrSelected .rdrDayNumber span { background: rgba(234,179,8,0.28) !important; color: #000 !important; }
.rdrStartEdge .rdrDayNumber span, .rdrEndEdge .rdrDayNumber span { box-shadow: inset 0 0 10px rgba(0,0,0,0.12); }

/* tighten month gaps and ensure the two-month layout looks like the image */
.rdrMonths {
  display: flex;
  gap: 2rem;
}
.rdrMonth { min-width: 260px !important; }

/* left quick-list border and selected styling */
.rdrDefinedRangesWrapper { border-right: 1px solid rgba(255,255,255,0.04) !important; }
.rdrDefinedRangesWrapper .rdrStaticRangeLabel, .rdrDefinedRangesWrapper button { color: #9ca3af !important; }

/* date/time inputs and footer buttons */
.rdrDateInput, .rdrInputRange { background: #0b1114 !important; color: #e5e7eb !important; border: 1px solid #374151 !important; padding: 0.5rem !important; border-radius: 6px !important; }
.rdrDateInput input { background: transparent !important; color: #e5e7eb !important; }

/* slightly round month day boxes for better pill rendering */
.rdrMonth .rdrDay { border-radius: 0 !important; }

/* ensure selected text contrasts on dark backgrounds */
.rdrSelected .rdrDayNumber, .rdrStartEdge .rdrDayNumber, .rdrEndEdge .rdrDayNumber { color: #000 !important; }
`}</style>
    </>
  );
}
