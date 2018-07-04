module.exports = {
    "parser": "babel-eslint",
    extends: ["airbnb-base","plugin:prettier/recommended", 'plugin:react/recommended'],
    "plugins": [
      "react",
    ],
    "env": {
      "browser": true,
      "mocha": true,
      "node": true
    },
    "parserOptions": {
      "ecmaFeatures": {
          "jsx": true,
          "modules": true,
          "experimentalObjectRestSpread": true
      }
    },
    "rules":{
      "class-methods-use-this": 0,
      "import/prefer-default-export": 0,
      "no-underscore-dangle": 0,
      "linebreak-style": 0,
    }
  };
