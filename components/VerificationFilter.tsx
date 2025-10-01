import React from "react";

type Props = {
  selected: string;
  setSelected: (val: string) => void;
};

// only show the verification-focused options per request
const options = ["All Statuses", "Verified", "Unverified", "Pending"];

export default function VerificationFilter({ selected, setSelected }: Props) {
  return (
    <div className="bg-[#0b1416] border border-gray-800 rounded-md p-2 w-48 text-sm">
      {options.map((opt) => {
        const value = opt === "All Statuses" ? "" : opt;
        const isSelected = selected === value || (opt === "All Statuses" && selected === "");
        return (
          <div
            key={opt}
            onClick={() => setSelected(value)}
            className={`px-3 py-2 rounded cursor-pointer hover:bg-[#071018] ${
              isSelected ? "text-green-400 font-medium" : "text-gray-200"
            }`}
          >
            {opt}
          </div>
        );
      })}
    </div>
  );
}
