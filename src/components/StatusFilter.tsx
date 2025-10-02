"use client";

import { useState, useRef, useEffect } from "react";

interface StatusFilterProps {
  label: string;
  options: Array<{ value: string; label: string; color?: string }>;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

export default function StatusFilter(props: StatusFilterProps) {
  const { label, options, selectedValues, onSelectionChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onSelectionChange(selectedValues);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedValues, onSelectionChange]);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v: string) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
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
        <div className="absolute top-full left-0 mt-2 w-60 bg-[var(--card)] border border-gray-700 rounded-lg shadow-2xl z-50">
          <div className="py-2">
            {options.map((option: { value: string; label: string; color?: string }) => (
              <label
                key={option.value}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--row-hover)] cursor-pointer transition-colors"
              >
                <div className="relative">
                  <div className="flex gap-[12px] p-[20px]">
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleToggle(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${selectedValues.includes(option.value)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-600 bg-[#0f1319]"
                      }`}
                  >
                    {selectedValues.includes(option.value) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
