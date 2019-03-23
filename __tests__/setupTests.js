"use strict";

const REST = require("codeceptjs/lib/helper/REST");

class FakeHelper {
    constructor(config) {
        this.config = config;
        this.helpers = {
            REST: new REST({})
        };
    }
}

global.Helper = FakeHelper;
