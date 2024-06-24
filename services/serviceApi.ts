import { GetServiceResponse } from '~/types/service.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Sale } from '~/types/sale.type';

export const serviceApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['service'],
  endpoints: (builder) => ({
    getServiceById: builder.query<ApiResponse<GetServiceResponse>, number>({
      query: (para) => ({
        url: `api/services/get-service/${para}`,
      }),
      providesTags: ['service'],
    }),
    getAllSale: builder.query<ApiResponse<PaggingResponse<Sale>>, void>({
      query: () => ({
        url: `api/Sale/get-all-sale?pageIndex=0&pageSize=10`,
      }),
    }),
  }),
  reducerPath: 'serviceApi',
});
export const { useGetServiceByIdQuery, useGetAllSaleQuery } = serviceApi;
