import type { TCandidate } from "./candidate.type";
import type { TCompany } from "./company.type";

export type TInterview = {
  id: string;
  invitationId: string;
  companyId: string;
  candidateId: string;
  meetingLink: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  company: TCompany;
  candidate: TCandidate;
};
