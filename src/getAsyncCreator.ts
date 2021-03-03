import {
  AsyncActionCreatorBasicBag,
  AsyncBasicActionCreator,
  AsyncPayloadInjector,
  BasicSmartCreator,
  DefaultAsyncActionCreatorBasicBag,
  DefaultAsyncStep,
  PayloadFunction,
  SmartCreatorWithPayload,
} from './types';
import { getCreator } from './getCreator';

export const defaultAsyncSteps: DefaultAsyncStep[] = ['INIT', 'LOADING', 'SUCCESS', 'FAILURE'];

interface GetAsyncCreator {
  <T extends string>(type: T): AsyncBasicActionCreator<T>;
  <T extends string, S extends string>(type: T, steps: S[]): AsyncBasicActionCreator<T, S>;
}

interface Load<Type extends string, Steps extends string> {
  <F extends Partial<Record<Steps, PayloadFunction>>>(payloadInjector: AsyncPayloadInjector<F>): {
    [Step in Steps]: F[Step] extends PayloadFunction
      ? SmartCreatorWithPayload<`${Type}[${Step}]`, F[Step]>
      : BasicSmartCreator<`${Type}[${Step}]`>;
  };
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

    if (functions.init !== undefined) {
      newActions.init = baseActions.init.load(functions.init) as F['init'] extends PayloadFunction
        ? PayloadReduxer<typeof baseActions['init']['type'], F['init']>
        : BasicReduxer<typeof baseActions['init']['type']>;
    }

    if (functions.loading !== undefined) {
      newActions.loading = baseActions.loading.load(
        functions.loading
      ) as F['loading'] extends PayloadFunction
        ? PayloadReduxer<typeof baseActions['loading']['type'], F['loading']>
        : BasicReduxer<typeof baseActions['loading']['type']>;
    }
    if (functions.success !== undefined) {
      newActions.success = baseActions.success.load(
        functions.success
      ) as F['success'] extends PayloadFunction
        ? PayloadReduxer<typeof baseActions['success']['type'], F['success']>
        : BasicReduxer<typeof baseActions['success']['type']>;
    }
    if (functions.failure !== undefined) {
      newActions.failure = baseActions.failure.load(
        functions.failure
      ) as F['failure'] extends PayloadFunction
        ? PayloadReduxer<typeof baseActions['failure']['type'], F['failure']>
        : BasicReduxer<typeof baseActions['failure']['type']>;
    }
  };
  return load;
};

getAsyncPayloadInjector('TYPE', ['a', 'b', 'c'])((injector) => ({
  a: injector((a: string, b: string) => ({ a, b })),
})).a(1);

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
