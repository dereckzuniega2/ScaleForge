import React, { useMemo, useState } from "react";
import Filters from "../components/Filters";
import Table from "../components/Table";
import { members as allMembers, Member } from "../data/members";

export default function Home() {
  const [search, setSearch] = useState("");
  const [verification, setVerification] = useState("");
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedMobileNumbers, setSelectedMobileNumbers] = useState<string[]>(
    []
  );
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedDateRegistered, setSelectedDateRegistered] = useState<
    string[]
  >([]);

  // Filtering
  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (verification && m.verification !== verification) return false;
      if (status && m.status !== status) return false;
      if (selectedNames.length > 0 && !selectedNames.includes(m.name))
        return false;
      if (selectedEmails.length > 0 && !selectedEmails.includes(m.email))
        return false;
      if (
        selectedMobileNumbers.length > 0 &&
        !selectedMobileNumbers.includes(m.mobile)
      )
        return false;
      if (selectedDomains.length > 0 && !selectedDomains.includes(m.domain))
        return false;
      if (
        selectedDateRegistered.length > 0 &&
        !selectedDateRegistered.includes(m.dateRegistered)
      )
        return false;
      return true;
    });
  }, [
    search,
    verification,
    status,
    selectedNames,
    selectedEmails,
    selectedMobileNumbers,
    selectedDomains,
    selectedDateRegistered,
  ]);

  // Sorting
  const sorted = useMemo(() => {
    const data = [...filtered];
    if (!sortKey || !sortDir) return data;
    data.sort((a: any, b: any) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return data;
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      } else setSortDir("asc");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Members</h1>
        <p className="text-gray-400 mb-6">View your members here.</p>

        <div className="mb-4 bg-[#07121a] p-4 rounded-lg border border-gray-800">
          <Filters
            search={search}
            setSearch={setSearch}
            verification={verification}
            setVerification={setVerification}
            status={status}
            setStatus={setStatus}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            selectedMobileNumbers={selectedMobileNumbers}
            setSelectedMobileNumbers={setSelectedMobileNumbers}
            selectedDomains={selectedDomains}
            setSelectedDomains={setSelectedDomains}
            seletedDateRegistered={selectedDateRegistered}
            setSelectedDateRegistered={setSelectedDateRegistered}
          />
        </div>

        <Table
          data={pageData as Member[]}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
        />

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <div>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, sorted.length)} of {sorted.length}{" "}
            entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded border border-gray-800"
            >
              ← Previous
            </button>
            <div>
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 rounded border border-gray-800"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
