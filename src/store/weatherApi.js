import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.weatherapi.com/`,
  }),
  endpoints: (build) => ({
    getWeather: build.query({
      query: (cityName) =>
        `v1/current.json?key=6513546f07374d0fb24113839240201&q=${cityName}&aqi=no`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
