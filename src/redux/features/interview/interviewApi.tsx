import { baseApi } from "@/redux/api/baseApi";

export const interviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    scheduleInterview: builder.mutation<
      { success: boolean; message: string; data: unknown },
      {
        invitationId: string;
        candidateId: string;
        companyId: string;
        meetingLink: string;
        scheduledAt: string;
      }
    >({
      query: (body) => ({
        url: "/interviews",
        method: "POST",
        body,
      }),
    }),

    getCandidateInterviews: builder.query({
      query: () => ({
        url: "/interviews/candidate",
        method: "GET",
      }),
    }),
  }),
});

export const { useScheduleInterviewMutation, useGetCandidateInterviewsQuery } =
  interviewApi;
export default interviewApi;
