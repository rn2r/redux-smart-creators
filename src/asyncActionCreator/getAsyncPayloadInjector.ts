import { AsyncActionCreatorBasicBag, InjectAsyncPayload, PayloadFunction } from '../types';
import { createLoadMethod } from '../actionCreator/createLoadMethod';

export const getAsyncPayloadInjector = <T extends string, S extends string>(
  type: T,
  steps: S[],
  baseCreators: AsyncActionCreatorBasicBag<T, S>
) => {
  const injectAsyncPayload: InjectAsyncPayload<T, S> = (payloads) => {
    const stepsWithPayload = Object.keys(payloads);
    return stepsWithPayload.reduce((creators, step) => {
      if (typeof payloads[step as keyof typeof payloads] === 'function') {
        // TODO add console.log for development
        const stepPayload = payloads[step as keyof typeof payloads] as PayloadFunction;
        const creator = creators[step as keyof AsyncActionCreatorBasicBag<T, S>];
        const creatorWithLoad = createLoadMethod(creator);
        return { ...creators, [step]: creatorWithLoad.load(stepPayload) };
      }
      return creators;
    }, baseCreators) as ReturnType<InjectAsyncPayload<T, S>>;
  };
  return injectAsyncPayload;
};
