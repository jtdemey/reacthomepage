import { takeEvery, put } from 'redux-saga/effects';
import { pickUpItemSaga } from './comboSagas';
import {
	addLineSaga,
	changeViewSaga
} from './uiSagas';

function* rootSaga() {
  yield takeEvery('APPEND_LINE', addLineSaga);
  yield takeEvery('TRANSITION_VIEW_OUT', changeViewSaga);
  yield takeEvery('PICK_UP_ITEM', pickUpItemSaga);
}

export default rootSaga;