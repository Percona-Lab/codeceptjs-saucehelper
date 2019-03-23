"use strict";

class FakeHelper {
    constructor(config) {
        this.config = config;
    }
}

global.Helper = FakeHelper;
