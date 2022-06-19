module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!variables/.*)',
    'node_modules/variables/.+\\.(j|t)sx?$',
  ],

  // transformIgnorePatterns: ['<rootDir>/bower_components/', '<rootDir>/node_modules/'],
};
