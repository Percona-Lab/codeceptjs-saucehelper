"use strict";

const SauceHelper = require("../index");

describe("No REST helper", () => {
    it("tells the user to enable REST", () => {
        const helper = new SauceHelper({
            user: "",
            require: "codeceptjs-saucehelper",
            key: ""
        });
        helper.helpers = {
            WebDriver: { browser: {} }
        };

        expect(() => helper._passed({})).toThrow("REST helper must be enabled, add REST: {} to helpers config");
    });
});
