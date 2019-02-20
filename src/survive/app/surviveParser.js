export const parseInput = (raw) => {
  let rawsplit = raw.split(' ');
  switch(rawsplit.length) {
    case 0:
      return ['?'];
      break;
    case 1:
      switch(rawsplit[0]) {
        //Directional shortcuts
        case 'north': case 'n': case 'nort': case 'northward': case 'northwards':
          return ['GO', 0];
          break;
        case 'south': case 's': case 'sout': case 'southward': case 'southwards':
          return ['GO', 1];
          break;
          case 'east': case 'e': case 'eas': case 'eastward': case 'eastwards':
          return ['GO', 2];
          break;
        case 'west': case 'w': case 'wes': case 'westward': case 'westwards':
          return ['GO', 3];
          break;
        case 'northeast': case 'ne': case 'northeas': case 'northeastward': case 'northeastwards':
          return ['GO', 4];
          break;
        case 'northwest': case 'nw': case 'northwes': case 'northwestward': case 'northwestwards':
          return ['GO', 5];
          break;
        case 'southeast': case 'se': case 'southeas': case 'southeastward': case 'southeastwards':
          return ['GO', 6];
          break;
        case 'southwest': case 'sw': case 'southwes': case 'southwestward': case 'southwestwards':
          return ['GO', 7];
          break;
        case 'up': case 'u': case 'upward': case 'upwards': case 'ascend': case 'climb': case 'escalate': case 'rise':
          return ['GO', 8];
          break;
        case 'down': case 'd': case 'downward': case 'downwards': case 'descend': case 'lower': case 'fall':
          return ['GO', 9];
          break;
        case 'in': case 'inside': case 'enter': case 'goin':
          return ['GO', 10];
          break;
        case 'out': case 'outside': case 'leave': case 'exit': case 'evacuate': case 'escape': case 'getout': case 'ou':
          return ['GO', 11];
          break;
        default:
          return ['?'];
      }
      break;
    case 2:
      break;
    default:
      return ['?'];
      break;
  }
};