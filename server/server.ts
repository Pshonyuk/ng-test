import {App} from './app';
const config = require('./config.json');

export const app = new App(config);
app.listen();