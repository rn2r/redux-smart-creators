import { Action } from 'redux';

/** ACTIONS */
/** Basic Action without payload, analog of action from redux */
export interface BasicAction<T extends string> extends Action<T> {}

/** Action with guaranteed payload  */
export interface PayloadAction<T extends string, P extends any> extends BasicAction<T> {
  payload: P;
}

/** Unknown action, that can has payload */
export interface UnknownAction<T extends string> extends BasicAction<T> {
  payload?: any;
}

/** Function for creating payload in action creators */
export interface PayloadFunction<R = any> {
  (...args: any): R;
}

/**
 * SmartCreator is a main concept.
 * It is extended action creator. that also has type property,
 * Type is just a string, it equivalents type of returned action from reduxer
 * */
export interface SmartCreator<T extends string> {
  type: T;
}

export interface PayloadInjector<P> {
  (payload: P): P;
}

export interface InjectPayload<T extends string> {
  <P>(): SmartCreatorWithPayload<T, PayloadInjector<P>>;
  <F extends PayloadFunction>(payloadGenerator: F): SmartCreatorWithPayload<T, F>;
}

/**
 * Basic SmartCreator returns from createReduxer function
 * It returns basic action from itself
 * Also has load() method, where possible to describe payload of action
 * */
export interface BasicSmartCreator<T extends string> extends SmartCreator<T> {
  (): BasicAction<T>;
  load: InjectPayload<T>;
}

/** Reduxer, that returns action with payload */
export interface SmartCreatorWithPayload<T extends string, F extends PayloadFunction>
  extends SmartCreator<T> {
  (...args: Parameters<F>): PayloadAction<T, ReturnType<F>>;
}
