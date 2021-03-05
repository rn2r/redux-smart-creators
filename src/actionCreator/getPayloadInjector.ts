import {
  BasicPayloadInjector,
  InjectPayload,
  PayloadFunction,
  ActionCreatorWithPayload,
} from '../types';
import { requirePayloadFunction } from '../utils/require';

interface GetPayloadInjector {
  <ActionType extends string>(actionType: ActionType): InjectPayload<ActionType>;
}

export const getPayloadInjector: GetPayloadInjector = <ActionType extends string>(
  actionType: ActionType
): InjectPayload<ActionType> => {
  return <ActionPayload, PayloadInjector extends PayloadFunction>(
    payloadInjector?: PayloadInjector
  ) => {
    if (payloadInjector === undefined) {
      const creatorWithPayload: ActionCreatorWithPayload<
        ActionType,
        BasicPayloadInjector<ActionPayload>
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
};
