import { defaultAsyncSteps } from './defaultSteps';
import { getActionCreatorsBag } from './getActionCreatorsBag';
import { withAsyncLoad } from './withAsyncLoad';
import { ExtendableAsyncActionCreator } from '../types/asyncCreator';

export function getAsyncCreator<T extends string>(type: T): ExtendableAsyncActionCreator<T>;
export function getAsyncCreator<T extends string, S extends string>(
  type: T,
  steps: S[]
): ExtendableAsyncActionCreator<T, S>;

export function getAsyncCreator<T extends string, S extends string>(
  type: T,
  steps?: S[]
): ExtendableAsyncActionCreator<T, S> | ExtendableAsyncActionCreator<T> {
  if (steps === undefined) {
    const initialBag = getActionCreatorsBag(type, defaultAsyncSteps);
    return withAsyncLoad(type, initialBag);
  }

  const initialBag = getActionCreatorsBag(type, steps);
  return withAsyncLoad(type, initialBag);
}
