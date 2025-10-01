export type Member = {
  id: string;
  name: string;
  verification: "Verified" | "Unverified" | "Pending";
  balance: number;
  email: string;
  mobile: string;
  domain: string;
  dateRegistered: string;
  status: "Active" | "Blacklisted" | "Disabled";
};

export const members: Member[] = [
  {
    id: "1",
    name: "Botmind23r23",
    verification: "Verified",
    balance: 39.0,
    email: "olivia@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-04-12",
    status: "Active",
  },
  {
    id: "2",
    name: "Livia",
    verification: "Unverified",
    balance: 13.25,
    email: "phoenix@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-04-12",
    status: "Active",
  },
  {
    id: "3",
    name: "Davis",
    verification: "Pending",
    balance: 14.25,
    email: "lana@untitledui.com",
    mobile: "+1 (888) 000-0000",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-04-12",
    status: "Active",
  },
  {
    id: "4",
    name: "Alena",
    verification: "Verified",
    balance: 201.8,
    email: "demi@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-04-08",
    status: "Active",
  },
  {
    id: "5",
    name: "Allison",
    verification: "Verified",
    balance: 0.0,
    email: "candice@untitledui.com",
    mobile: "+1 (534) 000-0000",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-18",
    status: "Active",
  },
  {
    id: "6",
    name: "Ruben",
    verification: "Verified",
    balance: 250.0,
    email: "natali@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-14",
    status: "Blacklisted",
  },
  {
    id: "7",
    name: "Mari0",
    verification: "Pending",
    balance: 25.33,
    email: "drew@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-14",
    status: "Blacklisted",
  },
  {
    id: "8",
    name: "Desirae",
    verification: "Unverified",
    balance: 65.1,
    email: "orlando@untitledui.com",
    mobile: "+1 (234) 000-0000",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-14",
    status: "Blacklisted",
  },
  {
    id: "9",
    name: "Botmind23r23-2",
    verification: "Unverified",
    balance: 0.0,
    email: "andi@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-14",
    status: "Disabled",
  },
  {
    id: "10",
    name: "Phillipa",
    verification: "Verified",
    balance: 25.6,
    email: "kate@untitledui.com",
    mobile: "+63 (976) 003 517",
    domain: "https://scaleforge.tech/",
    dateRegistered: "2024-03-14",
    status: "Disabled",
  },
];
