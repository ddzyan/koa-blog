module.exports = {
  root: true,
  extends: "airbnb-base",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    node: true
  },
  rules: {
    "max-len": [2, 200, { "ignoreUrls": true }],
    // 强制最大行数
    "max-lines": 2,
    "linebreak-style": [0, "error", "windows"],
    "no-console": "off",
    quotes: ["error", "single"],
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "no-throw-literal": "off",
    camelcase: "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    radix: "off",
    "no-param-reassign": "off",
    "max-classes-per-file": "off",
  }
};