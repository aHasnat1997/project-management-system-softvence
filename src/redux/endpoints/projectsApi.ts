import { baseApi } from "../api";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    projectCreate: build.mutation({
      query: data => ({
        url: '/projects',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project']
    }),

    projectDelete: build.mutation({
      query: projectId => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['project']
    }),

    projectsAssignedDelete: build.mutation({
      query: id => ({
        url: `/projects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['project']
    }),

    projectUpdate: build.mutation({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project']
    }),

    allProjects: build.query({
      query: params => ({
        url: '/projects',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['project']
    }),

    singleProject: build.query({
      query: id => ({
        url: `/projects/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['project']
    }),

  }),
});

export const {
  useProjectCreateMutation,
  useProjectDeleteMutation,
  useProjectsAssignedDeleteMutation,
  useProjectUpdateMutation,
  useAllProjectsQuery,
  useSingleProjectQuery
} = projectsApi;
