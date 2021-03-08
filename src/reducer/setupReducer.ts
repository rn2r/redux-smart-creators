import { AnyStateHandler, Reducer, ReducerCreator } from '../types/reducer';
import { UnknownAction } from '../types/common';

export function setupReducer<State, Action extends UnknownAction<string>>(
  initialState: State
): ReducerCreator<State, Action> {
  const handlers: { [key: string]: AnyStateHandler<State> } = {};
  const reducerCreator: ReducerCreator<State, Action> = {
    create(): Reducer<State, Action> {
      return (state, action) => {
        if (state === undefined) return initialState;
        if (handlers[action.type] === undefined) return state;
        const { [action.type]: handler } = handlers;
        return handler(state, action.payload);
      };
    },
  };
  return reducerCreator;
}
