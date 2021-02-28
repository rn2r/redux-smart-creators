import { PayloadFunction, SmartCreatorWithPayload } from '../src/types';
import { MOCKED_TYPE } from './mocks';
import { getPayloadInjector } from '../src/getCreator';

describe('Creator with auto payload', () => {
  let creatorWithPayload: SmartCreatorWithPayload<typeof MOCKED_TYPE, PayloadFunction>;
  beforeAll(() => {
    const payloadInjector = getPayloadInjector(MOCKED_TYPE);
    creatorWithPayload = payloadInjector();
  });

  it('should be a function', () => {
    expect(typeof creatorWithPayload).toEqual('function');
  });

  it("should have correct 'type' property", () => {
    expect(creatorWithPayload).toHaveProperty('type');
    expect(creatorWithPayload.type).toEqual(MOCKED_TYPE);
  });

  it('should return Action with correct payload', () => {
    const expectedPayload = 'EXPECTED_PAYLOAD';
    const action = creatorWithPayload(expectedPayload);
    expect(action).toHaveProperty('payload');
    expect(action.payload).toEqual(expectedPayload);
  });

  it("should have 'type' property equals returned action's type", () => {
    const action = creatorWithPayload();
    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(creatorWithPayload.type);
  });
});

describe('Creator with functional payload', () => {
  const payloadFunction = jest.fn((arg1: string, arg2: number) => ({ arg1, arg2 }));
  let creatorWithPayload: SmartCreatorWithPayload<typeof MOCKED_TYPE, typeof payloadFunction>;

  beforeAll(() => {
    const payloadInjector = getPayloadInjector(MOCKED_TYPE);
    creatorWithPayload = payloadInjector(payloadFunction);
  });

  it('should be a function', () => {
    expect(typeof creatorWithPayload).toEqual('function');
  });

  it("should have correct 'type' property", () => {
    expect(creatorWithPayload).toHaveProperty('type');
    expect(creatorWithPayload.type).toEqual(MOCKED_TYPE);
  });

  it('should call payloadFunction', () => {
    creatorWithPayload('10', 20);
    expect(payloadFunction).toBeCalled();
  });

  it('should return Action with correct payload', () => {
    const expectedPayload = { arg1: '10', arg2: 20 };
    const action = creatorWithPayload('10', 20);
    expect(action).toHaveProperty('payload');
    expect(action.payload).toEqual(expectedPayload);
  });

  it("should have 'type' property equals returned action's type", () => {
    const action = creatorWithPayload('10', 20);
    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(creatorWithPayload.type);
  });
});
