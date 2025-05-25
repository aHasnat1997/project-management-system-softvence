import { baseApi } from "../api";

export const projectResourceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    projectResourceCreate: build.mutation({
      query: data => ({
        url: '/projects-resources',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-resource']
    }),

    projectUpdate: build.mutation({
      query: ({ projectId, data }) => ({
        url: `/projects-resources/${projectId}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-resource']
    }),

    allProjectsResources: build.query({
      query: params => ({
        url: '/projects-resources',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['project-resource']
    }),

    singleResourcesByProjectId: build.query({
      query: id => ({
        url: `/projects-resources/project/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['project-resource']
    }),

    singleProjectResourceById: build.query({
      query: id => ({
        url: `/projects-resources/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['project-resource']
    }),

  }),
});

export const {
  useProjectResourceCreateMutation,
  useProjectUpdateMutation,
  useAllProjectsResourcesQuery,
  useSingleResourcesByProjectIdQuery,
  useSingleProjectResourceByIdQuery
} = projectResourceApi;
