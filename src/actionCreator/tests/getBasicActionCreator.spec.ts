import { getBasicActionCreator } from '../getBasicActionCreator';
import { MOCKED_TYPE } from '../../../test/mocks';
import { actionCreatorBasicTests, wrongUsageTest } from './utils';

describe('wrong usage of getBasicActionCreator', () => {
  wrongUsageTest(getBasicActionCreator);
});

describe('getBasicActionCreator', () => {
  const basicActionCreator = getBasicActionCreator(MOCKED_TYPE);

  actionCreatorBasicTests(basicActionCreator);

  it("should not have a 'load' property", () => {
    console.log(basicActionCreator);
    expect(basicActionCreator).not.toHaveProperty('load');
  });
});
