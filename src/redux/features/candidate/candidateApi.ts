/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import type { CandidateSearchParams, CandidatesResponse } from "@/types";

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
    searchCandidates: builder.query<CandidatesResponse, CandidateSearchParams>({
      query: (params) => {
        const {
          skills = [],
          experienceMin,
          city,
          country,
          available,
          page = 1,
          limit = 12,
        } = params || {};

        const qp = new URLSearchParams();
        if (skills.length)
          qp.append(
            "skills",
            skills
              .map((s) => s.trim())
              .filter(Boolean)
              .join(",")
          );
        if (experienceMin !== undefined)
          qp.append("experienceMin", String(experienceMin));
        if (city) qp.append("city", city);
        if (country) qp.append("country", country);
        if (available !== undefined) qp.append("available", String(available));
        qp.append("page", String(page));
        qp.append("limit", String(limit));

        return `/candidates?${qp.toString()}`;
      },
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useCreateCandidateProfileMutation, useSearchCandidatesQuery } =
  candidateApi;
