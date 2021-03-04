import {
  AsyncActionCreatorBasicBag,
  AsyncBasicActionCreator,
  AsyncPayloadInjector,
  BasicSmartCreator,
  DefaultAsyncActionCreatorBasicBag,
  DefaultAsyncStep,
  Load,
  PayloadFunction,
  SmartCreatorWithPayload,
} from './types';
import { getCreator } from './getCreator';

export const defaultAsyncSteps: DefaultAsyncStep[] = ['INIT', 'LOADING', 'SUCCESS', 'FAILURE'];

interface GetAsyncCreator {
  <T extends string>(type: T): AsyncBasicActionCreator<T>;
  <T extends string, S extends string>(type: T, steps: S[]): AsyncBasicActionCreator<T, S>;
}

export const getAsyncPayloadInjector = <T extends string, S extends string>(
  type: T,
  steps: S[],
  baseActions: any
) => {
  const load: Load<T, S> = (payloadInjector) => {
    const payloadGenerator = <P>() => (payload: P) => payload;
    const functions = payloadInjector(payloadGenerator);

    const newActions = { ...baseActions };
    const functionsEntries = Object.entries(functions);
    const result = functionsEntries.reduce(
      (creators, [step, payloadInjector]) => ({
        ...creators,
        [step]: creators[step].load(payloadInjector),
      }),
      newActions
    );

    return result;
  };
  return load;
};

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
    const load = getAsyncPayloadInjector(type, defaultAsyncSteps, initialBag) as Load<
      T,
      DefaultAsyncStep
    >;
    return { ...initialBag, load };
  }

  const emptyBag = {} as AsyncActionCreatorBasicBag<T, S>;
  const initialBag = steps.reduce(
    (acc, step) => createAsyncBag<typeof step>(acc, step),
    emptyBag
  ) as C;
  const load = getAsyncPayloadInjector(type, steps, initialBag) as Load<T, S>;
  return { ...initialBag, load };
};

const singSong = getAsyncCreator('singSong', ['start', 'finish']).load((injector) => ({
  start: injector<string>(),
  finish: (grades: number[]) => Math.max(...grades),
}));

singSong.start('song');
const a = singSong.finish([10, 30, 10, 90, 100]).payload;
