import { takeEvery, put } from 'redux-saga/effects';
import {
  enterLocaleSaga,
  masterTickSaga,
  startGameSaga
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
  //Game
  yield takeEvery('ENTER_LOCALE', enterLocaleSaga);
  yield takeEvery('MASTER_TICK', masterTickSaga);
  //Player
  yield takeEvery('BEGIN_PICK_UP_ITEM', pickUpItemSaga);
  //UI
  yield takeEvery('APPEND_LINE', addLineSaga);
  yield takeEvery('SHOW_ITEM_INFO_MODAL', showModalSaga);
  yield takeEvery('START_GAME', startGameSaga);
  yield takeEvery('TRANSITION_ENTITY_IN', transitionEntityInSaga);
  yield takeEvery('TRANSITION_ENTITY_OUT', transitionEntityOutSaga);
  yield takeEvery('TRANSITION_VIEW_OUT', changeViewSaga);
}

export default rootSaga;