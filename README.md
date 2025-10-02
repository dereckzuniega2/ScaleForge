# Members Management

A Next.js application for managing members with GraphQL integration.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_TOKEN=your-auth-token-here
```

3. Run the development server:

```bash
npm run dev
```

## Features

- GraphQL integration with Apollo Client
- Member filtering and search
- Pagination
- Real-time data fetching
- Responsive design

## GraphQL Schema

The application expects the following GraphQL schema:

```graphql
type Member {
  id: ID!
  name: String!
  verificationStatus: VerificationStatus!
  emailAddress: String!
  mobileNumber: String!
  domain: String!
  dateTimeCreated: String!
  dateTimeLastActive: String!
  status: MemberStatus!
}

enum VerificationStatus {
  verified
  unverified
  pending
}

enum MemberStatus {
  active
  blacklisted
  disabled
}

type Query {
  members(
    first: Int
    after: String
    filter: MemberFilterInput
  ): MembersConnection!
  membersByName(search: String!, first: Int): [Member!]!
  membersByEmailAddress(search: String!, first: Int): [Member!]!
  membersByVerificationStatus(search: String!, first: Int): [Member!]!
  membersByMobileNumber(search: String!, first: Int): [Member!]!
  membersByDomain(search: String!, first: Int): [Member!]!
  membersByStatus(search: String!, first: Int): [Member!]!
  membersByDateRegistered(filter: DateFilterInput): MembersConnection!
}

input MemberFilterInput {
  name: [String!]
  verificationStatus: [VerificationStatus!]
  emailAddress: [String!]
  mobileNumber: [String!]
  domain: [String!]
  dateTimeCreated: DateRangeInput
  status: [MemberStatus!]
}

input DateRangeInput {
  greaterThanOrEqual: String
  lesserThanOrEqual: String
}

type MembersConnection {
  edges: [MemberEdge!]!
  pageInfo: PageInfo!
}

type MemberEdge {
  node: Member!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String!
}
```
