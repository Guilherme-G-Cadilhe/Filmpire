import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, ListItemButton } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useGetGenresQuery } from '../../../services/TMDB.js';
import useStylesHook from './Sidebar.styles.js';
import genreIcons from '../../../assets/genres';
import { removeSpecialChars } from '../../../helpers/helper.js';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory.js';

import { LangTexts } from './LangTexts';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching } = useGetGenresQuery();
  const theme = useTheme();
  const classes = useStylesHook();
  const dispatch = useDispatch();

  const currentLang = 'pt-BR'; // pt-BR  |    en

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
                  className={classes.genreImages}
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
                    className={classes.genreImages}
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
