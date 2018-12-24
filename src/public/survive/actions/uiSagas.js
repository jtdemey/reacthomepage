import { delay } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import {
	changeView,
	elevateLines,
	transitionViewIn,
	transitionViewOut
} from './uiActions';

export function* addLineSaga(action) {
  yield delay(25);
  yield put(elevateLines());
}

export function* changeViewSaga(action) {
	yield delay(150);
	const changed = yield put(changeView(action.nextView));
	yield put(transitionViewIn(changed.view));
}