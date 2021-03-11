import { getCreator, setupReducer } from '../../src';
import { MOCKED_LABEL, MOCKED_TYPE } from '../mocks';

describe('the "on" method of setupReducer', () => {
  const INITIAL_STATE = 10;
  const reducerCreator = setupReducer(INITIAL_STATE);

  it('should return reducerCreator', () => {
    const actionCreator = getCreator(MOCKED_TYPE);
    expect(reducerCreator.on(actionCreator, 10)).toBe(reducerCreator);
  });

  describe('with single actionCreator', () => {
    const actionCreator = getCreator(MOCKED_TYPE);

    it('should handle static value', () => {
      const staticValue = 15;
      const reducer = reducerCreator.on(actionCreator, staticValue).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(staticValue);
    });

    it('should handle function without arguments', () => {
      const handler = () => 15;
      const reducer = reducerCreator.on(actionCreator, handler).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(handler());
    });

    it('should handle function with state', () => {
      const handler = (state: number) => state - 10;
      const reducer = reducerCreator.on(actionCreator, handler).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(handler(INITIAL_STATE));
    });

    it('should handle function with state and payload', () => {
      const payload = 10;
      const handler = (state: number, actionPayload: number) => state - actionPayload;
      const actionCreatorWithPayload = getCreator(MOCKED_TYPE).load<number>();
      const reducer = reducerCreator.on(actionCreatorWithPayload, handler).create();

      const reducerResult = reducer(INITIAL_STATE, actionCreatorWithPayload(payload));
      const handlerResult = handler(INITIAL_STATE, payload);

      expect(reducerResult).toEqual(handlerResult);
    });
  });

  describe('with multiple actionCreator', () => {
    const actionCreator = getCreator(MOCKED_TYPE);
    const secondActionCreator = getCreator(MOCKED_LABEL);
    const actionCreatorsList = [actionCreator, secondActionCreator];

    it('should handle static value', () => {
      const staticValue = 15;
      const reducer = reducerCreator.on(actionCreatorsList, staticValue).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(staticValue);
      expect(reducer(INITIAL_STATE, secondActionCreator())).toEqual(staticValue);
    });

    it('should handle function without arguments', () => {
      const handler = () => 15;
      const reducer = reducerCreator.on(actionCreatorsList, handler).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(handler());
      expect(reducer(INITIAL_STATE, secondActionCreator())).toEqual(handler());
    });

    it('should handle function with state', () => {
      const handler = (state: number) => state - 10;
      const reducer = reducerCreator.on(actionCreatorsList, handler).create();
      expect(reducer(INITIAL_STATE, actionCreator())).toEqual(handler(INITIAL_STATE));
      expect(reducer(INITIAL_STATE, secondActionCreator())).toEqual(handler(INITIAL_STATE));
    });

    it('should handle function with state and payload', () => {
      const payload = 10;
      const handler = (state: number, actionPayload: number) => state - actionPayload;
      const actionCreatorWithPayload = getCreator(MOCKED_TYPE).load<number>();
      const secondActionCreatorWithPayload = getCreator(MOCKED_LABEL).load<number>();
      const actionCreatorsWithPayloadList = [
        actionCreatorWithPayload,
        secondActionCreatorWithPayload,
      ];
      const reducer = reducerCreator.on(actionCreatorsWithPayloadList, handler).create();

      const firstReducerResult = reducer(INITIAL_STATE, actionCreatorWithPayload(payload));
      const secondReducerResult = reducer(INITIAL_STATE, secondActionCreatorWithPayload(payload));

      const handlerResult = handler(INITIAL_STATE, payload);

      expect(firstReducerResult).toEqual(handlerResult);
      expect(secondReducerResult).toEqual(handlerResult);
    });
  });
});
