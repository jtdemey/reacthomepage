import surviveStore from '../store/surviveStore';

//Core activeSagas interactions
export const addActiveSaga = sagaName => {
	const currentSagas = Object.assign([], surviveStore.getState().game.activeSagas);
	if(currentSagas.includes(sagaName)) {
    console.log(`Error in action beginSaga: '${sagaName}' is currently ongoing`);
    return;
	}
	currentSagas.push(sagaName);
	return currentSagas;
};

export const removeActiveSaga = sagaName => {
	const currentSagas = Object.assign([], surviveStore.getState().game.activeSagas);
	if(!currentSagas.includes(sagaName)) {
    console.log(`Error in action stopSaga: '${sagaName}' is not currently occurring`);
    return;
	}
	currentSagas = currentSagas.filter((value, index, arr) => {
		return value !== sagaName;
	});
	return currentSagas;
};

//Wrappers
export const beginPickUpItem = () => {
	const activeSagas = addActiveSaga('PICK_UP_ITEM');
	return {
		type: 'BEGIN_PICK_UP_ITEM',
		activeSagas: activeSagas
	};
};

export const stopPickUpItem = () => {
	const activeSagas = removeActiveSaga('PICK_UP_ITEM');
	return {
		type: 'STOP_PICK_UP_ITEM',
		activeSagas: activeSagas
	};
};