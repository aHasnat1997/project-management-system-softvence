import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = '';
      if (accessToken) headers.set("authorization", accessToken);
      headers.set("Content-Type", "application/json");

      if (!(headers.get("Content-Type") === "multipart/form-data")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    }
  }),
  endpoints: () => ({}),
  tagTypes: ['auth']
});
