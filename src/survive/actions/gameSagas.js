import { delay, put } from 'redux-saga/effects';
import {
	enterLocale
} from './gameActions';
import {
	loadGameMap,
	removeItemFromLocale,
	visitLocale
} from './mapActions';
import {
	addItemToInventory,
	takeItemFromLocale,
	updatePlayerLocale
} from './playerActions';
import {
	addItemToList,
	appendLine,
	removeItemFromList,
	updateItemView,
	updateLocaleNameGrid,
	updateMapGridItems,
	transitionItemOut,
	transitionItemIn
} from './uiActions';

export function* enterLocaleSaga(action) {
	yield put(updatePlayerLocale(action.destination));
	const dest = yield put(visitLocale(action.destination.name));
	yield put(appendLine(dest.locale.enterPhrase));
}

export function* masterTickSaga(action) {
	yield delay(1000);
}

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
		yield put(addItemToInventory(removeResult.removedItem));
		yield delay(350);
		yield put(updateItemView());
	}
}

export function* startGameSaga(action) {
	yield put(loadGameMap());						//1. Populate gameMap
	yield put(updateLocaleNameGrid());	//2. Update UI views
	yield put(updateItemView());
	yield put(updateMapGridItems());
	yield put(enterLocale('car'));			//Enter locale/begin game loop
}

export function* takeExitSaga(action) {
	console.log(action);
	yield put(appendLine(action.exitPhrase));
}