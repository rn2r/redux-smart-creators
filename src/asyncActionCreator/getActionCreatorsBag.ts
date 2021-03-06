import { AsyncActionCreatorBag } from '../types';
import { getBasicActionCreator } from '../actionCreator/getBasicActionCreator';
import { requireActionType, requireSteps } from '../utils/require';

interface GetActionCreatorsBag {
  <T extends string, S extends string>(type: T, steps: S[]): AsyncActionCreatorBag<T, S>;
}

interface CreateAsyncActionCreator {
  <ActionType extends string, Steps extends string>(
    acc: AsyncActionCreatorBag<ActionType, Steps>,
    step: Steps
  ): AsyncActionCreatorBag<ActionType, Steps>;
}

export const getActionCreatorsBag: GetActionCreatorsBag = <T extends string, S extends string>(
  type: T,
  steps: S[]
): AsyncActionCreatorBag<T, S> => {
  requireActionType(type);
  requireSteps(steps);

  const createAsyncActionCreator: CreateAsyncActionCreator = (acc, step) => {
    const stepType = `${type}[${step}]`;
    return { ...acc, [step]: getBasicActionCreator(stepType) };
  };

  const emptyBag = {} as AsyncActionCreatorBag<T, S>;
  return steps.reduce(createAsyncActionCreator, emptyBag);
};
