import express = require('express');
import Router = express.Router;
import {UserModel} from '../models/User';

export const path: string = "/users/";

export const action = (app) => {
    const router = Router();

    router.use((req, res, next) => {
        next();
    });

    router.post('/users/', (req, res) => {

    });

    return router;
};