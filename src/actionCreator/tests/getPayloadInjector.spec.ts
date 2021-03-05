import { MOCKED_TYPE } from '../../../test/mocks';
import { getPayloadInjector } from '../getPayloadInjector';

describe('getPayloadInjector', () => {
  const payloadInjector = getPayloadInjector(MOCKED_TYPE);

  it('should be a function', () => {
    expect(typeof payloadInjector).toEqual('function');
  });
});
