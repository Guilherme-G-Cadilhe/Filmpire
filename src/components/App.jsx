import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

// Main Components
import { Actors, MoviesInformation, Movies, Profile, NavBar } from './Main/mainExport.js';
// Style
import useStylesHook from './makeStyles.js';
// AI
import useAlanAI from './AlanAI';

const App = () => {
  const classes = useStylesHook();
  useAlanAI();
  const alanAiBtnContainer = useRef();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={['/', '/approved']}>
            <Movies />
          </Route>
          <Route exact path="/movie/:id">
            <MoviesInformation />
          </Route>
          <Route exact path="/actors/:id">
            <Actors />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanAiBtnContainer} />
    </div>
  );
};

export default App;
