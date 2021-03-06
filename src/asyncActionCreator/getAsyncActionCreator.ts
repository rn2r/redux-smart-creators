import { AsyncBasicActionCreator } from '../types';
import { defaultAsyncSteps } from './defaultSteps';
import { getActionCreatorsBag } from './getActionCreatorsBag';
import { withAsyncLoad } from './withAsyncLoad';

export function getAsyncCreator<T extends string>(type: T): AsyncBasicActionCreator<T>;
export function getAsyncCreator<T extends string, S extends string>(
  type: T,
  steps: S[]
): AsyncBasicActionCreator<T, S>;

export function getAsyncCreator<T extends string, S extends string>(
  type: T,
  steps?: S[]
): AsyncBasicActionCreator<T, S> | AsyncBasicActionCreator<T> {
  if (steps === undefined) {
    const initialBag = getActionCreatorsBag(type, defaultAsyncSteps);
    return withAsyncLoad(type, initialBag);
  }

  const initialBag = getActionCreatorsBag(type, steps);
  return withAsyncLoad(type, initialBag);
}
