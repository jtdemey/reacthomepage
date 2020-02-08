import { delay, put } from 'redux-saga/effects';
import * as uiActions from './uiActions';

export function* alertMessageSaga(action) {
  yield delay(action.delay);
  yield put(uiActions.clearAlertMessage());
}

export function* changeGameViewSaga(action) {
  yield put(uiActions.fadeEntityOut(action.currView, 500));
  yield delay(500);
  yield put(uiActions.clearNotifications());
  yield put(uiActions.changeViewValue(action.destView));
  yield put(uiActions.fadeEntityIn(action.destView, 500));
}

export function* changeViewValueSaga(action) {
  yield put(uiActions.clearNotifications());
}

export function* fadeEntityInSaga(action) {
  yield delay(action.delay);
  yield put(uiActions.removeFadeInEntity(action.entityName));
}

export function* fadeEntityOutSaga(action) {
  yield delay(action.delay);
  yield put(uiActions.removeFadeOutEntity(action.entityName));
}