import { withLoad } from '../basic/withLoad';
import { PayloadFunction } from '../types/common';
import {
  ActionCreatorsBag,
  AsyncActionCreatorWithPayload,
  InjectAsyncPayload,
} from '../types/asyncCreator';

export const getAsyncPayloadInjector = <ActionType extends string, Steps extends string>(
  baseCreators: ActionCreatorsBag<ActionType, Steps>,
) => {
  const injectAsyncPayload: InjectAsyncPayload<ActionType, Steps> = (payloads) => {
    const stepsWithPayload = Object.keys(payloads);
    const steps = Object.keys(baseCreators);

    const makeCreatorWithPayload = (
      creators: ActionCreatorsBag<ActionType, Steps>,
      step: string,
    ) => {
      if (!steps.includes(step)) throw new Error('Original steps should include step with payload');
      if (typeof payloads[step as keyof typeof payloads] !== 'function') {
        throw new Error('Payload creator must be a function');
      }

      const stepPayload = payloads[step as keyof typeof payloads] as PayloadFunction;
      const creator = creators[step as keyof ActionCreatorsBag<ActionType, Steps>];
      const creatorWithLoad = withLoad(creator);
      return { ...creators, [step]: creatorWithLoad.load(stepPayload) };
    };

    return stepsWithPayload.reduce(
      makeCreatorWithPayload,
      baseCreators,
    ) as AsyncActionCreatorWithPayload<ActionType, Steps, typeof payloads>;
  };
  return injectAsyncPayload;
};
