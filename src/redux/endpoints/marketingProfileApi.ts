import { baseApi } from "../api";

export const marketingProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    marketingProfileCreate: build.mutation({
      query: data => ({
        url: '/marketing-profile',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['marketing-profile']
    }),

    marketingProfileUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/marketing-profile/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['marketing-profile']
    }),

    allMarketingProfile: build.query({
      query: params => ({
        url: '/marketing-profile',
        method: 'GET',
        credentials: 'include',
        params
      }),
      providesTags: ['marketing-profile']
    }),

    singleMarketingProfileById: build.query({
      query: id => ({
        url: `/marketing-profile/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['marketing-profile']
    }),
  }),
});

export const {
  useMarketingProfileCreateMutation,
  useMarketingProfileUpdateMutation,
  useAllMarketingProfileQuery,
  useSingleMarketingProfileByIdQuery
} = marketingProfileApi;
