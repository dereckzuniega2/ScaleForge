import { gql } from "@apollo/client";

/*
  Base members query used to fetch paginated members and full fields.
  Accepts a MemberFilterInput so it can be reused for status, verification,
  domain, date range or combined filters from the UI.
*/
export const GET_MEMBERS = gql`
  query GetMembers($first: Int, $after: Cursor, $filter: MemberFilterInput) {
    members(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          id
          ... on Member {
            name
            verificationStatus
            emailAddress
            mobileNumber
            domain
            dateTimeCreated
            dateTimeLastActive
            status
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/*
  Search helpers used by the dropdowns / filters in the UI.
  These return up to 20 results and the same set of fields used in the table.
*/
export const SEARCH_BY_NAME = gql`
  query SearchMembersByName($search: String!) {
    membersByName(search: $search, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_EMAIL = gql`
  query SearchMembersByEmail($email: String!) {
    membersByEmailAddress(search: $email, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_VERIFICATION_STATUS = gql`
  query SearchMembersByVeri($search: String!) {
    membersByVerificationStatus(search: $search, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_MOBILE = gql`
  query SearchMembersByMobile($mobile: String!) {
    membersByMobileNumber(search: $mobile, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_DOMAIN = gql`
  query SearchMembersByDomain($domain: String!) {
    membersByDomain(search: $domain, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_DATE_REGISTERED = gql`
  query ($from: DateTime, $to: DateTime) {
    membersByDateRegistered(
      filter: {
        dateTimeCreated: {
          greaterThanOrEqual: $from
          lesserThanOrEqual: $to
        },
      }
    ) {
      edges {
        node {
          ... on Member {
            name
            verificationStatus
            emailAddress
            mobileNumber
            domain
            dateTimeCreated
            dateTimeLastActive
            status
          }
        }
      }
    }
  }
`;

export const SEARCH_BY_STATUS = gql`
  query SearchMembersByName($search: String!) {
    membersByStatus(search: $search, first: 20) {
      name
      verificationStatus
      emailAddress
      mobileNumber
      domain
      dateTimeCreated
      dateTimeLastActive
      status
    }
  }
`;

export const SEARCH_BY_LAST_ACTIVE = gql`
  query SearchByLastActive($from: DateTime, $to: DateTime) {
    members(
      filter: {
        dateTimeLastActive: {
          greaterThanOrEqual: $from
          lesserThanOrEqual: $to
        },
      }
      first: 20
    ) {
      edges {
        node {
          ... on Member {
            name
            verificationStatus
            emailAddress
            mobileNumber
            domain
            dateTimeCreated
            dateTimeLastActive
            status
          }
        }
      }
    }
  }
`;