import { makeGameSuite } from '../gamesuite/gameSuite';

const mockDbConnection = () => {
  const mdb = {};
  mdb.collection = collName => {
    if(collName === 'games') {
      return [{
        gameId: 'GAME',
        gameTitle: 'imposter',
        host: null,
        isPaused: false,
        players: [],
        phase: 'lobby',
        remainingTime: 10,
        scenario: null,
        condition: null,
        tick: 0,
        votes: []
      }];
    } else if(collName === 'players') {
      return [{
        extendTimerCt: 0,
        gameId: null,
        hurryUpCt: 0,
        isPlaying: false,
        name: null,
        socket: null,
        socketId: 'heywhaddupheresmyid' 
      }];
    }
  };
  return mdb;
};

describe('GameSuite unit tests', () => {

  let gs;

  beforeAll(() => {
    gs = makeGameSuite(mockDbConnection());
  });

  test('makeCommand sets expected values', () => {
    const command = JSON.parse(gs.makeCommand('testCommand'));
    const commandWithParams = JSON.parse(gs.makeCommand('realCommand', {
      arg: 'val'
    }));
    expect(command.command).toBe('testCommand');
    expect(commandWithParams.command).toBe('realCommand');
    expect(commandWithParams.arg).toBe('val');
  });

});