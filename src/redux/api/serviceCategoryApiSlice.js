import { apiSlice } from "./apiSlice";

export const serviceCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => {
        return {
          url: "services-all",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetServicesQuery } = serviceCategoryApiSlice;
