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

export const submitCommand = (txt) => {
  let res = txt.replace(/<{1}[^<>]{1,}>{1}/g, " ");
  return {
    type: 'SUBMIT_COMMAND',
    input: res
  }
};