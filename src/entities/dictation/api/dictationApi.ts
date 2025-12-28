import { baseApi } from 'shared/api/baseApi';
import type { Word } from 'entities/word';

import type { 
  Dictation, 
  CreateDictationDto, 
  UpdateDictationDto 
} from '../model/types';

export const dictationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    getDictations: build.query<Dictation[], void>({
      query: () => ({ url: '/dictations', method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Dictation' as const, id })),
              { type: 'Dictation', id: 'LIST' },
            ]
          : [{ type: 'Dictation', id: 'LIST' }],
    }),
    getPublicDictations: build.query<Dictation[], void>({
      query: () => ({ 
        url: '/dictations/public',
        method: 'GET' 
      }),
      providesTags: [{ type: 'Dictation', id: 'LIST' }], 
    }),
    getDictationById: build.query<Dictation<Word>, number | string>({
      query: (id) => ({ url: `/dictations/${id}`, method: 'GET' }),
      providesTags: (_result, _error, id) => [{ type: 'Dictation', id }],
    }),

    createDictation: build.mutation<Dictation, CreateDictationDto>({
      query: (body) => ({
        url: '/dictations',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Dictation', id: 'LIST' }],
    }),

    updateDictation: build.mutation<Dictation, UpdateDictationDto>({
      query: ({ id, ...body }) => ({
        url: `/dictations/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Dictation', id },
        { type: 'Dictation', id: 'LIST' },
      ],
    }),

    deleteDictation: build.mutation<void, number>({
      query: (id) => ({ url: `/dictations/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Dictation', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDictationsQuery,
  useGetPublicDictationsQuery,
  useGetDictationByIdQuery,
  useCreateDictationMutation,
  useUpdateDictationMutation,
  useDeleteDictationMutation
} = dictationApi;