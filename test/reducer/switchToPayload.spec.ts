import { getCreator, setupReducer } from '../../src';
import { MOCKED_TYPE } from '../mocks';

interface MockedPayload {
  id: number;
}

describe('the "switchToPayload" method of setupReducer', () => {
  const INITIAL_STATE: MockedPayload = { id: 10 };
  const reducerCreator = setupReducer(INITIAL_STATE);
  const actionCreatorWithPayload = getCreator(MOCKED_TYPE).load<MockedPayload>();

  it('should return reducer creator', () => {
    expect(reducerCreator.switchToPayload(actionCreatorWithPayload)).toBe(reducerCreator);
  });

  it('created reducer should return payload', () => {
    const PAYLOAD: MockedPayload = { id: 15 };
    const reducer = reducerCreator.switchToPayload(actionCreatorWithPayload).create();

    expect(reducer(INITIAL_STATE, actionCreatorWithPayload(PAYLOAD))).toBe(PAYLOAD);
  });
});
