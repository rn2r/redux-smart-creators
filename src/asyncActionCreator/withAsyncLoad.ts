import { getAsyncPayloadInjector } from './getAsyncPayloadInjector';
import { ActionCreatorsBag, ExtendableAsyncActionCreator } from '../types/asyncCreator';

interface WithAsyncLoad {
  <ActionType extends string, Steps extends string>(
    actionType: ActionType,
    basicCreator: ActionCreatorsBag<ActionType, Steps>
  ): ExtendableAsyncActionCreator<ActionType, Steps>;
}

export const withAsyncLoad: WithAsyncLoad = (actionType, actionCreatorsBag) => {
  const load = getAsyncPayloadInjector(actionType, actionCreatorsBag);
  return { ...actionCreatorsBag, load };
};
