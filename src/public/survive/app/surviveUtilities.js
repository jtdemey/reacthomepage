export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + tick);
  return s.toString();
};

export const iterateTick = (time, tick) => {
  time.setSeconds(time.getSeconds() + (tick + 1));
};

export const formatTime = gt => {
  const s = gt.split(' ');
  const d = (s[0] === 'Sat') ? `${s[0]}urday ` : `${s[0]}day `;
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return d + t;
};