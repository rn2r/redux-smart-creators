import { ExtendableBasicActionCreator } from '../types/creator';
import { getCreator } from '../basic';

export function makePackedCreator<PackLabel extends string | null>(
  packLabel: PackLabel | null
): <ActionType extends string>(
  actionType: ActionType
) => PackLabel extends string
  ? ExtendableBasicActionCreator<`@@${PackLabel}/${ActionType}`>
  : ExtendableBasicActionCreator<ActionType> {
  if (packLabel === null) {
    return <ActionType extends string>(actionType: ActionType) =>
      getCreator(actionType) as PackLabel extends string
        ? ExtendableBasicActionCreator<`@@${PackLabel}/${ActionType}`>
        : ExtendableBasicActionCreator<ActionType>;
  }

  return <ActionType extends string>(actionType: ActionType) =>
    getCreator(`@@${packLabel}/${actionType}`) as PackLabel extends string
      ? ExtendableBasicActionCreator<`@@${PackLabel}/${ActionType}`>
      : ExtendableBasicActionCreator<ActionType>;
}
