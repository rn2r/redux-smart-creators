import { withLoad } from './withLoad';
import { getBasicActionCreator } from './getBasicActionCreator';
import { ExtendableBasicActionCreator } from '../types/creator';

interface GetActionCreator {
  <ActionType extends string>(actionType: ActionType): ExtendableBasicActionCreator<ActionType>;
}

export const getActionCreator: GetActionCreator = (actionType) => {
  const basicSmartCreator = getBasicActionCreator(actionType);
  return withLoad(basicSmartCreator);
};
