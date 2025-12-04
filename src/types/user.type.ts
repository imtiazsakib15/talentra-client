import type { TCandidate } from "./candidate.type";
import type { TCompany } from "./company.type";

export type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

export type TUser = {
  id: string;
  name?: string | null;

  email: string;
  role: UserRole;
  status: UserStatus;

  company?: TCompany | null;

  candidate?: TCandidate | null;

  createdAt: string;
  updatedAt: string;
};
