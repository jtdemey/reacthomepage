import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
	enterLocale
} from './gameActions';
import {
	loadGameMap
} from './mapActions';
import {
	updateItemView,
	updateLocaleNameGrid,
	updateMapGridItems
} from './uiActions';

export function* enterLocaleSaga(action) {
	
}

export function* masterTickSaga(action) {
	yield delay(1000);
}

export function* startGameSaga(action) {
	yield put(loadGameMap());						//1. Populate gameMap
	yield put(updateLocaleNameGrid());	//2. Update UI views
	yield put(updateItemView());
	yield put(updateMapGridItems());
	yield put(enterLocale('car'));			//Enter locale/begin game loop
}