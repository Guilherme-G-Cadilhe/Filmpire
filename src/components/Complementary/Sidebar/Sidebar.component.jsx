import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useGetGenresQuery } from '../../../services/TMDB.js';
import useStylesHook from './Sidebar.styles.js';
import genreIcons from '../../../assets/genres';
import { removeSpecialChars } from '../../../helpers/helper.js';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory.js';

import { LangTexts } from './LangTexts';
import { LanguageContext } from '../../../utils/ToggleLanguage.jsx';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const { currentLang } = useContext(LanguageContext);
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching } = useGetGenresQuery(currentLang);
  const theme = useTheme();
  const classes = useStylesHook();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>{LangTexts[currentLang || 'en'].categories}</ListSubheader>
        {LangTexts[currentLang || 'en'].mainCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem button onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img
                  src={genreIcons[value.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>{LangTexts[currentLang || 'en'].genres}</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data?.genres && data.genres.map(({ name, id }) => {
          const normalizedName = removeSpecialChars(name).toLowerCase();
          return (
            <Link key={name} className={classes.links} to="/">
              <ListItem button onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genreIcons[normalizedName]}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default Sidebar;
