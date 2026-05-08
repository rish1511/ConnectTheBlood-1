// Blood bank API endpoints placeholder
import { apiSlice } from './apiSlice';

export const bloodBankApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBloodBanks: builder.query({
      query: () => '/blood-banks',
    }),
  }),
});
