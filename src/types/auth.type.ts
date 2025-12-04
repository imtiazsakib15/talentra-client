import { USER_STATUS } from "@/constants/user.constant";
import type { UserRole } from "./user.type";

export type TAuthState = {
  user: {
    userId: string;
    email: string;
    role: UserRole;
    status: typeof USER_STATUS;
    candidateId?: string;
    companyId?: string;
  } | null;
  token: string | null;
};
