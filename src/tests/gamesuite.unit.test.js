import { makeGameSuite } from '../gamesuite/gameSuite';
import { rollScenario } from '../gamesuite/imposter';

describe('GameSuite unit tests', () => {

  let gs;

  beforeAll(() => {
    gs = makeGameSuite();
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

  test('makeGame sets expected values', () => {
    const game = gs.makeGame();
    expect(game.gameId).not.toBeNull();
    expect(game.gameTitle).toEqual('imposter');
    expect(game.host).toBeNull();
    expect(game.imposterId).toBeNull();
    expect(game.isPaused).toBe(false);
    expect(game.players).not.toBeNull();
    expect(game.phase).toBe('lobby');
    expect(game.remainingTime).not.toBeNull();
    expect(game.scenario).toBeNull();
    expect(game.condition).toBeNull();
    expect(game.roles).not.toBeNull();
    expect(game.tick).toBe(0);
    expect(game.votes).not.toBeNull();
  });

  test('applyScenario affects correct values', () => {
    const game = gs.makeGame();
    const player1 = gs.makePlayer({}, 'aaaaaaaaaaaaa');
    const player2 = gs.makePlayer({}, 'bbbbbbbbbbbbb');
    game.players = [player1, player2];
    const r = gs.applyScenario(game, rollScenario());
    expect(r.scenario).not.toBeNull();
    expect(r.condition).not.toBeNull();
    expect(r.roles.some(x => x.socketId === player1.socketId)).toEqual(true);
    expect(r.roles.some(x => x.socketId === player2.socketId)).toEqual(true);
  });

});