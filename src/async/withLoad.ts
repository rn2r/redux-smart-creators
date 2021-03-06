import { getAsyncPayloadInjector } from './getPayloadInjector';
import { ActionCreatorsBag, ExtendableAsyncActionCreator } from '../types/asyncCreator';

interface WithAsyncLoad {
  <ActionType extends string, Steps extends string>(
    basicCreator: ActionCreatorsBag<ActionType, Steps>
  ): ExtendableAsyncActionCreator<ActionType, Steps>;
}

export const withLoad: WithAsyncLoad = (actionCreatorsBag) => {
  const load = getAsyncPayloadInjector(actionCreatorsBag);
  return { ...actionCreatorsBag, load };
};
