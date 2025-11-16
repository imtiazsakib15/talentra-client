/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCandidateProfile: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      },
      FormData
    >({
      query: (credentials) => ({
        url: "/candidates",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateCandidateProfileMutation } = candidateApi;
