"use strict";

const SauceHelper = require("../index");

describe("Unknown helper", () => {
    let helper;

    beforeEach(() => {
        helper = new SauceHelper({ require: "codeceptjs-saucehelper" });
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
