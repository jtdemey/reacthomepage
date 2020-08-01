import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from './redux/store';
import TutApp from './components/TutApp';
import { getClientSettings } from "./util/clientSettings";

//Render app
getClientSettings();
render(
<Provider store={store}>
  <TutApp />
</Provider>,
document.getElementById('app-root'));