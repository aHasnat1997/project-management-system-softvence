import { baseApi } from "../api";

export const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: data => ({
        url: '/upload-images/softvence',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['file-upload']
    }),
    removeFile: build.mutation({
      query: data => ({
        url: '/upload-images',
        method: 'POST',
        credentials: 'include',
        body: data
      }),
      invalidatesTags: ['file-upload']
    }),

  }),
});

export const {
  useUploadFileMutation,
  useRemoveFileMutation,
} = fileUploadApi;
