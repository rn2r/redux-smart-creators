import { getActionCreatorsBag } from '../../src/utils/getActionCreatorsBag';
import { MOCKED_TYPE } from '../mocks';
import { defaultAsyncSteps } from '../../src/utils/defaultSteps';
import { getAsyncPayloadInjector } from '../../src/async/getPayloadInjector';

describe('getPayloadInjector', () => {
  const baseCreators = getActionCreatorsBag(MOCKED_TYPE, defaultAsyncSteps);
  const payloadInjector = getAsyncPayloadInjector(baseCreators);

  it('should return a function', () => {
    expect(typeof payloadInjector).toEqual('function');
  });
});
