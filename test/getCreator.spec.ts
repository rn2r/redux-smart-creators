import { getCreator } from '../src';
import { BasicSmartCreator } from '../src/types';

describe('getCreator Function', () => {
  let smartCreator: BasicSmartCreator<string>;
  const CREATOR_TYPE = 'CREATOR_TYPE';

  beforeAll(() => {
    smartCreator = getCreator(CREATOR_TYPE);
  });

  it('should return function', () => {
    expect(typeof smartCreator).toEqual('function');
  });

  it("should have correct 'type' property", () => {
    expect(smartCreator).toHaveProperty('type');
    expect(smartCreator.type).toEqual(CREATOR_TYPE);
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
});
