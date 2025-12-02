/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      },
      { candidateId: string; companyId: string; message: string }
    >({
      query: (credentials) => ({
        url: "/invitations/send-invitation",
        method: "POST",
        body: credentials,
      }),
    }),

    getSentInvitations: builder.query({
      query: () => ({
        url: "/invitations/sent",
        method: "GET",
      }),
    }),

    getReceivedInvitations: builder.query({
      query: () => ({
        url: "/invitations/received",
        method: "GET",
      }),
    }),

    acceptInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `/invitations/${invitationId}/accept`,
        method: "PUT",
        body: { invitationId },
      }),
    }),

    declineInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `/invitations/${invitationId}/decline`,
        method: "PUT",
        body: { invitationId },
      }),
    }),
  }),
});

export const {
  useSendInvitationMutation,
  useGetSentInvitationsQuery,
  useGetReceivedInvitationsQuery,
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} = invitationApi;
