import { useDispatch, useSelector } from 'react-redux';
import { removeTransitionInEntity, removeTransitionOutEntity, transitionEntityIn, transitionEntityOut } from '../actions/uiActions';

export const useTransAnim = (key, duration, isTransitioningOut = false) => {
  const state = useSelector(state => {
    return {
      in: state.ui.entitiesTransitioningIn,
      out: state.ui.entitiesTransitioningOut
    };
  });
  const dispatch = useDispatch();

  if(!isTransitioningOut && state.in.indexOf(key) >= 0) {
    console.error(`Error in useTransAnim (in): ${key} already defined`);
  } else if(isTransitioningOut && state.out.indexOf(key) >= 0) {
    console.error(`Error in useTransAnim (out): ${key} already defined`);
  }

  dispatch(isTransitioningOut ? transitionEntityOut(key) : transitionEntityIn(key));
  setTimeout(isTransitioningOut ? () => removeTransitionOutEntity(key) : () => removeTransitionInEntity(key), duration);

  return state;
};