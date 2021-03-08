import { getCreatorsPack } from '../../src';
import { MOCKED_LABEL, MOCKED_TYPE } from '../mocks';
import { defaultAsyncSteps } from '../../src/utils/defaultSteps';

describe('getCreatorsPack', () => {
  it('should return object', () => {
    const pack = getCreatorsPack(MOCKED_LABEL);
    expect(typeof pack).toEqual('object');
  });

  it('returned object should have "getCreator" method', () => {
    const pack = getCreatorsPack(MOCKED_LABEL);
    expect(pack).toHaveProperty('getCreator');
    expect(typeof pack.getCreator).toEqual('function');
  });

  it('returned object should have "getCreator" method', () => {
    const pack = getCreatorsPack(MOCKED_LABEL);
    expect(pack).toHaveProperty('getAsyncCreator');
    expect(typeof pack.getAsyncCreator).toEqual('function');
  });

  it('should provide default steps for async action creator type if new steps not provided', () => {
    const pack = getCreatorsPack(MOCKED_LABEL);
    const asyncActionCreator = pack.getAsyncCreator(MOCKED_TYPE);
    defaultAsyncSteps.forEach((step) => {
      expect(asyncActionCreator[step]).toBeDefined();
    });
  });

  it('should transform async action type steps if new steps provided', () => {
    const pack = getCreatorsPack(['first', 'second', 'third']);
    const asyncActionCreator = pack.getAsyncCreator(MOCKED_TYPE);
    ['first', 'second', 'third'].forEach((step) => {
      expect(asyncActionCreator[step as keyof typeof asyncActionCreator]).toBeDefined();
    });
  });

  it('asyncActionCreator should rewrite pack steps if new steps provided', () => {
    const pack = getCreatorsPack(['first', 'second', 'third']);
    const asyncActionCreator = pack.getAsyncCreator(MOCKED_TYPE, defaultAsyncSteps);
    ['first', 'second', 'third'].forEach((step) => {
      // @ts-ignore
      expect(asyncActionCreator[step]).not.toBeDefined();
    });
    defaultAsyncSteps.forEach((step) => {
      expect(asyncActionCreator[step]).toBeDefined();
    });
  });

  it('should not transform action creator type if label not provided', () => {
    const pack = getCreatorsPack(defaultAsyncSteps);
    const actionCreator = pack.getCreator(MOCKED_TYPE);
    const asyncActionCreator = pack.getAsyncCreator(MOCKED_TYPE);
    expect(actionCreator.type).toEqual(MOCKED_TYPE);
    defaultAsyncSteps.forEach((step) => {
      expect(asyncActionCreator[step].type.startsWith(MOCKED_TYPE)).toBeTruthy();
    });
  });

  it('should transform action creator type if label provided', () => {
    const pack = getCreatorsPack(MOCKED_LABEL, defaultAsyncSteps);
    const actionCreator = pack.getCreator(MOCKED_TYPE);
    const asyncActionCreator = pack.getAsyncCreator(MOCKED_TYPE);
    expect(actionCreator.type.includes(MOCKED_LABEL)).toBeTruthy();
    defaultAsyncSteps.forEach((step) => {
      expect(asyncActionCreator[step].type.includes(MOCKED_LABEL)).toBeTruthy();
    });
  });
});
