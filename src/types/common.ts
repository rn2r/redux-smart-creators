/**
 * Basic Action without payload
 * @example: { type: 'getAllEntries' }
 * */

export interface BasicAction<T extends string> {
  type: T;
}

/**
 * Action with guaranteed payload
 * @example: { type: 'getByID', payload: 10 }
 * */
export interface ActionWithPayload<T extends string, P extends any> extends BasicAction<T> {
  payload: P;
}

/**
 * Unknown action, can has payload
 * */
export interface UnknownAction<T extends string> extends BasicAction<T> {
  payload?: any;
}

/**
 * Function for creating payload in payload injectors
 * @example: actionCreator('actionType').load(_PayloadFunction here_)
 * @example: asyncActionCreator('actionType').load({
 *   INIT: _PayloadFunction here_,
 *   SUCCESS: _PayloadFunction here_
 * })
 * */
export interface PayloadFunction<ActionPayload = any> {
  (...args: any): ActionPayload;
}

/**
 * Payload function that just return single argument;
 * Use for creating default payload in payload injectors
 * if no arguments provided (for action Creators), or if
 * using "payload" helper function (for async action creators)
 * @example: actionCreator('actionType').load<number>()
 * @example: asyncActionCreator('actionType').load({
 *   INIT: payload<number>()
 * })
 */
export interface BasicPayloadFunction<ActionPayload> {
  (payload: ActionPayload): ActionPayload;
}

/**
 * Default step for async action creators
 */
export type DefaultAsyncStep = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAILURE';
