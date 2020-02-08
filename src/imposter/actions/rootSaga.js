import { takeEvery, takeLatest } from 'redux-saga/effects'; import {
  accusePlayerSaga,
  extendTimerSaga,
  gameTickSaga,
  hurryUpSaga,
  initGameSaga,
  returnToLobbySaga,
  submitHostGameFormSaga,
  submitJoinGameFormSaga
} from './gameSagas';
import {
  alertMessageSaga,
  changeGameViewSaga,
  changeViewValueSaga,
  fadeEntityInSaga,
  fadeEntityOutSaga
} from './uiSagas';
import {
  gameActionTypes,
  uiActionTypes
} from '../actions/actionConstants';

function* rootSaga() {
  yield takeLatest(gameActionTypes.ACCUSE_PLAYER, accusePlayerSaga);
  yield takeLatest(gameActionTypes.EXTEND_TIMER, extendTimerSaga);
  yield takeLatest(gameActionTypes.GAME_TICK, gameTickSaga);
  yield takeLatest(gameActionTypes.HURRY_UP, hurryUpSaga);
  yield takeLatest(gameActionTypes.INIT_GAME, initGameSaga);
  yield takeLatest(gameActionTypes.RETURN_TO_LOBBY, returnToLobbySaga);
  yield takeLatest(gameActionTypes.SUBMIT_HOST_GAME_FORM, submitHostGameFormSaga);
  yield takeLatest(gameActionTypes.SUBMIT_JOIN_GAME_FORM, submitJoinGameFormSaga);
  yield takeEvery(uiActionTypes.ALERT_MESSAGE, alertMessageSaga);
  yield takeEvery(uiActionTypes.CHANGE_VIEW_VALUE, changeViewValueSaga);
  yield takeEvery(uiActionTypes.CHANGE_GAME_VIEW, changeGameViewSaga);
  yield takeEvery(uiActionTypes.FADE_ENTITY_IN, fadeEntityInSaga);
  yield takeEvery(uiActionTypes.FADE_ENTITY_OUT, fadeEntityOutSaga);
} export default rootSaga;