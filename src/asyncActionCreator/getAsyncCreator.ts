import { AsyncActionCreatorBasicBag, AsyncBasicActionCreator, DefaultAsyncStep } from '../types';
import { getBasicActionCreator } from '../actionCreator/getActionCreator';
import { getAsyncPayloadInjector } from './getAsyncPayloadInjector';
import { defaultAsyncSteps } from './defaultSteps';

interface GetAsyncCreator {
  <T extends string>(type: T): AsyncBasicActionCreator<T>;
  <T extends string, S extends string>(type: T, steps: S[]): AsyncBasicActionCreator<T, S>;
}

export const payload = <P>() => {
  return (payload: P) => payload;
};

interface CreateAsyncActionCreator {
  <ActionType extends string, Steps extends string>(
    acc: AsyncActionCreatorBasicBag<ActionType, Steps>,
    step: Steps
  ): AsyncActionCreatorBasicBag<ActionType, Steps>;
}

export const getAsyncCreator: GetAsyncCreator = <
  T extends string,
  S extends string,
  C extends AsyncBasicActionCreator<T, S | DefaultAsyncStep>
>(
  type: T,
  steps?: S[]
): C => {
  const createAsyncActionCreator: CreateAsyncActionCreator = (acc, step) => {
    const stepType = `${type}[${step}]`;
    return { ...acc, [step]: getBasicActionCreator(stepType) };
  };

  if (steps === undefined) {
    const emptyBag = {} as AsyncActionCreatorBasicBag<T, DefaultAsyncStep>;
    const initialBag = defaultAsyncSteps.reduce(createAsyncActionCreator, emptyBag) as C;
    const load = getAsyncPayloadInjector(type, defaultAsyncSteps, initialBag);
    return { ...initialBag, load };
  }

  const emptyBag = {} as AsyncActionCreatorBasicBag<T, S>;
  const initialBag = steps.reduce(createAsyncActionCreator, emptyBag) as C;
  const load = getAsyncPayloadInjector(type, steps, initialBag);
  return { ...initialBag, load };
};
