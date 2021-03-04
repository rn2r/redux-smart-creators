import { ActionCreatorWithLoad, InjectPayload } from '../types';
import { getPayloadInjector } from './getPayloadInjector';

interface CreateLoadMethod {
  <ActionType extends string>(
    basicCreator: Omit<ActionCreatorWithLoad<ActionType>, 'load'> & {
      load?: InjectPayload<ActionType>;
    }
  ): ActionCreatorWithLoad<ActionType>;
}

export const createLoadMethod: CreateLoadMethod = (basicCreator) => {
  basicCreator.load = getPayloadInjector(basicCreator.type);
  return basicCreator as ActionCreatorWithLoad<typeof basicCreator.type>;
};
