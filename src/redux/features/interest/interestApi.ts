/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const interestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInterest: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      },
      { candidateId: string; companyId: string; message: string }
    >({
      query: (credentials) => ({
        url: "/interests/send-interest",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSendInterestMutation } = interestApi;
