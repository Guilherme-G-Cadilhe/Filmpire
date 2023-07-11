import { useEffect, useContext, useRef } from 'react';
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
  const dispatch = useDispatch();
  const history = useHistory();
  const alanAiBtnContainer = useRef({}).current;

  useEffect(() => {
    alanAiBtnContainer.btnInstance = alanBtn({
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

  useEffect(() => {
    const alanAiDOM = document.getElementsByClassName('alanBtn-root')?.[0];
    if (currentLang === 'en') {
      alanAiDOM.style.display = 'block';
    } else {
      alanAiDOM.style.display = 'none';
    }
  }, [currentLang]);
};

export default useAlanAI;
