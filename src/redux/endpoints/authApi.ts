import { baseApi } from "../api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: data => {
        return {
          url: '/auth/login',
          method: 'POST',
          credentials: 'include',
          body: data
        }
      },
      invalidatesTags: ['auth']
    }),

    userLogout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['auth']
    }),

    loggedInUserInfo: build.query({
      query: () => ({
        method: 'GET',
        url: '/user/me'
      }),
      providesTags: ['auth']
    })
  }),
});

export const { useUserLoginMutation, useUserLogoutMutation, useLoggedInUserInfoQuery } = authApi;
