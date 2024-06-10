import { apiSlice } from "./apiSlice";

export const utilApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: () => {
        return {
          url: "countries",
          method: "GET",
        };
      },
    }),

    getSaudiCity: builder.query({
      query: () => {
        return {
          url: "cities/sa",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSaudiCityQuery, useGetCountryQuery } = utilApiSlice;
