module.exports = {
    "extends" : ["airbnb-base","plugin:prettier/recommended", 'plugin:react/recommended'],
    "rules":{
        "no-unused-vars":0,
        "linebreak-style": 0
    },
    "env": {
      "jest": true,
      "node": true
    },
};