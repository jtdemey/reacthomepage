import {
  cardinalConstants
} from './surviveConstants';
import {
  isStringSimilar
} from './surviveUtilities';

export const parseInput = raw => {
  let rawsplit = raw.split(' ');
  switch(rawsplit.length) {
    case 0:
      return ['?'];
    case 1:
        //Directional shortcuts
        const dirCheck = getGoCommandFromDirection(rawsplit[0]);
        console.log(dirCheck);
        if(dirCheck) {
          return dirCheck;
        }
        //dirCheck ? console.log('issa dir') : console.log('naw');
        //if(dirCheck)
        return ['?'];
    case 2:
      switch(rawsplit[0]) {
        case 'go': case 'travel': case 'walk': case 'run': case 'move':
          const dirCheck = getGoCommandFromDirection(rawsplit[1]);
          if(dirCheck) {
            return dirCheck;
          } else {
            return ['ERROR', 'Invalid direction'];
          }
      }
    default:
      return ['?'];
  }
};

const getGoCommandFromDirection = dir => {
  switch(dir) {
    case 'north': case 'n': case 'nort': case 'northward': case 'northwards':
      return ['GO', cardinalConstants.NORTH];
    case 'south': case 's': case 'sout': case 'southward': case 'southwards':
      return ['GO', cardinalConstants.SOUTH];
    case 'east': case 'e': case 'eas': case 'eastward': case 'eastwards':
      return ['GO', cardinalConstants.EAST];
    case 'west': case 'w': case 'wes': case 'westward': case 'westwards':
      return ['GO', cardinalConstants.WEST];
    case 'northeast': case 'ne': case 'northeas': case 'northeastward': case 'northeastwards':
      return ['GO', cardinalConstants.NORTHEAST];
    case 'northwest': case 'nw': case 'northwes': case 'northwestward': case 'northwestwards':
      return ['GO', cardinalConstants.NORTHWEST];
    case 'southeast': case 'se': case 'southeas': case 'southeastward': case 'southeastwards':
      return ['GO', cardinalConstants.SOUTHEAST];
    case 'southwest': case 'sw': case 'southwes': case 'southwestward': case 'southwestwards':
      return ['GO', cardinalConstants.SOUTHWEST];
    case 'up': case 'u': case 'upward': case 'upwards': case 'ascend': case 'climb': case 'escalate': case 'rise':
      return ['GO', cardinalConstants.UP];
    case 'down': case 'd': case 'downward': case 'downwards': case 'descend': case 'lower': case 'fall':
      return ['GO', cardinalConstants.DOWN];
    case 'in': case 'inside': case 'enter': case 'goin':
      return ['GO', cardinalConstants.INSIDE];
    case 'out': case 'outside': case 'leave': case 'exit': case 'evacuate': case 'escape': case 'getout': case 'ou':
      return ['GO', cardinalConstants.OUTSIDE];
    default:
      return false;
  }
};