import { ExtendableAsyncActionCreator } from '../types/asyncCreator';
import { getAsyncCreator } from '../async';

interface AsyncGetterCreatorWithoutLabel<
  PackLabel extends string | null,
  PackSteps extends string
> {
  <ActionType extends string>(actionType: ActionType): PackLabel extends string
    ? ExtendableAsyncActionCreator<`@@${PackLabel}/${ActionType}`, PackSteps>
    : ExtendableAsyncActionCreator<ActionType, PackSteps>;
  <ActionType extends string, Steps extends string>(
    actionType: ActionType,
    steps: Steps[]
  ): PackLabel extends string
    ? ExtendableAsyncActionCreator<`$${PackLabel}/${ActionType}`, Steps>
    : ExtendableAsyncActionCreator<ActionType, Steps>;
}

export function makeAsyncCreatorGetter<PackLabel extends string | null, PackSteps extends string>(
  packLabel: PackLabel,
  packSteps: PackSteps[]
): AsyncGetterCreatorWithoutLabel<PackLabel, PackSteps> {
  return (<ActionType extends string, Steps extends string>(
    actionType: ActionType,
    steps?: Steps[]
  ) => {
    if (steps === undefined) {
      if (packLabel === null) return getAsyncCreator(actionType, packSteps);
      const packedActionType = `@@${packLabel}/${actionType}`;
      return getAsyncCreator(packedActionType, packSteps);
    }
    if (packLabel === null) return getAsyncCreator(actionType, steps);
    const packedActionType = `@@${packLabel}/${actionType}`;
    return getAsyncCreator(packedActionType, steps);
  }) as AsyncGetterCreatorWithoutLabel<PackLabel, PackSteps>;
}
