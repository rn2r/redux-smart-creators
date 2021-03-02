import {
  AsyncActionCreatorBasicBag,
  AsyncBasicActionCreator,
  DefaultAsyncActionCreatorBasicBag,
  DefaultAsyncStep,
} from './types';
import { getCreator } from './getCreator';

export const defaultAsyncSteps: DefaultAsyncStep[] = ['INIT', 'LOADING', 'SUCCESS', 'FAILURE'];

interface GetAsyncCreator {
  <T extends string>(type: T): AsyncBasicActionCreator<T>;
  <T extends string, S extends string>(type: T, steps: S[]): AsyncBasicActionCreator<T, S>;
}

export const getAsyncCreator: GetAsyncCreator = <
  T extends string,
  S extends string,
  C extends AsyncBasicActionCreator<T, S | DefaultAsyncStep>
>(
  type: T,
  steps?: S[]
): C => {
  const createAsyncBag = <Steps extends string>(
    acc: AsyncActionCreatorBasicBag<T, Steps>,
    step: Steps
  ) => {
    const stepType = `${type}[${step}]`;
    return { ...acc, [step]: getCreator(stepType) };
  };

  if (steps === undefined) {
    const emptyBag = {} as DefaultAsyncActionCreatorBasicBag<T>;
    const initialBag = defaultAsyncSteps.reduce(
      (acc, step) => createAsyncBag<typeof step>(acc, step),
      emptyBag
    ) as C;
    initialBag.load = () => ({});
    return initialBag;
  }

  const emptyBag = {} as AsyncActionCreatorBasicBag<T, S>;
  const initialBag = steps.reduce(
    (acc, step) => createAsyncBag<typeof step>(acc, step),
    emptyBag
  ) as C;
  initialBag.load = () => ({});
  return initialBag;
};
