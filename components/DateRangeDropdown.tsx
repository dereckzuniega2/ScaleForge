"use client";

import { useState } from "react";
import { Popover } from "@headlessui/react";
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

export default function DateRangeDropdown() {
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

  return (
    <Popover className="relative">
      <Popover.Button className="px-4 py-2  border border-gray-700 text-sm text-gray-200 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-yellow-500">
        Date Registered
      </Popover.Button>

      <Popover.Panel className="absolute z-50 mt-2 flex bg-[#111827] text-white p-3 rounded-lg shadow-xl border border-gray-700 scale-100 origin-top-left">
        {/* Left Quick Select */}
        <div className="flex flex-col pr-2 border-r border-gray-700 text-xs">
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
                className={`text-left text-lg px-2 py-1 rounded mb-0.5 transition ${
                  isSelected
                    ? "bg-yellow-500 text-black font-medium"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Calendar + Footer */}
        <div className="flex-1 px-2">
          <div className="[&_.rdrMonth]:scale-90 [&_.rdrMonth]:origin-top-left [&_.rdrCalendarWrapper]:p-0">
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
          <div className="flex items-center space-x-1 mt-2 bg-[#0F172A] p-1 rounded border border-gray-700 text-xs">
            <input
              type="text"
              value={range[0].startDate?.toLocaleDateString()}
              readOnly
              className="bg-transparent px-1 w-24 text-gray-300"
            />
            <input
              type="time"
              step="1"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-[#1E293B] border border-gray-600 rounded px-1 text-gray-200 w-20"
            />
            <span className="text-gray-400">–</span>
            <input
              type="text"
              value={range[0].endDate?.toLocaleDateString()}
              readOnly
              className="bg-transparent px-1 w-24 text-gray-300"
            />
            <input
              type="time"
              step="1"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-[#1E293B] border border-gray-600 rounded px-1 text-gray-200 w-20"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end space-x-2 mt-2 text-xs">
            <Popover.Button className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600">
              Cancel
            </Popover.Button>
            <Popover.Button className="px-3 py-1 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">
              Apply
            </Popover.Button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
