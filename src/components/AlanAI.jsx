import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

import { fetchToken } from '../utils';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { LanguageContext } from '../utils/ToggleLanguage';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';

const useAlanAI = () => {
  const { setMode } = useContext(ColorModeContext);
  const { currentLang } = useContext(LanguageContext);
  console.log('currentLang :>> ', currentLang);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_SDK_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
          if (foundGenre) {
            history.push('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            history.push('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          history.push('/');
        } else if (command === 'search') {
          history.push('/');
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlanAI;
