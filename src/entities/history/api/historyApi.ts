import { baseApi } from 'shared/api/baseApi';
import type { SaveHistoryDto, HistoryItem } from '../model/types';

export const historyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    saveResult: build.mutation<void, SaveHistoryDto>({
      query: (body) => ({
        url: '/dictations/complete', 
        method: 'POST',
        body,
      }),
      invalidatesTags: ['History'], 
    }),

    getMyHistory: build.query<HistoryItem[], void>({
      query: () => ({ 
        url: '/dictations/history', 
        method: 'GET' 
      }),
      providesTags: ['History'],
    }),

  }),
});

export const { useSaveResultMutation, useGetMyHistoryQuery } = historyApi;