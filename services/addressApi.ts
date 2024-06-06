import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AddAdressRequest,
  AddAdressRespone,
  GetAddressRespone,
  UpdateAdressRequest,
} from '~/types/address.type';

export const addressApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    addAddress: builder.mutation<ApiResponse<AddAdressRespone>, AddAdressRequest>({
      query: (body) => ({
        url: 'api/addresses/create-address',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation<ApiResponse<any>, UpdateAdressRequest>({
      query: (body) => ({
        url: 'api/addresses/update-account-address/' + body.addressId,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    getAddress: builder.query<
      ApiResponse<PaggingResponse<GetAddressRespone>>,
      PaggingRequest<String>
    >({
      query: (para) => ({
        url: `api/addresses/get-all-address-by-account/${para.data}?pageSize=${para.pageSize}&pageIndex=${para.pageIndex}`,
      }),
      providesTags: ['Address'],
    }),
  }),
  reducerPath: 'addressApi',
});
export const { useAddAddressMutation, useGetAddressQuery, useUpdateAddressMutation } = addressApi;
