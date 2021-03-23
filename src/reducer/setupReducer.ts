import { AnyStateHandler, PayloadToStateHandler, Reducer, ReducerCreator } from '../types/reducer';
import { UnknownAction } from '../types/common';
import { ActionCreatorBase, BasicActionCreator } from '../types/creator';

const getCreatorsTypes = <
  ActionType extends string,
  ActionCreator extends ActionCreatorBase<ActionType>
>(
  ...creators: ActionCreator[]
): ActionType[] => {
  const ejectType = ({ type }: ActionCreator) => type;
  return creators.map(ejectType);
};

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

    on(
      actionCreatorOrActionCreators: BasicActionCreator<string> | BasicActionCreator<string>[],
      staticValueOrHandler: State | AnyStateHandler<State>
    ) {
      const registerHandler = ({ type }: BasicActionCreator<string>): void => {
        handlers[type] =
          typeof staticValueOrHandler === 'function'
            ? (staticValueOrHandler as AnyStateHandler<State>)
            : () => staticValueOrHandler;
      };
      if (Array.isArray(actionCreatorOrActionCreators)) {
        actionCreatorOrActionCreators.forEach(registerHandler);
        return reducerCreator;
      }
      registerHandler(actionCreatorOrActionCreators);
      return reducerCreator;
    },

    reset(...actionCreators) {
      const types = getCreatorsTypes(...actionCreators);
      types.forEach((type) => {
        handlers[type] = () => initialState;
      });
      return reducerCreator;
    },

    switchToPayload(...actionCreators) {
      const types = getCreatorsTypes(...actionCreators);
      types.forEach((type) => {
        handlers[type] = (_state, payload) => payload;
      });
      return reducerCreator;
    },

    getFromPayload<ActionCreator extends BasicActionCreator<string>>(
      actionCreatorOrActionCreators: ActionCreator | ActionCreator[],
      handler: PayloadToStateHandler<State>
    ) {
      const registerHandler = ({ type }: ActionCreator): void => {
        handlers[type] = (_state, payload) => handler(payload);
      };

      if (Array.isArray(actionCreatorOrActionCreators)) {
        actionCreatorOrActionCreators.forEach(registerHandler);
        return reducerCreator;
      }
      registerHandler(actionCreatorOrActionCreators);
      return reducerCreator;
    },
    injectLogic(logicCreator) {
      return logicCreator(reducerCreator);
    },
  };
  return reducerCreator;
}
