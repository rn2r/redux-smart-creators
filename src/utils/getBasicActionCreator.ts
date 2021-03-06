import { requireActionType } from './require';
import { BasicActionCreator } from '../types/creator';

interface GetBasicActionCreator {
  <ActionType extends string>(actionType: ActionType): BasicActionCreator<ActionType>;
}

export const getBasicActionCreator: GetBasicActionCreator = (actionType) => {
  requireActionType(actionType);
  const basicSmartCreator = () => ({ type: actionType });
  basicSmartCreator.type = actionType;
  return basicSmartCreator;
};
