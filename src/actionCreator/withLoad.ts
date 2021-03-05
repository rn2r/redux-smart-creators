import { ActionCreatorWithLoad, InjectPayload } from '../types';
import { getPayloadInjector } from './getPayloadInjector';

interface WithLoad {
  <ActionType extends string>(
    basicCreator: Omit<ActionCreatorWithLoad<ActionType>, 'load'> & {
      load?: InjectPayload<ActionType>;
    }
  ): ActionCreatorWithLoad<ActionType>;
}

export const withLoad: WithLoad = (basicCreator) => {
  basicCreator.load = getPayloadInjector(basicCreator.type);
  return basicCreator as ActionCreatorWithLoad<typeof basicCreator.type>;
};
