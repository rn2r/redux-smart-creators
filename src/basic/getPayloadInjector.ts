import { requirePayloadFunction } from '../utils/require';
import { BasicPayloadFunction, PayloadFunction } from '../types/common';
import { ActionCreatorWithPayload, InjectPayload } from '../types/creator';

interface GetPayloadInjector {
  <ActionType extends string>(actionType: ActionType): InjectPayload<ActionType>;
}

export const getPayloadInjector: GetPayloadInjector = <ActionType extends string>(
  actionType: ActionType,
): InjectPayload<ActionType> => <ActionPayload, PayloadInjector extends PayloadFunction>(
    payloadInjector?: PayloadInjector,
  ) => {
  if (payloadInjector === undefined) {
    const creatorWithPayload: ActionCreatorWithPayload<
        ActionType,
        BasicPayloadFunction<ActionPayload>
      > = (payload) => ({ type: actionType, payload });
    creatorWithPayload.type = actionType;
    return creatorWithPayload;
  }

  requirePayloadFunction(payloadInjector);
  const creatorWithPayload: ActionCreatorWithPayload<ActionType, PayloadInjector> = (
    ...args
  ) => ({ type: actionType, payload: payloadInjector(...args) });
  creatorWithPayload.type = actionType;
  return creatorWithPayload;
};
