import {
  getTimeFromTick
} from '../app/surviveUtilities';

export const masterTick = (t) => {
  let nt = t + 1;
  return {
    type: 'MASTER_TICK',
    tick: nt,
    gameTime: getTimeFromTick(nt)
  };
};

export const changeView = (newView) => ({
  type: 'CHANGE_VIEW',
  view: newView
});