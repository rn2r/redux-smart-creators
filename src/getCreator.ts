import {
  BasicSmartCreator,
  InjectPayload,
  PayloadFunction,
  PayloadInjector,
  SmartCreatorWithPayload,
} from './types';

export const getPayloadInjector = <T extends string>(type: T): InjectPayload<T> => {
  if (type === undefined) throw new Error('You must provide action type to payload injector');

  return <Payload, Function extends PayloadFunction>(payloadInjector?: Function) => {
    if (payloadInjector === undefined) {
      const creatorWithPayload: SmartCreatorWithPayload<T, PayloadInjector<Payload>> = (
        payload
      ) => ({ type, payload });
      creatorWithPayload.type = type;
      return creatorWithPayload;
    }

    const creatorWithPayload: SmartCreatorWithPayload<T, Function> = (
      ...args: Parameters<Function>
    ) => ({
      type,
      payload: payloadInjector(...args),
    });
    creatorWithPayload.type = type;
    return creatorWithPayload;
  };
};

export const getCreator = <T extends string>(type: T): BasicSmartCreator<T> => {
  const basicSmartCreator: BasicSmartCreator<T> = () => ({ type });
  basicSmartCreator.load = getPayloadInjector(type);
  basicSmartCreator.type = type;
  return basicSmartCreator;
};
