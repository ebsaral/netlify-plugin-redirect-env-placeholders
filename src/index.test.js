const fs = require('fs');
const {join} = require('path')

const onPreBuild = require('./index').onPreBuild;

const ENV_VARS = { TEST_API_URL: "https://this.is.test/hey" }

describe('onPreBuild', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = ENV_VARS;
  });


  describe('with test environment variable', () => {
    it('replaces the placeholders correctly', async () => {
      
      await onPreBuild({ inputs: { source: '_redirects.example', base: __dirname } });
      const result = await fs.readFileSync(join(__dirname, '_redirects'))
      const expectedResult = await fs.readFileSync(join(__dirname, '_redirects.expected'))
      result.equals(expectedResult);
    });
  });
});
