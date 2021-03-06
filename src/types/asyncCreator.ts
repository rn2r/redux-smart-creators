import { DefaultAsyncStep, PayloadFunction } from './common';
import { ActionCreatorWithPayload, BasicActionCreator } from './creator';

/**
 * Object with basic action creators.
 * Each creator's "type" property consists of the action's type and the creator's step name
 */
export type ActionCreatorsBag<ActionType extends string, Steps extends string> = {
  [Step in Steps]: BasicActionCreator<`${ActionType}[${Step}]`>;
};

/**
 * The main form of async action creator.
 * It can be extended to a async creator with payload
 * by the usage of the "load" method.
 * */
export type ExtendableAsyncActionCreator<
  ActionType extends string,
  Steps extends string = DefaultAsyncStep
> = ActionCreatorsBag<ActionType, Steps> & {
  load: InjectAsyncPayload<ActionType, Steps>;
};

/**
 * An object that contains payload functions for steps.
 */
export type StepsPayloadFunctions<Steps extends string> = Partial<Record<Steps, PayloadFunction>>;

/**
 * Function for extending async action creator.
 * Returns async action creator with a payload.
 */
export interface InjectAsyncPayload<ActionType extends string, Steps extends string> {
  <Payloads extends StepsPayloadFunctions<Steps>>(
    payloads: Payloads
  ): AsyncActionCreatorWithPayload<ActionType, Steps, Payloads>;
}

/**
 * Async object creator can contain basic action creators
 * and action creators with a payload.
 * It has not "load" method.
 */
export type AsyncActionCreatorWithPayload<
  ActionType extends string,
  Steps extends string,
  Payloads extends StepsPayloadFunctions<Steps>
> = {
  [Step in Steps]: Payloads[Step] extends PayloadFunction
    ? ActionCreatorWithPayload<`${ActionType}[${Step}]`, Payloads[Step]>
    : BasicActionCreator<`${ActionType}[${Step}]`>;
};
