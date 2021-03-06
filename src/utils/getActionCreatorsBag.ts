import { getBasicActionCreator } from './getBasicActionCreator';
import { requireActionType, requireSteps } from './require';
import { ActionCreatorsBag } from '../types/asyncCreator';

interface GetActionCreatorsBag {
  <T extends string, S extends string>(type: T, steps: S[]): ActionCreatorsBag<T, S>;
}

interface CreateAsyncActionCreator {
  <ActionType extends string, Steps extends string>(
    acc: ActionCreatorsBag<ActionType, Steps>,
    step: Steps
  ): ActionCreatorsBag<ActionType, Steps>;
}

export const getActionCreatorsBag: GetActionCreatorsBag = <T extends string, S extends string>(
  type: T,
  steps: S[]
): ActionCreatorsBag<T, S> => {
  requireActionType(type);
  requireSteps(steps);

  const createAsyncActionCreator: CreateAsyncActionCreator = (acc, step) => {
    const stepType = `${type}[${step}]`;
    return { ...acc, [step]: getBasicActionCreator(stepType) };
  };

  const emptyBag = {} as ActionCreatorsBag<T, S>;
  return steps.reduce(createAsyncActionCreator, emptyBag);
};
