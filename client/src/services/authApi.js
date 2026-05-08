// Auth API endpoints placeholder
import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
  }),
});
