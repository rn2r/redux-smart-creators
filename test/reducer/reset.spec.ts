import { getCreator, setupReducer } from '../../src';
import { MOCKED_TYPE } from '../mocks';

describe('the "reset" method of setupReducer', () => {
  const INITIAL_STATE = {};
  const reducerCreator = setupReducer(INITIAL_STATE);
  const actionCreator = getCreator(MOCKED_TYPE);

  it('should return reducer creator', () => {
    expect(reducerCreator.reset(actionCreator)).toBe(reducerCreator);
  });

  it('created reducer should return initial state', () => {
    const STATE = { id: 10 };
    const reducer = reducerCreator.reset(actionCreator).create();

    expect(reducer(STATE, actionCreator())).toBe(INITIAL_STATE);
  });
});
