import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import SurviveApp from './components/SurviveApp';
import SurviveStore from './store/surviveStore';

render(
  <Provider store={SurviveStore}>
    <SurviveApp />
  </Provider>,
  document.getElementById('survive-root'));