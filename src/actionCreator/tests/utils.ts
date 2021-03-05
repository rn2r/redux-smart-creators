import { BasicActionCreator } from '../../types';
import { MOCKED_TYPE } from '../../../test/mocks';

interface ActionCreatorBasicTests {
  <ActionType extends string, ActionCreator extends BasicActionCreator<ActionType>>(
    actionCreator: ActionCreator
  ): void;
}

export const actionCreatorBasicTests: ActionCreatorBasicTests = (actionCreator) => {
  it('should return function', () => {
    expect(typeof actionCreator).toEqual('function');
  });

  it("should have correct 'type' property", () => {
    expect(actionCreator).toHaveProperty('type');
    expect(actionCreator.type).toEqual(MOCKED_TYPE);
  });

  it('should not return Action with payload', () => {
    const action = actionCreator();
    expect(action).not.toHaveProperty('payload');
  });

  it("should have 'type' property equals returned action's type", () => {
    const action = actionCreator();
    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(actionCreator.type);
  });
};

interface ActionCreatorWrongUsageTests {
  <ActionType extends string, ActionCreator extends BasicActionCreator<ActionType>>(
    getCreator: (actionTpe: ActionType) => ActionCreator
  ): void;
}

export const wrongUsageTest: ActionCreatorWrongUsageTests = (getCreator) => {
  it('should throw an Error if called without argument', function () {
    expect(() => {
      // @ts-ignore
      getCreator();
    }).toThrowError();
  });

  it('should throw an Error if called with empty string', function () {
    expect(() => {
      // @ts-ignore
      getCreator('');
    }).toThrowError();
  });

  it('should throw an Error if called with many spaces', function () {
    const actionType = ' '.repeat(Math.trunc(Math.random() * 100));
    expect(() => {
      // @ts-ignore
      getCreator(actionType);
    }).toThrowError();
  });

  it('should throw an Error if called without string', function () {
    const wrongTypes = [10, false, null, {}, [], () => {}];
    wrongTypes.forEach((type) => {
      expect(() => {
        // @ts-ignore
        getCreator(type);
      }).toThrowError();
    });
  });
};
