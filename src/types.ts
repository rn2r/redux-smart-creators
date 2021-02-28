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

/**
 * SmartCreator is a main concept.
 * It is extended action creator. that also has type property,
 * Type is just a string, it equivalents type of returned action from reduxer
 * */
export interface SmartCreator<T extends string> {
  type: T;
}

/**
 * Basic SmartCreator returns from createReduxer function
 * It returns basic action from itself
 * Also has load() method, where possible to describe payload of action
 * */
export interface BasicSmartCreator<T extends string> extends SmartCreator<T> {
  (): BasicAction<T>;
}
