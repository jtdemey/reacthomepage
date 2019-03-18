
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { takeItemFromLocale } from './playerActions';
import {
	removeItemFromLocale
} from './mapActions';
import {
	addItemToList,
	removeItemFromList,
	updateItemView,
	transitionItemOut
} from './uiActions';

export function* pickUpItemSaga(action) {
	const transResult = yield put(transitionItemOut(action.btnIndex));
	yield delay(150);
	const removeResult = yield put(removeItemFromList(transResult.indexTransitioned));
	const takeItemResult = yield put(takeItemFromLocale(removeResult.removedItem.itemId));
	yield put(removeItemFromLocale(removeResult.removedItem.itemId));
	if(takeItemResult.hadItem === true) {
		yield put(updateItemView());
	} else {
		yield put(addItemToList(removeResult.removedItem, 'inventory'));
		yield delay(350);
		yield put(updateItemView());
	}
}