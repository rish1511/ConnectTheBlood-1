// Donor API endpoints placeholder
import { apiSlice } from './apiSlice';

export const donorApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDonors: builder.query({
      query: () => '/donors',
    }),
  }),
});
