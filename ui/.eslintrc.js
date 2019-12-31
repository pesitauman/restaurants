module.exports = {
  "env": {
    "mocha": true
  },
  "extends": [ "plugin:node/recommended"],
  "plugins": [
    "import", "node"
  ],
  "rules":{
    "node/exports-style": ["warn", "module.exports"],
    "node/no-unpublished-require": "off",
    "node/no-unsupported-features": "off",
    "node/no-extraneous-require": "off",
    "prefer-template": "off",
    "no-nested-ternary": "off",
    "spaced-comment": "off",
    "prefer-destructuring": "off",
    "no-trailing-spaces": "off",
    "no-mixed-operators": "off",
    "no-multiple-empty-lines": "off",
    "no-underscore-dangle": "off",
    "no-else-return": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "functions": "ignore",
      "imports": "always",
      "exports": "always"
    }],
    "curly": "off",
    "space-in-parens": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off"
  }
};
