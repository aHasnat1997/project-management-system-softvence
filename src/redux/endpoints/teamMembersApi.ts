import { baseApi } from "../api";

export const teamsMembersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    teamMembersCreate: build.mutation({
      query: data => ({
        url: '/teams-members',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['team-member']
    }),

    updateMember: build.mutation({
      query: data => ({
        url: '/teams-members',
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['team-member']
    }),

    deleteMember: build.mutation({
      query: id => ({
        url: `/teams-members/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['team-member']
    }),

    allMember: build.query({
      query: params => ({
        url: '/teams-members',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['team-member']
    }),

    membersByTeam: build.query({
      query: teamId => ({
        url: `/teams-members/team/${teamId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['team-member']
    }),

    membersById: build.query({
      query: membersId => ({
        url: `/teams-members/${membersId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['team-member']
    }),

  }),
});

export const {
  useTeamMembersCreateMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useAllMemberQuery,
  useMembersByIdQuery,
  useMembersByTeamQuery
} = teamsMembersApi;
