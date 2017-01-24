"use strict";
var app_1 = require("./app");
var config = require('./config.json');
exports.app = new app_1.App(config);
exports.app.listen();
//# sourceMappingURL=server.js.map