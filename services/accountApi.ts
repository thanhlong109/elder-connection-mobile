import { SignUpRequest, SignUpRespone } from '~/types/auth.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export const accountApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse<SignUpRespone>, SignUpRequest>({
      query: (SignUpRequest) => ({
        url: 'api/user/sign-up',
        method: 'POST',
        body: SignUpRequest,
      }),
    }),
    refresh: builder.mutation<{ accessToken: string }, { refreshToken: string }>({
      query: (refreshToken) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
  tagTypes: [],
  reducerPath: 'accountApi',
});
export const { useRefreshMutation, useSignUpMutation } = accountApi;
