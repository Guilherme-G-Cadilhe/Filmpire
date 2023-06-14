import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// /movie/popular?api_key=apikey&language=pt-BR&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?language=pt-BR&api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]~
    getMovies: builder.query({
      query: () => `/movie/popular?language=pt-BR&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

// A Hook is automatically generated with the Endpoint name, from the builder.
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = tmdbApi;
