"use client";

import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import DateRangeFilter from "./DateRangeFilter";
import Badge from "./Badge";

// ...existing imports...

export default function MembersTable() {
  // Hardcoded data for exact UI match
  const members = [
    { name: 'Botmind23r23', verification: 'Verified', balance: 39.00, email: 'olivia@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Apr 12', status: 'Active' },
    { name: 'Livia', verification: 'Unverified', balance: 13.25, email: 'phoenix@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Apr 12', status: 'Active' },
    { name: 'Davis', verification: 'Pending', balance: 14.25, email: 'lana@untitledui.com', mobile: '+1 (888) 000-0000', domain: 'https://scaleforge.tech/', date: '2024 Apr 12', status: 'Active' },
    { name: 'Alena', verification: 'Verified', balance: 201.80, email: 'demi@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Apr 08', status: 'Active' },
    { name: 'Allison', verification: 'Verified', balance: 0.00, email: 'candice@untitledui.com', mobile: '+1 (534) 000-0000', domain: 'https://scaleforge.tech/', date: '2024 Mar 18', status: 'Active' },
    { name: 'Ruben', verification: 'Verified', balance: 250.00, email: 'natali@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Mar 14', status: 'Blacklisted' },
    { name: 'Mari0', verification: 'Pending', balance: 25.33, email: 'drew@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Mar 14', status: 'Blacklisted' },
    { name: 'Desirae', verification: 'Unverified', balance: 65.10, email: 'orlando@untitledui.com', mobile: '+1 (234) 000-0000', domain: 'https://scaleforge.tech/', date: '2024 Mar 14', status: 'Blacklisted' },
    { name: 'Botmind23r23', verification: 'Unverified', balance: 0.00, email: 'andi@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Mar 14', status: 'Disabled' },
    { name: 'Phillipa', verification: 'Verified', balance: 25.60, email: 'kate@untitledui.com', mobile: '+63 (976) 003 517', domain: 'https://scaleforge.tech/', date: '2024 Mar 14', status: 'Disabled' },
  ];

  const [usernameFilter, setUsernameFilter] = useState<string[]>([]);
  const [verificationFilter, setVerificationFilter] = useState<string[]>([]);
  const [emailFilter, setEmailFilter] = useState<string[]>([]);
  const [mobileFilter, setMobileFilter] = useState<string[]>([]);
  const [domainFilter, setDomainFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredMembers = members.filter(m => {
    return (
      (usernameFilter.length === 0 || usernameFilter.includes(m.name)) &&
      (verificationFilter.length === 0 || verificationFilter.includes(m.verification)) &&
      (emailFilter.length === 0 || emailFilter.includes(m.email)) &&
      (mobileFilter.length === 0 || mobileFilter.includes(m.mobile)) &&
      (domainFilter.length === 0 || domainFilter.includes(m.domain)) &&
      (statusFilter.length === 0 || statusFilter.includes(m.status))
    );
  });
  const pagedMembers = filteredMembers.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredMembers.length / pageSize);

  const getVerificationStatusBadge = (status: string) => {
    if (status === 'Verified') return <Badge label="Verified" color="green" />;
    if (status === 'Unverified') return <Badge label="Unverified" color="red" />;
    return <Badge label="Pending" color="yellow" />;
  };
  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <Badge label="Active" color="green" />;
    if (status === 'Blacklisted') return <Badge label="Blacklisted" color="red" />;
    return <Badge label="Disabled" color="gray" />;
  };

  return (
    <div className="bg-[#18181B] rounded-xl p-6 text-white w-full">
      <div className="flex gap-2 mb-4 items-center">
        <span className="font-semibold text-lg mr-2">Filters</span>
        <div className="grid grid-cols-8 gap-2 w-full">
          <div className="col-span-1">
            <SearchFilter
              label="Username"
              options={[...new Set(members.map(m => m.name))]}
              selectedValues={usernameFilter}
              onSelectionChange={setUsernameFilter}
              placeholder="Search Username"
            />
          </div>
          <div className="col-span-1">
            <StatusFilter
              label="Verification Status"
              options={[{ value: "Pending", label: "Pending" }, { value: "Verified", label: "Verified" }, { value: "Unverified", label: "Unverified" }]}
              selectedValues={verificationFilter}
              onSelectionChange={setVerificationFilter}
            />
          </div>
          <div className="col-span-1">
            <SearchFilter
              label="Email Address"
              options={[...new Set(members.map(m => m.email))]}
              selectedValues={emailFilter}
              onSelectionChange={setEmailFilter}
              placeholder="Search Email Address"
            />
          </div>
          <div className="col-span-1">
            <SearchFilter
              label="Mobile Number"
              options={[...new Set(members.map(m => m.mobile))]}
              selectedValues={mobileFilter}
              onSelectionChange={setMobileFilter}
              placeholder="Search Mobile Number"
            />
          </div>
          <div className="col-span-1">
            <SearchFilter
              label="Domain"
              options={[...new Set(members.map(m => m.domain))]}
              selectedValues={domainFilter}
              onSelectionChange={setDomainFilter}
              placeholder="Search Domain"
            />
          </div>
          <div className="col-span-1">
            <DateRangeFilter
              label="Date Registered"
              dateRange={null}
              onDateRangeChange={() => { }}
            />
          </div>
          <div className="col-span-1">
            <StatusFilter
              label="Status"
              options={[{ value: "Active", label: "Active" }, { value: "Blacklisted", label: "Blacklisted" }, { value: "Disabled", label: "Disabled" }]}
              selectedValues={statusFilter}
              onSelectionChange={setStatusFilter}
            />
          </div>
          <div className="col-span-1">
            <DateRangeFilter
              label="Date and Time Last Active"
              dateRange={null}
              onDateRangeChange={() => { }}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#23232A]">
              <th className="px-4 py-4 text-left font-semibold">Name</th>
              <th className="px-4 py-4 text-left font-semibold">Verification Status</th>
              <th className="px-4 py-4 text-left font-semibold">Balance</th>
              <th className="px-4 py-4 text-left font-semibold">Email address</th>
              <th className="px-4 py-4 text-left font-semibold">Mobile number</th>
              <th className="px-4 py-4 text-left font-semibold">Domain</th>
              <th className="px-4 py-4 text-left font-semibold">Date Registered</th>
              <th className="px-4 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {pagedMembers.map((m, idx) => (
              <tr key={idx} className="border-b border-[#23232A]">
                <td className="px-4 py-4 font-semibold text-yellow-300">{m.name}</td>
                <td className="px-4 py-4">{getVerificationStatusBadge(m.verification)}</td>
                <td className="px-4 py-4">{m.balance.toFixed(2)}</td>
                <td className="px-4 py-4">{m.email}</td>
                <td className="px-4 py-4">{m.mobile}</td>
                <td className="px-4 py-4"><a href={m.domain} className="text-blue-400 underline">{m.domain}</a></td>
                <td className="px-4 py-4">{m.date}</td>
                <td className="px-4 py-4">{getStatusBadge(m.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 px-2 py-3 bg-[#18181B] rounded-b-xl border-t border-[#23232A]">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#A1A1AA]">Show</span>
          <select
            className="bg-[#23232A] text-white px-2 py-1 rounded focus:outline-none border border-[#23232A]"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-sm text-[#A1A1AA]">Entries</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#A1A1AA]">
            Showing {(filteredMembers.length === 0 ? 0 : (page - 1) * pageSize + 1)}-
            {Math.min(page * pageSize, filteredMembers.length)} of {filteredMembers.length} entries
          </span>
          <div className="flex gap-2">
            <button
              className="bg-[#23232A] px-3 py-1 rounded text-white disabled:opacity-50 border border-[#23232A]"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >Previous</button>
            <button
              className="bg-[#23232A] px-3 py-1 rounded text-white disabled:opacity-50 border border-[#23232A]"
              disabled={page === totalPages || filteredMembers.length === 0}
              onClick={() => setPage(page + 1)}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
