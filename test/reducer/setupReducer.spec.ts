import { setupReducer } from '../../src';

describe('setupReducer', () => {
  const reducer = setupReducer(null);

  it('should return object', () => {
    expect(typeof reducer).toEqual('object');
  });

  it('should return object with "create" method', () => {
    expect(reducer).toHaveProperty('create');
  });

  it('should return object with "on" method', () => {
    expect(reducer).toHaveProperty('on');
  });

  it('should return object with "reset" method', () => {
    expect(reducer).toHaveProperty('reset');
  });

  it('should return object with "switchToPayload" method', () => {
    expect(reducer).toHaveProperty('switchToPayload');
  });

  it('should return object with "getFromPayload" method', () => {
    expect(reducer).toHaveProperty('getFromPayload');
  });
});
