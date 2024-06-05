import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
//import { logout } from '../auth';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://elderconnectionwebapp.azurewebsites.net/',
  prepareHeaders: (headers, { getState }) => {
    const token = AsyncStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    // token expired
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      localStorage.setItem('accessToken', accessToken);
      // retry original query with new access token
      result = await baseQuery(
        {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        },
        api,
        extraOptions
      );
    } else {
      // refresh token failed, logout user
      //logout();
    }
  }

  return result;
};
