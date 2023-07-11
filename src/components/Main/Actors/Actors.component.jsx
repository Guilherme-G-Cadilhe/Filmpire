import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material';

import useStylesHook from './Actors.styles';
import { LangTexts } from './LangTexts';
import { useGetCastMoviesQuery, useGetCastQuery } from '../../../services/TMDB';
import { MoviesList, Pagination } from '../../Complementary/complementaryExports';
import { getLocalizedBirthday } from '../../../helpers/helper';
import { LanguageContext } from '../../../utils/ToggleLanguage';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const history = useHistory();
  const classes = useStylesHook();
  const { currentLang } = useContext(LanguageContext);
  const { data, isFetching, error } = useGetCastQuery({ castId: id, language: currentLang });
  const {
    data: actorMovies,
  } = useGetCastMoviesQuery({ castId: id, page, language: currentLang });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" style={{ flexDirection: 'column' }}>
        <Typography>{LangTexts[currentLang || 'en']?.errorMessage}</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>{LangTexts[currentLang || 'en']?.errorAction}</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {LangTexts[currentLang || 'en']?.born} {data?.birthday ? getLocalizedBirthday(data?.birthday, currentLang) : ''}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || LangTexts[currentLang || 'en']?.noBiography}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`} endIcon={<MovieIcon />}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} color="primary" onClick={() => history.goBack()}>
              Back
            </Button>
          </Box>
        </Grid>
        <Box margin="2rem 0">
          <Typography variant="h2" gutterBottom align="center">{LangTexts[currentLang || 'en']?.actorMovies}</Typography>
          {actorMovies ? <MoviesList movies={actorMovies} numberOfMovies={8} /> : <Box>{LangTexts[currentLang || 'en']?.noActorMovies}</Box>}
        </Box>
        <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages} />
      </Grid>
    </>
  );
};

export default Actors;
