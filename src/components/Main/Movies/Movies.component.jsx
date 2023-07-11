import React, { useContext, useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../../services/TMDB';
import { MoviesList, Pagination, FeaturedMovie } from '../../Complementary/complementaryExports';
import { LangTexts } from './LangTexts';
import { LanguageContext } from '../../../utils/ToggleLanguage';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { currentLang } = useContext(LanguageContext);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery, language: currentLang });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 17 : 19;

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
      <FeaturedMovie movie={data?.results[0]} />
      <MoviesList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
};

export default Movies;
