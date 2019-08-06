"use strict";

const codeceptjs = require("codeceptjs");

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
     * @param test
     * @private
     * @author Kushang Gajjar
     */
    _before(test) {
        return this._updateSauceJob({
            tags: test.tags,
            name: test.title,
            build: test.build || process.env.SAUCE_BUILD
        });
    }

    /**
     *
     * @param data      Test name, etc
     * @private
     */
    _updateSauceJob(data) {
        const restHelper = this.helpers.REST;
        if (!restHelper) {
            throw new Error("REST helper must be enabled, add REST: {} to helpers config");
        }

        const sessionId = this._getSessionId();
        const config = this._getConfig();

        let sauce_url = "Test finished. Link to job: https://saucelabs.com/jobs/";
        sauce_url = sauce_url.concat(sessionId);
        codeceptjs.output.say(sauce_url);

        return restHelper.sendPutRequest(
            this._createStatusUrl(config, sessionId),
            data,
            { Authorization: this._createAuthHeader(config) }
        );
    }

    /**
     * Helper function gets called if the test is passing
     * @param test
     * @private
     */
    _passed(test) {
        return this._updateSauceJob({ passed: true });
    }

    /**
     * Helper function gets called if the test execution fails
     * @param test
     * @param error
     * @private
     */
    _failed(test, error) {
        return this._updateSauceJob({ passed: false });
    }

    _createAuthHeader(config) {
        let credentials = config.user;
        credentials = credentials.concat(":");
        credentials = credentials.concat(config.key);
        return "Basic ".concat(Buffer.from(credentials).toString("base64"));
    }

    _createStatusUrl(config, sessionId) {
        let status_url = "https://saucelabs.com/rest/v1/";
        if (config.region === "eu") {
            status_url = "https://eu-central-1.saucelabs.com/rest/v1/";
        }
        status_url = status_url.concat(config.user);
        status_url = status_url.concat("/jobs/");
        return status_url.concat(sessionId);
    }

    _getConfig() {
        if (this.helpers.WebDriver) {
            return this.helpers.WebDriver.config;
        }
        if (this.helpers.Appium) {
            return this.helpers.Appium.config;
        }
        if (this.helpers.WebDriverIO) {
            return this.helpers.WebDriverIO.config;
        }
        throw new Error("No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO");
    }

    _getSessionId() {
        if (this.helpers.WebDriver) {
            return this.helpers.WebDriver.browser.sessionId;
        }
        if (this.helpers.Appium) {
            return this.helpers.Appium.browser.sessionId;
        }
        if (this.helpers.WebDriverIO) {
            return this.helpers.WebDriverIO.browser.requestHandler.sessionID;
        }
        throw new Error("No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO");
    }
}

module.exports = SauceHelper;
