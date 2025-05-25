import { baseApi } from "../api";

export const projectsMessagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    projectsMessageCreate: build.mutation({
      query: data => ({
        url: '/projects-messages',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['projects-messages']
    }),

    projectsMessageDelete: build.mutation({
      query: id => ({
        url: `/projects-messages/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['project']
    }),

    projectsMessageUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/projects-messages/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['projects-messages']
    }),

    allProjectsMessage: build.query({
      query: params => ({
        url: '/projects-messages',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['projects-messages']
    }),

    singleProjectsMessageById: build.query({
      query: id => ({
        url: `/projects-messages/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['projects-messages']
    }),
  }),
});

export const {
  useProjectsMessageCreateMutation,
  useProjectsMessageDeleteMutation,
  useProjectsMessageUpdateMutation,
  useAllProjectsMessageQuery,
  useSingleProjectsMessageByIdQuery
} = projectsMessagesApi;
