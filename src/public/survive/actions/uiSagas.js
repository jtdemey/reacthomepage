import { delay } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { takeItemFromLocale } from './playerActions';
import {
	changeView,
	closeModals,
	elevateLines,
	removeEntityTransitioningIn,
	removeEntityTransitioningOut,
	transitionEntityIn,
	transitionEntityOut,
	transitionViewIn,
	transitionViewOut
} from './uiActions';

export function* addLineSaga(action) {
  yield delay(25);
  yield put(elevateLines());
}

export function* changeViewSaga(action) {
	yield delay(100);
	const changed = yield put(changeView(action.nextView));
	yield put(transitionViewIn(changed.view));
}

export function* showModalSaga(action) {
	yield put(transitionEntityIn('modal', 100));
}

export function* transitionEntityInSaga(action) {
	yield delay(action.transitionDelay);
	yield put(removeEntityTransitioningIn(action.entityName));
}

export function* transitionEntityOutSaga(action) {
	yield delay(action.transitionDelay);
	yield put(removeEntityTransitioningOut(action.entityName));
	yield put(closeModals());
}