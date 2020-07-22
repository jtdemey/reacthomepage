import "regenerator-runtime/runtime";
import React from 'react';
import { render } from 'react-dom';
import TutApp from './components/TutApp';
import { getClientSettings } from "./util/clientSettings";

//Render app
getClientSettings();
render(<TutApp />, document.getElementById('app-root'));