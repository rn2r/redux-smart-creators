import { AsyncBasicActionCreator } from '../src/types';
import { MOCKED_TYPE } from './mocks';
import { defaultAsyncSteps, getAsyncCreator } from '../src/getAsyncCreator';

describe('getAsyncCreator Function with default steps', () => {
  let asyncCreator: AsyncBasicActionCreator<string>;

  beforeAll(() => {
    asyncCreator = getAsyncCreator(MOCKED_TYPE);
  });

  it('should not has "type" property', () => {
    expect(typeof asyncCreator).toEqual('object');
    expect(asyncCreator).not.toHaveProperty('type');
  });

  it('should return object with default steps', () => {
    expect(typeof asyncCreator).toEqual('object');
    defaultAsyncSteps.forEach((step) => {
      expect(asyncCreator).toHaveProperty(step);
    });
  });

  it("should have step action creators with correct 'type' property", () => {
    defaultAsyncSteps.forEach((step) => {
      expect(asyncCreator[step]).toHaveProperty('type');
      const stepType = `${MOCKED_TYPE}[${step}]`;
      expect(asyncCreator[step].type).toEqual(stepType);
    });
  });

  it('should have step action creators without payload return', () => {
    defaultAsyncSteps.forEach((step) => {
      const stepActionCreator = asyncCreator[step];
      const stepAction = stepActionCreator();
      expect(typeof stepAction).toEqual('object');
      expect(stepAction).not.toHaveProperty('payload');
    });
  });

  it("should have step action creators with type' property equals returned action's type", () => {
    defaultAsyncSteps.forEach((step) => {
      const stepActionCreator = asyncCreator[step];
      const stepAction = stepActionCreator();
      expect(stepAction).toHaveProperty('type');
      expect(stepAction.type).toEqual(stepActionCreator.type);
    });
  });

  it("should have correct 'load' property", () => {
    expect(asyncCreator).toHaveProperty('load');
    expect(typeof asyncCreator.load).toEqual('function');
  });

  it('returned async creator with payload should not have "type" and "load" properties', () => {
    const asyncCreatorWithPayload = asyncCreator.load();
    expect(typeof asyncCreatorWithPayload).toEqual('object');
    expect(asyncCreatorWithPayload).not.toHaveProperty('type');
    expect(asyncCreatorWithPayload).not.toHaveProperty('load');
  });
});

describe('getAsyncCreator Function with user steps', () => {
  type Steps = 'loading' | 'success' | 'error';
  const steps: Steps[] = ['loading', 'success', 'error'];
  let asyncCreator: AsyncBasicActionCreator<string, Steps>;

  beforeAll(() => {
    asyncCreator = getAsyncCreator(MOCKED_TYPE, steps);
  });

  it('should not has "type" property', () => {
    expect(typeof asyncCreator).toEqual('object');
    expect(asyncCreator).not.toHaveProperty('type');
  });

  it('should return object with user steps', () => {
    expect(typeof asyncCreator).toEqual('object');
    steps.forEach((step) => {
      expect(asyncCreator).toHaveProperty(step);
    });
  });

  it("should have step action creators with correct 'type' property", () => {
    steps.forEach((step) => {
      expect(asyncCreator[step]).toHaveProperty('type');
      const stepType = `${MOCKED_TYPE}[${step}]`;
      expect(asyncCreator[step].type).toEqual(stepType);
    });
  });

  it('should have step action creators without payload return', () => {
    steps.forEach((step) => {
      const stepActionCreator = asyncCreator[step];
      const stepAction = stepActionCreator();
      expect(typeof stepAction).toEqual('object');
      expect(stepAction).not.toHaveProperty('payload');
    });
  });

  it("should have step action creators with type' property equals returned action's type", () => {
    steps.forEach((step) => {
      const stepActionCreator = asyncCreator[step];
      const stepAction = stepActionCreator();
      expect(stepAction).toHaveProperty('type');
      expect(stepAction.type).toEqual(stepActionCreator.type);
    });
  });

  it("should have correct 'load' property", () => {
    expect(asyncCreator).toHaveProperty('load');
    expect(typeof asyncCreator.load).toEqual('function');
  });

  it('returned async creator with payload should not have "type" and "load" properties', () => {
    const asyncCreatorWithPayload = asyncCreator.load();
    expect(typeof asyncCreatorWithPayload).toEqual('object');
    expect(asyncCreatorWithPayload).not.toHaveProperty('type');
    expect(asyncCreatorWithPayload).not.toHaveProperty('load');
  });
});
