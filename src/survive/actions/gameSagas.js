import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
	loadGameMap
} from './mapActions';

export function* masterTickSaga(action) {
	yield delay(1000);
}

export function* startGameSaga(action) {
	yield put(loadGameMap());
}