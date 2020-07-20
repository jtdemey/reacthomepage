import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import TutApp from './components/TutApp';
import { getClientSettings } from "./util/clientSettings";

// const chapter = '1-1';

// const loadRoadmap = async id => {
//   return import(`./pages/content/${id}.js`);
// };
  //Render app
getClientSettings();
render(<TutApp />, document.getElementById('app-root'));