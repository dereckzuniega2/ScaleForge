export type Member = {
  id: string;
  name: string;
  verification: "Verified" | "Unverified" | "Pending";
  balance: number;
  email: string;
  mobile: string;
  domain: string;
  dateRegistered: string;
  lastActive?: string;
  status: "Active" | "Blacklisted" | "Disabled";
};
