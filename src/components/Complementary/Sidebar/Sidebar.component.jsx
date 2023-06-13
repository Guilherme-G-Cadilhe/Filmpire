import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useStylesHook from './Sidebar.styles.js';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const mainCategories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
const demoCategories = [
  { label: 'Animation', value: 'animation' },
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Horror', value: 'horror' },
  { label: 'Drama', value: 'drama' },
  { label: 'Comedy', value: 'comedy' },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStylesHook();

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
        <ListSubheader>Categories</ListSubheader>
        {mainCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem button onClick={() => (console.log('Clicou Link categoria'))}>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem button onClick={() => (console.log('Clicou Link categoria'))}>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
