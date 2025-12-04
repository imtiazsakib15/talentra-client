/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSkill: builder.mutation<
      { success: boolean; message: string; data: { id: string; name: string } },
      { skillName: string }
    >({
      query: ({ skillName }) => ({
        url: "/skills",
        method: "POST",
        body: { name: skillName },
      }),
    }),

    getAllSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
    }),

    deleteSkill: builder.mutation({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddSkillMutation,
  useGetAllSkillsQuery,
  useDeleteSkillMutation,
} = skillApi;
