import React from "react";

type Props = {
  selected: string;
  setSelected: (val: string) => void;
};

const options = ["Pending", "Verified", "Unverified"];

export default function VerificationFilter({ selected, setSelected }: Props) {
  return (
    <div className="bg-[#0b1416] border border-gray-800 rounded-md p-2 w-48 text-sm">
      {options.map((opt) => (
        <div
          key={opt}
          onClick={() => setSelected(opt)}
          className={`px-3 py-2 rounded cursor-pointer hover:bg-[#071018] ${
            selected === opt ? "text-green-400 font-medium" : "text-gray-200"
          }`}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}
