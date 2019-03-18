import { takeEvery, put } from 'redux-saga/effects';
import {
    masterTickSaga
} from './gameSagas';
import { pickUpItemSaga } from './playerSagas';
import {
	addLineSaga,
	changeViewSaga,
	showModalSaga,
	transitionEntityInSaga,
	transitionEntityOutSaga
} from './uiSagas';

function* rootSaga() {
  yield takeEvery('APPEND_LINE', addLineSaga);
  yield takeEvery('MASTER_TICK', masterTickSaga);
  yield takeEvery('BEGIN_PICK_UP_ITEM', pickUpItemSaga);
  yield takeEvery('SHOW_ITEM_INFO_MODAL', showModalSaga);
  yield takeEvery('TRANSITION_ENTITY_IN', transitionEntityInSaga);
  yield takeEvery('TRANSITION_ENTITY_OUT', transitionEntityOutSaga);
  yield takeEvery('TRANSITION_VIEW_OUT', changeViewSaga);
}

export default rootSaga;