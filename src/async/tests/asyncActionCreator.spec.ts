import { MOCKED_TYPE } from '../../../test/mocks';
import { getAsyncCreator } from '../../index';
import { defaultAsyncSteps } from '../../utils/defaultSteps';
import { wrongUsageTests } from './utils';
import { DefaultAsyncStep } from '../../types/common';

describe('wrong usage', () => {
  wrongUsageTests(getAsyncCreator);
});

describe('getAsyncCreator Function with user steps', () => {
  type Steps = 'loading' | 'success' | 'error';
  const steps: Steps[] = ['loading', 'success', 'error'];
  const asyncCreator = getAsyncCreator(MOCKED_TYPE, steps);

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
});

describe('getAsyncCreator Function with default steps', () => {
  const asyncCreator = getAsyncCreator(MOCKED_TYPE);

  it('should return object with default steps', () => {
    expect(typeof asyncCreator).toEqual('object');
    defaultAsyncSteps.forEach((step) => {
      expect(asyncCreator).toHaveProperty(step);
    });
  });
});

describe('async actionCreator with payload', () => {
  const asyncCreator = getAsyncCreator(MOCKED_TYPE, defaultAsyncSteps);

  it('should not have "type" and "load" properties', () => {
    const asyncCreatorWithPayload = asyncCreator.load({});
    expect(typeof asyncCreatorWithPayload).toEqual('object');
    expect(asyncCreatorWithPayload).not.toHaveProperty('type');
    expect(asyncCreatorWithPayload).not.toHaveProperty('load');
  });

  it('should return object with user steps', () => {
    const asyncCreatorWithPayload = asyncCreator.load({});
    expect(typeof asyncCreator).toEqual('object');
    defaultAsyncSteps.forEach((step) => {
      expect(asyncCreatorWithPayload).toHaveProperty(step);
    });
  });

  it("should have step action creators with correct 'type' property", () => {
    const asyncCreatorWithPayload = asyncCreator.load({});
    defaultAsyncSteps.forEach((step) => {
      expect(asyncCreatorWithPayload[step]).toHaveProperty('type');
      const stepType = `${MOCKED_TYPE}[${step}]`;
      expect(asyncCreatorWithPayload[step].type).toEqual(stepType);
    });
  });

  it('should have step action creators with payload return if payload is specified and without if payload is not specified', () => {
    const stepsWithPayload: DefaultAsyncStep[] = ['INIT', 'LOADING'];
    const payloads = stepsWithPayload.reduce(
      (acc, step) => ({ ...acc, [step]: (payload: any) => payload }),
      {},
    );

    const asyncCreatorWithPayload = asyncCreator.load(payloads);
    defaultAsyncSteps.forEach((step) => {
      const stepActionCreator = asyncCreatorWithPayload[step];
      const stepAction = stepActionCreator();
      expect(typeof stepAction).toEqual('object');
      if (stepsWithPayload.includes(step)) {
        expect(stepAction).toHaveProperty('payload');
      } else {
        expect(stepAction).not.toHaveProperty('payload');
      }
    });
  });

  it("should have step action creators with type' property equals returned action's type", () => {
    const stepsWithPayload: DefaultAsyncStep[] = ['INIT', 'LOADING'];
    const payloads = stepsWithPayload.reduce(
      (acc, step) => ({ ...acc, [step]: (payload: any) => payload }),
      {},
    );

    const asyncCreatorWithPayload = asyncCreator.load(payloads);

    defaultAsyncSteps.forEach((step) => {
      const stepActionCreator = asyncCreatorWithPayload[step];
      const stepAction = stepActionCreator();
      expect(stepAction).toHaveProperty('type');
      expect(stepAction.type).toEqual(stepActionCreator.type);
    });
  });
});
