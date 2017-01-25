"use strict";
var mongoose = require("mongoose");
var connection = mongoose.connection;
var logger_1 = require("../logger");
mongoose.Promise = global.Promise;
exports.connect = function (url, opts) {
    mongoose.connect(url, Object.assign({}, opts));
    connection.on('error', function (err) {
        logger_1.logger.error('Connection error:', err.message);
    });
    connection.once('open', function callback() {
        logger_1.logger.info("Connected to DB!");
    });
    return connection;
};
//# sourceMappingURL=mongoose.js.map