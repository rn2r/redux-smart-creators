import { requireActionType } from '../utils/require';
import { BasicActionCreator } from '../types';

interface GetBasicActionCreator {
  <ActionType extends string>(actionType: ActionType): BasicActionCreator<ActionType>;
}

export const getBasicActionCreator: GetBasicActionCreator = (actionType) => {
  requireActionType(actionType);
  const basicSmartCreator = () => ({ type: actionType });
  basicSmartCreator.type = actionType;
  return basicSmartCreator;
};