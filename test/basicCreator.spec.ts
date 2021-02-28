import { getCreator } from '../src';
import { BasicSmartCreator } from '../src/types';
import { MOCKED_TYPE } from './mocks';

describe('getCreator Function', () => {
  let smartCreator: BasicSmartCreator<string>;

  beforeAll(() => {
    smartCreator = getCreator(MOCKED_TYPE);
  });

  it('should return function', () => {
    expect(typeof smartCreator).toEqual('function');
  });

  it("should have correct 'type' property", () => {
    expect(smartCreator).toHaveProperty('type');
    expect(smartCreator.type).toEqual(MOCKED_TYPE);
  });

  it('should not return Action with payload', () => {
    const action = smartCreator();
    expect(action).not.toHaveProperty('payload');
  });

  it("should have 'type' property equals returned action's type", () => {
    const action = smartCreator();
    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(smartCreator.type);
  });

  it("should have correct 'load' property", () => {
    expect(smartCreator).toHaveProperty('load');
    expect(typeof smartCreator.load).toEqual('function');
  });

  it('returned creator with payload should have correct type', () => {
    const creatorWithPayload = smartCreator.load();
    expect(creatorWithPayload).toHaveProperty('type');
    expect(creatorWithPayload.type).toEqual(MOCKED_TYPE);
  });
});
