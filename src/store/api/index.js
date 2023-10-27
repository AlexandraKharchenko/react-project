import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/API_CONFIG';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User', 'Messages'],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'users/',
    }),
    getUser: build.query({
      query: (userId) => `users/${userId}/`,
      providesTags: () => ([{ type: 'User', id: 'USER' }]),
    }),
    createMessage: build.mutation({
      query: ({ userId, comment, homeworkId }) => ({
        url: `users/${userId}/message/`,
        method: 'POST',
        body: {
          comment,
          homeworkId,
        },
      }),
      invalidatesTags: [{ type: 'Messages', id: 'MESSAGE' }],
    }),
    getMessages: build.query({
      query: (userId) => `users/${userId}/message/`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Posts', id })),
          { type: 'Messages', id: 'MESSAGE' },
        ]
        : [{ type: 'Messages', id: 'MESSAGE' }]),
    }),
    getArticles: build.query({
      query: () => 'articles/',

    }),
    getArticleCategory: build.query({
      query: () => 'categories/',
    }),
    createFavoriteArticle: build.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}/`,
        method: 'PUT',
        body: { favoriteArticles: data },
      }),
      invalidatesTags: [{ type: 'User', id: 'USER' }],
    }),
    getCourses: build.query({
      query: () => 'courses/',
    }),
    getLessons: build.query({
      query: (courseId) => `courses/${courseId}/lessons/`,
    }),
    getHomeworkItem: build.query({
      query: ({ courseId, lessonId, homeworkId }) => `courses/${courseId}/lessons/${lessonId}/homeworks/${homeworkId}`,
    }),
    getLessonItem: build.query({
      query: ({ courseId, lessonId }) => `courses/${courseId}/lessons/${lessonId}`,
    }),
    getMaterials: build.query({
      query: ({ courseId, lessonId }) => `courses/${courseId}/lessons/${lessonId}/additional-material`,
    }),
    getHomeworks: build.query({
      query: ({ courseId, lessonId }) => `courses/${courseId}/lessons/${lessonId}/homeworks`,
    }),
  }),
});

export const {
  useGetUsersQuery, useGetUserQuery, useGetMessagesQuery, useCreateMessageMutation, useGetArticlesQuery, useGetCoursesQuery, useGetLessonsQuery, useGetLessonItemQuery, useGetMaterialsQuery, useGetArticleCategoryQuery, useCreateFavoriteArticleMutation,
  useGetHomeworksQuery, useGetHomeworkItemQuery,
} = usersApi;
