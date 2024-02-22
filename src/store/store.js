import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import { postWeatherApi } from './postWeatherApi';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [postWeatherApi.reducerPath]: postWeatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(postWeatherApi.middleware),
});
