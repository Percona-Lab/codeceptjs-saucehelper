"use strict";

const nock = require("nock");

const SauceHelper = require("../index");

describe("WebDriver helper", () => {
    const key = "01234567-89ab-cdef-0123-456789abcdef";
    const session = "0123456789abcdef0123456789abcdef";
    const title = "My great test";
    const user = "saucetestuser";

    let helper;
    let sauceApi;

    beforeEach(() => {
        nock.disableNetConnect();
        sauceApi = nock("https://saucelabs.com/rest/v1");

        helper = new SauceHelper({
            user,
            require: "codeceptjs-saucehelper",
            key
        });

        helper.helpers = { WebDriver: { browser: { sessionId: session } } };
    });

    it("makes an appropriate call on test passing", (done) => {
        sauceApi.
            put(`/${user}/jobs/${session}`, {
                passed: true,
                name: title
            }).
            reply(200, {});
        helper._passed({ title });
        setTimeout(() => {
            sauceApi.done();
            done();
        }, 250);
    });

    it("makes an appropriate call on test failing", (done) => {
        sauceApi.
            put(`/${user}/jobs/0123456789abcdef0123456789abcdef`, {
                passed: false,
                name: title
            }).
            reply(200, {});
        helper._failed({ title });
        setTimeout(() => {
            sauceApi.done();
            done();
        }, 250);
    });
});
