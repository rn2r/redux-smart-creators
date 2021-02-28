import { BasicSmartCreator } from 'src/types';

export const getCreator = <T extends string>(type: T): BasicSmartCreator<T> => {
  const basicSmartCreator: BasicSmartCreator<T> = () => ({ type });
  basicSmartCreator.type = type;
  return basicSmartCreator;
};
