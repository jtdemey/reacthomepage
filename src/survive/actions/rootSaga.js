import { takeEvery, put } from 'redux-saga/effects';
import {
  enterLocaleSaga,
  masterTickSaga,
  pickUpItemSaga,
  startGameSaga,
  takeExitSaga
} from './gameSagas';
import {
	addLineSaga,
	changeViewSaga,
  showItemInfoModalSaga,
  submitCommandSaga,
	transitionEntityInSaga,
	transitionEntityOutSaga
} from './uiSagas';

function* rootSaga() {
  //Game
  yield takeEvery('ENTER_LOCALE', enterLocaleSaga);
  yield takeEvery('MASTER_TICK', masterTickSaga);
  yield takeEvery('PICK_UP_ITEM', pickUpItemSaga);
  yield takeEvery('TAKE_EXIT', takeExitSaga);
  //UI
  yield takeEvery('APPEND_LINE', addLineSaga);
  yield takeEvery('SHOW_ITEM_INFO_MODAL', showItemInfoModalSaga);
  yield takeEvery('START_GAME', startGameSaga);
  yield takeEvery('SUBMIT_COMMAND', submitCommandSaga);
  yield takeEvery('TRANSITION_ENTITY_IN', transitionEntityInSaga);
  yield takeEvery('TRANSITION_ENTITY_OUT', transitionEntityOutSaga);
  yield takeEvery('TRANSITION_VIEW_OUT', changeViewSaga);
}

export default rootSaga;