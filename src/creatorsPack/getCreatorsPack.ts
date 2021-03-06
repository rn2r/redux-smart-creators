import { makePackedCreator } from './makePackedGetCreator';
import { makeAsyncCreatorGetter } from './makeAsyncCreatorGetter';
import { defaultAsyncSteps } from '../utils/defaultSteps';
import { CreatorsPack } from '../types/creatorsPack';
import { DefaultAsyncStep } from '../types/common';

interface GetCreatorsPack {
  <PackLabel extends string>(packLabel: PackLabel): CreatorsPack<PackLabel, DefaultAsyncStep>;
  <Steps extends string>(steps: Steps[]): CreatorsPack<null, Steps>;
  <PackLabel extends string, Steps extends string>(
    packLabel: PackLabel,
    steps: Steps[]
  ): CreatorsPack<PackLabel, Steps>;
}

export const getCreatorsPack: GetCreatorsPack = <PackLabel extends string, Steps extends string>(
  packLabelOrSteps: PackLabel | Steps[],
  steps?: Steps[]
) => {
  if (typeof packLabelOrSteps === 'string') {
    const packedGetCreator = makePackedCreator(packLabelOrSteps);
    if (steps === undefined) {
      const creatorsPack = {} as CreatorsPack<PackLabel, DefaultAsyncStep>;
      creatorsPack.getCreator = packedGetCreator;
      creatorsPack.getAsyncCreator = makeAsyncCreatorGetter(packLabelOrSteps, defaultAsyncSteps);
      return creatorsPack;
    }
    const creatorsPack = {} as CreatorsPack<PackLabel, Steps>;
    creatorsPack.getCreator = makePackedCreator(packLabelOrSteps);
    creatorsPack.getAsyncCreator = makeAsyncCreatorGetter(packLabelOrSteps, steps);
    return creatorsPack;
  }

  const creatorsPack = {} as CreatorsPack<null, Steps>;
  creatorsPack.getCreator = makePackedCreator(null);
  creatorsPack.getAsyncCreator = makeAsyncCreatorGetter(null, packLabelOrSteps);
  return creatorsPack;
};
