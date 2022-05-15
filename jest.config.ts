import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};

module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["tsx", "js", "ts"],
    testMatch: ["**/tests/**/*.test.tsx"],
    collectCoverageFrom: [
      "src/features/**/*.{js,jsx,tsx,ts}",
      "!<rootDir>/node_modules/"
    ],
    setupFilesAfterEnv: [
      "./src/tests/setupTest.ts"
    ],
    moduleNameMapper:{
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    }
};