import { baseApi } from "../api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: data => ({
        url: '/users/register',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['user']
    }),

    allUsers: build.query({
      query: params => ({
        url: '/users',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['user']
    }),

  }),
});

export const {
  useUserCreateMutation,
  useAllUsersQuery
} = userApi;
