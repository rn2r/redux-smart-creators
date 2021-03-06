/** ACTIONS */

/** Basic Action without payload, analog of action from redux */
export interface BasicAction<T extends string> {
  type: T;
}

/** Action with guaranteed payload  */
export interface ActionWithPayload<T extends string, P extends any> extends BasicAction<T> {
  payload: P;
}

/** Unknown action, that can has payload */
export interface UnknownAction<T extends string> extends BasicAction<T> {
  payload?: any;
}

/** Function for creating payload in action creators */
export interface PayloadFunction<ActionPayload = any> {
  (...args: any): ActionPayload;
}

/**
 * SmartCreator is a main concept.
 * It is extended action creator. that also has type property,
 * Type is just a string, it equivalents type of returned action from reduxer
 * */
export interface ActionCreator<ActionType extends string> {
  type: ActionType;
}

export interface BasicPayloadInjector<ActionPayload> {
  (payload: ActionPayload): ActionPayload;
}

export interface InjectPayload<ActionType extends string> {
  <ActionPayload>(): ActionCreatorWithPayload<ActionType, BasicPayloadInjector<ActionPayload>>;
  <F extends PayloadFunction>(payloadGenerator: F): ActionCreatorWithPayload<ActionType, F>;
}

export interface BasicActionCreator<ActionType extends string> extends ActionCreator<ActionType> {
  (): BasicAction<ActionType>;
}

/**
 * Basic SmartCreator returns from createReduxer function
 * It returns basic action from itself
 * Also has load() method, where possible to describe payload of action
 * */
export interface ActionCreatorWithLoad<ActionType extends string>
  extends BasicActionCreator<ActionType> {
  load: InjectPayload<ActionType>;
}

/** Reduxer, that returns action with payload */
export interface ActionCreatorWithPayload<ActionType extends string, F extends PayloadFunction>
  extends ActionCreator<ActionType> {
  (...args: Parameters<F>): ActionWithPayload<ActionType, ReturnType<F>>;
}

export type AsyncActionCreatorBag<ActionType extends string, Steps extends string> = {
  [Step in Steps]: BasicActionCreator<`${ActionType}[${Step}]`>;
};

export type DefaultAsyncStep = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAILURE';

export type StepsPayloadFunctions<Steps extends string> = Partial<Record<Steps, PayloadFunction>>;

export interface InjectAsyncPayload<ActionType extends string, Steps extends string> {
  <Payloads extends StepsPayloadFunctions<Steps>>(
    payloads: Payloads
  ): AsyncActionCreatorWithPayload<ActionType, Steps, Payloads>;
}

export type AsyncBasicActionCreator<
  ActionType extends string,
  Steps extends string = DefaultAsyncStep
> = AsyncActionCreatorBag<ActionType, Steps> & {
  load: InjectAsyncPayload<ActionType, Steps>;
};

export type AsyncActionCreatorWithPayload<
  ActionType extends string,
  Steps extends string,
  Payloads extends StepsPayloadFunctions<Steps>
> = {
  [Step in Steps]: Payloads[Step] extends PayloadFunction
    ? ActionCreatorWithPayload<`${ActionType}[${Step}]`, Payloads[Step]>
    : ActionCreatorWithLoad<`${ActionType}[${Step}]`>;
};
