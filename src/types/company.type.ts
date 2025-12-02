export type TCompany = {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  address: string;
  country: string;
  website: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  user?: { email?: string; role?: string; status?: string };
};
