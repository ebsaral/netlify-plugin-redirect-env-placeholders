const fs = require('fs');
const { join } = require('path');
const { Buffer } = require('buffer');

const onPreBuild = require('./index').onPreBuild;

const ENV_VARS = {
  TEST_API_URL: 'https://this.is.test/hey',
  ANOTHER_TEST_API_URL: 'https://google.com',
};

describe('onPreBuild', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = ENV_VARS;
  });

  describe('with test environment variable', () => {
    it('replaces the placeholders correctly', async () => {
      await onPreBuild({ inputs: { source: '_redirects.example', base: __dirname } });
      const actual = fs.readFileSync(join(__dirname, '_redirects'));
      const expected = fs.readFileSync(join(__dirname, '_redirects.expected'));
      expect(actual).toEqual(expected);
    });
  });
});
