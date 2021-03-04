import {
  BasicPayloadInjector,
  InjectPayload,
  PayloadFunction,
  ActionCreatorWithPayload,
} from '../types';

export const getPayloadInjector = <ActionType extends string>(
  type: ActionType
): InjectPayload<ActionType> => {
  if (type === undefined) throw new Error('You must provide action type to payload injector');

  return <ActionPayload, PayloadInjector extends PayloadFunction>(
    payloadInjector?: PayloadInjector
  ) => {
    if (payloadInjector === undefined) {
      const creatorWithPayload: ActionCreatorWithPayload<
        ActionType,
        BasicPayloadInjector<ActionPayload>
      > = (payload) => ({ type, payload });
      creatorWithPayload.type = type;
      return creatorWithPayload;
    }

    const creatorWithPayload: ActionCreatorWithPayload<ActionType, PayloadInjector> = (
      ...args: Parameters<PayloadInjector>
    ) => ({
      type,
      payload: payloadInjector(...args),
    });
    creatorWithPayload.type = type;
    return creatorWithPayload;
  };
};
