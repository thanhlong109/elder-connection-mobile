import {
  AccountDestailsRespones,
  GetWalletBalanceResponse,
  SignInRequest,
  SignInRespone,
  SignUpRequest,
  SignUpRespone,
  UpdateAccountRequest,
} from '~/types/auth.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export const accountApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['account', 'wallet'],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse<SignUpRespone>, SignUpRequest>({
      query: (signUpRequest) => ({
        url: 'api/users/sign-up',
        method: 'POST',
        body: signUpRequest,
      }),
    }),
    signIn: builder.mutation<ApiResponse<SignInRespone>, SignInRequest>({
      query: (signInRequest) => ({
        url: 'api/users/sign-in',
        method: 'POST',
        body: signInRequest,
      }),
      transformErrorResponse: (response: any) => {
        let transform: ApiResponse<SignInRespone> = {
          message: '',
          result: {
            expired: '',
            jwtRefreshToken: '',
            jwtToken: '',
            accountId: '',
          },
          status: 400,
        };

        if (
          'jwtToken' in response &&
          'expired' in response &&
          'jwtRefreshToken' in response &&
          'accountId' in response
        ) {
          transform.result.expired = response.expired;
          transform.result.jwtRefreshToken = response.jwtRefreshToken;
          transform.result.jwtToken = response.jwtToken;
          transform.result.accountId = response.accountId;
        }
        if ('status' in response) {
          transform.status = response.status;
        }
        if ('message' in response) {
          transform.message = response.message;
        }

        return transform;
      },
    }),

    accountDetails: builder.query<ApiResponse<AccountDestailsRespones>, string>({
      query: (accountId) => ({
        url: `api/accounts/get-account-detail/${accountId}`,
      }),
      providesTags: ['account'],
    }),

    getWalletBalance: builder.query<ApiResponse<GetWalletBalanceResponse>, string>({
      query: (accountId) => ({
        url: `api/accounts/get-wallet-balance/${accountId}`,
      }),
      providesTags: ['wallet'],
    }),

    updateAccount: builder.mutation<ApiResponse<AccountDestailsRespones>, UpdateAccountRequest>({
      query: (body) => ({
        url: `api/accounts/update-account-detail/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['account'],
    }),

    refresh: builder.mutation<{ accessToken: string }, { refreshToken: string }>({
      query: (refreshToken) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
  reducerPath: 'accountApi',
});
export const {
  useRefreshMutation,
  useSignInMutation,
  useSignUpMutation,
  useAccountDetailsQuery,
  useUpdateAccountMutation,
  useGetWalletBalanceQuery,
} = accountApi;
