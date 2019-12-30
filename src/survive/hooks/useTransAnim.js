import { useSelector } from 'react-redux';

export const useTransAnim = (key, duration, isTransitioningOut = false) => {
  const state = useSelector(state => {
    return {
      in: state.ui.entitiesTransitioningIn,
      out: state.ui.entitiesTransitioningOut
    };
  });
   
};