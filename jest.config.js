module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    "^axios$": "axios/dist/node/axios.cjs"
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jsdom'
};