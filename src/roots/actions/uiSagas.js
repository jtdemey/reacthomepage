import { delay, put, take } from 'redux-saga/effects';
import {
	executeGameCommand
} from './gameActions';
import { takeItemFromLocale } from './playerActions';
import {
	changeView,
	closeModals,
	elevateLines,
	populateItemInfoModal,
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

export function* showItemInfoModalSaga(action) {
	console.log(action);
	yield put(populateItemInfoModal(action.itemId));
	yield put(transitionEntityIn('modal', 100));
}

export function* submitCommandSaga(action) {
	console.log(action.command);
	yield put(executeGameCommand(action.command));
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