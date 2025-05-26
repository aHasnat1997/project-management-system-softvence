import { baseApi } from '../api';

export const userApi = baseApi.injectEndpoints({
    endpoints: build => ({
        userCreate: build.mutation({
            query: data => ({
                url: '/users/register',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),

        userDelete: build.mutation({
            query: id => ({
                url: `/users/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['user'],
        }),

        userUpdate: build.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),

        allUsers: build.query({
            query: params => ({
                url: '/users',
                method: 'GET',
                credentials: 'include',
                params,
            }),
            providesTags: ['user'],
        }),

        singleUsers: build.query({
            query: id => ({
                url: `/users/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['user'],
        }),
    }),
});

export const {
    useUserCreateMutation,
    useUserDeleteMutation,
    useUserUpdateMutation,
    useAllUsersQuery,
    useSingleUsersQuery,
} = userApi;
