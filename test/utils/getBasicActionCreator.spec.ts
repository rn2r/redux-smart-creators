import { getBasicActionCreator } from '../../src/utils/getBasicActionCreator';
import { MOCKED_TYPE } from '../mocks';
import { actionCreatorBasicTests, wrongUsageTest } from '../basic/utils';

describe('wrong usage of getBasicActionCreator', () => {
  wrongUsageTest(getBasicActionCreator);
});

describe('getBasicActionCreator', () => {
  const basicActionCreator = getBasicActionCreator(MOCKED_TYPE);

  actionCreatorBasicTests(basicActionCreator);

  it("should not have a 'load' property", () => {
    expect(basicActionCreator).not.toHaveProperty('load');
  });
});
