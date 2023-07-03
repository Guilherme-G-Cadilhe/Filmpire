
// COLOCAR TRADUÇÃO EM PORTUGUES E INGLES DINAMICA

import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../../services/TMDB';
import { MoviesList, Pagination } from '../../Complementary/complementaryExports';
import { LangTexts } from './LangTexts';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 16 : 18;

  const currentLang = 'pt-BR'; // pt-BR  |    en

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) return LangTexts[currentLang || 'en']?.error;

  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          {LangTexts[currentLang || 'en']?.notFoundTop}
          <br />
          {LangTexts[currentLang || 'en']?.notFoundBottom}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <MoviesList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
};

export default Movies;
