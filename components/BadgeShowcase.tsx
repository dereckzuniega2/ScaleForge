import React from "react";
import Badge from "./Badge";

export default function BadgeShowcase() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold inline-block px-4 py-2 rounded bg-[#e6a21f] text-black">Status Components</h2>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-6 bg-[#071019] rounded-lg border border-gray-800">
          <div className="mb-3 text-sm text-gray-400">Badge_Verification Status</div>
          <div className="flex flex-col gap-3">
            <Badge variant="verified">Verified</Badge>
            <Badge variant="unverified">Unverified</Badge>
            <Badge variant="pending">Pending</Badge>
          </div>
        </div>

        <div className="p-6 bg-[#071019] rounded-lg border border-gray-800">
          <div className="mb-3 text-sm text-gray-400">Badge_Status</div>
          <div className="flex flex-col gap-3">
            <Badge variant="active">Active</Badge>
            <Badge variant="blacklisted">Blacklisted</Badge>
            <Badge variant="disabled">Disabled</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
