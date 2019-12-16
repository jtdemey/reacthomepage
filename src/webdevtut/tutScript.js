import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import TutApp from './components/TutApp';

const chapter = '1-1';

const loadRoadmap = async id => {
  return import(`./pages/content/${id}.js`);
};
loadRoadmap(chapter).then(r => {
  //Render app
  render(<TutApp scene={r.default} />, document.getElementById('app-root'));
}).catch(e => console.error(e));