module.exports = {
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    'src/containers/**/*.{js,jsx}',
    'src/modules/**/*.{js,jsx}',
    'src/utils/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
  ],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 1,
      functions: 1,
      lines: 1,
    },
  },
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/config/jest-mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest-mocks/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/config/test-setup.js'],
  testRegex: '/.*\\.test\\.js$',
};
