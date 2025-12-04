/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompanyProfile: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      },
      FormData
    >({
      query: (credentials) => ({
        url: "/companies",
        method: "POST",
        body: credentials,
      }),
    }),

    getCompanyProfile: builder.query<any, void>({
      query: () => ({
        url: "/companies/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCompanyProfileMutation, useGetCompanyProfileQuery } =
  companyApi;
