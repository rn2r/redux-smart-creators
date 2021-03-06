import { AsyncActionCreatorBag, AsyncBasicActionCreator } from '../types';
import { getAsyncPayloadInjector } from './getAsyncPayloadInjector';

interface WithAsyncLoad {
  <ActionType extends string, Steps extends string>(
    actionType: ActionType,
    basicCreator: AsyncActionCreatorBag<ActionType, Steps>
  ): AsyncBasicActionCreator<ActionType, Steps>;
}

export const withAsyncLoad: WithAsyncLoad = (actionType, actionCreatorsBag) => {
  const load = getAsyncPayloadInjector(actionType, actionCreatorsBag);
  return { ...actionCreatorsBag, load };
};
