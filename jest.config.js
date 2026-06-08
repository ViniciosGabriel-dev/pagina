module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  testTimeout: 10000,
  verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'pages/api/**/*.js',
    'lib/**/*.js',
    '!pages/api/_*.js',
    '!**/*.config.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
