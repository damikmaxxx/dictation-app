import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const BASE_URL = '/api';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { 
            url: '/auth/refresh', 
            method: 'POST',
            headers: { Authorization: '' } 
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken } = refreshResult.data as { accessToken: string };


          localStorage.setItem('accessToken', accessToken);
          

          api.dispatch({ type: 'user/setToken', payload: accessToken });

          result = await baseQuery(args, api, extraOptions);
        } else {

          localStorage.removeItem('accessToken');
          api.dispatch(baseApi.util.resetApiState());
          api.dispatch({ type: 'user/logout' });
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Dictation', 'History'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});