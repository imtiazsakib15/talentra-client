/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query<
      {
        success: boolean;
        message: string;
        data: any;
      },
      void
    >({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllSkillsQuery } = skillApi;
