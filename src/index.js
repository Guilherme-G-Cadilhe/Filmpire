import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ToggleColorModeProvider from './utils/ToggleColorMode';

import './index.css';

import App from './components/App';
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>,

  document.getElementById('root'),
);

