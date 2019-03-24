"use strict";

const codeceptjs = require("codeceptjs");
const nock = require("nock");

const SauceHelper = require("../index");

jest.mock("codeceptjs");

describe("logging", () => {
    const key = "01234567-89ab-cdef-0123-456789abcdef";
    const session = "0123456789abcdef0123456789abcdef";
    const title = "My great test";
    const user = "saucetestuser";

    let helper;
    let sauceApi;

    beforeEach(() => {
        nock.disableNetConnect();
        sauceApi = nock("https://saucelabs.com/rest/v1").defaultReplyHeaders({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization"
        });
        sauceApi.options(`/${user}/jobs/${session}`).reply(200);

        helper = new SauceHelper({ require: "codeceptjs-saucehelper" });

        helper.helpers.WebDriver = {
            config: { user, key },
            browser: { sessionId: session }
        };
    });

    it("logs a link to the test", () => {
        sauceApi
            .put(`/${user}/jobs/${session}`, {
                passed: true,
                name: title
            })
            .matchHeader(
                "authorization",
                "Basic c2F1Y2V0ZXN0dXNlcjowMTIzNDU2Ny04OWFiLWNkZWYtMDEyMy00NTY3ODlhYmNkZWY="
            )
            .reply(200, {});

        return helper._passed({ title }).then(() => {
            expect(codeceptjs.output.say).toHaveBeenCalledWith(`Test finished. Link to job: https://saucelabs.com/jobs/${session}`);
        });
    });
});
