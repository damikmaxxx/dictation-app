export default {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        isolatedModules: true,
      },
    ],
  },

  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/shared/lib/tests/fileMock.js',
    
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^entities/(.*)$': '<rootDir>/src/entities/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/src/shared/config/setupTests.ts'],
};