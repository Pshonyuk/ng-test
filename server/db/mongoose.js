"use strict";
var mongoose = require("mongoose");
var logger_1 = require("../logger");
mongoose.Promise = global.Promise;
exports.connect = function (url) {
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', function (err) {
        logger_1.logger.error('Connection error:', err.message);
    });
    db.once('open', function callback() {
        logger_1.logger.info("Connected to DB!");
    });
};
//# sourceMappingURL=mongoose.js.map