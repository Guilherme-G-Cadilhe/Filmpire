
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../../services/TMDB';
import useStylesHook from './Movies-Information.styles';
import genreIcons from '../../../assets/genres';
import { removeSpecialChars } from '../../../helpers/helper';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory';

import { LangTexts } from './LangTexts';
import { MoviesList } from '../../Complementary/complementaryExports';

const MoviesInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: recommendationsError,
  } = useGetRecommendationsQuery({
    list: '/recommendations',
    movieId: id,
  });
  const classes = useStylesHook();
  console.log('Recommendations :>> ', recommendations);
  console.log('data :>> ', data);

  const isMovieFavorited = true;
  const isMovieWatchlisted = true;
  const currentLang = 'pt-BR'; // pt-BR  |  en

  const getMovieLang = () => {
    let primaryLanguage = data.spoken_languages.find((lang) => lang.iso_639_1 === currentLang);
    if (!primaryLanguage && currentLang === 'pt-BR') primaryLanguage = data.spoken_languages.find((lang) => lang.iso_639_1 === 'pt');
    if (primaryLanguage) return primaryLanguage.english_name;
    return data.spoken_languages.find((lang) => lang.iso_639_1 === 'en')?.english_name || '';
  };

  const addToFavorites = () => {

  };
  const addToWatchlist = () => {

  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> {LangTexts[currentLang || 'en']?.error}</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({(data.release_date.split('-')[0])})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{Number(data?.vote_average).toFixed(1)} / 10</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min / {data?.spoken_languages.length > 0 ? getMovieLang() : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => {
            const normalizedName = removeSpecialChars(genre.name).toLowerCase();
            return (
              <Link key={index} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                <img
                  src={genreIcons[normalizedName]}
                  className={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
              </Link>
            );
          })}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          {LangTexts[currentLang || 'en']?.overview}
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {LangTexts[currentLang || 'en']?.topCast}
        </Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((actor, i) => actor?.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.castImage}
                src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
                alt={actor?.name}
              />
              <Typography color="textPrimary">{actor?.name}</Typography>
              <Typography color="textSecondary">{actor?.character.split('/')[0]}</Typography>
            </Grid>
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button disabled={!data?.homepage} target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}>
                  {isMovieFavorited ? LangTexts[currentLang || 'en']?.unfavorite : LangTexts[currentLang || 'en']?.favorite}
                </Button>
                <Button onClick={addToFavorites} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">{LangTexts[currentLang || 'en']?.recommendations}</Typography>
        {recommendations ? <MoviesList movies={recommendations} numberOfMovies={12} /> : <Box>{LangTexts[currentLang || 'en']?.noRecommendations}</Box>}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.videos}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MoviesInformation;
