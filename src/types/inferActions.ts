import { InjectAsyncPayload } from './asyncCreator';
import { InjectPayload } from './creator';

/**
 * Mapped type with basic action creators and flatten async action creators.
 * Async action creators are objects, that have following structure:
 * asyncActionCreatorLabel: { first: basicActionCreator, second: basicActionCreator, third: basicActionCreator, load() }
 * This type converts async action creator to following union type:
 * asyncActionCreatorLabel: firstActionCreator | secondActionCreator | thirdActionCreator | load()
 * basic action creators stay untouched
 * */
export type FlattenActionCreators<ActionCreatorsHash> = {
  [BasicOrAsyncActionCreator in keyof ActionCreatorsHash]: ActionCreatorsHash[BasicOrAsyncActionCreator] extends {
    [AsyncActionCreatorStep: string]: infer BasicActionCreator;
  }
    ? BasicActionCreator
    : ActionCreatorsHash[BasicOrAsyncActionCreator];
};

/**
 * Infers union of basic action creators from a hash of mixed (basic and async) action creators
 * For example following type
 * {
 *   basicLabel1: basicActionCreator1
 *   asyncLabel1: firstActionCreator | secondActionCreator | thirdActionCreator | load()
 *   basicLabel2: basicActionCreator2
 * }
 * convert to union:
 * basicActionCreator1 | firstActionCreator | secondActionCreator | thirdActionCreator | basicActionCreator2 | load()
 * */

export type InferRawActionCreators<ActionCreatorsHash> = ActionCreatorsHash extends {
  [ActionType: string]: infer BasicActionCreator;
}
  ? BasicActionCreator
  : never;

/**
 * Removes the 'load' method from inferred action creators
 * */
export type InferActionCreators<ActionCreatorHash> = Exclude<
  InferRawActionCreators<FlattenActionCreators<ActionCreatorHash>>,
  InjectAsyncPayload<any, any> | InjectPayload<any>
>;

/**
 * Infers union of actions from a hash of action creators;
 */
// @ts-ignore
export type InferActions<ActionCreatorHash> = ReturnType<InferActionCreators<ActionCreatorHash>>;
