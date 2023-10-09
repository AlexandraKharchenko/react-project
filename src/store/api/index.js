import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/API_CONFIG';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'users/',
    }),
    getArticles: build.query({
      query: () => 'articles/',
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Posts', id })),
          { type: 'Articles', id: 'ARTICLE' },
        ]
        : [{ type: 'Articles', id: 'ARTICLE' }]),
    }),
    getArticleCategory: build.query({
      query: () => 'categories/',
    }),
    createFavoriteArticle: build.mutation({

      query: ({ id, favorite }) => ({
        url: `articles/${id}/`,
        method: 'PUT',
        body: {
          isFavorite: favorite,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'ARTICLE' }],
    }),
  }),
});

export const {
  useGetUsersQuery, useGetArticlesQuery, useGetArticleCategoryQuery, useCreateFavoriteArticleMutation,
} = usersApi;
