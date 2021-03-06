import { payload } from '../payload';

describe('payload', () => {
  const payloadInjector = payload();

  it('should return function', () => {
    expect(typeof payloadInjector).toEqual('function');
  });

  it('returned function should return passed parameter', () => {
    const PAYLOAD = {};
    expect(payloadInjector(PAYLOAD)).toBe(PAYLOAD);
  });
});
