export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 13, 2, 44, 0, 0);
  s.setSeconds(s.getSeconds() + tick);
  return s;
};

export const formatTime = gt => {
  const s = gt.split(' ');
  const d = s[0] + 'day ';
  const t = s[4];
  if(t[0] == '0') {
    
  }
};