import { ExtendableBasicActionCreator } from './creator';
import { ExtendableAsyncActionCreator } from './asyncCreator';

export interface CreatorsPack<PackLabel extends string | null, PackSteps extends string> {
  getCreator<ActionType extends string>(
    actionType: ActionType
  ): PackLabel extends string
    ? ExtendableBasicActionCreator<`@@${PackLabel}/${ActionType}`>
    : ExtendableBasicActionCreator<ActionType>;

  getAsyncCreator<ActionType extends string>(
    actionType: ActionType
  ): PackLabel extends string
    ? ExtendableAsyncActionCreator<`@@${PackLabel}/${ActionType}`, PackSteps>
    : ExtendableAsyncActionCreator<ActionType, PackSteps>;

  getAsyncCreator<ActionType extends string, Steps extends string>(
    actionType: ActionType,
    steps: Steps[]
  ): PackLabel extends string
    ? ExtendableAsyncActionCreator<`@@${PackLabel}/${ActionType}`, Steps>
    : ExtendableAsyncActionCreator<ActionType, Steps>;
}
