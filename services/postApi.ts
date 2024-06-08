import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreatePostAndScheduleRequest,
  CreatePostAndScheduleResponse,
  GetPostRespone,
} from '~/types/post.type';

export const postApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['post'],
  endpoints: (builder) => ({
    addPost: builder.mutation<
      ApiResponse<CreatePostAndScheduleResponse>,
      CreatePostAndScheduleRequest
    >({
      query: (body) => ({
        url: 'api/posts/create-post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['post'],
    }),
    getPosts: builder.query<ApiResponse<PaggingResponse<GetPostRespone>>, string>({
      query: (para) => ({
        url: 'api/posts/get-post-by-customer-id/' + para,
        method: 'POST',
      }),
      providesTags: ['post'],
    }),
  }),
  reducerPath: 'postApi',
});
export const { useAddPostMutation, useGetPostsQuery } = postApi;
