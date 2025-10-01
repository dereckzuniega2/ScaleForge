import React from "react";
import { Member } from "../types/member";
import clsx from "clsx";
import Badge from "./Badge";

type Props = {
  data: Member[];
  sortKey: string | null;
  sortDir: "asc" | "desc" | null;
  onSort: (key: string) => void;
};

function VerificationCell({ t }: { t: string }) {
  const variant = t === "Verified" ? "verified" : t === "Unverified" ? "unverified" : t === "Pending" ? "pending" : "all";
  return <Badge variant={variant as any} size="sm">{t}</Badge>;
}

function StatusCell({ t }: { t: string }) {
  const variant = t === "Active" ? "active" : t === "Blacklisted" ? "blacklisted" : t === "Disabled" ? "disabled" : "all";
  return <Badge variant={variant as any} size="sm">{t}</Badge>;
}

export default function Table({ data, sortKey, sortDir, onSort }: Props) {
  const headers = [
    { key: "name", label: "Name" },
    { key: "verification", label: "Verification Status" },
    { key: "balance", label: "Balance" },
    { key: "email", label: "Email address" },
    { key: "mobile", label: "Mobile number" },
    { key: "domain", label: "Domain" },
    { key: "dateRegistered", label: "Date Registered" },
    { key: "status", label: "Status" },
  ];
  const sortIndicator = (k: string) => {
    if (sortKey !== k) return null;
    return sortDir === "asc" ? "▲" : "▼";
  };
  return (
    <div className="w-full overflow-x-auto rounded-b-lg">
      <table className="w-full table-fixed divide-y divide-gray-800">
        <thead className="bg-[#071e22]">
          <tr>
            {headers.map((h) => (
              <th
                key={h.key}
                onClick={() => onSort(h.key)}
                className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer select-none"
              >
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{h.label}</span>
                  <span className="text-[10px] text-gray-500">{sortIndicator(h.key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-gray-700">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-[#082428]">
              <td className="px-4 py-2 text-sm text-yellow-300 font-semibold w-40 truncate">{row.name}</td>
              <td className="px-4 py-2 text-sm w-28"> <VerificationCell t={row.verification} /> </td>
              <td className="px-4 py-2 text-sm text-left w-20">${row.balance.toFixed(2)}</td>
              <td className="px-4 py-2 text-sm text-gray-300 max-w-[200px] truncate">{row.email}</td>
              <td className="px-4 py-2 text-sm text-gray-300 w-32 truncate">{row.mobile}</td>
              <td className="px-4 py-2 text-sm text-gray-300 max-w-[160px] truncate">{row.domain ? (<a className="underline text-gray-300 truncate" href={row.domain} target="_blank" rel="noreferrer">{row.domain}</a>) : (<span className="text-gray-500">—</span>)}</td>
              <td className="px-4 py-2 text-sm text-gray-300 w-24">{row.dateRegistered}</td>
              <td className="px-4 py-2 text-sm w-32"><StatusCell t={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
