import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// /movie/popular?api_key=apikey&language=pt-BR&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: (language) => `/genre/movie/list?language=${language}&api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]~
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery, language }) => {
        //* Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&language=${language}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?language=${language}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&language=${language}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get Popular Movies
        return `/movie/popular?language=${language}&page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //* Get Movie~
    getMovie: builder.query({
      query: (({ id, language }) => `/movie/${id}?append_to_response=videos,credits&language=${language}&api_key=${tmdbApiKey}`),
    }),

    //* Get User Specific Lists~
    getUserList: builder.query({
      query: (({ listName, accountId, sessionId, page, language }) => `/account/${accountId}/${listName}?language=${language}&api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`),
    }),
    getRecommendations: builder.query({
      query: (({ movieId, list, language }) => `/movie/${movieId}/${list}?language=${language}&api_key=${tmdbApiKey}`),
    }),

    //* Get Actor Details~
    getCast: builder.query({
      query: (({ castId, language }) => `/person/${castId}?language=${language}&api_key=${tmdbApiKey}`),
    }),

    //* Get Actor Specific Movies Lists~
    getCastMovies: builder.query({
      query: (({ castId, page = 1, language }) => `/discover/movie?with_cast=${castId}&language=${language}&page=${page}&api_key=${tmdbApiKey}`),
    }),

  }),
});

// A Hook is automatically generated with the Endpoint name, from the builder.
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetCastMoviesQuery,
  useGetCastQuery,
  useGetUserListQuery,
} = tmdbApi;
