import { withLoad } from '../actionCreator/withLoad';
import { PayloadFunction } from '../types/common';
import { ActionCreatorsBag, InjectAsyncPayload } from '../types/asyncCreator';

export const getAsyncPayloadInjector = <T extends string, S extends string>(
  type: T,
  baseCreators: ActionCreatorsBag<T, S>
) => {
  const injectAsyncPayload: InjectAsyncPayload<T, S> = (payloads) => {
    const stepsWithPayload = Object.keys(payloads);
    const steps = Object.keys(baseCreators);
    return stepsWithPayload.reduce((creators, step) => {
      if (!steps.includes(step as S)) {
        throw new Error('Original steps should include step with payload');
      }
      if (typeof payloads[step as keyof typeof payloads] !== 'function') {
        throw new Error('Payload creator must be a function');
      }
      const stepPayload = payloads[step as keyof typeof payloads] as PayloadFunction;
      const creator = creators[step as keyof ActionCreatorsBag<T, S>];
      const creatorWithLoad = withLoad(creator);
      return { ...creators, [step]: creatorWithLoad.load(stepPayload) };
    }, baseCreators) as ReturnType<InjectAsyncPayload<T, S>>;
  };
  return injectAsyncPayload;
};
