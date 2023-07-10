
import React from 'react';
import { Typography, Box } from '@mui/material';

import useStylesHook from './Rated-Cards.styles';
import Movie from '../Movie/Movie.component.jsx';

const RatedCards = ({ title, data, errorMsg }) => {
  const classes = useStylesHook();

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center"> {title}</Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results?.length
          ? data?.results?.map((movie, index) => <Movie key={index} movie={movie} index={index} />)
          : <Typography variant="h6" gutterBottom>{errorMsg}</Typography>}

      </Box>
    </Box>
  );
};

export default RatedCards;
