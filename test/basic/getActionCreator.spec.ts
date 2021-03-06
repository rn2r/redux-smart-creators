import { getCreator } from '../../src';
import { MOCKED_TYPE } from '../mocks';
import { actionCreatorBasicTests, wrongUsageTest } from './utils';

describe('wrong usage of getActionCreator', () => {
  wrongUsageTest(getCreator);
});

describe('getActionCreator', () => {
  const actionCreator = getCreator(MOCKED_TYPE);
  actionCreatorBasicTests(actionCreator);

  it("should have correct 'load' property", () => {
    expect(actionCreator).toHaveProperty('load');
    expect(typeof actionCreator.load).toEqual('function');
  });

  it('returned creator with payload should have correct type', () => {
    const creatorWithPayload = actionCreator.load();
    expect(creatorWithPayload).toHaveProperty('type');
    expect(creatorWithPayload.type).toEqual(MOCKED_TYPE);
  });
});

describe("actionCreator's 'load' method", () => {
  const actionCreator = getCreator(MOCKED_TYPE);

  describe('wrong usage', () => {
    it('should throw an error it passed not a function as parameter', () => {
      const wrongParameters = ['', 10, {}, [], false, null];
      wrongParameters.forEach((parameter) => {
        expect(() => {
          // @ts-ignore
          actionCreator.load(parameter);
        }).toThrowError();
      });
    });
  });

  describe('with basic payload injector', () => {
    const actionCreatorWithPayload = actionCreator.load();

    it('should be a function', () => {
      expect(typeof actionCreatorWithPayload).toEqual('function');
    });

    it("should have correct 'type' property", () => {
      expect(actionCreatorWithPayload).toHaveProperty('type');
      expect(actionCreatorWithPayload.type).toEqual(MOCKED_TYPE);
    });

    it('should return Action with correct payload', () => {
      const expectedPayload = 'EXPECTED_PAYLOAD';
      const action = actionCreatorWithPayload(expectedPayload);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(expectedPayload);
    });

    it("should have 'type' property equals returned action's type", () => {
      const expectedPayload = 'EXPECTED_PAYLOAD';
      const action = actionCreatorWithPayload(expectedPayload);
      expect(action).toHaveProperty('type');
      expect(action.type).toEqual(actionCreatorWithPayload.type);
    });
  });

  describe('with provided payload function', () => {
    const payloadFunction = jest.fn((arg1: string, arg2: number) => ({ arg1, arg2 }));
    const actionCreatorWithPayload = actionCreator.load(payloadFunction);

    it('should be a function', () => {
      expect(typeof actionCreatorWithPayload).toEqual('function');
    });

    it("should have correct 'type' property", () => {
      expect(actionCreatorWithPayload).toHaveProperty('type');
      expect(actionCreatorWithPayload.type).toEqual(MOCKED_TYPE);
    });

    it('should call payloadFunction', () => {
      actionCreatorWithPayload('10', 20);
      expect(payloadFunction).toBeCalled();
    });

    it('should return Action with correct payload', () => {
      const expectedPayload = { arg1: '10', arg2: 20 };
      const action = actionCreatorWithPayload('10', 20);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(expectedPayload);
    });

    it("should have 'type' property equals returned action's type", () => {
      const action = actionCreatorWithPayload('10', 20);
      expect(action).toHaveProperty('type');
      expect(action.type).toEqual(actionCreatorWithPayload.type);
    });
  });
});
