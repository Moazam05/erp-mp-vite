import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user?.token || localStorage.getItem("user-token");
      if (token) {
        headers.set("authorization", `Token ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
