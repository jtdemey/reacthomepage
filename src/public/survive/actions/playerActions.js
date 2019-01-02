import surviveStore from '../store/surviveStore';

export const takeItemFromLocale = () => {
	const currentState = Object.assign({}, surviveStore.getState().player);
	
};