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

export function* castVoteSaga(action) {
  yield put(gameActions.emitSocketMsg({
    command: 'castVote',
    ...action
  }));
}

export function* extendTimerSaga(action) {
  if(action.extendTimerCt < 3) {
    yield put(gameActions.emitSocketMsg({ 
      command: 'extendTimer',
      gameId: action.gameId,
      socketId: action.socketId
    }));
  }
  if(action.extendTimerCt === 3) {
    yield put(uiActions.appendNotification(`Yer killin me, Smalls.`));
  }
}

export function* gameTickSaga(action) {
  yield put(gameActions.syncGameState(action.gameState));
  //Scenario
  if(action.deltas.scenario) {
    yield put(gameActions.assignScenario({
      imposterId: action.gameState.imposterId,
      scenario: action.gameState.scenario,
      scenarioList: action.gameState.scenarioList,
      condition: action.gameState.condition,
      roles: action.gameState.roles
    }));
  }
  //Phase change
  if(action.deltas.phase) {
    yield put(gameActions.clearTempPhaseData());
    const currPhaseView = getViewIdFromName(action.currentPhase);
    const destPhaseView = getViewIdFromName(action.gameState.phase);
    yield put(uiActions.fadeEntityOut(currPhaseView, 400));
    yield delay(400);
    yield put(uiActions.changeViewValue(destPhaseView));
    yield put(uiActions.fadeEntityIn(destPhaseView, 400));
  }
  //Players
  if(action.deltas.players) {
    yield put(gameActions.updatePlayers(action.gameState.players));
  }
}

export function* hurryUpSaga(action) {
  if(action.hurryUpCt < 6) {
    yield put(gameActions.emitSocketMsg({
      command: 'hurryUp',
      gameId: action.gameId,
      socketId: action.socketId
    }));
  }
  if(action.hurryUpCt === 6) {
    yield put(uiActions.appendNotification(`Slow your rolls, cowboy.`));
  }
}

export function* initGameSaga(action) {
  yield put(gameActions.syncGameState(action.gameState));
  const phaseView = getViewIdFromName(action.gameState.phase);
  yield delay(1000);
  yield put(uiActions.fadeEntityOut(viewConstants.LOADING));
  yield delay(500);
  yield put(uiActions.changeViewValue(phaseView));
  yield put(gameActions.updatePlayers(action.gameState.players));
  yield put(uiActions.fadeEntityIn(phaseView));
}

export function* readyUpSaga(action) {
  yield put(gameActions.emitSocketMsg({
    command: 'toggleReadyState',
    ...action
  }));
}

export function* returnToLobbySaga(action) {
  yield put(gameActions.emitSocketMsg({
    command: 'returnToLobby',
    ...action
  }));
}

export function* submitHostGameFormSaga(action) {
  yield put(uiActions.fadeEntityOut(viewConstants.HOST_GAME_FORM));
  yield delay(500);
  yield put(uiActions.changeViewValue(viewConstants.LOADING));
  yield put(uiActions.fadeEntityIn(viewConstants.LOADING));
  yield put(gameActions.emitSocketMsg({
    command: 'submitHostGame',
    hostName: action.hostName,
    socketId: action.socketId
  }));
}

export function* submitJoinGameFormSaga(action) {
  yield put(uiActions.fadeEntityOut(viewConstants.JOIN_GAME_FORM));
  yield delay(500);
  yield put(uiActions.changeViewValue(viewConstants.LOADING));
  yield put(uiActions.fadeEntityIn(viewConstants.LOADING));
  yield put(gameActions.emitSocketMsg({
    command: 'submitJoinGame',
    playerName: action.playerName,
    gameId: action.gameId,
    socketId: action.socketId
  }));
}