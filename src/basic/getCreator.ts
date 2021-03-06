import { withLoad } from './withLoad';
import { getBasicActionCreator } from '../utils/getBasicActionCreator';
import { GetActionCreator } from '../types/creator';

export const getCreator: GetActionCreator = (actionType) => {
  const basicSmartCreator = getBasicActionCreator(actionType);
  return withLoad(basicSmartCreator);
};
