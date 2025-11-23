import type { TSkill } from "./skill.type";

export type CandidateSkillNested = {
  id: string;
  candidateId: string;
  skillId: string;
  createdAt: string;
  updatedAt: string;
  skill: TSkill;
};

export type TCandidate = {
  id: string;
  userId: string;
  designation: string;
  fullName: string;
  image: string;
  experience: number;
  phone: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  resume: string;
  isAvailable: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  skills: CandidateSkillNested[];
  user?: { email?: string; role?: string; status?: string };
};

export type CandidatesResponse = {
  data: TCandidate[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type CandidateSearchParams = {
  skills?: string[];
  experienceMin?: number;
  city?: string;
  country?: string;
  available?: boolean;
  page?: number;
  limit?: number;
};
