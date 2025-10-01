import React, { useState } from "react";
import NameFilter from "./NameFilter";
import VerificationFilter from "./VerificationFilter";
import { members } from "../data/members";
import MobileFilter from "./MobileFilter";
import DomainFilter from "./DomainFilter";
import EmailFilter from "./EmailFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeDropdown from "./DateRangeDropdown";

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
}: Props) {
  const [openNameFilter, setOpenNameFilter] = useState(false);
  const [openVerificationFilter, setOpenVerificationFilter] = useState(false);
  const [openEmailFilter, setOpenEmailFilter] = useState(false);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [openDomainFilter, setOpenDomainFilter] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);

  const allNames = [...new Set(members.map((m) => m.name))];
  const allEmails = [...new Set(members.map((m) => m.email))];
  const allMobileNumbers = [...new Set(members.map((m) => m.mobile))];
  const allDomains = [...new Set(members.map((m) => m.domain))];

  return (
    <div className="flex gap-6 flex-wrap items-center p-4 bg-transparent relative">
      <div className="text-2xl">Filter |</div>
      {/* Name Filter */}
      <div className="relative">
        <button
          onClick={() => setOpenNameFilter(!openNameFilter)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          Name
        </button>
        {openNameFilter && (
          <div className="absolute mt-2 z-50">
            <NameFilter
              allNames={allNames}
              selected={selectedNames}
              setSelected={setSelectedNames}
            />
          </div>
        )}
      </div>

      {/* Verification Filter */}
      <div className="relative">
        <button
          onClick={() => setOpenVerificationFilter(!openVerificationFilter)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          Verification Status
        </button>
        {openVerificationFilter && (
          <div className="absolute mt-2 z-50">
            <VerificationFilter
              selected={verification}
              setSelected={setVerification}
            />
          </div>
        )}
      </div>
      {/* Email Filter */}
      <div className="relative">
        <button
          onClick={() => setOpenEmailFilter(!openEmailFilter)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          Email Address
        </button>
        {openEmailFilter && (
          <div className="absolute mt-2 z-50">
            <EmailFilter
              allEmails={allEmails}
              selected={selectedEmails}
              setSelected={setSelectedEmails}
            />
          </div>
        )}
      </div>

      {/* Mobile Filter */}
      <div className="relative">
        <button
          onClick={() => setOpenMobileFilter(!openMobileFilter)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          Mobile Number
        </button>
        {openMobileFilter && (
          <div className="absolute mt-2 z-50">
            <MobileFilter
              allMobiles={allMobileNumbers}
              selected={selectedMobileNumbers}
              setSelected={setSelectedMobileNumbers}
            />
          </div>
        )}
      </div>

      {/* Domain Filter */}
      <div className="relative">
        <button
          onClick={() => setOpenDomainFilter(!openDomainFilter)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          Domain
        </button>
        {openDomainFilter && (
          <div className="absolute mt-2 z-50">
            <DomainFilter
              allDomains={allDomains}
              selected={selectedDomains}
              setSelected={setSelectedDomains}
            />
          </div>
        )}
      </div>

      {/* Date Filter */}
      <div>
        <DateRangeDropdown />
      </div>
      {/* Status Filter (still dropdown <select>) */}
      <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-6 py-2 rounded bg-[#071a1d] text-sm text-gray-200 border border-gray-800"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Blacklisted">Blacklisted</option>
          <option value="Disabled">Disabled</option>
        </select>
      </div>
    </div>
  );
}
