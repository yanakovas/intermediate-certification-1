import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postWeatherApi = createApi({
  reducerPath: 'postWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9500/',
  }),
  endpoints: (build) => ({
    postWeatherInfo: build.mutation({
      query: (body) => ({
        url: '/weather',
        method: 'POST',
        body,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With',
        },
      }),
    }),
  }),
});

export const { usePostWeatherInfoMutation } = postWeatherApi;
