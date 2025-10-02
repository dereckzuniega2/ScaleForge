"use client";

import { useQuery } from "@apollo/client/react";
import { useState, useMemo } from "react";
import { GET_MEMBERS } from "@/graphql/queries";
import {
  Member,
  MemberFilterInput,
  FilterState,
  MemberEdge,
} from "@/types/member";

export function useMembers() {
  const [filters, setFilters] = useState<FilterState>({
    name: [],
    verificationStatus: [],
    emailAddress: [],
    mobileNumber: [],
    domain: [],
    dateTimeCreated: null,
    status: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Convert FilterState to MemberFilterInput
  const graphqlFilter: MemberFilterInput = useMemo(() => {
    const filter: MemberFilterInput = {};

    if (filters.name.length > 0) {
      filter.name = { in: filters.name };
    }
    if (filters.verificationStatus.length > 0) {
      filter.verificationStatus = { in: filters.verificationStatus };
    }
    if (filters.emailAddress.length > 0) {
      filter.emailAddress = { in: filters.emailAddress };
    }
    if (filters.mobileNumber.length > 0) {
      filter.mobileNumber = { in: filters.mobileNumber };
    }
    if (filters.domain.length > 0) {
      filter.domain = { in: filters.domain };
    }
    if (filters.status.length > 0) {
      filter.status = { in: filters.status };
    }
    if (filters.dateTimeCreated) {
      filter.dateTimeCreated = {
        greaterThanOrEqual: new Date(
          filters.dateTimeCreated.start
        ).toISOString(),
        lesserThanOrEqual: new Date(filters.dateTimeCreated.end).toISOString(),
      };
    }

    return filter;
  }, [filters]);

  const { data, loading, error, refetch } = useQuery<{
    members: { edges: MemberEdge[] };
  }>(GET_MEMBERS, {
    variables: {
      first: 100, // Get more data to handle client-side pagination
      filter: graphqlFilter,
    },
    errorPolicy: "all",
  });

  const members: Member[] = useMemo(() => {
    if (!data?.members?.edges) return [];
    return data.members.edges.map((edge: MemberEdge) => edge.node);
  }, [data]);

  // Client-side pagination
  const totalPages = Math.ceil(members.length / entriesPerPage);
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return members.slice(startIndex, startIndex + entriesPerPage);
  }, [members, currentPage, entriesPerPage]);

  // Extract unique values for filters
  const getUniqueValues = (property: keyof Member) => [
    ...new Set(members.map((m) => m[property]).filter(Boolean)),
  ];

  const uniqueNames = getUniqueValues("name");
  const uniqueEmailAddresses = getUniqueValues("emailAddress");
  const uniqueMobileNumbers = getUniqueValues("mobileNumber");
  const uniqueDomains = getUniqueValues("domain");

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updatePagination = (page: number, entries: number) => {
    setCurrentPage(page);
    setEntriesPerPage(entries);
  };

  return {
    members: paginatedMembers,
    allMembers: members,
    loading,
    error,
    refetch,
    filters,
    updateFilters,
    currentPage,
    entriesPerPage,
    totalPages,
    updatePagination,
    uniqueNames,
    uniqueEmailAddresses,
    uniqueMobileNumbers,
    uniqueDomains,
  };
}
