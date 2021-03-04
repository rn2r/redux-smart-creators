import { ActionCreatorWithLoad, BasicActionCreator } from '../types';
import { createLoadMethod } from './createLoadMethod';

interface GetBasicActionCreator {
  <ActionType extends string>(type: ActionType): BasicActionCreator<ActionType>;
}

interface GetActionCreator {
  <ActionType extends string>(type: ActionType): ActionCreatorWithLoad<ActionType>;
}

export const getBasicActionCreator: GetBasicActionCreator = (type) => {
  const basicSmartCreator = () => ({ type });
  basicSmartCreator.type = type;
  return basicSmartCreator;
};

export const getActionCreator: GetActionCreator = (type) => {
  const basicSmartCreator = getBasicActionCreator(type);
  return createLoadMethod(basicSmartCreator);
};
