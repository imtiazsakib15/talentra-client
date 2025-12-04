import type { TCandidate } from "./candidate.type";
import type { TCompany } from "./company.type";
import { INVITATION_STATUS } from "@/constants/invitation.constant";
import type { TInterview } from "./interview.type";

export type TInvitation = {
  id: string;
  candidateId: string;
  companyId: string;
  message: string;
  status: keyof typeof INVITATION_STATUS;
  candidate?: TCandidate;
  company?: TCompany;
  interview?: TInterview;
  createdAt: string;
  updatedAt: string;
};
