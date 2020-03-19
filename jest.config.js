module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'preset': 'ts-jest',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js'
  ],
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  'moduleNameMapper': {
    '^@error$': '<rootDir>/src/error',
    '^@trip/(.*)': '<rootDir>/src/trip/$1',
    '^@type$': '<rootDir>/src/type',
    '^@user/(.*)': '<rootDir>/src/user/$1'
  }
}
