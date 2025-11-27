import { USER_ROLE, USER_STATUS } from "@/constants/user.constant";

export type TAuthState = {
  user: {
    userId: string;
    email: string;
    role: typeof USER_ROLE;
    status: typeof USER_STATUS;
    candidateId?: string;
    companyId?: string;
  } | null;
  token: string | null;
};
