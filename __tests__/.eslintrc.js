module.exports = {
  env: {
    "jest/globals": true
  },
  extends: ["plugin:jest/recommended"],
  plugins: ["jest"],
  rules: {
    "init-declarations": "off",
    "max-lines-per-function": "off"
  }
};
