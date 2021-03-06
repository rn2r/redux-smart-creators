import {
  ActionWithPayload, BasicAction, BasicPayloadFunction, PayloadFunction,
} from './common';

/**
 * Info about action creator's type
 * "Type" property is a string, that equal type of returned action
 * */
export interface ActionCreatorBase<ActionType extends string> {
  type: ActionType;
}

/**
 * A Basic action creator can create action with a similar type,
 * but it can not be transformed to an action creator with the payload.
 */
export interface BasicActionCreator<ActionType extends string>
  extends ActionCreatorBase<ActionType> {
  (): BasicAction<ActionType>;
}

/**
 * The main form of action creator.
 * It can be extended to a creator with payload
 * by the usage of the "load" method.
 * */
export interface ExtendableBasicActionCreator<ActionType extends string>
  extends BasicActionCreator<ActionType> {
  load: InjectPayload<ActionType>;
}

/**
 * Action creator returns an action with a similar type and payload.
 * The payload is a returned value of the creator's "Function" generic type.
 * */
export interface ActionCreatorWithPayload<
  ActionType extends string,
  Function extends PayloadFunction
> extends ActionCreatorBase<ActionType> {
  (...args: Parameters<Function>): ActionWithPayload<ActionType, ReturnType<Function>>;
}

/**
 * Function for extending basic action creator.
 * Returns basic action creator with a payload.
 */
export interface InjectPayload<ActionType extends string> {
  <ActionPayload>(): ActionCreatorWithPayload<ActionType, BasicPayloadFunction<ActionPayload>>;
  <Function extends PayloadFunction>(payloadFunction: Function): ActionCreatorWithPayload<
    ActionType,
    Function
  >;
}
