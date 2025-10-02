import React from "react";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  SEARCH_BY_NAME,
  SEARCH_BY_EMAIL,
  SEARCH_BY_VERIFICATION_STATUS,
  SEARCH_BY_MOBILE,
  SEARCH_BY_DOMAIN,
  SEARCH_BY_STATUS,
  SEARCH_BY_DATE_REGISTERED,
  SEARCH_BY_LAST_ACTIVE,
} from "@/graphql/queries";
import { Member } from "@/types/member";

export function useMemberSearch() {

  const [searchByName, nameResult] = useLazyQuery(SEARCH_BY_NAME);
  const [searchByEmail, emailResult] = useLazyQuery(SEARCH_BY_EMAIL);
  const [searchByVerificationStatus, verificationResult] = useLazyQuery(SEARCH_BY_VERIFICATION_STATUS);
  const [searchByMobile, mobileResult] = useLazyQuery(SEARCH_BY_MOBILE);
  const [searchByDomain, domainResult] = useLazyQuery(SEARCH_BY_DOMAIN);
  const [searchByStatus, statusResult] = useLazyQuery(SEARCH_BY_STATUS);
  const [searchByDateRegistered, dateRegisteredResult] = useLazyQuery(SEARCH_BY_DATE_REGISTERED);
  const [searchByLastActive, lastActiveResult] = useLazyQuery(SEARCH_BY_LAST_ACTIVE);

  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  // Use effect to handle results and errors
  // Name
  React.useEffect(() => {
    if (nameResult.data && (nameResult.data as { membersByName?: Member[] }).membersByName) {
      setSearchResults((nameResult.data as { membersByName: Member[] }).membersByName ?? []);
      setLoading(false);
    } else if (nameResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [nameResult.data, nameResult.error]);

  // Email
  React.useEffect(() => {
    if (emailResult.data && (emailResult.data as { membersByEmailAddress?: Member[] }).membersByEmailAddress) {
      setSearchResults((emailResult.data as { membersByEmailAddress: Member[] }).membersByEmailAddress ?? []);
      setLoading(false);
    } else if (emailResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [emailResult.data, emailResult.error]);

  // Verification Status
  React.useEffect(() => {
    if (verificationResult.data && (verificationResult.data as { membersByVerificationStatus?: Member[] }).membersByVerificationStatus) {
      setSearchResults((verificationResult.data as { membersByVerificationStatus: Member[] }).membersByVerificationStatus ?? []);
      setLoading(false);
    } else if (verificationResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [verificationResult.data, verificationResult.error]);

  // Mobile
  React.useEffect(() => {
    if (mobileResult.data && (mobileResult.data as { membersByMobileNumber?: Member[] }).membersByMobileNumber) {
      setSearchResults((mobileResult.data as { membersByMobileNumber: Member[] }).membersByMobileNumber ?? []);
      setLoading(false);
    } else if (mobileResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [mobileResult.data, mobileResult.error]);

  // Domain
  React.useEffect(() => {
    if (domainResult.data && (domainResult.data as { membersByDomain?: Member[] }).membersByDomain) {
      setSearchResults((domainResult.data as { membersByDomain: Member[] }).membersByDomain ?? []);
      setLoading(false);
    } else if (domainResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [domainResult.data, domainResult.error]);

  // Status
  React.useEffect(() => {
    if (statusResult.data && (statusResult.data as { membersByStatus?: Member[] }).membersByStatus) {
      setSearchResults((statusResult.data as { membersByStatus: Member[] }).membersByStatus ?? []);
      setLoading(false);
    } else if (statusResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [statusResult.data, statusResult.error]);

  // Date Registered
  React.useEffect(() => {
    if (dateRegisteredResult.data && (dateRegisteredResult.data as { membersByDateRegistered?: { edges: { node: Member }[] } }).membersByDateRegistered) {
      const edges = (dateRegisteredResult.data as { membersByDateRegistered: { edges: { node: Member }[] } }).membersByDateRegistered.edges ?? [];
      const members = edges.map((edge) => edge.node);
      setSearchResults(members);
      setLoading(false);
    } else if (dateRegisteredResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [dateRegisteredResult.data, dateRegisteredResult.error]);

  // Last Active
  React.useEffect(() => {
    if (lastActiveResult.data && (lastActiveResult.data as { members?: { edges: { node: Member }[] } }).members) {
      const edges = (lastActiveResult.data as { members: { edges: { node: Member }[] } }).members.edges ?? [];
      const members = edges.map((edge) => edge.node);
      setSearchResults(members);
      setLoading(false);
    } else if (lastActiveResult.error) {
      setSearchResults([]);
      setLoading(false);
    }
  }, [lastActiveResult.data, lastActiveResult.error]);

  const performSearch = (
    type: string,
    searchTerm: string,
    dateRange?: { from: string; to: string }
  ) => {
    setLoading(true);

    switch (type) {
      case "name":
        searchByName({ variables: { search: searchTerm } });
        break;
      case "email":
        searchByEmail({ variables: { email: searchTerm } });
        break;
      case "verificationStatus": {
        const statusEnum = searchTerm.toUpperCase();
        searchByVerificationStatus({ variables: { search: statusEnum } });
        break;
      }
      case "mobile":
        searchByMobile({ variables: { mobile: searchTerm } });
        break;
      case "domain":
        searchByDomain({ variables: { domain: searchTerm } });
        break;
      case "status":
        searchByStatus({ variables: { search: searchTerm } });
        break;
      case "dateRegistered":
        if (dateRange) {
          searchByDateRegistered({
            variables: {
              from: dateRange.from,
              to: dateRange.to,
            },
          });
        }
        break;
      case "lastActive":
        if (dateRange) {
          searchByLastActive({
            variables: {
              from: dateRange.from,
              to: dateRange.to,
            },
          });
        }
        break;
      default:
        setLoading(false);
    }
  };

  return {
    searchResults,
    loading,
    performSearch,
  };
}
