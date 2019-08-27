# codeceptjs-saucehelper
CodeceptJS Sauce Labs helpers, to update Test Names, Test Results after execution 

codeceptjs-saucehelper is [CodeceptJS](https://codecept.io/) helper which is to complete tests results on Sauce Labs after execution. The helper allows to update test name and
test results on sauce labs using the `_passed` and `_failed` hooks accessible in the helper.

NPM package: https://www.npmjs.com/package/codeceptjs-saucehelper

### Configuration

This helper should be added in codecept.json/codecept.conf.js

Example:

```json
{
   "helpers": {
     "SauceHelper": {
      "require": "codeceptjs-saucehelper"
    },
   }
}
```
Your Sauce Labs user and key are now accessed from the WebDriver/Appium configuration to minimise duplication.

### SauceLabs Automated Build Dashboard

To create SauceLabs Automated Build dashboard, you'd need to pass the unique `build` id. You can pass the unique `build` through process environment variable,

```bash

    $ SAUCE_BUILD=<your_build> <test_command>
    
```

e.g. SAUCE_BUILD=`'date'`

### Development

Code quality and functionality are checked with ESlint (`npm run lint`) and Jest (`npm run test`). The tests use [`nock`][1] to check that appropriate requests are made to the Sauce Labs API given the configuration and the outcome of the test.

  [1]: https://www.npmjs.com/package/nock
