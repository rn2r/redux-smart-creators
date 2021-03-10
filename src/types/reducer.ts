import { BasicAction, PayloadFunction, UnknownAction } from './common';
import { ActionCreatorBase, ActionCreatorWithPayload } from './creator';

export type Reducer<State = any, Action extends UnknownAction<string> = BasicAction<string>> = (
  state: State | undefined,
  action: Action
) => State;

export type EmptyStateHandler<State> = () => State;
export type StateHandler<State> = (state: State) => State;
export type StateWithPayloadHandler<State, Payload> = (state: State, payload: Payload) => State;

export type AnyStateHandler<State, Payload = any> =
  | EmptyStateHandler<State>
  | StateHandler<State>
  | StateWithPayloadHandler<State, Payload>;

export interface PayloadToStateHandler<State, Payload = any> {
  (payload: Payload): State;
}

export interface ReducerActionHandler<State, Action extends BasicAction<string>> {
  // Single Action Creator
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreator: ActionCreator,
    staticValue: State
  ): ReducerCreator<State, Action>;
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreator: ActionCreator,
    handler: () => State
  ): ReducerCreator<State, Action>;
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreator: ActionCreator,
    handler: (state: State) => State
  ): ReducerCreator<State, Action>;
  <
    ActionType extends Action['type'],
    ActionCreator extends ActionCreatorWithPayload<ActionType, any>
  >(
    actionCreator: ActionCreator,
    handler: (state: State, payload: ReturnType<ActionCreator>['payload']) => State
  ): ReducerCreator<State, Action>;

  // Multiple Action Creators
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreators: ActionCreator[],
    staticValue: State
  ): ReducerCreator<State, Action>;
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreators: ActionCreator[],
    handler: () => State
  ): ReducerCreator<State, Action>;
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    actionCreators: ActionCreator[],
    handler: (state: State) => State
  ): ReducerCreator<State, Action>;
  <
    ActionType extends Action['type'],
    ActionCreator extends ActionCreatorWithPayload<ActionType, any>
  >(
    actionCreators: ActionCreator[],
    handler: (state: State, payload: ReturnType<ActionCreator>['payload']) => State
  ): ReducerCreator<State, Action>;
}

export interface ReducerResetHandler<State, Action extends UnknownAction<string>> {
  <ActionType extends Action['type'], ActionCreator extends ActionCreatorBase<ActionType>>(
    ...actions: ActionCreator[]
  ): ReducerCreator<State, Action>;
}

export interface ReducerSwitchToPayloadHandler<State, Action extends UnknownAction<string>> {
  <ActionType extends Action['type']>(
    ...actionCreators: ActionCreatorWithPayload<ActionType, PayloadFunction<State>>[]
  ): ReducerCreator<State, Action>;
}

export interface ReducerGetFromPayloadHandler<State, Action extends UnknownAction<string>> {
  // Single Action Creator
  <
    ActionType extends Action['type'],
    ActionCreator extends ActionCreatorWithPayload<ActionType, any>
  >(
    actionCreator: ActionCreator,
    handler: PayloadToStateHandler<State, ReturnType<ActionCreator>['payload']>
  ): ReducerCreator<State, Action>;

  // Multiple Action Creators
  <
    ActionType extends Action['type'],
    ActionCreator extends ActionCreatorWithPayload<ActionType, PayloadFunction<State>>
  >(
    actionCreators: ActionCreator[],
    handler: PayloadToStateHandler<State, ReturnType<ActionCreator>['payload']>
  ): ReducerCreator<State, Action>;
}

export interface ReducerCreator<State, Action extends BasicAction<string> = BasicAction<string>> {
  create(): Reducer<State, Action>;
  on: ReducerActionHandler<State, Action>;
  reset: ReducerResetHandler<State, Action>;
  switchToPayload: ReducerSwitchToPayloadHandler<State, Action>;
  getFromPayload: ReducerGetFromPayloadHandler<State, Action>;
  // injectLogic: InjectLogic<State, Action>;
}

export interface CreateReducer {
  <State, Action extends BasicAction<string>>(initialState: State): ReducerCreator<State, Action>;
}
