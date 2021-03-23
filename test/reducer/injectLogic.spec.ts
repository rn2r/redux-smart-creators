import { getCreator, setupReducer } from '../../src';
import { MOCKED_TYPE } from '../mocks';

describe('the "injectLogic" method of setupReducer', () => {
  const INITIAL_STATE = 0;
  const reducerCreator = setupReducer(INITIAL_STATE);

  const logicInjector = (creator: any) => creator;

  it('should return reducer creator', () => {
    expect(reducerCreator.injectLogic(logicInjector)).toBe(reducerCreator);
  });

  const actionCreator = getCreator(MOCKED_TYPE);

  it('should handle "on" method', () => {
    const handler = () => 15;
    const reducer = reducerCreator
      .injectLogic((innerReducerCreator) => innerReducerCreator.on(actionCreator, handler))
      .create();
    expect(reducer(INITIAL_STATE, actionCreator())).toEqual(handler());
  });

  it('should handle "reset" method', () => {
    const reducer = reducerCreator
      .injectLogic((innerReducerCreator) => innerReducerCreator.reset(actionCreator))
      .create();
    expect(reducer(10, actionCreator())).toEqual(INITIAL_STATE);
  });

  it('should handle "switchToPayload" method', () => {
    const actionCreatorWithPayload = getCreator(MOCKED_TYPE).load();
    const reducer = reducerCreator.switchToPayload(actionCreatorWithPayload).create();
    expect(reducer(INITIAL_STATE, actionCreatorWithPayload(10))).toEqual(10);
  });

  it('should handle "getFromPayload" method', () => {
    const actionCreatorWithPayload = getCreator(MOCKED_TYPE).load<number>();
    const reducer = reducerCreator
      .getFromPayload(actionCreatorWithPayload, (payload: number) => payload + 1)
      .create();
    expect(reducer(INITIAL_STATE, actionCreatorWithPayload(10))).toEqual(11);
  });
});
