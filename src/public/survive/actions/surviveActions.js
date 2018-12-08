
import surviveStore from '../store/surviveStore';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

//GAME
export const masterTick = (t) => {
  let nt = t + 1;
  return {
    type: 'MASTER_TICK',
    tick: nt,
    gameTime: getTimeFromTick(nt)
  };
};

//UI
export const appendLine = (line) => {
  const currentState = surviveStore.getState().ui;
  const lineId = currentState.consoleLines.length + 1;
  const ypos = currentState.consoleYpos - 28;
  const newLine = {
    id: lineId,
    text: line,
    color: 'white'
  };
  return {
    type: 'APPEND_LINE',
    line: newLine,
    ypos: ypos
  };
};

export const changeView = (newView) => ({
  type: 'CHANGE_VIEW',
  view: newView
});

export const focusCommandBar = () => ({
  type: 'FOCUS_COMMAND_BAR'
});

export const submitCommand = (txt) => {
  let res = txt.replace(/&/g, '').replace(/</g, '').replace(/"/g, '');
  surviveStore.dispatch(appendLine('test'));
  return {
    type: 'SUBMIT_COMMAND',
    input: res
  };
};