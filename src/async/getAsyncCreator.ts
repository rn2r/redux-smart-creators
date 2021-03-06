import { defaultAsyncSteps } from '../utils/defaultSteps';
import { getActionCreatorsBag } from '../utils/getActionCreatorsBag';
import { withLoad } from './withLoad';
import { ExtendableAsyncActionCreator } from '../types/asyncCreator';

export function getAsyncCreator<ActionType extends string>(
  type: ActionType
): ExtendableAsyncActionCreator<ActionType>;
export function getAsyncCreator<ActionType extends string, Steps extends string>(
  type: ActionType,
  steps: Steps[]
): ExtendableAsyncActionCreator<ActionType, Steps>;

export function getAsyncCreator<ActionType extends string, Steps extends string>(
  type: ActionType,
  steps?: Steps[]
): ExtendableAsyncActionCreator<ActionType, Steps> | ExtendableAsyncActionCreator<ActionType> {
  if (steps === undefined) {
    const initialBag = getActionCreatorsBag(type, defaultAsyncSteps);
    return withLoad(type, initialBag);
  }

  const initialBag = getActionCreatorsBag(type, steps);
  return withLoad(type, initialBag);
}
