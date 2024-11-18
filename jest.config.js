// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/__tests__/**/*.test.ts'], // Matches all files in __tests__ folders with .test.ts extension
    coverageDirectory: 'coverage',
};
