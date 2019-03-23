"use strict";

const SauceHelper = require("../index");

describe("Appium helper", () => {
    const key = "01234567-89ab-cdef-0123-456789abcdef";
    const user = "saucetestuser";

    let helper;

    beforeEach(() => {
        helper = new SauceHelper({
            user,
            require: "codeceptjs-saucehelper",
            key
        });

        helper.helpers = {};
    });

    it("throws an error on test passing", () => {
        expect(() => {
            helper._passed({});
        }).toThrow("No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO");
    });

    it("throws an error on test failing", () => {
        expect(() => {
            helper._failed({});
        }).toThrow("No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO");
    });
});
