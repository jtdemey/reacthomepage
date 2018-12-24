import surviveStore from '../store/surviveStore';

export const elevateLines = () => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const newLines = Object.assign([], currentState.consoleLines);
  if(newLines[0].ypos > currentState.consoleYpos + currentState.viewHeight) {
    newLines.shift();
  }
  if(newLines.length > 0) {
    for(let i = 0; i < newLines.length; i++) {
      let thisLine = newLines[i];
      thisLine.ypos += 28;
      thisLine.opacity -= 0.02;
    }
  }
  return {
    type: 'ELEVATE_LINES',
    lines: newLines
  };
};

export const appendLine = (line) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const lineInd = currentState.lineIndex + 1;
  const newLines = Object.assign([], currentState.consoleLines);
  const lineId = lineInd;
  const ypos = currentState.consoleYpos;
  const newLine = {
    id: lineId,
    text: line,
    color: 'white',
    ypos: ypos,
    opacity: 1
  };
  newLines.push(newLine);
  return {
    type: 'APPEND_LINE',
    lines: newLines,
    lineIndex: lineInd
  };
};

export const changeView = (newView) => ({
  type: 'CHANGE_VIEW',
  currentView: newView
});

export const focusCommandBar = () => ({
  type: 'FOCUS_COMMAND_BAR'
});

export const setViewHeight = (amt) => {
  return {
    type: 'SET_VIEW_HEIGHT',
    amount: amt
  };
};

export const submitCommand = (txt) => {
  let res = txt.replace(/&/g, '').replace(/</g, '').replace(/"/g, '');
  surviveStore.dispatch(appendLine(Math.random() * 1000 + 'ayyyy'));
  return {
    type: 'SUBMIT_COMMAND',
    input: res
  };
};

export const transitionViewIn = (viewnum) => {
  return {
    type: 'TRANSITION_VIEW_IN',
    view: viewnum
  };
};

export const transitionViewOut = (nextview) => {
  return {
    type: 'TRANSITION_VIEW_OUT',
    nextView: nextview
  };
};