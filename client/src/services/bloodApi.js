// Blood API endpoints placeholder
import { apiSlice } from './apiSlice';

export const bloodApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBloodTypes: builder.query({
      query: () => '/blood-types',
    }),
  }),
});
