import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import RootsApp from './components/RootsApp';
import RootsStore from './store/rootsStore';

render(
  <Provider store={RootsStore}>
    <RootsApp />
  </Provider>,
  document.getElementById('app-root'));