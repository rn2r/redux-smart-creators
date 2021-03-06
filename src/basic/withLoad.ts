import { getPayloadInjector } from './getPayloadInjector';
import { ExtendableBasicActionCreator, InjectPayload } from '../types/creator';

interface WithLoad {
  <ActionType extends string>(
    basicCreator: Omit<ExtendableBasicActionCreator<ActionType>, 'load'> & {
      load?: InjectPayload<ActionType>;
    }
  ): ExtendableBasicActionCreator<ActionType>;
}

export const withLoad: WithLoad = (basicCreator) => {
  const load = getPayloadInjector(basicCreator.type);
  return { ...basicCreator, load } as ExtendableBasicActionCreator<typeof basicCreator.type>;
};
