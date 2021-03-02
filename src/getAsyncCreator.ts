import { AsyncActionCreatorBasicBag, DefaultAsyncActionCreatorBasicBag } from './types';
import { getCreator } from './getCreator';

interface GetAsyncCreator {
  <T extends string>(type: T): DefaultAsyncActionCreatorBasicBag<T>;
  <T extends string, S extends string>(type: T, ...steps: S[]): AsyncActionCreatorBasicBag<T, S>;
}

const getAsyncCreator: GetAsyncCreator = <T extends string, S extends string>(
  type: T,
  ...steps: S[]
): any => {
  if (steps.length === 0) {
    return {
      INIT: getCreator(`${type}[INIT]`),
      LOADING: getCreator(`${type}[LOADING]`),
      SUCCESS: getCreator(`${type}[SUCCESS]`),
      FAILURE: getCreator(`${type}[FAILURE]`),
    } as DefaultAsyncActionCreatorBasicBag<T>;
  }

  return steps.reduce(
    (acc, step) => ({ ...acc, step: getCreator(`${type}[${step}]`) }),
    {}
  ) as AsyncActionCreatorBasicBag<T, S>;
};
