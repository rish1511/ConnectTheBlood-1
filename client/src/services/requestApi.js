// Request API endpoints placeholder
import { apiSlice } from './apiSlice';

export const requestApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRequests: builder.query({
      query: () => '/requests',
    }),
  }),
});
