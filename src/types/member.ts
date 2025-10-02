export type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "PENDING";
export type MemberStatus =
  | "ACTIVE"
  | "DISABLED"
  | "SUSPENDED"
  | "BLACKLISTED"
  | "DELETED"
  | "VERIFICATION_LOCKED";

export interface Member {
  id: string;
  name: string;
  verificationStatus: VerificationStatus;
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  dateTimeCreated: string;
  status: MemberStatus;
  dateTimeLastActive: string;
}

export interface FilterState {
  name: string[];
  verificationStatus: VerificationStatus[];
  emailAddress: string[];
  mobileNumber: string[];
  domain: string[];
  dateTimeCreated: { start: string; end: string } | null;
  status: MemberStatus[];
}

export interface StringFilterInput {
  equal?: string;
  notEqual?: string;
  in?: string[];
  notIn?: string[];
  contains?: string;
  startsWith?: string;
}

export interface EmailAddressFilterInput {
  equal?: string;
  notEqual?: string;
  in?: string[];
  notIn?: string[];
  contains?: string;
  startsWith?: string;
}

export interface MemberVerificationStatusFilterInput {
  equal?: VerificationStatus;
  notEqual?: VerificationStatus;
  in?: VerificationStatus[];
  notIn?: VerificationStatus[];
}

export interface MemberStatusFilterInput {
  equal?: MemberStatus;
  notEqual?: MemberStatus;
  in?: MemberStatus[];
  notIn?: MemberStatus[];
}

export interface DateTimeFilterInput {
  equal?: string;
  notEqual?: string;
  in?: string[];
  notIn?: string[];
  lesserThan?: string;
  lesserThanOrEqual?: string;
  greaterThan?: string;
  greaterThanOrEqual?: string;
}

export interface MemberFilterInput {
  id?: { equal?: string; notEqual?: string; in?: string[]; notIn?: string[] };
  name?: StringFilterInput;
  status?: MemberStatusFilterInput;
  verificationStatus?: MemberVerificationStatusFilterInput;
  emailAddress?: EmailAddressFilterInput;
  mobileNumber?: StringFilterInput;
  realName?: StringFilterInput;
  birthDay?: {
    equal?: string;
    notEqual?: string;
    in?: string[];
    notIn?: string[];
    lesserThan?: string;
    lesserThanOrEqual?: string;
    greaterThan?: string;
    greaterThanOrEqual?: string;
  };
  domain?: StringFilterInput;
  branchCode?: StringFilterInput;
  labels?: {
    equal?: string;
    notEqual?: string;
    in?: string[];
    notIn?: string[];
  };
  agent?: {
    equal?: string;
    notEqual?: string;
    in?: string[];
    notIn?: string[];
  };
  referrer?: {
    equal?: string;
    notEqual?: string;
    in?: string[];
    notIn?: string[];
  };
  dateTimeCreated?: DateTimeFilterInput;
  dateTimeLastActive?: DateTimeFilterInput;
  wallet__balance?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  hasFirstDeposit?: {
    equal?: boolean;
    notEqual?: boolean;
    in?: boolean[];
    notIn?: boolean[];
  };
  test?: {
    equal?: boolean;
    notEqual?: boolean;
    in?: boolean[];
    notIn?: boolean[];
  };
  totalBet3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  ipAddress?: StringFilterInput;
  totalBet7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalBet30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalPayout3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalPayout7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalPayout30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWinloss3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWinloss7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWinloss30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalDeposit?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalDeposit3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalDeposit7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalDeposit30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWithdrawal?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWithdrawal3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWithdrawal7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalWithdrawal30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalBonus3d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalBonus7d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  totalBonus30d?: {
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  level?: {
    equal?: number;
    notEqual?: number;
    in?: number[];
    notIn?: number[];
    lesserThan?: number;
    lesserThanOrEqual?: number;
    greaterThan?: number;
    greaterThanOrEqual?: number;
  };
  dateTimeLastAndroidLogIn?: DateTimeFilterInput;
  platform?: {
    equal?: string;
    notEqual?: string;
    in?: string[];
    notIn?: string[];
  };
  dateTimeFirstAndroidLogIn?: DateTimeFilterInput;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface MemberEdge {
  node: Member;
}

export interface MembersConnection {
  edges: MemberEdge[];
  pageInfo: PageInfo;
}
