import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../../features/auth';
import { useGetUserListQuery } from '../../../services/TMDB';

import { LangTexts } from './LangTexts';
import { RatedCards } from '../../Complementary/complementaryExports';
import { LanguageContext } from '../../../utils/ToggleLanguage';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetUserListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUserListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { currentLang } = useContext(LanguageContext);

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>{LangTexts[currentLang || 'en']?.profile}</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5" gutterBottom>{LangTexts[currentLang || 'en']?.noMovies}</Typography>
        : (
          <Box>
            <RatedCards title={LangTexts[currentLang || 'en']?.favoriteMovies} data={favoriteMovies} errorMsg={LangTexts[currentLang || 'en']?.errorMsg} />
            <RatedCards title={LangTexts[currentLang || 'en']?.watchlistMovies} data={watchlistMovies} errorMsg={LangTexts[currentLang || 'en']?.errorMsg} />
          </Box>
        )}
    </Box>
  );
};

export default Profile;
