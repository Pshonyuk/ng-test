import mongoose = require('mongoose');
import {logger} from '../logger';

mongoose.Promise = global.Promise;

export const connect = (url: string): void => {
    mongoose.connect(url);
    const db = mongoose.connection;

    db.on('error', function (err) {
        logger.error('Connection error:', err.message);
    });

    db.once('open', function callback () {
        logger.info("Connected to DB!");
    });
};