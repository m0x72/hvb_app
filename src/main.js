import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.scss';

import Root from './containers/Root.js';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('content')
);
