import React, { useState } from "react";
import NameFilter from "./NameFilter";
import VerificationFilter from "./VerificationFilter";
import MobileFilter from "./MobileFilter";
import DomainFilter from "./DomainFilter";
import EmailFilter from "./EmailFilter";
import Badge from "./Badge";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeDropdown from "./DateRangeDropdown";
import DropdownPortal from "./DropdownPortal";
import { useRef } from "react";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  verification: string;
  setVerification: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  selectedNames: string[];
  setSelectedNames: (v: string[]) => void;
  selectedEmails: string[];
  setSelectedEmails: (v: string[]) => void;
  selectedMobileNumbers: string[];
  setSelectedMobileNumbers: (v: string[]) => void;
  selectedDomains: string[];
  setSelectedDomains: (v: string[]) => void;
  seletedDateRegistered: string[];
  setSelectedDateRegistered: (v: string[]) => void;
  selectedLastActive?: string[];
  setSelectedLastActive?: (v: string[]) => void;
  // optional lists (when data comes from server)
  allNames?: string[];
  allEmails?: string[];
  allMobileNumbers?: string[];
  allDomains?: string[];
};

export default function Filters({
  search,
  setSearch,
  verification,
  setVerification,
  status,
  setStatus,
  selectedNames,
  setSelectedNames,
  selectedEmails,
  setSelectedEmails,
  selectedMobileNumbers,
  setSelectedMobileNumbers,
  selectedDomains,
  setSelectedDomains,
  seletedDateRegistered,
  setSelectedDateRegistered,
  selectedLastActive,
  setSelectedLastActive,
  allNames: propNames,
  allEmails: propEmails,
  allMobileNumbers: propMobiles,
  allDomains: propDomains,
}: Props) {
  // single open state: null or one of the keys below
  const [openFilter, setOpenFilter] = useState<
    null | "name" | "verification" | "email" | "mobile" | "domain" | "date" | "lastActive" | "status"
  >(null);

  // prefer lists from props (server) but fall back to empty arrays
  const allNames = propNames ? [...new Set(propNames)] : [];
  const allEmails = propEmails ? [...new Set(propEmails)] : [];
  const allMobileNumbers = propMobiles ? [...new Set(propMobiles)] : [];
  const allDomains = propDomains ? [...new Set(propDomains)] : [];

  // refs for each anchor/button so portal can position dropdowns
  const nameRef = useRef<HTMLButtonElement | null>(null);
  const verificationRef = useRef<HTMLButtonElement | null>(null);
  const emailRef = useRef<HTMLButtonElement | null>(null);
  const mobileRef = useRef<HTMLButtonElement | null>(null);
  const domainRef = useRef<HTMLButtonElement | null>(null);
  const dateRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLButtonElement | null>(null);
  const statusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="filters-container w-full px-4">
      <div className="flex items-center gap-3 filters-title">
        <div className="text-sm font-medium">Filters |</div>
      </div>
      {/* Name Filter */}
      <div className="relative">
        <button
          ref={nameRef}
          onClick={() => setOpenFilter(openFilter === "name" ? null : "name")}
          className="filter-pill"
        >
          <span className="text-sm">Name</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={nameRef} open={openFilter === "name"} align="left" width={nameRef.current ? nameRef.current.getBoundingClientRect().width : "anchor"}>
          <div className="mt-2 z-50">
            <NameFilter
              allNames={allNames}
              selected={selectedNames}
              setSelected={setSelectedNames}
            />
          </div>
        </DropdownPortal>
      </div>

      {/* Verification Filter */}
      <div className="relative">
        <button
          ref={verificationRef}
          onClick={() =>
            setOpenFilter(openFilter === "verification" ? null : "verification")
          }
          className="filter-pill"
        >
          <span className="text-sm">Verification Status</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={verificationRef} open={openFilter === "verification"} align="left" width={verificationRef.current ? verificationRef.current.getBoundingClientRect().width : "anchor"}>
          <div className="mt-2 z-50">
            <VerificationFilter
              selected={verification}
              setSelected={setVerification}
            />
          </div>
        </DropdownPortal>
      </div>
      {/* Email Filter */}
      <div className="relative">
        <button
          ref={emailRef}
          onClick={() => setOpenFilter(openFilter === "email" ? null : "email")}
          className="filter-pill"
        >
          <span className="text-sm">Email Address</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={emailRef} open={openFilter === "email"} align="left" width={emailRef.current ? emailRef.current.getBoundingClientRect().width : "anchor"}>
          <div className="mt-2 z-50">
            <EmailFilter
              allEmails={allEmails}
              selected={selectedEmails}
              setSelected={setSelectedEmails}
            />
          </div>
        </DropdownPortal>
      </div>

      {/* Mobile Filter */}
      <div className="relative">
        <button
          ref={mobileRef}
          onClick={() => setOpenFilter(openFilter === "mobile" ? null : "mobile")}
          className="filter-pill"
        >
          <span className="text-sm">Mobile Number</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={mobileRef} open={openFilter === "mobile"} align="left" width={mobileRef.current ? mobileRef.current.getBoundingClientRect().width : "anchor"}>
          <div className="mt-2 z-50">
            <MobileFilter
              allMobiles={allMobileNumbers}
              selected={selectedMobileNumbers}
              setSelected={setSelectedMobileNumbers}
            />
          </div>
        </DropdownPortal>
      </div>

      {/* Domain Filter */}
      <div className="relative">
        <button
          ref={domainRef}
          onClick={() => setOpenFilter(openFilter === "domain" ? null : "domain")}
          className="filter-pill"
        >
          <span className="text-sm">Domain</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={domainRef} open={openFilter === "domain"} align="left" width={domainRef.current ? domainRef.current.getBoundingClientRect().width : "anchor"}>
          <div className="mt-2 z-50">
            <DomainFilter
              allDomains={allDomains}
              selected={selectedDomains}
              setSelected={setSelectedDomains}
            />
          </div>
        </DropdownPortal>
      </div>

      {/* Date Filter */}
      <div className="relative">
        <button
          ref={dateRef}
          onClick={() => setOpenFilter(openFilter === "date" ? null : "date")}
          className="filter-pill"
        >
          <span className="text-sm">Date Registered</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={dateRef} open={openFilter === "date"} align="left" width={300}>
          <div className="mt-2 z-50">
            <DateRangeDropdown
              onCancel={() => setOpenFilter(null)}
              onApply={() => setOpenFilter(null)}
              onApplyRange={(r) => {
                // forward as ISO date strings without time to parent setSelectedDateRegistered
                if (setSelectedDateRegistered) {
                  setSelectedDateRegistered([
                    r.startDate.toISOString().slice(0, 10),
                    r.endDate.toISOString().slice(0, 10),
                  ]);
                }
                setOpenFilter(null);
              }}
            />
          </div>
        </DropdownPortal>
      </div>

      {/* Last Active Filter (same UI as Date Registered) */}
      <div className="relative">
        <button
          ref={lastActiveRef}
          onClick={() => setOpenFilter(openFilter === "lastActive" ? null : "lastActive")}
          className="filter-pill"
        >
          <span className="text-sm">Date and Time Last Active</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={lastActiveRef} open={openFilter === "lastActive"} align="left" width={300}>
          <div className="mt-2 z-50">
            <DateRangeDropdown
              onCancel={() => setOpenFilter(null)}
              onApply={() => setOpenFilter(null)}
              onApplyRange={(r) => {
                if (setSelectedLastActive) {
                  setSelectedLastActive([
                    r.startDate.toISOString().slice(0, 10),
                    r.endDate.toISOString().slice(0, 10),
                  ]);
                }
                setOpenFilter(null);
              }}
            />
          </div>
        </DropdownPortal>
      </div>
      {/* Status Filter (simple list like Verification) */}
      <div className="relative">
        <button
          ref={statusRef}
          onClick={() => setOpenFilter(openFilter === "status" ? null : "status")}
          className="filter-pill"
        >
          <span className="text-sm">Status</span>
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <DropdownPortal anchorRef={statusRef} open={openFilter === "status"} align="right" width={200}>
          <div className="mt-2 z-50 right-0 w-48">
            <div className="bg-[#0b1416] border border-gray-800 rounded-md p-2 text-sm">
              {["All Statuses", "Active", "Blacklisted", "Disabled"].map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setStatus(opt === "All Statuses" ? "" : opt);
                    setOpenFilter(null);
                  }}
                  className={`px-3 py-2 rounded cursor-pointer hover:bg-[#071018] ${
                    status === (opt === "All Statuses" ? "" : opt) ? "text-green-400 font-medium" : "text-gray-200"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </DropdownPortal>
      </div>
    </div>
  );
}
