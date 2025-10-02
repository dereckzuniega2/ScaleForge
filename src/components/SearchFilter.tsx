"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchFilterProps {
  label: string;
  options: (string | null | undefined)[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
}

export default function SearchFilter({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Search...",
}: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Apply filter when dropdown closes
        onSelectionChange(selectedValues);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedValues, onSelectionChange]);

  const filteredOptions = options
    .filter((option): option is string => Boolean(option))
    .filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-md hover:bg-gray-800/50"
      >
        {label}
        {selectedValues.length > 0 && (
          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
            {selectedValues.length}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
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
        <div className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-[var(--card)] border border-gray-700 rounded-lg shadow-2xl z-50">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-3 pr-10 py-2.5 bg-[var(--bg)] border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  autoFocus
                />
              </div>
              {selectedValues.length > 0 && (
                <button
                  onClick={() => onSelectionChange([])}
                  className="px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                  title="Clear all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {filteredOptions.map((option, idx) => (
              <label
                key={option + '-' + idx}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--row-hover)] cursor-pointer transition-colors group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={() => handleToggle(option)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${selectedValues.includes(option)
                      ? "bg-blue-500 border-blue-500 shadow-sm"
                      : "border-gray-500 bg-[#0f1319] group-hover:border-gray-400"
                      }`}
                  >
                    {selectedValues.includes(option) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                  {option}
                </span>
              </label>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  No results found
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
