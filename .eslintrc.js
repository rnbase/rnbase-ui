module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // allow destructuring by ignoring the rest property's siblings
    // requires to disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "ignoreRestSiblings": true
    }]
  }
};
