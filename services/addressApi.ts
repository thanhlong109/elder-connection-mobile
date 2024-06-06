import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddAdressRequest, AddAdressRespone } from '~/types/address.type';

export const addressApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    addAddress: builder.mutation<ApiResponse<AddAdressRespone>, AddAdressRequest>({
      query: (body) => ({
        url: 'api/addresses/create-address',
        method: 'POST',
        body,
      }),
    }),
  }),
  reducerPath: 'addressApi',
});
export const { useAddAddressMutation } = addressApi;
