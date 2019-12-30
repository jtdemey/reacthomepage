import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from '../auxiliary/ModalContainer';
import ViewParticles from './ViewParticles';
import ConsoleView from './ConsoleView';
import MapView from './MapView';
import ItemView from './ItemView';
import InfoView from './InfoView';
import { setClientDimensions } from '../../actions/uiActions';

const getDims = () => {
  let w = window.innerWidth > 800 ? 800 : window.innerWidth;
  let h = window.innerHeight - 120;
  return [w, h];
};

const GameView = () => {
  const viewState = useSelector(state => {
    return {
      clientWidth: state.ui.clientWidth,
      clientHeight: state.ui.clientHeight,
      currentView: state.ui.currentView,
      viewTransitioningIn: state.ui.viewTransitioningIn,
      viewTransitioningOut: state.ui.viewTransitioningOut
    };
  });

  const dispatch = useDispatch();
  const setDims = (x, y) => dispatch(setClientDimensions(x, y));
  useEffect(() => {
    const [x, y] = getDims();
    setDims(x, y);
    window.addEventListener('resize', setDims(x, y));
    return () => {
      window.removeEventListener('resize', setDims(x, y));
    };
  }, []);

  return (
    <div className="game-view" style={{ height: viewState.viewHeight + 'px' }}>
      <ModalContainer />
      <ViewParticles mode="0" look="view-particles" clientWidth={viewState.clientWidth} clientHeight={viewState.clientHeight} />
      <ConsoleView  isCurrentView={viewState.currentView === 0 ? true : false}
                    isTransitioningOut={viewState.viewTransitioningOut === 0 ? true : false} />
      <ItemView isCurrentView={viewState.currentView === 1 ? true : false}
                isTransitioningOut={viewState.viewTransitioningOut === 1 ? true : false} />
      <MapView isCurrentView={viewState.currentView === 2 ? true : false}
                isTransitioningOut={viewState.viewTransitioningOut === 2 ? true : false} />
      <InfoView isCurrentView={viewState.currentView === 3 ? true : false}
                isTransitioningOut={viewState.viewTransitioningOut === 3 ? true : false} />
    </div>
  );
};

export default GameView;