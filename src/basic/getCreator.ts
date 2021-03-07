import { withLoad } from './withLoad';
import { getBasicActionCreator } from '../utils/getBasicActionCreator';
import { ExtendableBasicActionCreator } from '../types/creator';

interface GetActionCreator {
  <ActionType extends string>(actionType: ActionType): ExtendableBasicActionCreator<ActionType>;
}

export const getCreator: GetActionCreator = (actionType) => {
  const basicSmartCreator = getBasicActionCreator(actionType);
  return withLoad(basicSmartCreator);
};
