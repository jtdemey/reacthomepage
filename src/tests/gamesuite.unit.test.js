import { makeGameSuite } from '../gamesuite/gameSuite';

const mockDbConnection = () => {
  const mdb = {};
  mdb.model = (modelName, schema) => {
    return {
      modelName: modelName,
      schema: schema
    };
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