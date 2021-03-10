import { getCreator, setupReducer } from '../../src';
import { MOCKED_LABEL, MOCKED_TYPE } from '../mocks';

interface MockedPayload {
  id: number;
}

describe('the "getFromPayload" method of setupReducer', () => {
  const INITIAL_STATE = 10;
  const PAYLOAD: MockedPayload = { id: 15 };
  const reducerCreator = setupReducer(INITIAL_STATE);
  const actionCreator = getCreator(MOCKED_TYPE).load<MockedPayload>();
  const handler = (payload: MockedPayload) => payload.id - 10;

  it('should return reducerCreator', () => {
    expect(reducerCreator.getFromPayload(actionCreator, handler)).toBe(reducerCreator);
  });

  it('with single action creator', () => {
    const reducer = reducerCreator.getFromPayload(actionCreator, handler).create();

    const reducerResult = reducer(INITIAL_STATE, actionCreator(PAYLOAD));
    const handlerResult = handler(PAYLOAD);

    expect(reducerResult).toEqual(handlerResult);
  });

  it('with multiple action creators', () => {
    const secondActionCreator = getCreator(MOCKED_LABEL).load<MockedPayload>();
    const actionCreatorsList = [actionCreator, secondActionCreator];

    const reducer = reducerCreator.getFromPayload(actionCreatorsList, handler).create();

    const firstReducerResult = reducer(INITIAL_STATE, actionCreator(PAYLOAD));
    const secondReducerResult = reducer(INITIAL_STATE, secondActionCreator(PAYLOAD));
    const handlerResult = handler(PAYLOAD);

    expect(firstReducerResult).toEqual(handlerResult);
    expect(secondReducerResult).toEqual(handlerResult);
  });
});
