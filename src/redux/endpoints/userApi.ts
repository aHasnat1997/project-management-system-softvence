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

  }),
});

export const {
  useUserCreateMutation,
} = userApi;
