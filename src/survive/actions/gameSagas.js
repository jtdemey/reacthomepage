import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
	loadGameMap
} from './mapActions';
import {
	updateItemView,
	updateLocaleNameGrid,
	updateMapGridItems
} from './uiActions';

export function* masterTickSaga(action) {
	yield delay(1000);
}

export function* startGameSaga(action) {
	yield put(loadGameMap());
	yield put(updateLocaleNameGrid());
	yield put(updateItemView());
	yield put(updateMapGridItems());
}