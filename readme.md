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
     "SauceHelper" : {
       "require": "codeceptjs-saucehelper"
     }
   }
}
```
To use the Helper, Users must provide the Sauce User, Sauce Key & Host as part of the configuration.
