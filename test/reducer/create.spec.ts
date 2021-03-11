import { setupReducer } from '../../src';

describe('the "create" method of setupReducer', () => {
  const INITIAL_STATE = {};
  const reducer = setupReducer(INITIAL_STATE).create();

  it('should return function', () => {
    expect(typeof reducer).toEqual('function');
  });

  it('should return initialState if state is undefined', () => {
    const action = { type: 'MOCKED_ACTION' };
    expect(reducer(undefined, action)).toBe(INITIAL_STATE);
  });

  it('should return state if action is unknown', () => {
    const action = { type: 'MOCKED_ACTION' };
    const state = {};
    expect(reducer(state, action)).toBe(state);
  });
});
