import { ActionCreatorWithLoad } from '../types';
import { withLoad } from './withLoad';
import { getBasicActionCreator } from './getBasicActionCreator';

interface GetActionCreator {
  <ActionType extends string>(actionType: ActionType): ActionCreatorWithLoad<ActionType>;
}

export const getActionCreator: GetActionCreator = (actionType) => {
  const basicSmartCreator = getBasicActionCreator(actionType);
  return withLoad(basicSmartCreator);
};
