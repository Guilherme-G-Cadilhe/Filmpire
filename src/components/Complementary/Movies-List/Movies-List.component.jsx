import React from 'react';
import { Grid } from '@mui/material';

import useStylesHook from './Movies-List.styles';
import Movie from '../Movie/Movie.component.jsx';

const MoviesList = ({ movies, numberOfMovies }) => {
  const classes = useStylesHook();
  return (
    // Grid container to encapsulate Grid Items inside
    <Grid container className={classes.moviesContainer}>
      {movies && movies.results.slice(0, numberOfMovies || movies.results.length).map((movie, index) => (<Movie key={index} movie={movie} index={index} />))}
    </Grid>
  );
};

export default MoviesList;
