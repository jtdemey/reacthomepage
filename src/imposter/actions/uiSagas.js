import { delay, put, take } from 'redux-saga/effects';
import * as uiActions from './uiActions';

export function* changeGameViewSaga(action) {
  yield put(uiActions.fadeEntityOut(action.currView));
  yield delay(100);
  yield put(uiActions.removeFadeOutEntity(action.currView));
  yield put(uiActions.clearNotifications());
  yield put(uiActions.changeViewValue(action.destView));
  yield put(uiActions.fadeEntityIn(action.destView));
  yield delay(200);
  yield put(uiActions.removeFadeInEntity(action.destView));
}

export function* changeViewValueSaga(action) {
  yield put(uiActions.clearNotifications());
}