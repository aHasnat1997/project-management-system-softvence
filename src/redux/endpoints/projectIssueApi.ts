import { baseApi } from "../api";

export const projectIssueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    projectsIssuesCreate: build.mutation({
      query: data => ({
        url: '/projects-issues',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-issue']
    }),

    projectAssignedPersonDelete: build.mutation({
      query: id => ({
        url: `/projects-issues/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['project-issue']
    }),

    projectAssignedPersonUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/projects-issues/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-issue']
    }),

    allProjectsIssues: build.query({
      query: params => ({
        url: '/projects-issues',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['project-issue']
    }),

    singleProjectsIssuesById: build.query({
      query: id => ({
        url: `/projects-issues/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['project-issue']
    }),
  }),
});

export const {
  useProjectsIssuesCreateMutation,
  useProjectAssignedPersonDeleteMutation,
  useProjectAssignedPersonUpdateMutation,
  useAllProjectsIssuesQuery,
  useSingleProjectsIssuesByIdQuery
} = projectIssueApi;
