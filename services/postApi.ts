import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { CreatePostAndScheduleRequest, CreatePostAndScheduleResponse } from '~/types/post.type';

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
  }),
  reducerPath: 'postApi',
});
export const {} = postApi;
