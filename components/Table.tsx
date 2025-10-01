import React from "react";
import { Member } from "../data/members";
import clsx from "clsx";

type Props = {
  data: Member[];
  sortKey: string | null;
  sortDir: "asc" | "desc" | null;
  onSort: (key: string) => void;
};

function Badge({ t }: { t: string }) {
  const cls = clsx("badge", {
    "badge-verified": t === "Verified",
    "badge-unverified": t === "Unverified",
    "badge-pending": t === "Pending",
  });
  return <span className={cls}>{t}</span>;
}

function StatusBadge({ t }: { t: string }) {
  const cls = clsx("badge", {
    "badge-active": t === "Active",
    "badge-blacklisted": t === "Blacklisted",
    "badge-disabled": t === "Disabled",
  });
  return <span className={cls}>{t}</span>;
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
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <div className="table-scroll">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-transparent">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.key}
                  onClick={() => onSort(h.key)}
                  className="text-left px-6 py-3 text-sm font-medium text-gray-400 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{h.label}</span>
                    <span className="text-xs text-gray-500">
                      {sortIndicator(h.key)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-800">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-[#0b1416]">
                <td className="px-6 py-4 text-sm text-yellow-500 font-medium">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge t={row.verification} />
                </td>
                <td className="px-6 py-4 text-sm">${row.balance.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{row.email}</td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {row.mobile}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <a
                    className="underline text-gray-300"
                    href={row.domain}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.domain}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {row.dateRegistered}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge t={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
