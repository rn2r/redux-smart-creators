import { InjectPayload } from '../src/types';
import { MOCKED_TYPE } from './mocks';
import { getPayloadInjector } from '../src/actionCreator/getPayloadInjector';

describe('wrong called getPayloadInjector', () => {
  it('should throw error without type', () => {
    expect(() => {
      // @ts-ignore
      getPayloadInjector();
    }).toThrowError();
  });
});

describe('getPayloadInjector', () => {
  let payloadInjector: InjectPayload<typeof MOCKED_TYPE>;
  beforeAll(() => {
    payloadInjector = getPayloadInjector(MOCKED_TYPE);
  });

  it('should be a function', () => {
    expect(typeof payloadInjector).toEqual('function');
  });
});
