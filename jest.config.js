console.log('Running jest config...');

module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  testTimeout: 30000,
};
