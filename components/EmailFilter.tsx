import React, { useState, useMemo } from "react";

type Props = {
  allEmails: string[];
  selected: string[];
  setSelected: (emails: string[]) => void;
};

export default function EmailFilter({
  allEmails,
  selected,
  setSelected,
}: Props) {
  const [query, setQuery] = useState("");

  // Filtered names based on search query
  const filtered = useMemo(() => {
    return allEmails.filter((n) =>
      n.toLowerCase().includes(query.toLowerCase())
    );
  }, [allEmails, query]);

  const toggle = (email: string) => {
    if (selected.includes(email)) {
      setSelected(selected.filter((n) => n !== email));
    } else {
      setSelected([...selected, email]);
    }
  };

  return (
    <div className="bg-[#0b1416] border border-gray-800 rounded-md p-3 w-64 text-sm">
      {/* Search box */}
      <div className="flex items-center bg-[#071a1d] px-2 py-1 rounded mb-2 border border-gray-700">
        <input
          type="text"
          placeholder="Search Email Address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent flex-1 outline-none text-gray-200 text-sm px-1"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* Checkbox list */}
      <div className="max-h-60 overflow-y-auto space-y-1">
        {filtered.map((email) => (
          <label
            key={email}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#071018] px-2 py-1 rounded"
          >
            <input
              type="checkbox"
              checked={selected.includes(email)}
              onChange={() => toggle(email)}
              className="accent-green-500"
            />
            <span className="text-yellow-400">{email}</span>
          </label>
        ))}
        {filtered.length === 0 && (
          <div className="text-gray-500 text-center py-2">No results</div>
        )}
      </div>
    </div>
  );
}
