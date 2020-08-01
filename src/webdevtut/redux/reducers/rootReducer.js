import { combineReducers } from 'redux';
import page from './pageReducer';
import roadmap from './roadmapReducer';

export default combineReducers({page, roadmap});