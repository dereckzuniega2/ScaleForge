import React, { useMemo, useState, useEffect } from "react";
import Filters from "../components/Filters";
import Table from "../components/Table";
import { useQuery } from "@apollo/client/react";
import {
  GET_MEMBERS,
  SEARCH_BY_NAME,
  SEARCH_BY_EMAIL,
  SEARCH_BY_MOBILE,
  SEARCH_BY_DOMAIN,
  SEARCH_BY_DATE_REGISTERED,
  SEARCH_BY_LAST_ACTIVE,
} from "../graphql/queries";
import type { Member } from "../types/member";

type GetMembersQuery = {
  members: {
    edges: Array<{ node: any }>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string };
  };
};

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
  const [selectedLastActive, setSelectedLastActive] = useState<string[]>([]);
  // server-backed match keys for date filters (prefer server results when present)
  const [dateRegisteredServerKeys, setDateRegisteredServerKeys] = useState<Set<string> | null>(null);
  const [lastActiveServerKeys, setLastActiveServerKeys] = useState<Set<string> | null>(null);

  // Fetch members from GraphQL
  const { data, loading, error } = useQuery<GetMembersQuery>(GET_MEMBERS, {
    variables: { first: 100 },
  });

  if(loading){
    console.log("Loading members...");
  }

  if(error){
    console.error("Error loading members:", error);
  }

  // Log GraphQL errors to help debug when members fail to load
  useEffect(() => {
    if (error) {
      console.error("GET_MEMBERS error:", error);
    }
  }, [error]);

  // Fetch helper lists for filters (server-driven suggestions). These queries return up to 20 items.
  const { data: namesData } = useQuery(SEARCH_BY_NAME, {
    variables: { search: "" },
    skip: false,
  });
  const { data: emailsData } = useQuery(SEARCH_BY_EMAIL, {
    variables: { email: "" },
    skip: false,
  });
  const { data: mobilesData } = useQuery(SEARCH_BY_MOBILE, {
    variables: { mobile: "" },
    skip: false,
  });
  const { data: domainsData } = useQuery(SEARCH_BY_DOMAIN, {
    variables: { domain: "" },
    skip: false,
  });

  // Log helper query results/errors for debugging
  useEffect(() => {
    // names
    if (namesData && !Array.isArray((namesData as any).membersByName)) {
      console.warn('SEARCH_BY_NAME returned unexpected shape', namesData);
    }
    // emails
    if (emailsData && !Array.isArray((emailsData as any).membersByEmailAddress)) {
      console.warn('SEARCH_BY_EMAIL returned unexpected shape', emailsData);
    }
    // mobiles
    if (mobilesData && !Array.isArray((mobilesData as any).membersByMobileNumber)) {
      console.warn('SEARCH_BY_MOBILE returned unexpected shape', mobilesData);
    }
    // domains
    if (domainsData && !Array.isArray((domainsData as any).membersByDomain)) {
      console.warn('SEARCH_BY_DOMAIN returned unexpected shape', domainsData);
    }
  }, [namesData, emailsData, mobilesData, domainsData]);

  // Map GraphQL response to local Member[] shape
  const allMembers: Member[] = useMemo(() => {
    if (!data || !data.members) return [];
    const edges = data.members.edges || [];
    return edges
      .map((e: any) => e.node)
      .filter(Boolean)
      .map((n: any) => {
        const ver = (n.verificationStatus || "").toString().toUpperCase();
        const statusRaw = (n.status || "").toString().toUpperCase();
        // normalize verification and status into the title-case values used by UI
        const verification =
          ver === "VERIFIED" ? "Verified" : ver === "PENDING" ? "Pending" : "Unverified";
        const status =
          statusRaw === "ACTIVE"
            ? "Active"
            : statusRaw === "BLACKLISTED"
            ? "Blacklisted"
            : statusRaw === "DISABLED"
            ? "Disabled"
            : "Active";

        // format date to YYYY-MM-DD when possible
        const dateRegistered = n.dateTimeCreated
          ? new Date(n.dateTimeCreated).toISOString().slice(0, 10)
          : "";

        return {
          id: n.id || n.emailAddress || n.name,
          name: n.name || "",
          verification,
          balance: 0,
          email: n.emailAddress || "",
          mobile: n.mobileNumber || "",
          domain: n.domain || "",
          dateRegistered,
          // map lastActive if available
            lastActive: n.dateTimeLastActive ? new Date(n.dateTimeLastActive).toISOString().slice(0, 10) : "",
          status,
        } as Member;
      });
  }, [data]);

  // Build datetime variables for server queries when ranges are selected
  const dateRegFrom = selectedDateRegistered.length === 2 ? selectedDateRegistered[0] + "T00:00:00Z" : undefined;
  const dateRegTo = selectedDateRegistered.length === 2 ? selectedDateRegistered[1] + "T23:59:59Z" : undefined;
  // translate UI verification labels to server values if needed
  const mapVerificationToEnum = (v: string | null) => {
    if (!v) return null;
    const up = v.toString().toUpperCase();
    if (up === "VERIFIED") return "VERIFIED";
    if (up === "PENDING") return "PENDING";
    if (up === "UNVERIFIED") return "UNVERIFIED";
    // UI uses title-case values like 'Verified' - map those too
    if (v === "Verified") return "VERIFIED";
    if (v === "Pending") return "PENDING";
    if (v === "Unverified") return "UNVERIFIED";
    return v;
  };

  const dateRegVerificationStatus = mapVerificationToEnum(verification ? verification : null);

  const lastActiveFrom = selectedLastActive.length === 2 ? selectedLastActive[0] + "T00:00:00Z" : undefined;
  const lastActiveTo = selectedLastActive.length === 2 ? selectedLastActive[1] + "T23:59:59Z" : undefined;
  const lastActiveVerificationStatus = mapVerificationToEnum(verification ? verification : null);

  // Query the server for members in the selected date ranges. We use `skip` so these
  // only execute when a full range is selected.
  const dateRegVariables: any = dateRegFrom && dateRegTo
    ? {
        from: dateRegFrom,
        to: dateRegTo,
        ...(dateRegVerificationStatus ? { verificationStatus: dateRegVerificationStatus } : {}),
      }
    : undefined;

  const lastActiveVariables: any = lastActiveFrom && lastActiveTo
    ? {
        from: lastActiveFrom,
        to: lastActiveTo,
        ...(lastActiveVerificationStatus ? { verificationStatus: lastActiveVerificationStatus } : {}),
      }
    : undefined;

  const { data: dateRegData } = useQuery(SEARCH_BY_DATE_REGISTERED, {
    variables: dateRegVariables,
    skip: !dateRegVariables,
  });

  const { data: lastActiveData } = useQuery(SEARCH_BY_LAST_ACTIVE, {
    variables: lastActiveVariables,
    skip: !lastActiveVariables,
  });

  // When date registered query returns, extract stable keys to compare with local members.
  useEffect(() => {
    if (dateRegData && (dateRegData as any).membersByDateRegistered) {
      const edges = (dateRegData as any).membersByDateRegistered.edges || [];
      const keys = new Set<string>();
      edges.forEach((e: any) => {
        const node = e.node || {};
        const key = node.id || node.emailAddress || node.name || "";
        if (key) keys.add(key);
      });
      setDateRegisteredServerKeys(keys);
    } else {
      setDateRegisteredServerKeys(null);
    }
  }, [dateRegData]);

  // When last-active query returns, extract keys.
  useEffect(() => {
    if (lastActiveData && (lastActiveData as any).members) {
      const edges = (lastActiveData as any).members.edges || [];
      const keys = new Set<string>();
      edges.forEach((e: any) => {
        const node = e.node || {};
        const key = node.id || node.emailAddress || node.name || "";
        if (key) keys.add(key);
      });
      setLastActiveServerKeys(keys);
    } else {
      setLastActiveServerKeys(null);
    }
  }, [lastActiveData]);

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
        // Date Registered: prefer server results when available, otherwise compare ISO date string
        (dateRegisteredServerKeys && dateRegisteredServerKeys.size > 0
          ? !dateRegisteredServerKeys.has(m.id || m.email || m.name)
          : (selectedDateRegistered.length > 0 && !selectedDateRegistered.includes(m.dateRegistered)))
      )
        return false;
      if (
        // Last Active: prefer server results when available, otherwise compare ISO date string
        (lastActiveServerKeys && lastActiveServerKeys.size > 0
          ? !lastActiveServerKeys.has(m.id || (m as any).email || m.name)
          : (selectedLastActive.length > 0 && (
              !(m as any).lastActive || !selectedLastActive.includes((m as any).lastActive)
            )))
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
    selectedLastActive,
    dateRegisteredServerKeys,
    lastActiveServerKeys,
    allMembers,
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
    <div className="min-h-[130vh]">
      <div className="w-[90%] mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-semibold mb-2">Members</h1>
        <p className="text-gray-400 mb-6">View your members here.</p>

        <div className="bg-[#07121a] rounded-lg border border-gray-800 overflow-visible">
          <div className="px-4 py-3">
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
              // prefer server-provided suggestion lists when available, fall back to local computed lists
              allNames={
                // prefer server suggestions when they are present; fall back to allMembers
                (namesData && Array.isArray((namesData as any).membersByName) && (namesData as any).membersByName.length > 0
                  ? (namesData as any).membersByName.map((n: any) => n.name)
                  : allMembers.map((m) => m.name))
              }
              allEmails={
                (emailsData && Array.isArray((emailsData as any).membersByEmailAddress) && (emailsData as any).membersByEmailAddress.length > 0
                  ? (emailsData as any).membersByEmailAddress.map((n: any) => n.emailAddress)
                  : allMembers.map((m) => m.email))
              }
              allMobileNumbers={
                (mobilesData && Array.isArray((mobilesData as any).membersByMobileNumber) && (mobilesData as any).membersByMobileNumber.length > 0
                  ? (mobilesData as any).membersByMobileNumber.map((n: any) => n.mobileNumber)
                  : allMembers.map((m) => m.mobile))
              }
              allDomains={
                (domainsData && Array.isArray((domainsData as any).membersByDomain) && (domainsData as any).membersByDomain.length > 0
                  ? (domainsData as any).membersByDomain.map((n: any) => n.domain)
                  : allMembers.map((m) => m.domain))
              }
              selectedLastActive={selectedLastActive}
              setSelectedLastActive={setSelectedLastActive}
            />
            {loading && <div className="text-sm text-gray-400 mt-2">Loading members…</div>}
            {error && <div className="text-sm text-red-500 mt-2">Error loading members</div>}
          </div>
          <div className="border-t border-gray-800" />

          <div className="w-full px-4">
            <Table
              data={pageData as Member[]}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
            />
          </div>
        </div>

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
