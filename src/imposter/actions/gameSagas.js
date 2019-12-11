import { delay, put } from 'redux-saga/effects';
import * as gameActions from './gameActions';
import * as uiActions from './uiActions';
import {
  viewConstants
} from '../app/imposterConstants';
import { getViewIdFromName } from '../app/imposterUtilities';

export function* accusePlayerSaga(action) {
  yield put(gameActions.emitSocketMsg({
    command: 'accusePlayer',
    ...action
  }));
}

export function* extendTimerSaga(action) {
  if(action.extendTimerCt < 3) {
    yield put(gameActions.emitSocketMsg({ 
      command: 'extendTimer',
      gameId: action.gameId
    }));
  }
  if(action.extendTimerCt === 3) {
    yield put(uiActions.appendNotification(`Yer killin me, Smalls.`));
  }
}

export function* gameTickSaga(action) {
  yield put(gameActions.syncGameState(action.gameState));
  if(action.deltas.phase === true) {
    const currPhaseView = getViewIdFromName(action.currentPhase);
    const destPhaseView = getViewIdFromName(action.gameState.phase);
    yield put(uiActions.fadeEntityOut(currPhaseView));
    yield delay(100);
    yield put(uiActions.removeFadeOutEntity(currPhaseView));
    yield put(uiActions.changeViewValue(destPhaseView));
    yield put(uiActions.fadeEntityIn(destPhaseView));
    yield delay(200);
    yield put(uiActions.removeFadeInEntity(destPhaseView));
  }
  if(action.deltas.players === true) {
    yield put(gameActions.updatePlayers(action.gameState.players));
  }
}

export function* hurryUpSaga(action) {
  if(action.hurryUpCt < 6) {
    yield put(gameActions.emitSocketMsg({
      command: 'hurryUp',
      gameId: action.gameId
    }));
  }
  if(action.hurryUpCt === 6) {
    yield put(uiActions.appendNotification(`Slow your rolls, cowboy.`));
  }
}

export function* initGameSaga(action) {
  yield put(gameActions.syncGameState(action.gameState));
  console.log(action.gameState);
  const phaseView = getViewIdFromName(action.gameState.phase);
  yield delay(1000);
  yield put(uiActions.fadeEntityOut(viewConstants.LOADING));
  yield delay(100);
  yield put(uiActions.removeFadeOutEntity(viewConstants.LOADING));
  yield put(uiActions.changeViewValue(phaseView));
  yield put(gameActions.updatePlayers(action.gameState.players));
  yield put(uiActions.fadeEntityIn(phaseView));
  yield delay(200);
  yield put(uiActions.removeFadeInEntity(phaseView));
}

export function* submitHostGameFormSaga(action) {
  yield put(uiActions.fadeEntityOut(viewConstants.HOST_GAME_FORM));
  yield delay(100);
  yield put(uiActions.removeFadeOutEntity(viewConstants.HOST_GAME_FORM));
  yield put(uiActions.changeViewValue(viewConstants.LOADING));
  yield put(uiActions.fadeEntityIn(viewConstants.LOADING));
  yield delay(200);
  yield put(uiActions.removeFadeInEntity(viewConstants.LOADING));
  yield put(gameActions.emitSocketMsg({
    command: 'submitHostGame',
    hostName: action.hostName,
    socketId: action.socketId
  }));
}

export function* submitJoinGameFormSaga(action) {
  yield put(uiActions.fadeEntityOut(viewConstants.JOIN_GAME_FORM));
  yield delay(100);
  yield put(uiActions.removeFadeOutEntity(viewConstants.JOIN_GAME_FORM));
  yield put(uiActions.changeViewValue(viewConstants.LOADING));
  yield put(uiActions.fadeEntityIn(viewConstants.LOADING));
  yield delay(200);
  yield put(uiActions.removeFadeInEntity(viewConstants.LOADING));
  yield put(gameActions.emitSocketMsg({
    command: 'submitJoinGame',
    playerName: action.playerName,
    gameId: action.gameId,
    socketId: action.socketId
  }));
}