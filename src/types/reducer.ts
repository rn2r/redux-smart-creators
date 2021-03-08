import { BasicAction, UnknownAction } from './common';

export type Reducer<State = any, Action extends UnknownAction<string> = BasicAction<string>> = (
  state: State | undefined,
  action: Action
) => State;

export type EmptyStateHandler<State> = () => State;
export type StateHandler<State> = (state: State) => State;
export type FullStateHandler<State, Payload> = (state: State, payload: Payload) => State;

export type AnyStateHandler<State, Payload = any> =
  | EmptyStateHandler<State>
  | StateHandler<State>
  | FullStateHandler<State, Payload>;

export interface ReducerCreator<State, Action extends BasicAction<string> = BasicAction<string>> {
  create(): Reducer<State, Action>;
  // on: ReducerActionHandler<State, Action>;
  // reset: ReducerResetHandler<State, Action>;
  // switchToPayload: ReducerSwitchToPayloadHandler<State, Action>;
  // injectLogic: InjectLogic<State, Action>;
}

export interface CreateReducer {
  <State, Action extends BasicAction<string>>(initialState: State): ReducerCreator<State, Action>;
}
