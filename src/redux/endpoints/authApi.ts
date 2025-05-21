import { baseApi } from "../api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['auth']
    }),

    forgotPassword: build.mutation({
      query: data => ({
        url: '/auth/forgot-password',
        method: 'POST',
        credentials: 'include',
        body: data
      })
    }),

    setNewPassword: build.mutation({
      query: ({ data, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        credentials: 'include',
        body: data
      })
    }),

    resetPassword: build.mutation({
      query: ({ data, userId }) => ({
        url: `/users/update-password/${userId}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      })
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

export const {
  useUserLoginMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useResetPasswordMutation,
  useUserLogoutMutation,
  useLoggedInUserInfoQuery
} = authApi;
