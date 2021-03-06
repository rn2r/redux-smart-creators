import { MOCKED_TYPE } from '../mocks';
import { getPayloadInjector } from '../../src/basic/getPayloadInjector';

describe('getPayloadInjector', () => {
  const payloadInjector = getPayloadInjector(MOCKED_TYPE);

  it('should return a function', () => {
    expect(typeof payloadInjector).toEqual('function');
  });
});
