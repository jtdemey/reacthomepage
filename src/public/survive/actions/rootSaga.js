import { takeEvery, put } from 'redux-saga/effects';
import {
	addLineSaga,
	changeViewSaga
} from './uiSagas';

function* rootSaga() {
  yield takeEvery('APPEND_LINE', addLineSaga);
  yield takeEvery('TRANSITION_VIEW_OUT', changeViewSaga);
}

export default rootSaga;