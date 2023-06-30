
// COLOCAR TRADUÇÃO EM PORTUGUES E INGLES DINAMICA

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../../services/TMDB';
import { MoviesList } from '../../Complementary/complementaryExports';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory';
import { LangTexts } from './LangTexts';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

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
      <MoviesList movies={data} />
    </div>
  );
};

export default Movies;
