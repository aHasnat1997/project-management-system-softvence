import { baseApi } from "../api";

export const projectAssignedPersonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    projectAssignedPersonCreate: build.mutation({
      query: data => ({
        url: '/projects-assigned',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-assigned-person']
    }),

    projectAssignedPersonDelete: build.mutation({
      query: id => ({
        url: `/projects-resources/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['project-assigned-person']
    }),

    projectAssignedPersonUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/projects-resources/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['project-assigned-person']
    }),

    allProjectsAssignedPerson: build.query({
      query: params => ({
        url: '/projects-assigned',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['project-assigned-person']
    }),

    singleAssignedPersonById: build.query({
      query: id => ({
        url: `/projects-assigned/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['project-assigned-person']
    }),
  }),
});

export const {
  useProjectAssignedPersonCreateMutation,
  useProjectAssignedPersonDeleteMutation,
  useProjectAssignedPersonUpdateMutation,
  useAllProjectsAssignedPersonQuery,
  useSingleAssignedPersonByIdQuery,
} = projectAssignedPersonApi;
