'use strict';

/**
 * Sauce Labs Helper for Codeceptjs
 *
 * @author Puneet Kala
 */
class SauceHelper extends Helper {

    constructor(config) {
        super(config);
    }

    /**
     *
     * @param sessionId Session ID for current Test browser session
     * @param data      Test name, etc
     * @private
     */
    _updateSauceJob(sessionId, data) {
        var sauce_url = "Test finished. Link to job: https://saucelabs.com/jobs/";
        sauce_url = sauce_url.concat(sessionId);
        console.log(sauce_url);


        var status_url = 'https://saucelabs.com/rest/v1/';
        status_url = status_url.concat(this.config.user);
        status_url = status_url.concat('/jobs/');
        status_url = status_url.concat(sessionId);

        console.log(this.config.user);
        return this.helpers["REST"].sendPutRequest(
            status_url,
            data,
            { Authorization: this._createAuthHeader() }
        );
    }

    _createAuthHeader() {
        var credentials = this.config.user;
        credentials = credentials.concat(":");
        credentials = credentials.concat(this.config.key);
        return "Basic ".concat(Buffer.from(credentials).toString("base64"));
    }

    /**
     * Helper function gets called if the test is passing
     * @param test
     * @private
     */
    _passed (test) {
        console.log ("Test has Passed");
        const sessionId = this._getSessionId();
        return this._updateSauceJob(sessionId, {"passed": true, "name": test.title});
    }

    /**
     * Helper function gets called if the test execution fails
     * @param test
     * @param error
     * @private
     */
    _failed (test, error) {
        console.log ("Test has failed");
        const sessionId = this._getSessionId();
        return this._updateSauceJob(sessionId, {"passed": false, "name": test.title});
    }
    
    _getSessionId() {
        if (this.helpers['WebDriver']) {
            return this.helpers['WebDriver'].browser.sessionId;
        }
        if (this.helpers['Appium']) {
            return this.helpers['Appium'].browser.sessionId;
        }
        if (this.helpers['WebDriverIO']) {
            return this.helpers['WebDriverIO'].browser.requestHandler.sessionID;
        }        
        throw new Error('No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO');
    }
}

module.exports = SauceHelper;
