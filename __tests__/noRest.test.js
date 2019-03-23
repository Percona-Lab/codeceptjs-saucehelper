"use strict";

const SauceHelper = require("../index");

describe("No REST helper", () => {
    it("tells the user to enable REST", () => {
        const helper = new SauceHelper({ require: "codeceptjs-saucehelper" });
        helper.helpers = {
            WebDriver: { browser: {} }
        };

        expect(() => helper._passed({})).toThrow("REST helper must be enabled, add REST: {} to helpers config");
    });
});
