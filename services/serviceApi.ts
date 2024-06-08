import { GetServiceResponse } from '~/types/service.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

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
  }),
  reducerPath: 'serviceApi',
});
export const { useGetServiceByIdQuery } = serviceApi;
