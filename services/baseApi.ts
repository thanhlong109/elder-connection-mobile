import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { KEYS } from '~/enums';
import { SignInRespone } from '~/types/auth.type';
import { saveToken } from '~/utils/auth';
//import { logout } from '../auth';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://elderconnectionwebapp.azurewebsites.net/',
  prepareHeaders: (headers, { getState }) => {
    const token = AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && (response.error as FetchBaseQueryError).status === 401) {
    // token expired
    const token = AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
    const refreshToken = AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
    const refreshResult = await baseQuery(
      {
        url: 'api/users/refresh-token',
        method: 'POST',
        body: { accessToken: token, refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { result } = refreshResult.data as ApiResponse<SignInRespone>;
      const { jwtToken } = result;
      saveToken(result);
      // retry original query with new access token
      response = await baseQuery(
        {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${jwtToken}`,
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

  return response;
};
