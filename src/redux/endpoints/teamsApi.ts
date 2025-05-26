import { baseApi } from '../api';

export const teamsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        teamCreate: build.mutation({
            query: data => ({
                url: '/teams',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['team'],
        }),

        allTeams: build.query({
            query: params => ({
                url: '/teams',
                method: 'GET',
                credentials: 'include',
                params,
            }),
            providesTags: ['team'],
        }),

        singleTeam: build.query({
            query: teamName => ({
                url: `/teams/${teamName}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['team'],
        }),
        teamUpdate: build.mutation({
            query: ({ slug, data }) => ({
                url: `/teams/${slug}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['team'],
        }),
    }),
});

export const {
    useTeamCreateMutation,
    useAllTeamsQuery,
    useSingleTeamQuery,
    useTeamUpdateMutation,
} = teamsApi;
